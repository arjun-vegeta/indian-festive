// A classic script lets the prototypes still run directly from file URLs.
const createFestivalAudio = (() => {
  const audioRoot = new URL('.', document.currentScript.src);
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

  return function createFestivalAudio(scene) {
    const track = tracks[scene];
    const credit = document.getElementById('musicCredit');
    credit.href = track.link;
    credit.textContent = `${track.title} · ${track.artist} · Apple Music`;

    let music, voice;
    let started = false, paused = false, musicActive = false, quiet = false;
    let volume = .7, playAttempt = 0;
    const canPlay = () => started && !paused && !document.hidden && volume > 0;

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
      const level = volume * .16 * fade * (voice ? .22 : quiet ? .4 : 1);
      if (Math.abs(music.volume - level) > .001) music.volume = level;
    }

    function syncMusic() {
      if (!musicActive) return;
      const attempt = ++playAttempt;
      if (!canPlay()) {
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
      if (!canPlay() || musicActive) return;
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
      musicCue();
    }

    function tick(dialogueOpen) {
      quiet = dialogueOpen;
      if (canPlay()) mix();
    }

    function stopVoice() {
      const previous = voice;
      voice = undefined;
      if (previous) previous.pause();
      mix();
    }

    function narrate(cue) {
      const clip = festivalNarration[cue];
      if (!clip || !canPlay()) return;
      stopVoice();
      const audio = new Audio(new URL(clip, audioRoot).href);
      audio.volume = .8 * volume;
      voice = audio;
      mix();
      audio.addEventListener('ended', () => {
        if (voice === audio) stopVoice();
      }, { once: true });
      audio.play().catch(error => {
        if (voice !== audio) return;
        console.warn(`Festival narration could not play (${cue})`, error);
        stopVoice();
      });
    }

    function pause(on) {
      paused = on;
      if (on) stopVoice();
      syncMusic();
    }

    function setVolume(value) {
      const wasMuted = volume === 0;
      volume = value;
      if (value === 0) stopVoice();
      else if (voice) voice.volume = .8 * value;
      mix();
      if (wasMuted !== (value === 0)) syncMusic();
    }

    function stop() {
      started = false;
      stopMusic();
      stopVoice();
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopVoice();
      syncMusic();
    });
    addEventListener('pagehide', stop);
    return { start, stop, pause, tick, musicCue, narrate, stopVoice, setVolume };
  };
})();
