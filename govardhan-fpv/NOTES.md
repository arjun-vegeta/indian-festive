# Govardhan, as Krishna (first-person playable sample)

Festive Hacks, Bengaluru, 25 Nov 2026. Open `index.html` in Chrome. It is one file with no build step. three.js
0.160.0 loads from jsDelivr through an import map, and the Baloo 2 font loads from Google Fonts, so the page needs
the network.

The game takes the hand-inked isometric Govardhan mockup (`../colorfigures/`) and puts you inside it. You are young
Krishna ("Kanha"), and you see your own small blue hands, gold bangles and bansuri.

## Beats and mechanics

| # | Beat | What you do | Hints |
|---|---|---|---|
| 1 | Vraj prepares to worship Indra | Walk to Nanda Baba at the yajna altar (E). He sends you to ask Subala (by the cows) and Yashoda Maiya (by your hut). Then go back to Nanda Baba. | Objective line, a glowing outline on whoever you should talk to, an "E: Talk to ..." prompt, an arrow round the crosshair when the target is off-screen, and Subala calling "Come and see the cows!" |
| 2 | Annakut offerings | Take butter (Yashoda), laddoos (Lalita) and a marigold garland (Subala) from their stools (E), then offer them on the leaf at the foot of the hill (E). The garland appears round the hill, a bell rings, and the village gathers. | Glowing stools, an "Offerings N of 3" counter, and villagers' lines when you take each one. |
| 3 | Indra's storm | The sky turns to grey paper, the clouds darken and drop, and rain, gusts, lightning (an inked bolt, a flash, synthesised thunder) arrive. Everyone scatters to the edges of Vraj with their arms over their heads. Run to the hill. | The whole hill glows, people shout ("Kanha! Look at the sky!"), and voices from off-screen stick to the screen edge on their side. |
| 4 | Lift the hill | At the hill's foot, hold the left mouse button or Space for about 5 seconds. Your left arm rises with the little finger out. The camera tilts up as the hill rises with a rumble, camera shake, widening FOV and falling stones, then glides overhead until its belly rests on your fingertip. Then three gusts push a gold dot out of a dashed ring near the crosshair, and you move the mouse against each gust. The hill visibly leans the way the dot goes. | "Hold: lift / keep holding", wind arrow, gust whoosh |
| 5 | Shelter everyone | You can barely shuffle. Hold F or the right mouse button to play the flute, which gives synthesised notes in a pentatonic (Bhupali-like) phrase and ink rings that spread from you. Anyone within 10 m hears it. Anyone up to 46 m away hears it if you face them (within about 47°). Each person or cow who hears it answers ("I hear Kanha's flute!", "Mooo") and walks to a place under the hill. Rain stops at the hill, so anyone still outside keeps getting wet. The counter shows "Dry and safe N of 11". | The people still outside call your name every few seconds from their direction, and an arrow points to the nearest one. |
| 6 | Seven days pass | A time-lapse with the camera slowly turning round the shelter. The sky cycles from paper to indigo night and back, small lamps are lit under the hill, and one villager speaks each day. Gusts keep coming. The days only advance while the gold dot is inside the ring. If it leaves the ring, the hill tips, the shelter shrinks a little and rain spills in. | "Days of rain N of 7" |
| 7 | Indra relents and the celebration | The rain stops, the clouds lighten, and a rainbow comes up behind the hill. Everyone walks out. Hold to set the hill down: it glides back and settles with a ring of dust. The Annakut mound builds up and lamps are lit. Talk to three villagers (E) for their thanks, in their own words. They call "Giridhari!", and a short end card follows. | Glowing villagers with folded hands, and a "N of 3" count |

There is no score, timer or fail state. Worship is never counted.

When you are stuck, help builds up. The objective line is always there. After 3 seconds an arrow appears round the
crosshair if the target is off-screen. After 20 seconds without progress a yellow hint appears under the objective
and the nearest villager calls out and points at the target with their arm. After 40 seconds the hint names the exact
key.

