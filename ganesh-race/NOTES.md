# Ganesh Chaturthi · Ganesha's race round the world · you are Ganesha

One island of the Festival Islands game. Open `index.html` in Chrome. It is one file with no build step. three.js 0.160.0
loads from jsDelivr through an import map, and Baloo 2 loads from Google Fonts, so the page needs the network. The engine
is copied from `../govardhan-fpv/` (toon shader, id and depth ink pass, wobble and grain, flat shadows, HUD, dialogue,
escalating hints, synth audio, hash states, self-test). The floating-island edge, distance fog, paper transitions and
why-card follow `../dussehra-rama/`.

## Beats

| # | Beat | What you do |
|---|---|---|
| 1 | Kailash | A snowy floating island with a five-sided snow peak. Shiva and Parvati sit together on a dais. Narada rides in on a small paper cloud. Greet him (E). He brings one golden mango that can't be cut or shared. Parvati sets the race: round the whole world three times. Kartikeya leaps onto his peacock and flies off. |
| 2 | The race | Walk to the prayer-flag cairn at the edge with Mushak. Mushak tires ("Huff... puff..."). At the edge he says the world goes on and on, and he only has four little legs. Kartikeya circles six far islands the whole time, on a weaving loop marked by a trail of paper puffs. |
| 2b | The puzzle | "Think: how can you go round the whole world?" Help builds up: after 5 s, "What is the whole world to you?" (Mushak says it); after 16 s, "Your parents are your world" (Narada says it, the parents glow and the arrow appears); after 30 s, the exact key (go back, press E to bow, walk three rounds). You can bow (E) as soon as you work it out. |
| 2c | Pradakshina | Walk three rounds clockwise round the ring of stones, keeping Shiva and Parvati on your right. Counter: "Rounds N of 3". Going the wrong way doesn't count, and a hint explains why. Each round rings a bell and drops petals. Sprinting and jumping while circling still count. |
| 3 | The fruit | Parvati gives you the mango (it shows in your left hand) and your trunk lifts. Kartikeya flies home, lands, is surprised, then smiles: "You are wise, brother." You invite him to sit with you. |
| 4 | Today | The paper fades into a street mandal: houses, marigold strings, a bamboo-and-cloth pandal with a big Ganesha. **Shape your own clay Ganesha** at Kumbhar Kaka's (hold to shape the base, belly, head, ears and trunk; counter "Clay Ganesha N of 5"). Carry it to the mandal and set it beside the big one (E). **Fold modaks** with Aaji (hold to pleat, 3). **Join the aarti** (E): hold to wave the lamp. Bells ring and people sing. It has no counter and ends on its own after 12 s. **Procession**: pick up your Ganesha (E). Dhol-tasha drums start, and people call "Ganpati Bappa Morya!". Walk to the pond and **immerse** it (E): the same clay figure slides in, sinks and melts away into the water, with ripples, while people call "Pudhchya varshi lavkar ya!". |
| 5 | Why-card | "Why we celebrate Ganesh Chaturthi", with word chips, "Play again" and "Back to the islands" (`../index.html#done=ganesh-race`). |

Controls: WASD walk, mouse look, E talk and use, hold the left mouse button or Space to shape and pleat, Space jumps
(about 0.6 m; vy 4.6, gravity 15, a soft tock and a camera dip on landing), Shift sprints (1.7x, faster bob, FOV +4°).
Space holds only when a hold prompt is showing, and jumps otherwise. There is no sprint and no jump during a hold. Esc
pauses. The default wobble is 1.8.

## First-person Ganesha

- Eye height 1.4 m. Chubby hands in **SINDOOR** skin with gold bangles and gold armlets. A pleated white modak sits in
  the right hand. The hands sit low in the bottom corners and never cover the middle of the view.
- **The trunk** is a nine-segment curve from below your face to the bottom middle of the view. Each joint has its own
  ink line, so it reads as wrinkles. Only the last ~10 cm show, about 85 px tall at 800 px. It sways side to side with
  your step (more when you sprint) and lifts and curls when you're happy (the mango, each round, finished clay, modaks).
