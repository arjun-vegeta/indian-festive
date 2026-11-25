# Festive Islands: build plan

A first-person game that teaches Indian festivals through play. You are a boy walking across floating islands drawn on paper. **Each island is one story behind a festival.** A festival can have several stories, each on its own island. When the boy steps onto an island, he becomes the hero of that story (Rama, Krishna and so on) and plays it. The story ends by shifting into how people celebrate it today and why. Then he walks on to the next island. There are no separate modes: he simply keeps moving from story to story.

Everything uses the existing hand-inked look. Read `DESIGN.md`, then `govardhan-fpv/index.html` and `govardhan-fpv/NOTES.md`. The Govardhan game is already one island and is the working reference for the engine, the HUD, dialogue, hints, sound, the why-card and self-test. **Copy its code as your starting point.** Do not invent a new renderer.

## Islands (stories) in journey order

| # | Festival | Story | You are | File | Status |
|---|---|---|---|---|---|
| 1 | Dussehra | Rama and Ravana: build the setu, cross to Lanka, Ravana falls, meet Sita, then the Ravana Dahan | Rama | `dussehra-rama/index.html` | build now |
| 2 | Diwali | Rama comes home: the walk to Ayodhya on the moonless night as the city lights lamps | Rama | `diwali-ayodhya/index.html` | build now |
| 3 | Govardhan Puja (the day after Diwali) | Krishna lifts Govardhan | Krishna | `govardhan-fpv/index.html` | done; hook up only |
| – | Dussehra | Durga and Mahishasura (Durga Puja, Bengal) | – | – | sketch island |
| – | Diwali | Krishna, Satyabhama and Narakasura (Naraka Chaturdashi, the south) | – | – | sketch island |
| – | other festivals | Holi (Prahlad and Holika), Onam (Mahabali), Pongal, Ganesh Chaturthi | – | – | sketch islands |

The order follows the calendar and the story: Rama wins at Lanka (Dussehra), walks home to Ayodhya (Diwali), and the next day Krishna lifts the hill (Govardhan Puja). Sketch islands are uncoloured ink drawings signed "still being drawn": you can see them but not enter them. They show that festivals have more than one story and that more islands are coming.

## Files and owners

| File | Owner |
|---|---|
| `index.html` (repo root): the hub of floating islands; and small additions to `govardhan-fpv/index.html`, gated on `from=hub` | hub agent |
| `dussehra-rama/index.html` + `dussehra-rama/NOTES.md` | Dussehra agent |
| `diwali-ayodhya/index.html` + `diwali-ayodhya/NOTES.md` | Diwali agent |
| `README.md`, `DESIGN.md`, `PLAN.md` | lead only. Agents put palette additions in their own NOTES file. |

Each island is one self-contained HTML file, as Govardhan is: three.js 0.160.0 from jsDelivr through an import map, Baloo 2 from Google Fonts, no build step, and it opens from `file://` in Chrome. Don't import local JS modules, because Chrome blocks them on `file://`.

## URL contract
- Hub to island: `dussehra-rama/index.html#from=hub`, `diwali-ayodhya/index.html#from=hub`, `govardhan-fpv/index.html#from=hub`.
- Island to hub: the end card's **"Back to the islands"** button goes to `../index.html#done=<id>`. The ids are `dussehra-rama`, `diwali-ayodhya` and `govardhan`. Show the button always (not only with `from=hub`) on the new islands. On Govardhan, show it only with `from=hub`.
- Every island also works opened directly with no hash, starting from its beginning. Keep per-beat hash states and `#selftest`, as Govardhan has them. `from=` can sit alongside other hash parts (`#from=hub&yaw=1.2`): parse it the way Govardhan parses `&` parts.
- **Page transition (same everywhere):** on leaving, fade a full-screen paper layer (`#f4efe3` with grain) in over 600 ms, show a one-line title in Baloo 2 800, then set `location.href`. On arriving, start under that paper layer and fade it out over 600 ms after the first frame draws. Islands open with a title card in Govardhan's style naming the festival, the story and who you become, for example "Dussehra · Rama and Ravana · You are Rama".
- Only the hub stores progress: localStorage key `festive.done`, a JSON array of ids, updated from `#done=`.

