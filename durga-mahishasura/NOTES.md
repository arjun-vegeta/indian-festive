# Durga Puja · Durga and Mahishasura, as Durga (round 2 island)

Open `index.html` in Chrome. It is one file with no build step. three.js 0.160.0 loads from jsDelivr through an import
map. Baloo 2 and Baloo Da 2 (for the Bengali words) load from Google Fonts, so the page needs the network. The engine
is copied from `../govardhan-fpv/` (toon shader, id+depth ink pass, wobble and grain, flat shadows, HUD, dialogue,
hints, synth audio, hash states, self-test), with the floating-island, fog, caption and paper-fade code that
`../dussehra-rama/` added to it. The scene and story are new.

You are Durga. You see ten arms, five on each side, fanned from low to high so the middle of the view stays clear.
Each arm has a white sari sleeve with a red border, a gold armlet, golden skin, and white shakha and red pola bangles.
The eye height is 1.7 m, and 2.5 m on the lion. The self-test checks that no hand is nearer the centre than half the
half-width of the screen.

## Beats

| # | Beat | What you do |
|---|---|---|
| 1 | The gods in trouble | Nine gods stand in a circle on an alpana floor. Indra, Brahma, Vishnu and Shiva explain the boon. Hold to gather their light: beams in each god's colour meet in an orb in front of you. A flash, your eyes open, and the ten arms unfold. Caption: "You are Durga". |
| 2 | The gifts | Turn to each god and press E. The gift flies from their hands into one of yours, and the fingers close round it. Counter "Gifts N of 10". Indra gives two (vajra and bell). Kala's sword comes with a shield on the forearm. Varuna's conch sounds when it arrives. |
| 3 | The lion | Himavan walks in with a lion. Ride it (E). The eye rises to 2.5 m, the lion runs at 8.2 m/s, and the lion's leap is bigger. |
| 4 | Mahishasura | A huge faceless buffalo-horned figure talks, then turns to dust. Four short rounds: he whirls up somewhere else as dark dust, and takes his next shape (buffalo, lion, elephant, giant) when you face him. Hold to steady the trishul with the Govardhan gold-dot balance, then let go. The trishul strikes and flies back to your hand. The giant topples backwards in a ring of dust. No blood, no beheading. |
| 5 | The gods rejoice | Marigold, hibiscus and white shiuli petals rain and settle on the ground. The palace flags turn saffron. |
| 6 | Today | A paper fade to a Kolkata para at night: a bamboo-and-cloth pandal with fairy lights, the pratima of Durga on her lion with Lakshmi, Saraswati, Ganesha and Kartikeya under a painted arch. Your extra arms fold away (at home, two hands are enough). Play the dhak with Gopal Kaku (tap along; nothing is counted or scored), dance with a smoking dhunuchi, take flowers and offer pushpanjali with everyone (never scored or timed). Vijaya Dashami: watch sindoor khela from about 11 m away. Then take the front of the pole and carry the pratima to the ghat while everyone calls "Asche bochor abar hobe!". She goes gently into the river, people say "Shubho Bijoya!", and the why-card shows. |

Controls: WASD walk, mouse look, Space jump, Shift sprint (1.7x, on foot or on the lion), E talk and take, hold the left
mouse button (or Space when a Hold or Tap prompt is showing) to gather, steady, dance and offer. Esc pauses. The
hand-drawn wobble defaults to 1.8.

## Hash states and self-test

`#gods #light #awake #gifts #armed #lion #ride #battle #throw #shift #fall #flowers #today #dhak #dhunuchi #anjali
#sindoor #bisarjan #immerse #why #overview`, plus `&yaw=`, `&pitch=`, `&wob=` and `&from=hub`. The why-card's "Back to
the islands" goes to `../index.html#done=durga-mahishasura`.

`#selftest` plays the whole story with the functions the controls call. It also checks the jump (0.63 m on foot, it
lands on the island), the sprint (7.5 m in 1 s against 4.4 m walking), the lion's eye height, speed and leap, and that
the hands stay out of the middle. The last run printed `SELFTEST PASS` with no script errors.

## New palette triples (light / mid / dark)

| Name | Light | Mid | Dark | Used for |
|---|---|---|---|---|
| Durga's golden skin | `#f2bb74` | `#d8984c` | `#79491e` | your arms, the pratima |
| Lion | `#f6cf6a` | `#e0aa3e` | `#7a5418` | Durga's lion |
| Mane | `#e8954a` | `#c8732e` | `#62320f` | the lion's mane |
| Asura | `#8e8aa8` | `#67638a` | `#2a2742` | Mahishasura's shapes, dark flags |
| Char | `#8a8076` | `#665d54` | `#2c2620` | Kala, dust, the dark lion's mane |
| Steel | `#eef1f4` | `#c3cbd3` | `#5d6670` | sword, spear blade |
| Ash | `#cfd8e8` | `#a9b4ca` | `#56617c` | Shiva, Himavan |
| Maroon | `#c25a6a` | `#9c3c4f` | `#46172a` | Yama, Mahishasura's dhoti, staff |
| Saffron | `#f6a04f` | `#de7d30` | `#6e3511` | Agni, flags after victory |
| Cream | `#f0d6b4` | `#d8b78f` | `#7d6244` | lion muzzle |
| Vermilion | `#f0533f` | `#cf3a2b` | `#5e1810` | sindoor |
| Kash | `#fdfbf4` | `#ece6d6` | `#aca38c` | kash grass plumes, dhak plume |
| River | `#8fd0d6` | `#6db3bd` | `#2c5961` | the river and its waterfalls |

