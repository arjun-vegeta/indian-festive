# Diwali · Rama comes home (island 2, first person)

Festive Hacks, Bengaluru, Nov 2026. Open `index.html` in Chrome. It is one file with no build step. three.js 0.160.0
loads from jsDelivr through an import map and Baloo 2 from Google Fonts, so the page needs the network.

You are Rama, walking home to Ayodhya on Amavasya, the moonless night. You see your blue hands, gold bangles, the bow
in your left hand, the quiver tip at your right shoulder when you look down, and your feet (bare, then in the padukas).
The engine is copied from `../govardhan-fpv/index.html`; the scene and story are new.

## Beats and mechanics

| # | Beat | What you do | Hints |
|---|---|---|---|
| 1 | The Pushpaka Vimana | Ride the small flying platform in from beyond the island's edge at dusk. The sky goes paper, warm grey, then indigo. It sets down at the south edge in a ring of dust. Sita, Lakshmana and Hanuman speak (the road is dark, it is Amavasya, Bharata waits). | Objective line |
| 2 | Bharata at Nandigram | Walk off the vimana to Bharata, the only lamp in the dark, by the little throne with your padukas. Talk (E). He lifts the padukas off the throne and sets them before you. Look down and press E to wear them. Your feet now wear padukas, and steps clack like wood. | Glow on Bharata, then on the padukas; "E: ..." prompts; cue arrow; Bharata calls out |
| 3 | Walk home | Walk the road north. Rows of lamps light ahead of you, one by one about 60 ms apart, each with a soft pentatonic tick, so every row plays a little run. Road edges, house platforms, balconies, rooftops, the city walls (racing out from the gate and up both sides), corner towers and the back-row rooftops all light in turn. People come out of their doors holding lamps and call short lines; the gate guards call "Siyavar Ramchandra ki jai!". Each lamp drops a flat warm light pool, and the lit part of the city takes on a warm ambient while the unlit part stays cold indigo. Counter: "Lamps lit N". | Objective "Walk home to Ayodhya", cue arrow, villagers point after 20 s |
| 4 | The mothers | At the palace steps (lit in a cascade from the bottom step up to the domes) greet Kaushalya, Kaikeyi and Sumitra (E). The view dips in a bow each time. One gentle line each; Kaikeyi's makes peace and Rama answers with respect. | Glow on each mother not yet greeted |
| 5 | Ayodhya lit | The camera cranes up and away until the whole floating island shows, the walled city lit, clouds below, stars above. Captions: "Ayodhya, lit for Rama" and "Siyavar Ramchandra ki jai!". | none |
| 6 | Today | A paper fade: "Today, on Diwali night, homes everywhere light lamps the same way." The same lane, now with families of today and paper lanterns. (a) Riya lets you finish her rangoli: E on a powder bowl takes that colour, E on an empty petal fills it; any colours, 4 petals. (b) Her mother gives you a lamp; light the first diya on the wall and the flame passes along all 12. (c) Join the family's Lakshmi puja: ring the bell, wave the lamp (an aarti circle), offer a flower, in any order, never scored or timed. (d) Kamala aunty shares mithai. Three flat ink-outlined fireworks, then the "Why we celebrate Diwali" card. | Counters only for practical things: "Petals filled N of 4", "Diyas on the wall N of 12". No counter for the puja. |

Hints build up as in Govardhan: objective line always; the off-screen cue arrow after 3 s; after 20 s a yellow hint
and the nearest person calls and points; after 40 s the hint names the key. There is no score, timer or fail state.

The why-card buttons: **Back to the islands** fades to paper and goes to `../index.html#done=diwali-ayodhya`
(always shown); **Play again** reloads, keeping `from=hub` if it was there.

## Controls

- WASD or arrows walk. The mouse looks once the pointer is locked (click the game). Without pointer lock, drag to look.
- E or Enter talks, picks up, wears, lights, fills a petal. In a talk, E, Space or a click goes on.
- Esc or P pauses, with the controls and sliders for wobble, paper grain, mouse speed and sound.

## Hash states and self-test

