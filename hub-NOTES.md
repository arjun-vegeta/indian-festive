# Festive Islands: the hub (`index.html`)

Open `index.html` in Chrome. Keep `courtyard-flags.js` beside it. three.js 0.160.0 loads from jsDelivr through an
import map and Baloo 2 from Google Fonts, so the page needs the network. It runs from `file://`.

You are a boy (eye height 1.15 m) standing in his aangan on a floating island. Dadi sits on her charpai and tells you
that every island is a story behind a festival. You walk the stepping stones from island to island and step through a
torana to become the hero of that story.

The engine is copied from `govardhan-fpv/index.html`: the toon shader, the id and depth ink pass, the wobble and
grain post pass, flat blue shadows, figurines, cows, huts, trees, diyas, first-person hands, HUD, dialogue, hints,
cue arrow, glow targets, audio, input, pause menu, hash states and self-test. What is new is listed below.

## Mechanics

### Home courtyard flags

| Flagsmith switch | Visible when enabled |
|---|---|
| `home_festival_canopy` | A striped cloth canopy with a scalloped hem hangs above Dadi's charpai. |
| `home_rangoli_path` | Three floral rangoli patterns lead from the home spawn to Dadi. |

Both are independent boolean flags. Reload and enter the courtyard to see the current settings, or open `index.html#home` to start there directly.

The enabled Flagsmith string flag `home_garland_cue` controls the stool beside Dadi. The value `quiet` leaves the garland at rest. The value `glow` adds a warm pool of light and drifting petals. A player can approach the stool and press E to hang the garland on the charpai, or go straight to Dadi. Reload the hub after changing the flag.

The hub uses the public client-side environment key in its `flagsmith-environment` meta tag. If the flag is unavailable, disabled, or invalid, the player sees the quiet garland and the visit is excluded from the experiment.

Entering the courtyard with a valid garland flag sends `home_viewed` to Flagsmith. The first interaction with the garland or Dadi sends `garland_picked_up` or `dadi_spoken_to` respectively. Events carry the visit ID, garland variant and both decoration switches as displayed. A random browser ID in local storage lets Flagsmith associate exposures with conversions across visits.

