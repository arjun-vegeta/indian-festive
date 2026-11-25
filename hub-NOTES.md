# Festival Islands: the hub (`index.html`)

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
| Progress | localStorage `festive.done`, a JSON array of ids. `#done=<id>` adds the id. Done gates get a marigold garland and a gold tick on their sign. The next suggested island's sign is highlighted. "Stories walked N of 3" shows top right. Pause, then "Forget my progress", clears it. |
| Glow | Dadi glows until you have heard her intro. After that, the stones from where you are (home, or the island you just came back from) to the next suggested island glow, and so does its torana. When all three are done, nothing glows. |
| Dadi | Intro (9 lines): islands are stories behind festivals, you become the hero, Rama at Lanka for Dussehra first, then Diwali about twenty days later, then Govardhan Puja the very next day. Every island is open. On a return she calls a line from the screen edge, as Govardhan's off-screen voices do, and E on her gives a longer line about that story. After all three she says the other islands are still being drawn. |
| Signs | HTML paper pills anchored to 3D points. Story signs sit on the torana board. Within 30 m a sign shows three lines (Hindi · English festival, story, "You become X"). Further out it shows the festival line only. Sketch signs use a dashed border and show only within 42 m in first person. In the overview, every sign shows its festival line. |
| Sketch prompt | Face a sketch island within 36 m and a dashed pill with a pencil says "Holi · Prahlad and Holika: still being drawn". |

### Layout (x, z, top height)

Home (0, 0, 0) → Dussehra (-24, -36, 2.2) → Diwali (14, -72, -1.2) → Govardhan (-12, -110, 1.4), with 7, 10 and 7
stones. There is a branch of 7 stones from home east to a small lookout (36, 4, -0.8) with four sketch islands around
it: Holi, Onam, Pongal and Ganesh Chaturthi. The Durga sketch floats beside Dussehra and the Naraka Chaturdashi sketch
beside Diwali. Lanka floats 66 m beyond Dussehra's shore, with golden towers and the ten-headed king. Nine far islands
and 34 flat paper clouds, below and between the islands, give depth.

### Story island previews

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
| `#gate=dussehra-rama`, `#gate=diwali-ayodhya`, `#gate=govardhan` | Standing 4.3 m in front of that torana, with the sign and "E: Become ..." showing |
| `#done=dussehra-rama` (any id) | Back from that story: marked done, at its gate facing the next suggested island, Dadi's line on the screen edge, the glow moved on |
| `#selftest` | Plays the whole hub, then prints PASS or FAIL on the page and to the console. It saves and restores your `festive.done`. |

Any state takes `&yaw=`, `&pitch=` and `&wob=`. `from=` is ignored when the hub picks a state.

`#selftest` runs 39 checks with the same functions the controls use: `update`, `cameraStep`, `focusTarget().use()`
and `advance`. It checks that the boy's eye height is 1.15 m. It checks the hand materials: SK1 hands, WHITE cuffs,
and a TOMATO plus GOLD kalava on the right wrist only. It checks that every path is walkable end to end and that
sketch islands cannot be entered. It then talks to Dadi through the intro and walks the stones to each gate in turn,
using forward input steered at each stone. At each gate it checks the prompt and the exact link, then runs the
`#done` return and checks `festive.done`, the garland, the tick, Dadi's new line, the spawn facing the next island
and the glow moving. It also walks into an edge for 4 s, slides along it at a slant, walks the branch, checks the
"still being drawn" prompt and checks the overview. The last run printed `SELFTEST PASS` with no script errors. Over
879 walking frames the boy was never off a walkable surface.

## Controls

- WASD or the arrow keys walk. The mouse looks once the pointer is locked: click the game to lock it. Without
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
- Safari, Firefox and phones are not tested. Labels can overlap when several islands line up.
- The Malayalam (ഓണം) and Tamil (பொங்கல்) signs use system fonts, because Baloo 2 has no glyphs for them.

## Facts for a practising family to check

1. Dadi says Diwali comes "about twenty days" after Dussehra. That is popular, not textual. It follows PLAN.md.
2. Govardhan Puja is "the very next day" after Diwali (Lakshmi Puja). That is usual in the north. Some regions
   differ.
3. Sketch island titles:
   - Durga Puja (दुर्गा पूजा), "Durga and Mahishasura, another Dussehra story".
   - Naraka Chaturdashi (नरक चतुर्दशी), "Krishna, Satyabhama and Narakasura, another Diwali story".
   - Holi (होली), "Prahlad and Holika".
   - Onam (ഓണം), "Mahabali comes home".
   - Pongal (பொங்கல்), "Thanking the sun for the harvest".
   - Ganesh Chaturthi (गणेश चतुर्थी), "The birth of Ganesha".

   Check the scripts and the one-line story names.
4. The depictions are simple and faceless figurines, and none of them shows conflict:
   - Durga has eight arms, a crown and a trident. She stands by a lion, with a buffalo some metres away.
   - Satyabhama holds a bow in a chariot with Krishna.
   - Mahabali wears a crown and carries a palm-leaf umbrella.
   - Ganesha has a mouse and modaks.
   - Ravana has ten crowned heads in one row.

   Please check that the tone is respectful.
5. The kalava (red-and-gold thread) on the boy's right wrist is a common custom. Some families tie it on the left
   for girls and women.

## Deliberate differences from PLAN.md

- **No stones from the hub to the Durga and Naraka sketch islands.** The plan asks for "a branch from home to the
  sketch islands". The branch from home reaches the four other-festival sketch islands, which float round a lookout.
  Durga and Naraka float beside their festival's story islands, as the plan's grouping rule asks. Sketch islands
  cannot be entered, so the branch ends at the lookout and none of them is walkable.
- The page picks its state by name (`gate`, `done`, `home` and so on), so `from=` and the view parameters can come in
  any order.

Credit: the look is inspired by Colorfigures by April Zhu (https://april-zhu.com/colorfigures, MIT, Copyright (c)
2026 April Zhu). No Colorfigures code is copied. three.js is MIT.