## Controls

- WASD or the arrow keys walk. The mouse looks around once the pointer is locked: click the game to lock it. If
  pointer lock is not available (in an iframe or on touch), drag to look.
- E or Enter talks, picks up and offers. In a dialogue, E, Space or a click goes on to the next line.
- Hold the left mouse button or Space to lift and to set down the hill.
- F or the right mouse button plays the flute.
- While the hill is held against the wind, the mouse moves the gold balance dot instead of the view.
- Esc or P opens the pause menu, which lists the controls and has sliders for hand-drawn wobble, paper grain, mouse
  speed and sound.

## How the 2D style was carried into 3D

| Colorfigures / mockup | Here |
|---|---|
| Three flat tones per surface from `normal · light`, with the light fixed to the viewer | A custom `ShaderMaterial` takes the exact l/m/d hex values from the mockup's palette and uses the mockup's thresholds (`hi .45`, `lo -.28`) with a very narrow blend. The light turns with your yaw (right, high, a little behind), so every view reads like the mockup: tops light, fronts mid, the far side dark. Low-poly parts use flat facet normals (`dFdx`/`dFdy`). Balls and bodies use smooth normals, which turns a sphere into the mockup's three nested discs. |
| Heavy silhouette ink, finer lines between parts | A second render pass writes a part id and log depth into an RGBA8 target. A post pass inks where the id changes (every part has its own outline, as each SVG part had its silhouette) and where depth folds, using the Laplacian of 1/z so flat ground never gets false lines. A second, wider ring on the near side of silhouettes makes the outer line heavier. Line width is in screen pixels and shrinks a little with distance. The ink is warm brown `#2a2118`. |
| SVG `feTurbulence` + `feDisplacementMap` wobble | In the post pass, value-noise displacement moves the UVs for colour, ink and ids together, so lines and fills wobble as one. The noise re-rolls 4 times a second as a gentle line boil. The pause menu's "Hand-drawn wobble" slider uses the same 0 to 7 range as the mockup, default 2.4. |
| Paper grain multiply | Fine plus mid noise is multiplied over everything (`.82 + .26·n`) with a very low-frequency paper mottling. The sky is the paper colour `#f4efe3`: grey paper in the storm, indigo paper at night. |
| Flat blue cast shadow, short | Each object's own meshes are squashed onto the ground along a fixed sun in the mockup's shadow blue `#4f5f9a`. The lifted hill's shadow becomes the blue shelter you stand in. |
| Palette, chunky figurines, hill profile | Palette hex values, figurine proportions (cone dhoti, cone kurta, ball head, hair cap, turban), the cow build and the hill profile with its wobbly rim come straight from the mockup's numbers, rescaled to metres. The hill is larger (21 × 17 m, 15 m tall), and its belly has rock, hanging roots and stones. The belly gets its own low "rim light" so it still shows three tones. |
| Target highlight | Targets carry a flag in the id pass. The post pass turns their ink gold-orange and adds a soft pulsing gold halo. |
| Type and UI | Baloo 2. Paper pills with a 1.7 px ink border and a 3 px offset ink shadow, the same as the mockup's buttons and toasts. Big tabular stat numbers top right, as in the mockup. |

Every shape is a real mesh built in code (lathes, cylinders, spheres, ring lofts). The rain is instanced thin 3D
prisms, the flute rings are tori, and the grass ticks are tiny ink triangles. There are no images, sprites,
billboards or textures. The rainbow is six flat torus arcs, drawn without ink like the mockup's.

## Hash states and self-test

`#village #talk #offer #storm #lift #held #shelter #days #rainbow #celebrate #end` jump to each beat with a set
camera. You can add `&yaw=1.2&pitch=.3&wob=4`. `#selftest` plays the whole story with the same functions the controls
call: it talks to everyone, gathers and offers, waits for the storm, holds to lift, balances with simulated mouse,
faces each villager and plays the flute until all 11 are sheltered, waits out seven days, sets the hill down and takes
three thanks. It prints 31 checks on the page and to the console. The last run printed `SELFTEST PASS` with no script
errors.

