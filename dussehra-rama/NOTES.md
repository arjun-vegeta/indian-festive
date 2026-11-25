# Dussehra · Rama and Ravana, as Rama (island 1)

Open `index.html` in Chrome. It is one file with no build step. three.js 0.160.0 loads from jsDelivr through an import
map and Baloo 2 from Google Fonts, so the page needs the network. The engine is copied from `../govardhan-fpv/`
(toon shader, id+depth ink pass, wobble and grain, flat shadows, HUD, dialogue, hints, synth audio, hash states,
self-test). The scene and story are new.

You are Rama. You see your own Krishna-blue hands, gold bangles and the bow (dhanush) in your left hand, at eye height
1.6 m. Look down and the arrows in your quiver show over your right shoulder. You never see Rama's face.

The shore is a floating island. Past its edge are paper sky and flat paper clouds below. Lanka is a second floating
island about 30 m across the gap, with the golden city behind Ravana. Both islands have the hub's anatomy: a flat top
with a wobbly rim, a thick earth band, an upside-down faceted root mass in rock and earth, hanging ink vines with leaf
balls, and small rocks floating below.

## Beats and mechanics

| # | Beat | What you do | Hints |
|---|---|---|---|
| 1 | The shore | Talk to Nala, the builder (E). Lakshmana, Hanuman, Sugriva, Vibhishana and six vanaras (faceless, with tails) stand with you. Nala says stones that carry your name float. | Objective line, glowing Nala, "E: Talk to Nala", the off-screen arrow, escalating hints. |
| 2 | Build the setu | Pick up a stone from the pile (E). राम writes itself on it in ink as you lift it. Carry it out to the gold ring at the end of the setu and set it down (E). It flies into place and floats. After each of your stones a vanara on the shore throws the next one in a big arc. After four stones Lakshmana spots a **squirrel** rolling pebbles to the setu. Stroke it (E): your hand reaches down and three stripes appear on its back. | "Stones of the setu N of 10" (you set 5, the vanaras 5), glowing pile or gold ring, vanara calls. |
| 3 | Cross | Walk across the ten floating stones to Lanka. The vanar sena cheers and follows you over. | Arrow to Lanka. |
| 4 | Ravana | Vibhishana and Lakshmana speak. Face Ravana (a giant faceless figurine with ten crowned heads) and hold the left mouse button or Space. The bow comes up, the string draws back and the camera locks on. The bow shakes: a gust pushes the gold dot in the dashed ring, and you move the mouse against it (Govardhan's balance mechanic). A gold arc fills while the dot stays in the ring. When it is full, let go: one arrow. Letting go early just relaxes the bow, with a hint. Ravana topples backwards, his crowns go dark one by one, and a ring of dust rises. The army calls "Siyavar Ramchandra ki jai!". | "Hold: draw your bow", "Mouse: keep the gold dot in the ring", "Let go: loose the arrow". |
| 5 | Sita | Hanuman leads the way to the Ashok Vatika (ashoka trees with orange flowers). Meet Sita (E). She speaks of the ring Hanuman brought her. | Glowing Sita, arrow, hints. |
| 6 | Today | Dusk falls (paper to warm grey), the caption reads "The story shifts to today", and a paper fade carries you to the same spot at dusk on indigo paper. It is now a Ramlila maidan with a rope fence, lamp posts with warm light pools, bunting, a stage and a town. Mohan Chacha hands you a lit arrow. Draw and let go (no shaking this time) at the bamboo-and-paper effigy of Ravana. It burns with layered flat flames, then Kumbhakarna and Meghnad catch, with smoke, sparks, flat star-burst fireworks and the crowd's call. The effigies sink into the fire. Sunita Tai, Dadaji and little Mini come to you with shami and apta leaves. Share leaves with all three (E). Then the **"Why we celebrate Dussehra"** card appears, with Hindi word chips and two buttons: "Back to the islands" and "Play again". | "Leaves shared N of 3", glowing givers. |

There is no score, timer or fail state. Nothing about worship is counted. The counters count stones and leaves only.

When you are stuck, help builds up as in Govardhan. After 3 s an arrow points round the crosshair to an off-screen
target. After 20 s a yellow hint appears and the nearest companion points and calls ("This way, Prabhu!"). After 40 s
the hint names the exact key.

## Controls

- WASD or the arrow keys walk. Click to capture the mouse and look. Without pointer lock, drag to look.
- E or Enter talks, picks up a stone, sets it on the setu, strokes the squirrel and shares leaves. In a dialogue,
  E, Space or a click goes on.
- Hold the left mouse button or Space to draw the bow. Move the mouse to keep the gold dot in the ring. Let go to shoot.
- Esc or P pauses, with the same sliders as Govardhan (wobble, grain, mouse speed, sound).
- You cannot fall off. Walking is clamped to the two islands and to the built part of the setu, and slides along edges.

## URL contract

- `#from=hub` is read alongside any other part (`#from=hub&yaw=1.2`, `#setu&from=hub`). "Play again" keeps it.
- The why-card's **"Back to the islands"** button is always shown. It fades in the paper layer with "Back to the
  islands", then goes to `../index.html#done=dussehra-rama`.
- On arrival the page starts under the paper layer (`#f4efe3` plus an inline SVG `feTurbulence` grain) and fades it out
  over 600 ms after the first frame draws. The title card reads "Dussehra · Rama and Ravana" and "You are Rama".
- No localStorage. Only the hub stores progress.

## Hash states and self-test

`#shore #setu #squirrel #cross #ravana #draw #fall #sita #dusk #dahan #shami #why #overview` jump to each beat with a set
camera. `#overview` is a slow high orbit of both islands and the setu. You can add `&yaw=1.2&pitch=-1.1&wob=4`
(`#cross&pitch=-1.15&yaw=.3` shows the quiver over your shoulder).

`#selftest` plays the whole story with the functions the controls call (focusTarget + use, held input, simulated
mouse). It walks to the pile, picks up, walks out along the bridge and sets each stone (so the walk clamp is tested),
strokes the squirrel, walks across the setu with W held, draws and balances the bow, waits for the fall, walks to Sita,
rides through dusk, shoots the lit arrow, shares three leaves and checks the why-card. The last run printed
`SELFTEST PASS` (54 checks, no script errors).

Screenshots of every state were taken with headless Chrome on SwiftShader at 1280×800 and kept outside the repo.
Run at most three headless instances at a time: more than that starves `--virtual-time-budget` and you get blank paper.

## New palette triples (light / mid / dark)

| Name | Light | Mid | Dark | Used for |
|---|---|---|---|---|
| Sand | `#f3dfb1` | `#dcc38f` | `#8c7448` | shore crescents on both islands |
| Lanka grass | `#c6d98a` | `#a5bf68` | `#5b7236` | Lanka's top, a drier green |
| Saffron | `#f6a04f` | `#de7d30` | `#6e3511` | Hanuman's fur, a vanara, the temple flag |
| Fur 1 | `#c99a6b` | `#a77a4e` | `#56391f` | vanaras |
| Fur 2 | `#bba68b` | `#988367` | `#4f4232` | vanaras, Sugriva |
| Fur light | `#f0d6b4` | `#d8b78f` | `#7d6244` | vanara muzzles and ears |
| Maroon | `#c25a6a` | `#9c3c4f` | `#46172a` | Ravana's upper cloth |
| Char | `#8a8076` | `#665d54` | `#2c2620` | Ravana's crowns after he falls |
| Squirrel | `#c4a487` | `#9f8165` | `#4f3d2c` | the squirrel |
| Bow wood | `#c98d4f` | `#a86d34` | `#4d2f14` | Rama's bow, Lakshmana's bow |
| Ashoka leaf | `#86c069` | `#5f9c48` | `#274a1e` | ashoka trees |

Single colours: light pool `#f6d27a` (as the plan says), dusk warm grey `#cbbfae`, night `#363a57`, stripes `#fbf3dc`.
Smoke uses CLOUD and WHITE and fades toward the sky colour. Flames use GOLD, MUSTARD and TOMATO with `uEmis = 1`.

## What is different from PLAN.md, and why

- **राम is ink geometry traced from the font, not drawn by hand.** At load the page draws राम in Baloo 2 on an
  offscreen canvas, then traces it with marching squares into mesh triangles. No texture is used. The canvas is only read,
  never shown. Hand-built strokes would have misspelt the conjuncts. When Baloo 2 Devanagari finishes loading, the
  geometry is rebuilt. Until then the system Devanagari font is used.
- **Rama walks to Sita.** The plan says "walk to the Ashok Vatika and meet Sita", and the game does that. In most
  tellings Sita is brought to Rama after the war. The game keeps the plan's gentle version and leaves out the
  agni pariksha.
- **The vanaras throw stones** in a high arc instead of carrying them along the bridge. It reads better from first
  person, and it keeps the walk short.
- **The effigies sink into the fire** instead of collapsing piece by piece. It is simpler and still reads as burning down.
- **The sea is not shown.** The gap holds paper sky and clouds, as the brief asked. Nala's line says the stones "float"
  and does not mention water.
- Distance fog was added to the toon shader and to the ink, so Lanka and far clouds ease toward paper.

## What I did not verify

- Only headless Chrome with SwiftShader was tested. Real pointer lock, mouse feel, audio and frame rate on a laptop GPU
  are **not verified**. Audio starts only after the first click (autoplay rules).
- The Baloo 2 Devanagari font is fetched on demand. If it fails to load, राम is traced from the system Devanagari font.
  I saw it render correctly on macOS. I have not checked Windows or Linux.
- The hub (`../index.html`) did not exist when I tested, so the "Back to the islands" link itself was not clicked through.
- NPCs walk in straight lines with soft pushing. Companions crossing the setu can overlap one another.
- Safari, Firefox and phones were not tested. There are no touch buttons for hold.

## Facts for a practising family to check

These were written from memory and were not checked against a primary source.

1. **Floating stones with Rama's name.** The popular telling is that stones with "Rama" written on them floated.
   In Valmiki's Ramayana (Yuddha Kanda), Nala, son of Vishwakarma, leads the building, and the ocean god promises to
   hold up what Nala builds. The written name is from later and folk tellings. Some tellings give Nala and Nila a boon
   that what they throw in water will float. Confidence: medium. Nila is not shown in the game.
2. **The squirrel's three stripes** is a folk tale (widely told in the south). It is not in Valmiki. Lakshmana says
   "That is what the old ones say" to mark it. Confidence: high that it is folk.
3. **One arrow ends the war.** In Valmiki, Rama kills Ravana with the Brahmastra after a long fight, and in many
   tellings Vibhishana tells him to aim at the navel. The game shows one arrow and a topple, with no wound, by design.
4. **Ten heads with crowns and the dark crowns** are an artistic choice for "Ravana is defeated". Nothing is shown of
   death beyond the fall and dust.
5. **Sita's line** about Hanuman bringing Rama's ring in the Ashok Vatika is from the Sundara Kanda. Confidence: high.
   Rama walking to her afterwards is simplified (see above).
6. **Vijayadashami** is the tenth day of Ashvin Shukla, after the nine nights of Navaratri. Confidence: high.
7. **The Ramlila** is usually staged over the nine or ten nights up to Dussehra in the north, and ends with the
   Ravana Dahan of Ravana, Kumbhakarna and Meghnad. The order of burning differs by town. Confidence: medium.
   Mohan Chacha's line about burning "anger, greed and pride" is a common modern explanation, not scripture.
8. **Shami and apta leaves.** In Maharashtra, apta leaves are exchanged as "sona" (gold). The Marathi saying
   "सोनं घ्या, सोन्यासारखं राहा" (sona ghya, sonyasarkha raha: take gold, stay like gold) is how I remember it.
   Please check the spelling and the transliteration. Dadaji's line, that the Pandavas hid their weapons in a shami tree
   and took them back on Vijayadashami, is from the Mahabharata's Virata Parva as popularly told. Confidence: medium.
9. **Ayudha Puja** honours tools, books and vehicles in the south. It is usually on Mahanavami (the ninth day), the day
   before Vijayadashami, not on Dussehra itself. The card says "in the south, families keep Ayudha Puja" without a day.
10. **Mysuru Dasara:** the palace is lit up, and the Jamboo Savari carries the idol of goddess Chamundeshwari on an
    elephant in a golden howdah. Confidence: high.
11. **Durga Puja** in Bengal and the east celebrates Durga's victory over Mahishasura. The card names it as "another
    story, on another island". Confidence: high.
12. **"Siyavar Ramchandra ki jai"** is used as the cheer throughout, as the plan asks.
13. **Names and words:** Nala, Sugriva, Vibhishana, Lakshmana, Hanuman, Kumbhakarna, Meghnad (also Indrajit), Ashok
    Vatika, vanar sena, setu. "Prabhu" and "Bhaiya" are how Hanuman and Lakshmana address Rama here. "Ramji" is how
    today's crowd addresses the Ramlila's Rama. Please ask someone from the community to review the tone of every line.

## Credits

- Engine and look from `../govardhan-fpv/`. The look is inspired by **Colorfigures by April Zhu**
  (https://april-zhu.com/colorfigures, MIT, Copyright (c) 2026 April Zhu). No Colorfigures code is copied. The credit
  is in the file's header comment, on the title card, on the why-card and here.
- three.js is MIT and loads from the CDN without being bundled.