- A round sindoor belly with a yellow dhoti and a teal snake belt shows when you look down.
- Mushak trots ahead and to your left, with hopping legs and a swinging tail.
- The carried clay Ganesha and the aarti thali sit low and to the right.

## New colour triples (light / mid / dark)

| Name | Light | Mid | Dark | Used for |
|---|---|---|---|---|
| SINDOOR | `#f59a6b` | `#dd6f3f` | `#702c14` | Ganesha's skin (hands, trunk, belly; the mandal idol) |
| SNOW | `#fbfaf5` | `#dde2ea` | `#8d97aa` | Kailash ground, snow caps, mounds |
| SROCK | `#cfc6bb` | `#a69b8f` | `#554b42` | Kailash rock, the dais, ring stones, ghat steps |
| SHIVA | `#aebdda` | `#8698bf` | `#36466b` | Shiva's ash-blue skin |
| DEODAR | `#88bf8d` | `#5d9669` | `#244a32` | snowy pines |
| PEA | `#74b0de` | `#3f7fc0` | `#1b3a68` | peacock body, feather eyes |
| PEAG | `#9fd27f` | `#5fae58` | `#22552b` | peacock train |
| WING | `#8fc7c9` | `#5aa3a8` | `#1f4d52` | peacock wings |
| MANGO | `#ffd25a` | `#f2a531` | `#7a4c10` | the golden mango |
| MODAK | `#fdf6e6` | `#eadfc6` | `#a69878` | modaks |
| MATI | `#dcc6aa` | `#b79f82` | `#5d4b3b` | unpainted clay for the eco idol (its own material, which melts to TEAL) |
| MOUSE | `#c3b8ad` | `#9b8e82` | `#4c433b` | Mushak |
| PAVE | `#ece0c8` | `#d6c6a7` | `#7f6e52` | the town ground today |
| ROAD | `#ddd5c6` | `#c0b6a4` | `#6f6657` | the lane |
| PURPLE | `#c0a3dc` | `#9878c2` | `#40295e` | Aaji's sari |
| GREY | `#e4e0da` | `#bdb7ae` | `#6b655d` | Aaji's hair |
| SAFFRON | `#f6a04f` | `#de7d30` | `#6e3511` | the same values as Dussehra: pheta turbans, the pandal roof |

## Hash states and self-test

`#kailash #race #think #rounds #fruit #brother #today #shape #modak #aarti #procession #visarjan #why #overview` jump to
each beat with a set camera. `&yaw=`, `&pitch=` and `&wob=` work, and `from=hub` can sit alongside them. `#selftest`
plays the whole island with the same functions the controls call. It checks:

- the island edge, Narada's arrival and Mushak beside you
- a 1 s sprint against a 1 s walk (6.1 m against 3.6 m), and a jump that peaks at 0.63 m and lands on the island
- the talk, the takeoff and the loop (95 m or more out)
- walking to the edge and Mushak getting tired
- all three hint levels, with their texts
- the bow, three rounds (sprinting on round 2, jumping on round 3), the mango and Kartikeya landing ("You are wise, brother.")
- the shift to today
- shaping all five parts (no sprint while shaping), carrying, and setting the idol in the mandal
- that Space holds rather than jumps at Aaji's table, and three modaks
- that the aarti shows no counter and ends on its own
- the procession, and that the immersed idol is the one you shaped (same object uuid), then the dissolve, the why-card and the back button
- no script errors

The last run printed **SELFTEST PASS**. Screenshots were taken with headless Chrome on SwiftShader at 1280×800, and
saved to the session scratchpad, not the repo.

## Changes from PLAN.md, and why

- **The aarti ends on a 12 s timer**, not on any input, so it can't be scored or failed. Holding only waves the lamp.
- **You place your clay Ganesha in the mandal** between shaping and the aarti, and pick it up again for the
  procession. That way the idol you shape is the one at the aarti and the one you immerse.
