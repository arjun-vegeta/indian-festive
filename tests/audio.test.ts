import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { synthesizeNarration } from '../scripts/generate-narration.ts';

const cueIds = ['dadiWelcome', 'dussehraToday', 'diwaliToday', 'govardhanClearing'];

test('Sarvam requests four authored MP3 cues using the server-side key', async () => {
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
  assert.deepEqual(received, [
    { ...common, speaker: 'kavya', text: 'There you are, beta. Come, sit with your Dadi a moment.' },
    { ...common, speaker: 'aditya', text: 'The story shifts to today.' },
    { ...common, speaker: 'kavya', text: 'Today, on Diwali night, homes everywhere light lamps the same way.' },
    { ...common, speaker: 'aditya', text: 'The clouds are parting. Indra has seen that no one in Vraj was hurt.' },
  ]);
  assert.deepEqual([...clips], cueIds.map(id => [id, clip]));
});

test('Sarvam generation fails visibly on missing credentials, provider failure, and invalid audio', async () => {
  await assert.rejects(synthesizeNarration(''), /Set SARVAM_API_KEY/);
  await assert.rejects(
    synthesizeNarration('test-key', async () => new Response(null, { status: 429 })),
    /dadiWelcome \(HTTP 429\)/,
  );
  await assert.rejects(
    synthesizeNarration('test-key', async () => Response.json({ audios: ['aW52YWxpZA=='] })),
    /invalid MP3 data for dadiWelcome/,
  );
});

const source = readFileSync(new URL('../audio/playback.js', import.meta.url), 'utf8');
function setupPlayback() {
  const media: FakeAudio[] = [];
  const credit = { href: '', textContent: '' };
  const document = Object.assign(new EventTarget(), {
    hidden: false,
    currentScript: { src: 'file:///festival/audio/playback.js' },
    getElementById: (id: string) => id === 'musicCredit' ? credit : null,
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

  const scope = { document, URL, addEventListener() {}, Audio: FakeAudio, console,
    festivalNarration: { dadiWelcome: 'dadiWelcome.mp3' } };
  const audio = runInNewContext(source + "\ncreateFestivalAudio('hub');", scope);
  return { audio, credit, document, media };
}

test('Apple preview starts with play, quiets during dialogue, and fades out without looping', () => {
  const { audio, credit, media } = setupPlayback();
  audio.tick(false);
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
  audio.tick(false);
  const normalVolume = .7 * .16;
  assert.equal(music.volume, normalVolume);
  audio.tick(true);
  assert.equal(music.volume, normalVolume * .4);
  audio.pause(true);
  assert.equal(music.paused, true);
  audio.pause(false);
  assert.equal(music.paused, false);
  assert.equal(music.currentTime, 3);
  music.currentTime = 13;
  audio.tick(false);
  assert.ok(music.volume < normalVolume / 2);
  music.currentTime = 14;
  audio.tick(false);
  assert.equal(music.paused, true);
  audio.tick(false);
  assert.equal(music.currentTime, 14);
  audio.musicCue();
  assert.equal(media.length, 1);
  assert.equal(music.currentTime, 0);
  assert.equal(music.paused, false);
  audio.stop();
  assert.equal(music.paused, true);
});

test('narration ducks music and releases it on ending, advancing, hiding, and muting', () => {
  const { audio, document, media } = setupPlayback();
  audio.narrate('dadiWelcome');
  assert.equal(media.length, 0);
  audio.start();
  const [music] = media;
  music.currentTime = 3;
  audio.narrate('unknown');
  assert.equal(media.length, 1);
  audio.narrate('dadiWelcome');
  assert.equal(media[1].src, 'file:///festival/audio/dadiWelcome.mp3');
  assert.equal(media[1].volume, .8 * .7);
  const normalVolume = .7 * .16;
  assert.equal(music.volume, normalVolume * .22);
  media[1].dispatchEvent(new Event('ended'));
  assert.equal(music.volume, normalVolume);
  audio.narrate('dadiWelcome');
  audio.stopVoice();
  assert.equal(media[2].paused, true);
  assert.equal(music.volume, normalVolume);
  audio.narrate('dadiWelcome');
  document.hidden = true;
  document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(media[3].paused, true);
  assert.equal(music.paused, true);
  document.hidden = false;
  document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(music.paused, false);
  audio.narrate('dadiWelcome');
  audio.setVolume(.4);
  assert.equal(media[4].volume, .8 * .4);
  audio.setVolume(0);
  assert.equal(media[4].paused, true);
  assert.equal(music.paused, true);
  audio.narrate('dadiWelcome');
  assert.equal(media.length, 5);
  audio.setVolume(.4);
  assert.equal(music.paused, false);
  assert.equal(music.volume, .4 * .16);
});