`#vimana #landed #nandigram #padukas #walk #gate #city #rooftops #mothers #lit #today #rangoli #diyas #puja #finale
#end` jump to each beat with a set camera. Add `&yaw=..&pitch=..&wob=..`. `from=hub` can sit alongside
(`#from=hub&city`). No hash plays from the title card.

`#selftest` plays the whole island with the functions the controls call: lands, walks off the vimana to Bharata,
talks, wears the padukas, walks the road (checks 300+ lamps lit, rooftops and walls lit, 12+ people out, warm road),
greets the three mothers, waits through the wide view and the shift, fills 4 petals with different powders, lights the
wall, does the puja, takes mithai and waits for the why-card. 48 checks. The last run printed `SELFTEST PASS` with no
script errors and no console errors (only SwiftShader's GPU-stall notice).

Screenshots were taken with headless Chrome on SwiftShader at 1280×800, one per hash state, into the session
scratchpad, not the repo.

## How it is built (what is new over Govardhan)

- **Lamps are instanced.** About 770 lamps: one `InstancedMesh` each for clay bowls, flames, flame cores and light
  pools (4 draw calls). Flames flicker by scale and pop in with a small overshoot; the core turns towards the camera so
  it always shows. Far flames grow a little with distance so the city still reads lit from the wide view.
- **Ink for instances.** The id pass gives every instance its own id (`gl_InstanceID`), so each lamp is outlined.
  Lamps further than about 26–34 m drop out of the id pass, so far lamps are not swallowed by ink.
- **Light pools** are flat discs in `#f6d27a` with an inner and outer step, drawn without ink like the shadows, on the
  ground, platform, wall or roof under each lamp.
- **Warm lamp-lit ambient.** The toon shader blends the night ambient towards a warm one inside a band that follows
  the lit part of the road (narrow outside the walls, the width of the city inside).
- **Night shadows** turn from the shadow blue to a dark indigo so they never read as water.
- **Floating island** with the hub anatomy: wobbly-rimmed flat top, a 3.4 m earth band, a faceted rock root mass lit
  from below, hanging roots with leaf balls, floating rocks, and flat paper clouds below and around. Walking is
  clamped to the island, the vimana deck and the step between them, sliding along edges.
- **Rama's hands** follow PLAN.md: eye height 1.6 m, KBLUE arms and hands, two gold bangles per wrist, a tapered recurve
  bow (dhanush) with a gold-tipped string held upright in the left fist, the quiver mouth with feathered arrow ends at
  the right shoulder (in a yaw-only frame, so it shows only when you look down). Feet are extra: bare, then padukas.
- **Transitions:** a paper layer with SVG grain covers the page until the first frame draws, then fades over 600 ms.
  Leaving and the shift to today fade it back in with a one-line title.

## New palette triples

| Name | Light | Mid | Dark | Used for |
|---|---|---|---|---|
| Saffron | `#f9a15e` | `#e5803c` | `#6b3414` | Hanuman, the palace flag, Lakshmana's top |
| Marigold | `#ffb84a` | `#ef9a28` | `#74470e` | torans, garlands, Sita's sari, rangoli, laddoos |
| Sandstone | `#f2d6ab` | `#dcb683` | `#7f5e38` | city walls, gate, palace, some houses |
| Plum | `#c18ac8` | `#9d68a6` | `#45244c` | Kaikeyi's border, Riya's mother's sari |

Flat colours: flame `#ffc83d`, flame core `#fff3c2`, light pool `#f6d27a`, night sky `#363a57`, dusk sky `#bdb3a6`,
night shadow `#262a45`. Rangoli powders reuse Tomato, Marigold, Teal, Blush and White.

## What I did not verify

- Only headless Chrome on SwiftShader. Pointer lock, mouse feel, audio, and frame rate on a real laptop GPU are not
  verified. There are about 1,500 meshes plus 4 instanced lamp draws; it should be fine on a laptop GPU but is untested.
- Audio needs a click first (autoplay rules) and was never heard; it is synthesised and untested by ear.
- The hub's `../index.html` was being built in parallel, so the "Back to the islands" link and arriving from the hub
  are untested end to end.
- Safari, Firefox and phones are not tested. There are no touch buttons for E.
- People walk in straight lines; companions can brush through villagers. When you look down hard, the quiver
  feathers sit large in the bottom-right corner.

## Facts for a practising family to check

Confidence in brackets.

1. **Pushpaka Vimana** was Kubera's flying chariot, taken by Ravana; Rama returns in it with Sita, Lakshmana, Hanuman
   and others (Valmiki, Yuddha Kanda). The game shows a small platform with only the three. (high on the vimana, medium
   on who rode with him)
2. **Hanuman went ahead to Bharata at Nandigram** to tell him Rama was coming (Yuddha Kanda, near the end). Hanuman says
   "I flew ahead". (medium-high)
3. **Bharata at Nandigram with the padukas:** he placed Rama's padukas on the throne and ruled from Nandigram as their
   servant for fourteen years, then put them back on Rama's feet when he returned. The game has the padukas on a small
   throne at Nandigram itself. (high on the story, medium on Bharata placing them on Rama's feet himself)
4. **Bharata's dress:** shown as an ascetic, in bark-coloured cloth with matted hair. (high)
5. **The lamps.** That Ayodhya lit rows of lamps for Rama's return, and that this is why Diwali is celebrated in the
   north, is a widely told popular tradition; Valmiki describes the city decorated, but I am not sure lamps on Amavasya
   are in the text. (medium on the tradition, low on a textual source)
6. **Amavasya:** Lakshmi Puja on Diwali night falls on Kartika (Ashvin, in the amanta calendar) Amavasya. That Rama
   arrived on that exact night is popular, not textual. The "about twenty days after Dussehra" link is also popular.
   (high on the puja night, low on the arrival date)
7. **The three queens** are shown in white, as widows after Dasharatha's death, with coloured borders to tell them
   apart. Kaushalya is Rama's mother, Sumitra is Lakshmana's (and Shatrughna's), Kaikeyi is Bharata's. Their lines are
   mine. Valmiki has Rama greet all the mothers with respect; Kaikeyi's apology and lamp are an invented, peaceful
   reading. Please review the tone. (high on names, the lines need review)
8. **"Siyavar Ramchandra ki jai"** is used as the crowd call, as in Ramlila. (high)
9. **Lakshmana and Bharata with jata**, Lakshmana with a bow, Hanuman with a gada, crown and tail, Sita in a marigold
   sari. Traditional, but iconography varies. (medium)
10. **Deepavali** means "row of lamps" (deepa + avali). (high)
11. **Naraka Chaturdashi:** Krishna and Satyabhama's victory over Narakasura, celebrated especially in the south. (high)
12. **Kali Puja** in Bengal on the same Amavasya. (high)
13. **Bandi Chhor Divas:** Guru Hargobind released from Gwalior Fort, arriving at Amritsar. (high)
14. **Jains:** Mahavira's nirvana (moksha) at Pavapuri on Diwali. (high)
15. **Five days:** Dhanteras, Naraka Chaturdashi (Chhoti Diwali), Lakshmi Puja, Govardhan Puja (Annakut), Bhai Dooj.
    Regions differ. (high)
16. **Lakshmi Puja items:** a low chowki with red cloth, Lakshmi seated on a pink lotus (faceless figurine), a kalash
    with mango leaves and a coconut, coins, a bell, the aarti lamp waved in circles, marigolds. Nani sings the first
    words of "Om Jai Lakshmi Mata", the common Lakshmi aarti. (medium; family practice varies)
17. **Rangoli** with coloured powder at the doorstep, akash kandil paper lanterns (common in Maharashtra), torans of
    mango leaves and marigolds, sharing mithai with neighbours. (high, regional)

## Credit

The look is inspired by **Colorfigures by April Zhu** (https://april-zhu.com/colorfigures, MIT, Copyright (c) 2026
April Zhu). No Colorfigures code is copied. The engine is from the team's `govardhan-fpv`. three.js is MIT and loads
from the CDN.
