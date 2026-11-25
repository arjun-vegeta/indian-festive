import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { narrationCues, synthesizeNarration } from '../scripts/generate-narration.ts';



test('Sarvam requests every selected line and transition as an MP3', async () => {
  const received: unknown[] = [];
  const clip = Buffer.from([0xff, 0xfb, 0x90, 0x64]);
  const clips = await synthesizeNarration('test-key', async (url, options) => {
    assert.equal(url, 'https://api.sarvam.ai/text-to-speech');
    assert.equal(options?.method, 'POST');
    assert.deepEqual(options?.headers, {
      'api-subscription-key': 'test-key',
      'Content-Type': 'application/json',
    });
    assert.ok(options?.signal instanceof AbortSignal);
    received.push(JSON.parse(String(options?.body)));
    return Response.json({ audios: [clip.toString('base64')] });
  });
  const common = { language_code: 'en-IN', model: 'bulbul:v3', output_audio_codec: 'mp3', pace: .92 };
  const cues = narrationCues();
  assert.equal(cues.size, 90);
  assert.deepEqual(received, [...cues.values()].map(cue => ({ ...cue, ...common })));
  assert.deepEqual([...clips], [...cues.keys()].map(id => [id, clip]));
  assert.deepEqual(cues.get('dadiIntro-1'), {
    speaker: 'kavya', text: 'There you are, beta. Come, sit with your Dadi a moment.',
  });
  assert.deepEqual(cues.get('dadiIntro-2'), {
    speaker: 'aayan', text: 'Dadi, what are all those islands floating out there?',
  });
  assert.deepEqual(cues.get('nalaBridge-4'), { speaker: 'shubh', text: 'Then let every stone carry it, Nala.' });
  assert.deepEqual(cues.get('nandaDebate-2'), { speaker: 'aayan', text: 'Baba, why do we worship Indra?' });
  assert.deepEqual(cues.get('dadiIntro-10'), { speaker: 'aayan', text: 'I will start with Holi, Dadi!' });
  assert.equal(cues.get('ganeshMango-7')?.speaker, 'aayan');
  assert.equal(cues.get('durgaBattle-2')?.speaker, 'simran');
  assert.equal(cues.get('holiThrone-5')?.speaker, 'aayan');
});

test('Hindi synthesis covers every English cue with the same voice and Hindi API language', async () => {
  const english = narrationCues();
  const hindi = narrationCues('hi-IN');
  assert.deepEqual([...hindi.keys()], [...english.keys()]);
  const requests: unknown[] = [];
  const audio = Buffer.from([0xff, 0xfb, 0x90, 0x64]);
  const clips = await synthesizeNarration('test-key', async (_url, options) => {
    requests.push(JSON.parse(String(options?.body)));
    return Response.json({ audios: [audio.toString('base64')] });
  }, 'hi-IN');
  for (const [id, cue] of hindi) {
    assert.equal(cue.speaker, english.get(id)?.speaker, id);
    assert.match(cue.text, /[\u0900-\u097f]/u, id);
  }
  assert.deepEqual(requests, [...hindi.values()].map(cue => ({
    ...cue, language_code: 'hi-IN', model: 'bulbul:v3', output_audio_codec: 'mp3', pace: .92,
  })));
  assert.deepEqual([...clips.keys()], [...hindi.keys()]);
});

test('Sarvam generation fails visibly on missing credentials, provider failure, and invalid audio', async () => {
  await assert.rejects(synthesizeNarration(''), /Set SARVAM_API_KEY/);
  await assert.rejects(
    synthesizeNarration('test-key', async () => new Response(null, { status: 429 })),
    /dussehraToday \(HTTP 429\)/,
  );
  await assert.rejects(
    synthesizeNarration('test-key', async () => Response.json({ audios: ['aW52YWxpZA=='] })),
    /invalid MP3 data for dussehraToday/,
  );
});