## What is different from PLAN.md, and why

- **In the today part you are still Durga, come home as a daughter.** Bengal sees Durga Puja as Uma's homecoming, so
  Thakuma greets you with "Esho, Ma" (elders call girls "Ma"). Eight arms fold away and only two hands stay. This is my
  reading, not the plan's words. Please have someone from the community check whether Durga joining her own
  pushpanjali and immersion feels right, or whether the player should become a girl of today.
- **The pratima has no Mahishasura at its feet**, so there is no trishul in a body anywhere in the game.
- **Ten gifts in ten hands:** Indra's vajra and bell count as two, and Kala's sword and shield as one (the shield sits on
  the forearm).
- **The battle is four short rounds**, one per shape, with the last shape (the giant) toppling.
- **The river runs off both ends of the island** as waterfalls into the clouds. The lion does not leap between islands.

## Known gaps (not verified)

- Only headless Chrome with SwiftShader was tested. Pointer lock, audio, and frame rate on a real GPU are not verified.
- The ten arms are chunky and fill the side columns. They read as the signature, but they could be slimmer.
- When you look straight down from the lion you see its mane; there are no reins or legs animation.
- People walk in straight lines and the procession followers can overlap.
- Only the screenshots of `#armed`, `#light`, `#throw`, `#dhak` and `#why` were looked at. The other states were only
  run by the self-test.

## Facts for a practising family to check

Written from memory, not checked against a primary source.

1. **Source:** Devi Mahatmya (Markandeya Purana), chapters 2 and 3. The gods' anger and light join into the Devi, and
   each god gives a weapon: Shiva the trishul, Vishnu the chakra, Varuna the conch, Agni the spear (shakti), Vayu the
   bow, Indra the vajra and Airavata's bell, Yama the staff, Brahma the water pot, Kala the sword and shield, Himavan
   the lion. Confidence: medium on the exact list.
2. **The boon** ("no man and no god can defeat him") is the popular telling. Versions differ.
3. **Shapes:** the text has him become a lion, a man with a sword, an elephant and the buffalo again, and the Devi kills
   him as he half emerges. The game uses the plan's order and only a topple. No beheading.
4. **"Jaya Mahishasuramardini"** and "Jai Maa Durga" are used as the gods' cheer. Check the tone.
5. **Uma's homecoming:** Durga visits her parents' home (Himavan and Menaka) for the Puja with her four children.
   Confidence: high as a Bengal belief.
6. **The ek-chala arrangement:** Lakshmi and Ganesha on one side, Saraswati and Kartikeya on the other. I put Lakshmi
   and Ganesha on the viewer's left. Please check the sides.
7. **Pushpanjali** is usually on Ashtami morning. **Sindoor khela** is on Vijaya Dashami, by married women. **Dhunuchi
   naach** is at the evening aarti. Confidence: medium.
8. **Words and spellings to check (Bengali):** দুর্গা পূজা (Durga Puja; also written দুর্গাপূজা), ঢাক (dhak),
   সিঁদুর খেলা (sindoor khela), আসছে বছর আবার হবে ("Asche bochor abar hobe", shown in Latin letters only),
   শুভ বিজয়া ("Shubho Bijoya"), ঠাকুমা (Thakuma), পুরোহিত মশাই (Purohit Moshai), দারুণ ("Darun"), ধুনুচি (dhunuchi).
   Hindi: दुर्गा पूजा, नवरात्रि. Please have a Bengali reader check every spelling and the transliterations.
9. **"Durga Mai ki jai"** is used in the procession. In Bengal "Bolo Durga Mai ki, jai!" is common. Check.
10. **Garba and dandiya** in Gujarat and **golu** dolls in the south are on the why-card. Confidence: high.
11. Names Gopal Kaku, Rina Mashi, Mitali, Shampa, Bulbul, Rupa, Tutun, Bablu, Bapi, Montu and Kanu are made up.

## Credits

Engine and look from `../govardhan-fpv/`. The look is inspired by **Colorfigures by April Zhu**
(https://april-zhu.com/colorfigures, MIT, Copyright (c) 2026 April Zhu). No Colorfigures code is copied. three.js is
MIT and loads from the CDN without being bundled.
