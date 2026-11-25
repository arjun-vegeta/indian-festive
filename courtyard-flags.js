// The hub also runs from file://, so this helper is loaded as a classic script.
const courtyardFlags = (() => {
  let client = null;
  let visit = null;
  let appearance = null;

  function identifier() {
    return Array.from(crypto.getRandomValues(new Uint32Array(4)), n => n.toString(16).padStart(8, '0')).join('');
  }

  function playerId() {
    const key = 'festive.garland.player';
    try {
      const saved = localStorage.getItem(key);
      if (saved) return saved;
      const id = identifier();
      localStorage.setItem(key, id);
      return id;
    } catch { return identifier(); }
  }

  async function connect() {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@flagsmith/flagsmith@12.5.0/index.js';
      script.integrity = 'sha384-MqtZafl7JG1sX3PWTMcsks/3Mhp9QDc8TuZRyU0/fsk6YGj542Y7Fb49eFYZ7NYT';
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
    const sdk = window.flagsmith;
    await sdk.init({
      environmentID: document.querySelector('meta[name="flagsmith-environment"]').content,
      identity: playerId(),
      enableEvents: true,
    });
    return sdk;
  }

  async function prepare() {
    // A slow request must never change the treatment after the courtyard opens.
    try {
      client = await Promise.race([connect(), new Promise(resolve => setTimeout(resolve, 2500, null))]);
    } catch { client = null; }
  }

  function record(event) {
    client.trackEvent(event, { metadata: { variant: appearance.garland, visit_id: visit.id,
      home_festival_canopy: appearance.canopy, home_rangoli_path: appearance.rangoli } });
    void client.flushEvents().catch(() => {});
  }

  function enter() {
    if (appearance) return appearance;
    const garland = client?.getExperimentFlag('home_garland_cue');
    const validGarland = garland?.enabled && ['quiet', 'glow'].includes(garland.value);
    appearance = {
      garland: validGarland ? garland.value : 'quiet',
      canopy: client?.hasFeature('home_festival_canopy') ?? false,
      rangoli: client?.hasFeature('home_rangoli_path') ?? false,
    };
    if (validGarland) {
      visit = { id: identifier(), chose: false };
      record('home_viewed');
    }
    return appearance;
  }

  function choose(event) {
    if (!visit || visit.chose) return;
    visit.chose = true;
    record(event);
  }

  return { prepare, enter, choose };
})();