Screenshots are in `shots/`. They were taken with headless Chrome on SwiftShader at 1280×800, one hash state each.
The only console output was SwiftShader's "GPU stall due to ReadPixels" performance notice.

## What is reused and what is written

- Everything in `index.html` was written for this sample: the three.js scene, the toon, id, shadow, rain and post
  shaders, the hands, the game logic, the audio synthesis and the HUD.
- **Reused from the team's mockup** (`../colorfigures/index.html`): palette hex values, the hill profile (`PROF`) and
  rim jitter, the three-tone thresholds, the figurine and cow proportions, the Annakut layering, and the UI look (paper,
  ink, Baloo 2, pill buttons, offset shadows, big stats).
- **Credit:** that look is inspired by **Colorfigures by April Zhu** (https://april-zhu.com/colorfigures, MIT,
  Copyright (c) 2026 April Zhu; built on iso-glow by April Zhu and iso-figure by Tolga Cohce). **No Colorfigures code
  is copied**, and none was in the mockup either. The credit is in the file's header comment, on the title card and
  here. If anyone later pastes in `core.js`, ship its LICENSE with it.
- three.js is MIT (three.js authors) and loads from the CDN without being bundled.

## Known gaps and what I did not verify

- The lift arm comes in large from the bottom-left of the screen while you lift. It reads as your arm, but it is
  chunkier than a child's.
- I tested only in headless Chrome with SwiftShader. Real pointer lock, mouse feel, audio and frame rate on a laptop
  GPU are **not verified**. Audio needs a click first because of browser autoplay rules.
- Villagers walk in straight lines and only push apart softly. Cows can clip through trees.
- Safari and Firefox are not tested. There is no phone layout beyond the CSS, and no touch flute or hold buttons.

## Mythology and festival details someone should check

These are not verified against a primary source today.
1. Source: Bhagavata Purana, Book 10, chapters 24–25. Krishna persuades the people of Vraj to honour Govardhan, the
   cows and the brahmins instead of holding the Indra yajna. The game leaves out the brahmins. Check the chapter
   numbers.
2. **Little finger.** The popular telling is the little finger of his **left** hand, and the game uses it. As I
   recall, the Bhagavata says "with one hand", lightly, like a child holding a mushroom. Check whether the team is
   happy with the little finger.
3. **Seven days** of rain with the hill held all that time is widely told. Check the verse.
4. **Krishna's age:** usually said to be about seven. The game never states an age, and the camera height (1.15 m) is
   a child's.
5. **Annakut** (अन्नकूट, "mountain of food"), often 56 dishes (chhappan bhog). The game shows a mound and never states
   a number. Govardhan Puja is usually the day after Diwali (Kartika Shukla Pratipada), and Nanda Baba's closing line
   says "every year after Diwali". Check this year's date.
6. **Indra** is shown only as the storm: clouds, wind and lightning, with no face or figure. In the text Indra later
   comes and apologises, and Surabhi bathes Krishna and names him **Govinda**. The game only says the clouds part
   because "Indra has seen that no one in Vraj was hurt". The **rainbow** is an artistic choice, not part of the story.
7. **Names:** Nanda Baba, Yashoda Maiya, Subala and Shridama (Krishna's gopa friends), Lalita (a gopi), and the cow
   names Kapila, Gauri, Shyama and Dhavali (common, gentle names, not from the text). **Giridhari** (गिरिधारी), "the
   one who holds the hill". Check the spellings.
8. **Depiction:** Krishna appears only as blue hands, gold bangles and a bansuri, and the player never sees a face.
   Villagers are faceless figurines, like the mockup's. Yashoda's "butter pots" line is the affectionate makhan-chor
   image. Please ask someone from the community to review the tone of all the lines.