- **The water is a pond with ghat steps on the island**, rather than a river or the sea, since the island floats. The
  why-card mentions rivers, lakes, the sea and home buckets.
- **Two arms, not four.** Four first-person arms would crowd the view. The mandal idol has four.
- **Kartikeya rides standing-astride** on the peacock (his dhoti hides in its body). He grows with distance (up to
  4.4x) so you can read him on the far loop.

## Known gaps, not verified

- Only tested headless on SwiftShader. Real pointer lock, frame rate, audio and Safari or Firefox are not verified.
- NPCs walk straight lines and only push apart softly. Drummers can brush past you.
- The procession drummers face you while they walk ahead.
- No touch buttons for hold or jump.

## Facts for a practising family to check

Confidence is my honest guess.

1. **The race for the fruit (the mango).** The fruit is often a mango (jnana-pazham, "fruit of knowledge", in the Tamil
   telling linked to Palani) brought by Narada. The "round the world three times" is from PLAN.md. Many tellings say
   once. *Medium.*
2. **Ganesha circles his parents, saying they are his world.** Widely told. *High.* In many tellings Kartikeya leaves
   for Palani, hurt. The game deliberately keeps him warm ("You are wise, brother") instead. *Artistic choice.*
3. **Mushak (Mooshak) as Ganesha's vahana**, and Kartikeya's peacock (Paravani). *High.*
4. **Parvati shaped Ganesha** (from turmeric paste or clay, in most tellings). The game says only "Parvati shaped him with
   her own hands". The beheading is left out on purpose. *High.*
5. **Shiva's details:** jata with a crescent moon, a snake at the neck, trishul and damaru, the tiger skin, and Nandi.
   Parvati on his left. *High.*
6. **Narada's "Narayana, Narayana"** and his veena. *High.*
7. **Ganesh Chaturthi date:** Bhadrapada Shukla Chaturthi, August or September. *High.* **It ends on Anant Chaturdashi**
   after up to 10 days, with 1.5, 5 and 7-day immersions common at home. *High.*
8. **Lokmanya Tilak and the public festival in the 1890s** (often given as 1893 in Pune). Bhausaheb Rangari is also
   credited with an 1892 public Ganpati. The card says Tilak "helped turn" it public. *Medium-high.*
9. **Modaks:** rice-flour dough with coconut and jaggery (ukadiche modak). The "21 modaks" offering is common in
   Maharashtra. *High.*
10. **Calls:** "Ganpati Bappa Morya", "Mangal Murti Morya" and "Pudhchya varshi lavkar ya" (Marathi: "come soon next
    year"). *High.* Please check the Marathi spelling in Roman letters.
11. **Aarti:** "Sukhakarta Dukhaharta" (attributed to Samarth Ramdas), with the refrain "Jai dev, jai dev". Only the
    opening words are used. *High.*
12. **Eco-friendly idols:** plain clay (shadu mati) dissolves, while plaster of Paris and paints harm water. Home or
    artificial-pond immersion is common now. *High.*
13. **Dhol-tasha** troupes lead processions in Pune and Mumbai. The pheta turbans are saffron. *High.*
14. **Kailash** is drawn as a five-sided snow pyramid. The real peak is often described as four-faced. *Artistic.*
15. Names **Sai, Ira, Kumbhar Kaka, Aaji, Guruji, Meera Tai and Nikhil Dada** are invented, everyday names.
16. **Depiction:** everyone, gods included, is a faceless figurine. You never see Ganesha's face, only the trunk,
    hands and belly. The mandal idol has a trunk, ears and a crown, but no face. Please ask someone from the community to
    review the tone of the lines.

## Credit

The look is inspired by **Colorfigures by April Zhu** (https://april-zhu.com/colorfigures, MIT, Copyright (c) 2026 April
Zhu). No Colorfigures code is copied. three.js is MIT and loads from the CDN.