## Hands
- **The boy** (hub only): eye height 1.15 m. Hands in skin `SK1` (`#e1a87b / #c48a5e / #6d4429`), a short white kurta cuff (`WHITE`), and a thin red-and-gold kalava thread on the right wrist (a TOMATO torus plus a thin GOLD torus). Build them from Govardhan's first-person hand code (the section "Krishna's own hands and flute").
- **Rama** (both new islands): eye height 1.6 m. Hands in Krishna blue (`KBLUE`), gold bangles, and a bow (dhanush) in the left hand, with a quiver tip at the right shoulder when you look down. You never see Rama's face. Both Rama islands must build the same hands to the same spec.
- **Krishna** stays as he is in the Govardhan game.

## Shared look additions

DESIGN.md still rules. These additions keep the new scenes in the same family:
- **Floating islands:** each story's own world sits on a floating island too. Past its edge you see paper sky and drifting flat paper clouds below, not an endless plain. Use the same island anatomy as the hub (below), scaled up to fit the story.
- **Night** uses indigo paper (sky `#363a57`, ambient as in Govardhan's `G.night`). Dusk runs from paper to warm grey to indigo.
- **Lamps (diyas):** CLAY bowls. Flames are small emissive lathe shapes (`uEmis = 1`, as Govardhan's lamp flames are) in `#ffc83d` with a `#fff3c2` core, inked, flickering by scale. Under each lamp, a **flat warm light pool** on the ground: a soft disc in `#f6d27a`, drawn flat like the blue shadows. Lighting a row cascades one by one, about 60 ms apart, with a soft bell or tick.
- **Fire:** layered flat flame shapes in GOLD, MUSTARD and TOMATO tones, ink-outlined, flickering. Smoke is CLOUD-palette balls rising and fading toward paper. Sparks are tiny ink-outlined gold balls. No glowing gradients. Fireworks, if any, are flat ink-outlined star bursts, few and brief.
- **New colours** are always l/m/d triples (saffron, marigold, rangoli colours and so on). List them in your NOTES.
- **No images, sprites, billboards or textures.** Every shape is a mesh built in code. Written words (राम on stones, signs) are ink geometry or HTML labels in the HUD layer.

## Hub: `index.html` (the floating islands)
- Paper sky. Islands float at different heights and distances, and each bobs gently, about ±0.3 m on its own phase. Flat paper clouds (light `CLOUD` / `WHITE`) drift below and between them. Far islands fade toward paper with distance: add simple distance fog to the toon colour and ease the ink toward paper too.
- **Island anatomy:** a flat top with a wobbly rim, like the hill jitter; a thick EARTH band, like the mockup's board edge; underneath, an upside-down rocky root mass, faceted and flat-shaded in ROCK and EARTH, with hanging roots and vines (thin ink rods with small LEAF balls) and a few small rocks floating below.
- **Home island** (spawn): the boy's aangan: a mud hut with thatch, a tulsi chaura, a neem tree and a charpai with **Dadi**, a faceless figurine in a white sari. She gives the intro in short lines: every island is a story behind a festival; when you step on one, you become the hero of that story; start with Rama at Lanka for Dussehra; then he walks home for Diwali, about twenty days later; and the very next day Krishna lifts the hill. She suggests that order, but every island is open.
- **Story islands**, each a small preview of its world, with a festival sign: Dussehra · Rama and Ravana (a shore, a few floating setu stones and a tall ten-headed figure in the distance); Diwali · Rama comes home (a lane and gateway lined with lit diyas and warm light pools); Govardhan Puja · Krishna lifts the hill (the hill, huts and cows, like the colorfigures mockup). Group islands of the same festival near each other, with the sketch islands of that festival's other stories close by.
- **Stepping stones** join the islands in journey order: home, Dussehra, Diwali, Govardhan, with a branch from home to the sketch islands. They are floating flat rock discs with grass ticks, they bob slightly, and you walk across them. You can't fall: movement is clamped to walkable surfaces and slides along edges. The path to the next suggested island gets the gold target glow from Govardhan's post pass.
- **Gates:** each story island has a torana arch with a paper sign: the festival in English and Hindi (दशहरा, दीवाली, गोवर्धन पूजा), the story's name, and who you become. Walking in shows "E: Become Rama"; then comes the transition, then the island page.
- **Sketch islands:** smaller and uncoloured (paper fills, ink lines only), signed with the festival, the story and "still being drawn". You can't enter them.
- **Returning** with `#done=X`: spawn at that island's gate, facing the next island on the path. Mark it done with a marigold garland on its torana and a gold tick on its sign. Dadi has a new line about it, and the glow moves to the next island.
- Hash states: `#home`, `#overview` (a high, slow orbit of all islands for demos), `#gate=dussehra-rama`, `#gate=diwali-ayodhya`, `#gate=govardhan`, `#done=dussehra-rama`, `#selftest`.
- **Govardhan hookup**, gated on `from=hub` so the standalone game doesn't change: the arriving fade, and a "Back to the islands" button on the end card linking to `../index.html#done=govardhan`. Don't change anything else in that file, and re-run its `#selftest` afterwards.

## Island 1: `dussehra-rama/index.html` (Dussehra · Rama and Ravana · you are Rama)
1. **The shore:** you stand at the edge of a floating island. Across a wide gap of sea and sky floats Lanka, another island. With you are Lakshmana, Hanuman, Sugriva, Vibhishana and the vanar sena (faceless figurines with tails). Nala, the builder, explains that stones with Rama's name float.
2. **Build the setu:** pick up a stone (E), and राम appears on it in ink. Drop it at the end of the bridge, where it floats and the path grows. The vanar sena carry stones too. A **squirrel** carries tiny pebbles; stroke it (E) and three stripes appear on its back, as in the folk tale. Counter: "Stones of the setu N of 10".
3. **Cross** the floating bridge to Lanka.
4. **Ravana:** a giant ten-headed faceless figurine with crowns. Hold the mouse or Space to draw the bow and keep the gold dot inside the ring against shakes, reusing Govardhan's balance mechanic. Then release: one arrow. Ravana topples backwards in a ring of dust, and the crowns go dark. No blood, no gore, no cruelty.
5. **Sita:** walk to the Ashok Vatika (ashoka trees) and meet Sita, who says a gentle line, with Hanuman.
6. **The story shifts to today:** dusk falls on the island. Where Ravana fell, people of today raise tall bamboo-and-paper effigies of Ravana, Kumbhakarna and Meghnad at a Ramlila maidan. You shoot one lit arrow at Ravana's effigy, and it burns with flat paper flames, smoke and sparks. Two or three people exchange shami (apta) leaves with you ("we call it sona, gold"). Then a **"Why we celebrate Dussehra"** card in the style of Govardhan's why-card: Vijaya Dashami, the tenth day after the nine nights of Navaratri; Rama's victory over Ravana (Ramlila and Ravana Dahan in the north); Durga's victory over Mahishasura (Durga Puja in Bengal and the east, another story, another island); Ayudha Puja in the south; Mysuru Dasara; shami leaves; good over evil. Hindi word chips: दशहरा, विजयादशमी, रामलीला, शमी. Buttons: "Back to the islands" and "Play again".

## Island 2: `diwali-ayodhya/index.html` (Diwali · Rama comes home · you are Rama)
1. **The Pushpaka Vimana** (a small flying chariot, itself a floating platform) sets down at dusk outside Ayodhya after fourteen years away. With you are Sita, Lakshmana and Hanuman. It's Amavasya, the moonless night, and the road ahead is dark.
2. **Bharata** waits at Nandigram with your padukas (wooden sandals), which he kept on the throne all those years. Talk to him (E); he places them before you and you wear them home.
3. **Walk home:** as you walk the road, the people of Ayodhya come out and light lamps ahead of you, row after row cascading along the road and onto rooftops. Villagers greet you in short lines. Objective: "Walk home to Ayodhya". The more you walk, the more the city lights up.
4. **The mothers:** at the palace steps, meet Kaushalya, Kaikeyi and Sumitra, one gentle line each. Kaikeyi's line is graceful and makes peace.
5. **Ayodhya lit:** a slow wide view of the whole city lit with lamps under the moonless sky.
6. **The story shifts to today:** the lane fills with families of today. A girl finishing a rangoli at a doorstep lets you fill the last petals (pick a coloured powder, fill 3 or 4 regions, any colours). You light a row of diyas along a wall with one flame and it cascades. A family does a small Lakshmi puja (a bell, a lamp, a flower; never scored or timed). A neighbour shares mithai. Then a **"Why we celebrate Diwali"** card: Deepavali means "a row of lamps"; Rama's return to Ayodhya (north); Krishna and Satyabhama's victory over Narakasura (Naraka Chaturdashi, the south, another story, another island); Lakshmi Puja on Amavasya; Kali Puja (Bengal); Bandi Chhor Divas (Sikhs); Mahavira's nirvana (Jains); the five days (Dhanteras, Naraka Chaturdashi, Lakshmi Puja, Govardhan Puja, Bhai Dooj), adding "Tomorrow is Govardhan Puja: Krishna's island is next!". Hindi word chips: दीपावली, दीया, रंगोली, लक्ष्मी पूजा. Buttons: "Back to the islands" and "Play again".

## Content care (all pages)
- Gods and people are faceless figurines, as in Govardhan. Rama, Sita, Krishna and Hanuman are drawn simply and respectfully. You never see the player-hero's face, only hands.
- No gore and no cruelty. The fall of Ravana is a topple and dust. Worship (puja, offerings) is **never scored, timed or failed**. Counters only count practical things: stones, lamps, leaves.
- Crowd cheers: use the traditional Ramlila call "Siyavar Ramchandra ki jai", not modern slogans.
- Keep sentences short and plain, for kids and elders. One idea per line.
- Every mythology or ritual fact you state goes in your NOTES under **"Facts for a practising family to check"**, with your honest confidence. The ones I know need checking: the squirrel's stripes is a folk tale; the "twenty days from Dussehra to Diwali" link is popular, not textual; the stones with Rama's name that float and the role of Nala and Nila; Bharata at Nandigram with the padukas; regional customs (shami or apta leaves, Ayudha Puja, Mysuru Dasara).
- Credit line, as Govardhan has it: the look is inspired by Colorfigures by April Zhu (MIT). Copy no Colorfigures code.

## Done means
- The page runs from `file://` in Chrome with no console errors. Every beat is reachable by its hash state. `#selftest` plays it end to end with the same functions the controls use and prints PASS.
- Verify with headless Chrome screenshots of each beat (`--use-angle=swiftshader --enable-unsafe-swiftshader`, 1280×800, `--virtual-time-budget`). **Look at them** and fix what reads badly, such as shadows that look like water, walls of flat triangles, or a giant arm filling the screen. Save shots to the session scratchpad, not the repo.
- No git commits or pushes. Don't edit files you don't own.

---

# Round 2: Holi, Ganesh Chaturthi and Durga Puja (added 2026-11-25)

Three sketch islands become real story islands. They use the same contract as above: one self-contained file, Govardhan's engine copied as the base, the paper transitions, `#from=hub`, "Back to the islands" going to `../index.html#done=<id>`, per-beat hash states, `#selftest`, a NOTES file with "Facts for a practising family to check", the content-care rules, and no commits.

| Festival | Story | You are | id / folder | Owner |
|---|---|---|---|---|
| Holi | Prahlad and Holika | Prahlad | `holi-prahlad/` | Holi agent |
| Ganesh Chaturthi | Ganesha's race round the world | Ganesha | `ganesh-race/` | Ganesh agent |
| Durga Puja | Durga and Mahishasura | Durga | `durga-mahishasura/` | Durga agent |
| – | hub: turn these three sketch islands into story islands | the boy | `index.html` | hub agent |

**Lessons from round 1, which apply to every new island:**
- What you hold must never cover the middle of the screen. The bow on the Rama islands did; keep held things low and to the sides.
- Speech bubbles must never stack on top of each other. Queue them, or offset each new one.
- Fire must read as fire: soft-tipped tongue shapes that lick upward and flicker, not rows of spikes.

## Holi · Prahlad and Holika · you are Prahlad (`holi-prahlad/index.html`)
Hands: a boy at eye height 1.15 m. Skin `SK2`, MUSTARD (yellow) cuffs, and a bracelet of small green tulsi beads. Hands come together in namaste when he prays.
1. **The palace:** King Hiranyakashipu (a faceless crowned figurine, stern but not frightening) orders everyone to worship only him. Courtiers bow. You, Prahlad, keep saying Vishnu's name: hold F to pray, and ink rings of calm spread out from you as Krishna's flute rings do. The king is angry.
2. **Holika:** his sister Holika has a shawl that fire cannot burn. She sits with you on a pyre of wood. Fire rises around you. Hold to stay calm, keeping the gold dot in the ring as the fire gusts, using Govardhan's balance mechanic. The shawl lifts off Holika on the wind and wraps round you. When the fire dies down you walk out unharmed. Holika is simply gone: **never show anyone burning.**
3. **(Optional, one line only):** Vishnu later came as Narasimha to protect Prahlad. Never show the fight.
4. **The story shifts to today, at night:** the village builds the Holika Dahan bonfire. Walk round it once, and offer new wheat or chana stalks into the fire. People roast the grain. Use the soft flame look.
5. **The next morning, Holi:** the paper turns bright. Pick colours (gulal) from bowls and throw them (click) at villagers and friends. Flat colour patches stay on the figurines and on the ground, and they throw colours back at you, splashing the screen edges. Add a pichkari water squirt, gujiya sweets and the call "Bura na mano, Holi hai!". Nothing is scored.
6. **"Why we celebrate Holi"** card: good over evil, and Prahlad's faith; Holika Dahan the night before; spring and the new harvest; Radha and Krishna's colour play in Braj (Lathmar Holi in Barsana); forgiving and starting fresh. Hindi word chips: होली, होलिका दहन, गुलाल, प्रह्लाद.

## Ganesh Chaturthi · Ganesha's race round the world · you are Ganesha (`ganesh-race/index.html`)
Hands: eye height 1.4 m. Skin is a new warm sindoor-orange triple; pick and list it. Gold armlets and a modak in the right hand. **Your trunk is visible at the bottom middle of the view**, swaying gently as you walk and lifting when you're happy. Keep it small enough that it never blocks the view. Mushak, the mouse, trots beside you.
1. **Kailash:** a snowy floating island. Shiva and Parvati sit together, faceless. Narada arrives with one special fruit (a mango) that can't be shared. Whoever goes round the whole world three times first wins it. Your brother Kartikeya leaps onto his peacock and flies off. You can watch him circling far away round the other floating islands for the whole beat.
2. **Try the race:** you set off with Mushak, but the edge of Kailash is far and Mushak is small. A gentle puzzle with escalating hints, from "What is the whole world to you?" to "Your parents are your world" to the exact key. Walk three full rounds (pradakshina) round Shiva and Parvati, with the counter "Rounds N of 3".
3. **The fruit:** Parvati gives you the mango. Kartikeya lands, surprised, then smiles: "You are wise, brother." Keep it warm; no sulking.
4. **The story shifts to today:** a street mandal. **Shape your own clay Ganesha** at the potter's (base, belly, head, ears, trunk, each by hold-to-shape, building up the figure). Fold modaks (hold to pleat). Join a small aarti (a bell and a lamp; never scored). Then the procession with dhol-tasha drums and the call "Ganpati Bappa Morya!". Finish with visarjan: carry your clay Ganesha into the water and watch it gently dissolve (eco-friendly clay).
5. **"Why we celebrate Ganesh Chaturthi"** card: Ganesha removes obstacles and blesses new beginnings; Parvati shaped him (one gentle line, **no beheading**); ten days ending on Anant Chaturdashi; the public festivals Tilak started; clay idols that are kind to rivers. Hindi word chips: गणेश चतुर्थी, मोदक, गणपति बाप्पा मोरया, विसर्जन.

## Durga Puja · Durga and Mahishasura · you are Durga (`durga-mahishasura/index.html`)
Hands: eye height 1.7 m, or 2.5 m riding the lion. **Ten arms** in first person, fanned on both sides of the view: a warm golden skin triple (pick and list it), red-bordered white sari cuffs (TOMATO on WHITE), white-and-red shakha-pola bangles and gold armlets. Arms fill in as gifts arrive, and must stay out of the middle of the view.
1. **The gods in trouble:** Mahishasura, a buffalo demon, has a boon that no man or god can defeat him, and he has taken heaven. The gods (faceless figurines in a circle) send out their light. Beams in their colours meet in the middle, and you open your eyes as Durga.
2. **The gifts:** each god steps up and gives one gift (E), which appears in one of your hands: Shiva's trishul, Vishnu's chakra, Varuna's conch, Agni's spear, Vayu's bow, Indra's vajra and bell, Yama's staff, Brahma's water pot, and a sword and shield. Counter "Gifts N of 10" (a practical counter, not worship). Then Himavan gives you the **lion**: mount it (E), and you move faster and see from higher up.
3. **Mahishasura:** a huge buffalo-headed faceless figure who shifts shape (buffalo, then lion, then elephant, then a man) each time you face him. For each form, hold to steady and release the trishul using Govardhan's balance mechanic, in a few short rounds. At the end he topples in dust. No blood, and **no beheading**.
4. **The gods rejoice:** flowers rain down.
5. **The story shifts to today, a Kolkata Durga Puja pandal:** a bamboo-and-cloth pandal with the pratima of Durga and her children (Lakshmi, Saraswati, Ganesha, Kartikeya), all faceless and respectful. Then:
   - Play the **dhak** drum in rhythm with the drummers (tap along; nothing is scored).
   - Join the **dhunuchi** dance, swaying a clay incense burner as smoke curls up.
   - Offer pushpanjali flowers (never scored).
   - On Vijaya Dashami, see sindoor khela from a respectful distance.
   - Join the immersion: carry the pratima to the river with everyone calling "Asche bochor abar hobe!" (it will come again next year).
6. **"Why we celebrate Durga Puja"** card: Durga's victory over Mahishasura; the nine nights of Navaratri, ending on Vijaya Dashami, the same day as Dussehra (Rama's island is right next door); in Bengal, Durga coming home to her parents with her children; garba and dandiya in Gujarat; golu dolls in the south. Word chips: দুর্গা পূজা (Bengali) and दुर्गा पूजा, नवरात्रि, ঢাক (dhak), সিঁদুর খেলা (sindoor khela). Check the Bengali spellings.

## Hub changes (`index.html`)
- Turn the Holi, Ganesh Chaturthi and Durga Puja sketch islands into coloured story islands: a preview of each world, a torana gate, a sign (festival in English and Hindi, story, "You are Prahlad / Ganesha / Durga") and "E: Become …". Link them to `holi-prahlad/index.html#from=hub`, `ganesh-race/index.html#from=hub` and `durga-mahishasura/index.html#from=hub`, and accept `#done=holi-prahlad`, `#done=ganesh-race` and `#done=durga-mahishasura`.
- Previews:
  - Holi: a bonfire stack and colour splashes on the grass.
  - Ganesh Chaturthi: a snowy Kailash peak, with a tiny peacock circling the island.
  - Durga Puja: a pandal and a lion. Keep Durga Puja next to Dussehra, since they fall on the same days.
- The suggested journey follows the year: Holi, Ganesh Chaturthi, Durga Puja, Dussehra, Diwali, Govardhan. Re-lay the stepping-stone paths so the glowing path follows that order, and update Dadi's intro and her done lines to match. Change the stat to "Stories walked N of 6".
- Onam, Pongal and Narakasura stay as sketch islands.
- Keep the Space jump and everything else as they are. Update `hub-NOTES.md` and the hub `#selftest`, which must still pass.