const dialogueSource = readFileSync(new URL('../audio/dialogue.js', import.meta.url), 'utf8');
const hindiSource = readFileSync(new URL('../audio/dialogue-hindi.js', import.meta.url), 'utf8');
const source = readFileSync(new URL('../audio/playback.js', import.meta.url), 'utf8');
function setupPlayback(storage = new Map<string, string>(), scene = "hub") {
  const media: FakeAudio[] = [];
  const credit = { href: '', textContent: '' };
  const replay = Object.assign(new EventTarget(), { hidden: true, disabled: false });
  const channels = scene ? ['voice', 'music', 'effects'] : ['voice', 'effects'];
  const sliders = Object.fromEntries(channels.map(channel => [
    channel + 'Volume', Object.assign(new EventTarget(), { value: 0, valueAsNumber: 0 }),
  ]));
  const languageSelect = Object.assign(new EventTarget(), { value: '' });
  const subtitle = { textContent: '', lang: '' };
  const elements: Record<string, unknown> = {
    musicCredit: credit, replayLine: replay, narrationLanguage: languageSelect, dlgLine: subtitle, ...sliders,
  };
  const document = Object.assign(new EventTarget(), {
    hidden: false,
    currentScript: { src: 'file:///festival/audio/playback.js' },
    getElementById: (id: string) => elements[id],
  });
  class FakeAudio extends EventTarget {
    volume = 1;
    paused = true;
    duration = 30;
    currentTime = 0;
    readonly src: string;
    constructor(src: string) {
      super();
      this.src = src;
      media.push(this);
    }
    async play() { this.paused = false; }
    pause() { this.paused = true; }
  }

  const localStorage = { getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value) };
  const scope = { document, URL, addEventListener() {}, Audio: FakeAudio, console, localStorage, scene,
    festivalNarration: { 'dadiIntro-1': 'dadiIntro-1.mp3', 'dadiIntro-2': 'dadiIntro-2.mp3', 'durgaGods-1': 'durgaGods-1.mp3' },
    festivalNarrationHindi: { 'dadiIntro-1': 'dadiIntro-1-hi.mp3', 'dadiIntro-2': 'dadiIntro-2-hi.mp3', 'durgaGods-1': 'durgaGods-1-hi.mp3' } };
  const { audio, lines, opening, createAmbience } = runInNewContext(dialogueSource + '\n' + hindiSource + '\n' + source +
    "\n({ audio: createFestivalAudio(scene), lines: festivalDialogue.dadiIntro, opening: festivalDialogue.durgaGods, createAmbience: createPositionalAmbience });", scope);
  function changeLevel(channel: string, value: number) {
    const slider = sliders[channel + 'Volume'];
    slider.valueAsNumber = value;
    slider.dispatchEvent(new Event('input'));
  }
  return { audio, changeLevel, createAmbience, credit, document, languageSelect, lines, opening, media, replay, sliders, subtitle };
}

test('Apple preview starts with play, quiets during dialogue, and fades out without looping', () => {
  const { audio, credit, media } = setupPlayback();
  audio.tick(false, .05);
  assert.equal(media.length, 0);
  assert.deepEqual(credit, {
    href: 'https://music.apple.com/us/song/1767775461',
    textContent: 'Raga Bhoopali (Alap) · Pandit Shivkumar Sharma & Pt. Hariprasad Chaurasia · Apple Music',
  });
  audio.start();
  audio.start();
  audio.musicCue();
  assert.equal(media.length, 1);
  const [music] = media;
  assert.equal(new URL(music.src).hostname, 'audio-ssl.itunes.apple.com');
  assert.equal(music.paused, false);
  assert.equal(music.volume, 0);
  music.currentTime = 3;
  audio.tick(false, .05);
  const normalVolume = .7 * .16;
  assert.equal(music.volume, normalVolume);
  audio.tick(true, .05);
  assert.ok(music.volume > normalVolume * .4 && music.volume < normalVolume);
  audio.tick(true, 1);
  assert.ok(Math.abs(music.volume - normalVolume * .4) < .001);
  audio.pause(true);
  assert.equal(music.paused, true);
  audio.pause(false);
  assert.equal(music.paused, false);
  assert.equal(music.currentTime, 3);
  music.currentTime = 13;
  audio.tick(false, .05);
  assert.ok(music.volume < normalVolume / 2);
  music.currentTime = 14;
  audio.tick(false, .05);
  assert.equal(music.paused, true);
  audio.tick(false, .05);
  assert.equal(music.currentTime, 14);
  audio.musicCue();
  assert.equal(media.length, 1);
  assert.equal(music.currentTime, 0);
  assert.equal(music.paused, false);
  audio.stop();
  assert.equal(music.paused, true);
});