For cross-player reporting, enable the Flagsmith warehouse under Environment Settings → Warehouse. To compare pickup rates, configure an experiment with control value `quiet`, a keyed `glow` variation and an occurrence metric for `garland_picked_up`. [Flagsmith warehouse setup](https://docs.flagsmith.com/experimentation/connect-a-warehouse) · [Running an experiment](https://docs.flagsmith.com/experimentation/run-an-experiment)

### Hub mechanics

| Thing | How it works |
|---|---|
| Islands | Each island has a flat top with a wobbly rim, a thick EARTH band and a closed underside. Below that is an upside-down, faceted root mass (ROCK, then EARTH), ink roots, ink vines with LEAF balls, and 2 to 4 small rocks floating beneath. Each island bobs ±0.3 m on its own phase, and its rocks bob separately. Its flat shadows have their own material, which follows that island's top and is clipped to its rim. |
| Root-mass light | Nothing lights a belly from above, so root masses use a second low side light that turns with you (the same trick as the lifted hill's belly in Govardhan). They still show three tones. |
| Distance fog | The toon shader mixes toward paper by distance (30 to 230 m when walking, 120 to 420 m in the overview). The post pass eases ink toward paper by the depth of the nearest part on the line, so far islands fade as a whole. |
| Sketch islands | Built with a `SKETCHING` flag: every fill becomes the SKETCH paper triple, every ink-filled part becomes pencil brown, and their part ids start at 20000. The post pass then draws their lines in pencil brown (`#6b5d4e`) instead of ink. They have no blue shadows. Each one has a coloured pencil lying on it. |
| Stepping stones | A gentle bezier from rim to rim, with a stone about every 2.85 m (radius 1.12 to 1.36 m). Each stone is a rock disc with ink grass ticks, an EARTH band and a small root cone, and it bobs ±0.07 to 0.11 m. Heights ease from one island's height to the next. |
| Never fall | You can walk on island tops (rim minus 0.65 m), stone discs, and 0.55 m half-width capsules between consecutive stones, which carry you across the small gaps. A move into the sky is projected back onto the nearest walkable boundary, so you slide along the edge. If the projection would jump further than the step, you stay put. Props (huts, trees, pillars, the charpai, the hill) push you out as circles. Ground height comes from the island top, the stone top, or a smoothstep ramp across a gap, and the camera eases toward it. |
| Gates | Each story island has a torana at its landing: red pillars with gold bands, a lintel, an arched beam, a mango-leaf toran and a paper board. Walk within 2.9 m of it, or within 4.6 m while facing it, and you see "E: Become Rama" (or "Play again as Rama" once done). E plays a chime and runs the leaving fade, then goes to `<island>/index.html#from=hub`. |
| Page transition | `#fade` is a sheet of `#f4efe3` with feTurbulence grain. Leaving: a 600 ms fade in, a one-line title in Baloo 2 800 ("Dussehra · Rama and Ravana · You are Rama"), then `location.href`. Arriving: the page starts under the sheet and lifts it 600 ms after the first frame draws. |
| Progress | localStorage `festive.done`, a JSON array of ids. `#done=<id>` adds the id. Done gates get a marigold garland and a gold tick on their sign. The target island's sign is highlighted. "Stories walked N of 6" shows top right. Pause, then "Forget my progress", clears it. |
| Glow | Dadi glows until you have heard her intro. After that, the stones from where you are to the target island glow, and so does its torana. The target is the island Dadi's album sent you to, or else the next one in the year. The glow takes the shorter way round the ring, counted in stones. When all six are done, nothing glows. |
| Dadi | Intro (10 lines): islands are stories behind festivals, you become the hero, the stones go round the year: Holi in spring, Ganesh Chaturthi in the rains, Durga Puja ending on Dussehra day (so they sit side by side), Diwali about twenty days later, Govardhan Puja the next day. Every island is open. Then she opens her photo album. On a return she calls a line from the screen edge; E on her gives one line about the story you walked, then opens the album at the next festival. |
| Dadi's album | Dadi holds a red cloth album (TOMATO cover, GOLD corners and emblem, WHITE page edges) on her lap. The overlay is the lead's `album/album-ui.js` (`window.FestiveAlbum`), loaded as a classic script after `album/album.js`. The hub calls `FestiveAlbum.open({ start, done, onGo, onClose })`. `onGo(id)` does the paper fade, stands you at that torana facing in, and makes it the target. `onClose` re-grabs the pointer. While it is open the hub takes no walking, looking or E, and losing pointer lock does not pause. |
| Sprint | Hold Shift while moving: 1.7x walk speed (7.5 m/s), a faster head-bob, and the view eases from 72 to 76 degrees and back. Clamping and sliding still apply, and every stone still tocks. |
| Signs | HTML paper pills anchored to 3D points. Story signs sit on the torana board. Within 30 m a sign shows three lines (Hindi · English festival, story, "You are X"). Further out it shows the festival line only. Sketch signs use a dashed border and show only within 42 m in first person. Signs never overlap: the nearest is placed first, and a farther sign that would cover it moves up above it, or hides. |
| Sketch prompt | Face a sketch island within 36 m and a dashed pill with a pencil says "Holi · Prahlad and Holika: still being drawn". |

### Layout (x, z, top height)

The islands sit on a ring that goes round the year and back home, so there is no dead end:
home (0, 0, 0) → Holi (38, -18, 1.4) → Ganesh Chaturthi (50, -64, 4.6) → Durga Puja (22, -100, 2.6) → Dussehra
(-16, -100, 2.2) → Diwali (-50, -66, -1.2) → Govardhan (-42, -20, 1.4) → home, with 6, 8, 8, 5, 8, 7 and 8 stones.
Durga Puja and Dussehra are 38 m apart, the closest pair. Each sketch floats just outside the ring beside its season's
story island: Pongal (January) before Holi, Onam (August or September) beside Ganesh Chaturthi, Naraka Chaturdashi
beside Diwali. Lanka floats 66 m beyond Dussehra's shore. Nine far islands and 34 paper clouds give depth.

### Story island previews

- **Holi · Prahlad and Holika:** the Holika Dahan stack (logs leaning round a stake) with soft flame tongues at its
  foot, a brass thali with five bowls of gulal, colour splashed across the grass, and two villagers covered in colour.
- **Ganesh Chaturthi · Ganesha's race round the world:** snowy Kailash, a faceted grey peak with a snow cap and two
  foothills, snow patches, Mushak the mouse, modaks on a banana leaf, and one mango. A small peacock (Kartikeya's)
  circles the island.
- **Durga Puja · Durga and Mahishasura:** a bamboo-and-cloth pandal with a decorated arched facade and the gold
  chalchitra arch inside, a kalash, the lion in front, a dhaki with his dhak and its white plume, and kash flowers.

- **Dussehra · Rama and Ravana:** a sand shore with a teal water edge and a waterfall spilling off the island, two
  palms, two vanar figurines with tails, six floating setu stones heading out toward Lanka, and on Lanka the tall
  ten-headed, crowned, faceless Ravana with golden towers.
- **Diwali · Rama comes home:** a mud lane through the torana, lined with lit diyas and their flat warm light pools
  (`#f6d27a` with a paler `#f8e3ab` ring). Houses carry lamps on their roofs. There is a small rangoli, and the lane
  ends at Ayodhya's gateway with gold domes and lamps on its lintel.
- **Govardhan Puja · Krishna lifts the hill:** the hill (the mockup's `PROF` profile, scaled down) with trees and a
  marigold garland round its foot, two huts, three cows, a gopa and a gopi, as in the colorfigures diorama.

## Hash states

| Hash | What you see |
|---|---|
| (none) | Title card, then home facing Dadi |
| `#home` | Home facing Dadi, no title card |
| `#overview` | A high, slow orbit of all islands for demos. HUD and hands are hidden. `&oa=<radians>` sets the start angle (default 1.6). |
| `#gate=<id>` for `holi-prahlad`, `ganesh-race`, `durga-mahishasura`, `dussehra-rama`, `diwali-ayodhya`, `govardhan` | Standing about 4.3 m in front of that torana, with the sign and "E: Become ..." showing |
| `#album` or `#album=<id>`, optionally `&tell=N` | Home after the intro, with Dadi's album open at that festival; `tell` presses "I want to know about this" and steps N lines |
| `#done=dussehra-rama` (any id) | Back from that story: marked done, at its gate facing the next suggested island, Dadi's line on the screen edge, the glow moved on |
| `#selftest` | Plays the whole hub, then prints PASS or FAIL on the page and to the console. It saves and restores your `festive.done`. |

Any state takes `&yaw=`, `&pitch=` and `&wob=`. `from=` is ignored when the hub picks a state.

`#selftest` runs 121 checks with the same functions the controls use, and the album's own test hooks. It checks the
eye height, the jump, that a 1 s sprint covers 7.5 m against a 4.4 m walk with the view widening to 76 degrees, the
wobble default of 1.8, the hands, six gates with Hindi signs and exact URLs, three sketch islands, every path walkable,
and Durga Puja beside Dussehra. It talks to Dadi through the intro, checks her album opens at Holi, that nothing moves
while it is open, that a tab and next/prev change the page, that "I want to know about this" then advancing reaches the
end, and that "Go to the island" lands you at the Ganesh Chaturthi gate facing in, as the target. It then walks the
whole ring in the year's order (sprinting one leg, with a tock on every stone), and at each gate checks the prompt, the
link, the `#done` return, the garland, tick, Dadi's call, the stat, the glow and the spawn facing the next island. It
walks the stones from Govardhan home, checks Dadi's lines after all six and after an out-of-order `done=diwali` (the
glow goes the short way round), all six `#gate` states, the edge clamp while sprinting, a sketch prompt, the overview,
and that no visible signs overlap (from Durga Puja and in the overview). The last run printed `SELFTEST PASS`.

## Controls

- WASD or the arrow keys walk; hold Shift to sprint; Space jumps. The mouse looks once the pointer is locked: click the game to lock it. Without
  pointer lock (iframe, touch), drag to look.
- E or Enter talks to Dadi and steps through a torana. In a dialogue, E, Space or a click goes on.
- Esc or P opens the pause menu: hand-drawn wobble, paper grain, mouse speed, sound, and "Forget my progress".

## The boy's hands

Built from Govardhan's "Krishna's own hands and flute" code, with no flute:

- A WHITE kurta sleeve rod, then a rolled WHITE cuff (torus).
- A short SK1 wrist, an SK1 hand ellipsoid, a thumb and three fingers.
- On the right wrist only, a TOMATO torus (tube 5.5 mm) with a thin GOLD torus (tube 2.8 mm) beside it.

There are three poses: rest (with a small walk swing), namaste while Dadi talks, and reach toward the torana as you
leave.

## New palette triples (light / mid / dark)

| Name | Light | Mid | Dark | Used for |
|---|---|---|---|---|
| Sand | `#f2ddb0` | `#dcc08c` | `#8c6f42` | Dussehra shore, Lanka |
| Sketch | `#fbf8f0` | `#ece5d4` | `#d1c6af` | every fill on a sketch island |
| Marigold | `#fbad3a` | `#e8891d` | `#7a460c` | garlands (with Mustard) |
| Saffron | `#f9a54d` | `#e3802b` | `#6f3a10` | vanar dhotis, a chariot flag |
| Fur | `#cf9f6d` | `#ad7c4c` | `#5a3b1f` | vanars |
| Ravana | `#7d86c9` | `#5a62a8` | `#262b5c` | Ravana's lower garment |
| Light cloud | `#dfe2e8` | `#c3c8d1` | `#9aa1ae` | about a third of the paper clouds |
| Snow | `#f3f7fb` | `#d5dfea` | `#8d9cb0` | Kailash snow cap and patches |
| Stone | `#c9c6cf` | `#a19eab` | `#5d5a69` | Kailash peaks |
| Peacock | `#5fb0e0` | `#3b88bf` | `#173d5e` | the peacock's body |
| Peacock tail | `#8fcf7e` | `#5fa85a` | `#22512c` | the peacock's train |
| Bamboo | `#ecd791` | `#cdb265` | `#6f5c25` | pandal poles |

Single flat colours: pencil ink `#6b5d4e`, light pool `#f6d27a` with a pale ring `#f8e3ab` (from PLAN.md).

## Govardhan hookup (`govardhan-fpv/index.html`)

There are two small changes. Without `from=hub` in the hash, nothing changes.

1. `applyHash` drops `from=...` parts before it picks the state name. This lets `#from=hub&selftest` and
   `#from=hub&end` work. Hashes without `from=` parse exactly as before.
2. A block before `window.GAME`, which runs only when the hash has `from=hub`. It adds the arriving paper fade and a
   "Back to the islands" button on the end card. The button fades the paper back in and goes to
   `../index.html#done=govardhan`.

Its self-test printed `SELFTEST PASS` for `#selftest`, `#selftest&from=hub` and `#from=hub&selftest`. Headless
screenshots of `#end&from=hub` show the button, and `#end` alone does not.

## What I did not verify

- Only headless Chrome with SwiftShader at 1280×800 was tested. Real pointer lock, mouse feel, audio and frame rate
  on a laptop GPU are **not verified**. The scene has roughly 1,500 meshes, and each is drawn in both passes.
- The real round trip to `dussehra-rama/` and `diwali-ayodhya/` was not tested. Those pages did not exist while I
  worked, so a gate leads to a missing file until they land. The selftest checks the exact URLs instead.
- Safari, Firefox and phones are not tested.
- The album overlay is the lead's file; the hub only checks it through its test hooks. A real photo was not tried.
- The Malayalam (ഓണം) and Tamil (பொங்கல்) signs use system fonts, because Baloo 2 has no glyphs for them.

## Facts for a practising family to check

1. Dadi says Diwali comes "about twenty days" after Dussehra. That is popular, not textual. It follows PLAN.md.
2. Govardhan Puja is "the very next day" after Diwali (Lakshmi Puja). That is usual in the north. Some regions
   differ.
3. Island titles: Holi (होली) "Prahlad and Holika"; Ganesh Chaturthi (गणेश चतुर्थी) "Ganesha's race round the
   world"; Durga Puja (दुर्गा पूजा) "Durga and Mahishasura"; and the sketches Naraka Chaturdashi (नरक चतुर्दशी),
   Onam (ഓണം) "Mahabali comes home", Pongal (பொங்கல்) "Thanking the sun for the harvest".

   Check the scripts and the one-line story names.
4. The depictions are simple and faceless figurines, and none of them shows conflict:
   - Durga has eight arms, a crown and a trident. She stands by a lion, with a buffalo some metres away.
   - Satyabhama holds a bow in a chariot with Krishna.
   - Mahabali wears a crown and carries a palm-leaf umbrella.
   - Ganesha has a mouse and modaks.
   - Ravana has ten crowned heads in one row.

   Please check that the tone is respectful.
5. The year order Dadi gives: Holi in spring (Phalguna), Ganesh Chaturthi "in the rains" (Bhadrapada, August or
   September), Durga Puja ending on Vijaya Dashami, the same day as Dussehra. Pongal sits before Holi (mid-January) and
   Onam beside Ganesh Chaturthi (Chingam, August or September). Regional dates vary.
6. Dadi's return lines: "Ganesha walked round his parents, and the mango was his"; "Jai Maa Durga! She won when no one
   else could"; "Holi hai! Prahlad kept his faith, and the fire could not touch him."
7. The kalava (red-and-gold thread) on the boy's right wrist is a common custom. Some families tie it on the left
   for girls and women.

## Deliberate differences from PLAN.md

- **The islands sit on a ring, and the lookout is gone.** Round 2 asks for the journey to follow the year with no long
  dead ends. A ring that closes from Govardhan back home does that, and it lets the year "go round". The lookout and
  its 7-stone branch served four sketch islands; two of them are now story islands, and the other two float beside
  their season's island, so the branch would only have been a dead end.
- **Every sign says "You are X"**, not "You become X", to match round 2 and the leaving title.
- The page picks its state by name (`gate`, `done`, `home` and so on), so `from=` and the view parameters can come in
  any order.

Credit: the look is inspired by Colorfigures by April Zhu (https://april-zhu.com/colorfigures, MIT, Copyright (c)
2026 April Zhu). No Colorfigures code is copied. three.js is MIT.
