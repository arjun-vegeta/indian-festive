import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';

const dialogueSource = readFileSync(new URL('../audio/dialogue.js', import.meta.url), 'utf8');
const dialogue: Record<string, [string, string][]> = runInNewContext(dialogueSource + '\nfestivalDialogue;');

const hindiSource = readFileSync(new URL('../audio/dialogue-hindi.js', import.meta.url), 'utf8');
const hindi: { dialogue: Record<string, string[]>; transitions: Record<string, string> } =
  runInNewContext(hindiSource + '\nfestivalHindi;');

type Language = 'en-IN' | 'hi-IN';

const transitions = {
  dussehraToday: { speaker: 'aditya', text: 'The story shifts to today.' },
  diwaliToday: { speaker: 'kavya', text: 'Today, on Diwali night, homes everywhere light lamps the same way.' },
  govardhanClearing: { speaker: 'aditya', text: 'The clouds are parting. Indra has seen that no one in Vraj was hurt.' },
};

const voices: Record<string, string> = {
  Dadi: 'kavya',
  Nala: 'dev',
  Sita: 'priya',
  Hanuman: 'varun',
  Lakshmana: 'aditya',
  Bharata: 'rahul',
  'Nanda Baba': 'anand',
  Subala: 'manan',
  'Yashoda Maiya': 'neha',
  Narada: 'aditya',
  Kartikeya: 'rohan',
  Parvati: 'priya',
  Mushak: 'manan',
  'Kumbhar Kaka': 'anand',
  Indra: 'aditya',
  Brahma: 'anand',
  Vishnu: 'shubh',
  Shiva: 'dev',
  Himavan: 'rahul',
  Mahishasura: 'varun',
  Thakuma: 'kavya',
  'King Hiranyakashipu': 'dev',
  Courtiers: 'varun',
  Holika: 'ritu',
  'Queen Kayadhu': 'neha',
  Dadaji: 'anand',
};
const playerVoices: Record<string, string> = {
  dadiIntro: 'aayan',
  nalaBridge: 'shubh',
  sitaReunion: 'shubh',
  ayodhyaArrival: 'shubh',
  bharataReunion: 'shubh',
  nandaDebate: 'aayan',
  subalaDebate: 'aayan',
  yashodaDebate: 'aayan',
  ganeshMango: 'aayan',
  ganeshMushak: 'aayan',
  ganeshParents: 'aayan',
  durgaLion: 'simran',
  durgaBattle: 'simran',
  durgaHome: 'simran',
  holiThrone: 'aayan',
  holiOrder: 'aayan',
  holiMother: 'aayan',
  holiFestival: 'aayan',
};

export function narrationCues(language: Language = 'en-IN') {
  const isHindi = language === 'hi-IN';
  const cues = new Map(Object.entries(transitions).map(([id, { speaker, text }]) => {
    const translated = isHindi ? hindi.transitions[id] : text;
    if (!translated) throw new Error(`Missing Hindi transition ${id}.`);
    return [id, { speaker, text: translated }];
  }));
  for (const [conversation, lines] of Object.entries(dialogue)) {
    const translation = hindi.dialogue[conversation];
    if (isHindi && translation?.length !== lines.length) {
      throw new Error(`Hindi dialogue count differs for ${conversation}.`);
    }
    lines.forEach(([who, text], index) => {
      const speaker = who === 'you' ? playerVoices[conversation] : voices[who];
      if (!speaker) throw new Error(`No Sarvam voice for ${who} in ${conversation}.`);
      const id = `${conversation}-${index + 1}`;
      const translated = isHindi ? translation[index] : text;
      if (!translated) throw new Error(`Missing Hindi dialogue for ${id}.`);
      cues.set(id, { speaker, text: translated });
    });
  }
  return cues;
}

export async function synthesizeNarration(
  apiKey: string, request = fetch, language: Language = 'en-IN', cues = narrationCues(language),
) {
  if (!apiKey) throw new Error('Set SARVAM_API_KEY in the environment to generate narration.');

  const clips = new Map<string, Buffer>();
  for (const [id, { speaker, text }] of cues) {
    const response = await request('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: { 'api-subscription-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        speaker,
        language_code: language,
        model: 'bulbul:v3',
        output_audio_codec: 'mp3',
        pace: .92,
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`Sarvam failed for ${id} (HTTP ${response.status}).`);
    const { audios } = await response.json() as { audios?: unknown };
    const encoded = Array.isArray(audios) ? audios[0] : undefined;
    if (typeof encoded !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) {
      throw new Error(`Sarvam returned invalid audio for ${id}.`);
    }
    const audio = Buffer.from(encoded, 'base64');
    if (audio.length < 3 || !(audio.subarray(0, 3).toString() === 'ID3' ||
      (audio[0] === 0xff && (audio[1] & 0xe0) === 0xe0))) {
      throw new Error(`Sarvam returned invalid MP3 data for ${id}.`);
    }
    clips.set(id, audio);
  }
  return clips;
}

export function normalizeNarration(audio: Buffer, id: string) {
  const result = spawnSync('ffmpeg', [
    '-v', 'error', '-i', 'pipe:0', '-af', 'loudnorm=I=-19:LRA=7:TP=-2',
    '-ar', '24000', '-ac', '1', '-b:a', '64k', '-f', 'mp3', 'pipe:1',
  ], { input: audio });
  if (result.error) throw new Error(`FFmpeg could not normalize ${id}: ${result.error.message}`);
  if (result.status !== 0 || !result.stdout.length) {
    throw new Error(`FFmpeg could not normalize ${id}: ${result.stderr.toString().trim()}`);
  }
  return result.stdout;
}

async function main() {
  const language = process.argv[2] ?? 'en-IN';
  if (language !== 'en-IN' && language !== 'hi-IN') throw new Error('Expected en-IN or hi-IN.');
  const isHindi = language === 'hi-IN';
  const cues = narrationCues(language);
  const requested = new Set(process.argv.slice(3));
  for (const id of requested) {
    if (!cues.has(id)) throw new Error(`Unknown narration cue: ${id}.`);
  }
  const directory = new URL('../audio/', import.meta.url);
  const manifest: Record<string, string> = {};
  for (const [id] of cues) {
    const filename = `${id}${isHindi ? '-hi' : ''}.mp3`;
    if (requested.size && !requested.has(id) && !existsSync(new URL(filename, directory))) {
      throw new Error(`Include ${id} in this run because ${filename} is missing.`);
    }
    manifest[id] = filename;
  }
  const selected = requested.size ? new Map([...cues].filter(([id]) => requested.has(id))) : cues;
  const clips = await synthesizeNarration(process.env.SARVAM_API_KEY ?? '', fetch, language, selected);
  for (const [id, audio] of clips) clips.set(id, normalizeNarration(audio, id));
  for (const [id, audio] of clips) await writeFile(new URL(manifest[id], directory), audio);
  const filename = isHindi ? 'narration-hi.js' : 'narration.js';
  const variable = isHindi ? 'festivalNarrationHindi' : 'festivalNarration';
  await writeFile(new URL(filename, directory),
    `// Generated by scripts/generate-narration.ts.\nconst ${variable} = ${JSON.stringify(manifest, null, 2)};\n`);
  console.log(`Generated ${clips.size} Sarvam narration clips for ${language}.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