test('narration ducks music with a gradual attack and release', () => {
  const { audio, changeLevel, document, lines, media, replay } = setupPlayback();
  audio.narrateDialogue(lines, 0);
  assert.equal(media.length, 0);
  audio.stopDialogue();
  audio.start();
  const [music] = media;
  music.currentTime = 3;
  audio.tick(false, .05);
  const normalVolume = music.volume;
  audio.narrateDialogue(lines, 0);
  assert.equal(media[1].src, 'file:///festival/audio/dadiIntro-1.mp3');
  assert.equal(media[1].volume, .8 * .7);
  assert.equal(music.volume, normalVolume);
  audio.tick(true, .05);
  assert.ok(music.volume < normalVolume && music.volume > normalVolume * .22);
  audio.tick(true, 1);
  assert.ok(Math.abs(music.volume - normalVolume * .22) < .001);
  media[1].dispatchEvent(new Event('ended'));
  audio.tick(true, .05);
  assert.ok(music.volume > normalVolume * .22 && music.volume < normalVolume * .4);
  assert.equal(replay.hidden, false);
  audio.narrateDialogue(lines, 0);
  document.hidden = true;
  document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(media[2].paused, true);
  assert.equal(music.paused, true);
  document.hidden = false;
  document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(music.paused, false);
  changeLevel('voice', 0);
  assert.equal(replay.disabled, true);
  audio.narrateDialogue(lines, 0);
  assert.equal(media.length, 3);
  assert.equal(music.paused, false);
});

test('a player reply replaces the preceding line and resumes after a pause', () => {
  const { audio, document, lines, media, replay } = setupPlayback();
  audio.start();
  audio.narrateDialogue(lines, 0);
  const [, dadi] = media;
  audio.narrateDialogue(lines, 1);
  const [, , player] = media;
  assert.equal(dadi.paused, true);
  assert.equal(player.src, 'file:///festival/audio/dadiIntro-2.mp3');
  player.currentTime = 1;
  audio.pause(true);
  assert.equal(player.paused, true);
  audio.pause(false);
  assert.equal(player.paused, false);
  assert.equal(player.currentTime, 1);
  replay.dispatchEvent(new Event('click'));
  assert.equal(player.paused, true);
  assert.equal(media[3].src, player.src);
  assert.equal(media[3].currentTime, 0);
  const replayKey = Object.assign(new Event('keydown', { cancelable: true }), { code: 'KeyR' });
  document.dispatchEvent(replayKey);
  assert.equal(replayKey.defaultPrevented, true);
  assert.equal(media[3].paused, true);
  assert.equal(media[4].src, player.src);
  audio.stopDialogue();
  audio.narrateDialogue([['Villager', 'An unvoiced line']], 0);
  assert.equal(media[4].paused, true);
  assert.equal(replay.hidden, true);
  assert.equal(media.length, 5);
});

test('mixer levels affect separate channels and carry into another island', () => {
  const storage = new Map<string, string>();
  const hub = setupPlayback(storage);
  const effects: number[] = [];
  hub.audio.bindEffects((value: number) => effects.push(value));
  hub.audio.start();
  hub.changeLevel('voice', .5);
  hub.changeLevel('music', 0);
  hub.changeLevel('effects', .25);
  assert.equal(hub.media[0].paused, true);
  hub.audio.narrateDialogue(hub.lines, 0);
  assert.equal(hub.media[1].volume, .4);
  assert.deepEqual(effects, [.7, .25]);
  hub.audio.pause(true);
  hub.audio.pause(false);
  assert.deepEqual(effects, [.7, .25, 0, .25]);
  const island = setupPlayback(storage, 'diwali');
  assert.deepEqual(Object.values(island.sliders).map(slider => slider.value), [.5, 0, .25]);
  island.audio.start();
  assert.equal(island.media.length, 0);
  assert.equal(island.audio.effectsVolume(), .25);
});

