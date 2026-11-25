// A classic script lets the prototypes still run directly from file URLs.
const createFestivalAudio = (() => {
  const audioRoot = new URL('.', document.currentScript.src);
  const conversations = new Map(Object.entries(festivalDialogue).map(([id, lines]) => [lines, id]));
  const tracks = {
    hub: {
      title: 'Raga Bhoopali (Alap)',
      artist: 'Pandit Shivkumar Sharma & Pt. Hariprasad Chaurasia',
      link: 'https://music.apple.com/us/song/1767775461',
      preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/28/35/a8/2835a8fc-7067-ec3d-d9ca-51e0f3cf6270/mzaf_6313087641607665449.plus.aac.p.m4a',
      seconds: 14,
    },
    dussehra: {
      title: 'Raga Shree (Sarod)',
      artist: 'Ustad Amjad Ali Khan',
      link: 'https://music.apple.com/us/song/1767775246',
      preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/df/f6/16/dff616f8-f734-dff3-e394-8fdc968822ad/mzaf_15991752104293771393.plus.aac.p.m4a',
      seconds: 28,
    },
    diwali: {
      title: 'Raga Bairagi (Santoor)',
      artist: 'Pandit Shivkumar Sharma',
      link: 'https://music.apple.com/us/song/1767776450',
      preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/91/08/7d/91087db7-14e1-166b-dced-bca747a780d4/mzaf_14859714207250454802.plus.aac.p.m4a',
      seconds: 26,
    },
    govardhan: {
      title: 'Raga Bageshri (Flute)',
      artist: 'Pt. Hariprasad Chaurasia',
      link: 'https://music.apple.com/us/song/1767775463',
      preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/19/ce/b9/19ceb999-785c-75ab-cb29-08bb26a93215/mzaf_4761328125110853125.plus.aac.p.m4a',
      seconds: 24,
    },
  };

  const defaults = { voice: .7, music: .7, effects: .7 };
  const storageKey = 'festive.audio';

  function loadLevels() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return Object.fromEntries(Object.entries(defaults).map(([channel, fallback]) => {
        const value = saved?.[channel];
        return [channel, Number.isFinite(value) && value >= 0 && value <= 1 ? value : fallback];
      }));
    } catch (error) {
      console.warn('Festival audio settings could not be read', error);
      return { ...defaults };
    }
  }

  return function createFestivalAudio(scene) {
    const track = tracks[scene];
    const credit = document.getElementById('musicCredit');
    credit.href = track.link;
    credit.textContent = `${track.title} · ${track.artist} · Apple Music`;

    const levels = loadLevels();
    const replay = document.getElementById('replayLine');
    let music, voice, voiceCue, lineCue, updateEffects;
    let started = false, paused = false, musicActive = false;
    let duck = 1, playAttempt = 0;
    const canPlay = channel => started && !paused && !document.hidden && levels[channel] > 0;
    const effectsVolume = () => paused || document.hidden ? 0 : levels.effects;

    function refreshReplay() {
      replay.hidden = !lineCue;
      replay.disabled = !canPlay('voice');
    }

    function replayLine() {
      if (lineCue && canPlay('voice')) narrate(lineCue);
    }

    function bindEffects(onLevel) {
      updateEffects = onLevel;
      updateEffects(effectsVolume());
    }

    function setLevel(channel, value) {
      const wasMuted = levels[channel] === 0;
      levels[channel] = value;
      try {
        localStorage.setItem(storageKey, JSON.stringify(levels));
      } catch (error) {
        console.warn('Festival audio settings could not be saved', error);
      }
      if (channel === 'effects') updateEffects?.(effectsVolume());
      if (channel === 'voice') {
        if (value === 0) stopVoice();
        else if (voice) voice.volume = .8 * value;
        refreshReplay();
      }
      if (channel === 'music') {
        mix();
        if (wasMuted !== (value === 0)) syncMusic();
      }
    }

    for (const [channel, level] of Object.entries(levels)) {
      const input = document.getElementById(channel + 'Volume');
      input.value = level;
      input.addEventListener('input', () => setLevel(channel, input.valueAsNumber));
    }

    replay.addEventListener('click', replayLine);
    replay.addEventListener('keydown', event => {
      if (event.code === 'Enter' || event.code === 'Space') event.stopPropagation();
    });
    document.addEventListener('keydown', event => {
      if (event.code !== 'KeyR' || event.repeat || replay.hidden || replay.disabled) return;
      event.preventDefault();
      replayLine();
    });

    function stopMusic() {
      musicActive = false;
      playAttempt++;
      if (music) music.pause();
    }

    function mix() {
      if (!musicActive) return;
      const duration = Math.min(track.seconds, music.duration || track.seconds);
      const time = music.currentTime;
      if (time >= duration) {
        stopMusic();
        return;
      }
      const fade = Math.min(1, time / 1.6, (duration - time) / 2.4);
      const level = levels.music * .16 * fade * duck;
      if (Math.abs(music.volume - level) > .001) music.volume = level;
    }

    function syncMusic() {
      if (!musicActive) return;
      const attempt = ++playAttempt;
      if (!canPlay('music')) {
        music.pause();
        return;
      }
      mix();
      if (!musicActive) return;
      music.play().catch(error => {
        if (playAttempt !== attempt || !musicActive) return;
        console.warn(`Apple Music preview could not play (${track.title})`, error);
        stopMusic();
      });
    }

    function musicCue() {
      if (!canPlay('music') || musicActive) return;
      if (!music) {
        music = new Audio(track.preview);
        music.addEventListener('ended', stopMusic);
        music.addEventListener('error', () => {
          if (!musicActive) return;
          console.warn(`Apple Music preview could not load (${track.title})`, music.error);
          stopMusic();
        });
      }
      music.currentTime = 0;
      music.volume = 0;
      musicActive = true;
      syncMusic();
    }

    function start() {
      if (started) return;
      started = true;
      refreshReplay();
      musicCue();
    }

    function tick(dialogueOpen, dt) {
      const target = voice ? .22 : dialogueOpen ? .4 : 1;
      const timeConstant = target < duck ? .07 : .38;
      duck += (target - duck) * (1 - Math.exp(-dt / timeConstant));
      if (canPlay('music')) mix();
    }

    function stopVoice() {
      const previous = voice;
      voice = undefined;
      voiceCue = undefined;
      if (previous) previous.pause();
      mix();
    }

    function narrate(cue) {
      const clip = festivalNarration[cue];
      if (!clip || !canPlay('voice')) return;
      stopVoice();
      const audio = new Audio(new URL(clip, audioRoot).href);
      audio.volume = .8 * levels.voice;
      voice = audio;
      voiceCue = cue;
      mix();
      audio.addEventListener('ended', () => {
        if (voice === audio) stopVoice();
      }, { once: true });
      syncVoice();
    }

    function narrateDialogue(lines, index) {
      const conversation = conversations.get(lines);
      const cue = conversation && `${conversation}-${index + 1}`;
      lineCue = cue && festivalNarration[cue] ? cue : undefined;
      refreshReplay();
      if (lineCue) narrate(lineCue);
    }

    function stopDialogue() {
      lineCue = undefined;
      refreshReplay();
      stopVoice();
    }

    function syncVoice() {
      const audio = voice;
      if (!audio) return;
      if (!canPlay('voice')) {
        audio.pause();
        return;
      }
      audio.play().catch(error => {
        if (voice !== audio || !canPlay('voice') || error.name === 'AbortError') return;
        console.warn(`Festival narration could not play (${voiceCue})`, error);
        stopVoice();
      });
    }

    function pause(on) {
      paused = on;
      syncVoice();
      syncMusic();
      updateEffects?.(effectsVolume());
      refreshReplay();
    }

    function stop() {
      started = false;
      stopMusic();
      stopDialogue();
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopVoice();
      syncMusic();
      updateEffects?.(effectsVolume());
      refreshReplay();
    });
    addEventListener('pagehide', stop);
    refreshReplay();
    return { start, stop, pause, tick, musicCue, narrate, narrateDialogue, stopDialogue, bindEffects, effectsVolume };
  };
})();

function createPositionalAmbience(context, input, output) {
  const gain = context.createGain();
  gain.gain.value = 0;
  const panner = context.createStereoPanner();
  input.connect(gain);
  gain.connect(panner);
  panner.connect(output);
  return (sourceX, sourceZ, player, level, radius) => {
    const dx = sourceX - player.pos.x;
    const dz = sourceZ - player.pos.y;
    const distance = Math.hypot(dx, dz);
    const pan = (dx * Math.cos(player.yaw) - dz * Math.sin(player.yaw)) / Math.max(distance, 3);
    const attenuation = Math.max(0, 1 - distance / radius) ** 2;
    const time = context.currentTime;
    panner.pan.setTargetAtTime(pan, time, .15);
    gain.gain.setTargetAtTime(level * attenuation, time, .18);
  };
}