test('positional ambience pans with the player and attenuates with distance', () => {
  const { createAmbience } = setupPlayback();
  const levels: number[] = [];
  const pans: number[] = [];
  const context = {
    currentTime: 0,
    createGain: () => ({ connect() {}, gain: { value: 1, setTargetAtTime: (v: number) => levels.push(v) } }),
    createStereoPanner: () => ({ connect() {}, pan: { setTargetAtTime: (v: number) => pans.push(v) } }),
  };
  const update = createAmbience(context, { connect() {} }, {});
  const player = { pos: { x: 0, y: 0 }, yaw: 0 };
  update(5, 0, player, .1, 10);
  player.yaw = Math.PI;
  update(5, 0, player, .1, 10);
  update(10, 0, player, .1, 10);
  assert.deepEqual(pans, [1, -1, -1]);
  assert.deepEqual(levels, [.025, .025, 0]);
});

test('language changes replace the current subtitle, resume with matching speech, and persist', () => {
  const storage = new Map<string, string>();
  const hub = setupPlayback(storage);
  const { audio, lines, languageSelect, media, replay, subtitle } = hub;
  assert.equal(languageSelect.value, 'en-IN');
  audio.start();
  audio.narrateDialogue(lines, 1);
  assert.equal(subtitle.textContent, lines[1][1]);
  assert.equal(subtitle.lang, 'en');
  audio.pause(true);
  languageSelect.value = 'hi-IN';
  languageSelect.dispatchEvent(new Event('change'));
  assert.equal(subtitle.textContent, 'दादी, आसमान में ये सारे द्वीप क्यों तैर रहे हैं?');
  assert.equal(subtitle.lang, 'hi');
  assert.equal(media.length, 2);
  assert.equal(media[1].paused, true);
  assert.equal(replay.disabled, true);
  audio.pause(false);
  assert.equal(media[2].src, 'file:///festival/audio/dadiIntro-2-hi.mp3');
  replay.dispatchEvent(new Event('click'));
  assert.equal(media[2].paused, true);
  assert.equal(media[3].src, media[2].src);

  const island = setupPlayback(storage, 'diwali');
  assert.equal(island.languageSelect.value, 'hi-IN');
  assert.equal(island.audio.transitionText('diwaliToday', 'English'), 'आज भी दिवाली की रात घरों में इसी तरह दीये जलते हैं।');
  island.languageSelect.value = 'en-IN';
  island.languageSelect.dispatchEvent(new Event('change'));
  assert.equal(island.audio.transitionText('diwaliToday', 'English'), 'English');
});

test('narration-only islands play a pre-opened dialogue on Begin', () => {
  const { audio, media, opening, sliders, subtitle } = setupPlayback(new Map([
    ['festive.audio', JSON.stringify({ music: .7, language: 'hi-IN' })],
  ]), '');
  assert.equal(sliders.musicVolume, undefined);
  audio.narrateDialogue(opening, 0);
  assert.equal(media.length, 0);
  assert.match(subtitle.textContent, /महिषासुर/);
  audio.start();
  assert.equal(media.length, 1);
  assert.ok(media[0].src.endsWith('/durgaGods-1-hi.mp3'));
});

test('Sarvam generation can request only an edited cue', async () => {
  const selected = new Map([...narrationCues()].filter(([id]) => id === 'dadiIntro-5'));
  const audio = Buffer.from([0xff, 0xfb, 0x90, 0x64]);
  let calls = 0;
  const result = await synthesizeNarration('test-key', async (_url, options) => {
    calls++;
    assert.equal(JSON.parse(String(options?.body)).text, selected.get('dadiIntro-5')?.text);
    return Response.json({ audios: [audio.toString('base64')] });
  }, 'en-IN', selected);
  assert.equal(calls, 1);
  assert.deepEqual([...result], [['dadiIntro-5', audio]]);
});

test('every authored cue ships an audio asset in both languages', () => {
  for (const [source, variable, language, suffix] of [
    ['narration.js', 'festivalNarration', 'en-IN', ''],
    ['narration-hi.js', 'festivalNarrationHindi', 'hi-IN', '-hi'],
  ] as const) {
    const manifestSource = readFileSync(new URL('../audio/' + source, import.meta.url), 'utf8');
    const manifest = runInNewContext(manifestSource + '\n' + variable + ';');
    assert.deepEqual(Object.keys(manifest), [...narrationCues(language).keys()]);
    for (const [id, filename] of Object.entries(manifest)) {
      assert.equal(filename, id + suffix + '.mp3');
      const asset = readFileSync(new URL('../audio/' + filename, import.meta.url));
      assert.ok(asset.length > 1000, String(filename));
    }
  }
});
