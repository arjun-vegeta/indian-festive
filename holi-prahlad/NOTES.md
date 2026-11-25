# Holi · Prahlad and Holika, as Prahlad

Open `index.html` in Chrome. It is one file with no build step. three.js 0.160.0 loads from jsDelivr through an import
map, and Baloo 2 loads from Google Fonts, so the page needs the network. The engine is copied from `../govardhan-fpv/`
(toon shader, id+depth ink pass, wobble and grain, flat shadows, HUD, dialogue, hints, synth audio, hash states,
self-test). The floating island, the distance fog, the warm light pools and the paper fade come from `../dussehra-rama/`.
The scene and the story are new.

You are the boy Prahlad, at eye height 1.15 m. You see small hands in SK2 skin, mustard (yellow) kurta cuffs and a
bracelet of green tulsi beads on the right wrist. The hands come together in namaste when you pray.

## Beats

| # | Beat | What you do |
|---|---|---|
| 1 | The palace | Walk up the red carpet to King Hiranyakashipu on his golden throne (E). He orders everyone to worship only him, and the courtiers bow. You say you pray to Vishnu. Hold F (or the right mouse button) to pray: your hands meet in namaste, "नारायण · Narayana" shows, and ink rings of calm spread from you, as Krishna's flute rings do. As the rings reach them, the courtiers lift their heads. The king stands and points, stern but not frightening. |
| 2 | Holika | The king calls his sister Holika, whose shawl fire cannot burn. A pyre appears in the courtyard. Follow her and sit beside her (E). The fire rises round you. Hold the left mouse button or Space to stay calm, and keep the gold dot in the ring against the gusts (Govardhan's balance mechanic). A gold arc fills while the dot stays in. Then a great wind lifts the shawl off Holika. It flies over the court and wraps round you, and you see its teal-and-gold edge framing your view. Thick white smoke rises where Holika sat. When the fire dies down and the smoke clears, she is simply gone. Nobody is ever shown burning. Walk out of the fire to your mother, Queen Kayadhu. |
| 3 | Narasimha | One caption only: "Later, Vishnu came as Narasimha, half man and half lion, to protect Prahlad." The fight is never shown. |
| 4 | Today: Holika Dahan night | A paper fade carries you to the same island today, on indigo paper: a village square with painted houses, diyas on doorsteps and a stack of sticks and cow-dung cakes wound with raw cotton thread. Dadaji lights it with a torch, using the soft flame look. Take new wheat from Amma (E), then walk once round the fire along a ring of paper dots that turn gold as you pass. Offer the wheat into the fire (E). Villagers roast their grain on long sticks. |
| 5 | The next morning: Holi | The paper turns bright and everyone is in white. Take gulal from the bowls on the table (E). Click to throw, and press 1 to 5 to change colour. Flat colour patches stay on the figurines and splat on the ground. Friends throw colour back: inked splashes land on the edges of your screen, and small patches land on your own hands. Villagers also throw colour at each other. Guddu squirts you with his pichkari and will give you his spare one (E), so you can squirt with F. A dhol plays. After you colour three friends, Amma calls you for gujiya (E). Everyone calls "Bura na mano, Holi hai!" and colour bursts in the air. |
| 6 | Why-card | "Why we celebrate Holi": good over evil and Prahlad's faith; Holika Dahan the night before; the full moon of Phalguna, spring and the new wheat; Radha and Krishna's colour play in Braj and Lathmar Holi in Barsana; forgiving and starting fresh. Word chips: होली, होलिका दहन, गुलाल, प्रह्लाद. Buttons: "Play again" and "Back to the islands" (`../index.html#done=holi-prahlad`). |

Nothing is scored, timed or failed. Prayer is never counted. The only progress shown is the gold arc in the fire (how long
you have stayed calm) and the gold dots on the ground round the Holika. Help builds up as in Govardhan: an objective line,
an off-screen arrow after 3 s, a yellow hint and a pointing villager after 20 s, and the exact key after 40 s.

## Controls

- WASD or the arrow keys walk. Click to capture the mouse and look. Without pointer lock, drag to look.
- Space jumps (vy 4.6, gravity 15, about 0.7 m, with a soft tock and a small camera dip on landing). Shift sprints at
  1.7x, with a faster head-bob and the view about 4° wider. There is no sprint while you pray, carry the wheat or squirt,
  and no jump while seated in the fire, in a dialogue or while praying.
- Space also advances dialogue. In the fire, Space holds to stay calm (only once the "Hold: stay calm" prompt shows).
  Everywhere else Space jumps.
- E or Enter talks, sits, takes and offers. F or the right mouse button prays, and later squirts the pichkari.
- Click throws colour at Holi. Keys 1 to 5 change colour.
- Esc or P pauses, with sliders for wobble (default 1.8), grain, mouse speed and sound.
- You cannot fall off the island. Walking is clamped to it and slides along the edge.

## URL contract

- `#from=hub` is read alongside any other part (`#fire&from=hub`). "Play again" keeps it.
- The why-card's "Back to the islands" button always shows. It fades in the paper layer and goes to
  `../index.html#done=holi-prahlad`.
- The page starts under the paper layer (`#f4efe3` with an inline SVG grain) and fades it out over 600 ms after the
  first frame. The title card reads "Holi · Prahlad and Holika" and "You are Prahlad". No localStorage.

## Hash states and self-test

`#palace #pray #holika #fire #shawl #unharmed #night #round #offer #morning #colours #why #overview`, plus
`&yaw=…&pitch=…&wob=…`. `#pray` and `#fire` hold the mechanic in place for a screenshot until you press a key or click.

`#selftest` plays the island end to end with the functions the controls call. It checks eye height, the hand colours,
the jump peak (0.5 to 1 m, and it lands on the island), and that a 1 s sprint covers at least 1.5x a 1 s walk. Then it
walks the carpet, talks to the king, prays until the courtiers are calm, follows Holika, sits, balances through the
gusts, waits for the shawl and the fire to die, walks out, talks to Kayadhu, rides the fade to night, talks to Dadaji,
takes the wheat, walks round the fire, offers, rides the fade to morning, takes gulal, colours three friends, checks the
patches, ground splats and edge-only screen splashes, gets and squirts the pichkari, eats a gujiya and checks the
why-card. The last run printed `SELFTEST PASS` (44 checks) with no script errors.

## New colours (light / mid / dark)

| Name | Light | Mid | Dark | Used for |
|---|---|---|---|---|
| Saffron | `#f6a04f` | `#de7d30` | `#6e3511` | Holika's kurta (same as Dussehra's) |
| Maroon | `#c25a6a` | `#9c3c4f` | `#46172a` | the king's kurta, Holika's sari, the royal umbrella |
| Palace stone | `#f2d2b6` | `#d8ae8e` | `#7c5540` | the hall, the dais, the back wall |
| Courtyard sand | `#f3e0c0` | `#dcc39a` | `#8c7350` | the paved courtyard |
| Niche | `#c98d6a` | `#a96f50` | `#5a3626` | arched niches on the back wall |
| Char | `#8a8076` | `#665d54` | `#2c2620` | burnt logs, the ash sticks |
| Tulsi | `#7fc25e` | `#58a03f` | `#244a1a` | Prahlad's bead bracelet |
| Wheat | `#e6d77e` | `#c4b257` | `#635a24` | new wheat stalks, the charpai |
| Ash | `#d6cfc3` | `#b0a89a` | `#5f584e` | the ash mound on Holi morning |
| Gujiya | `#f5dfb2` | `#dcbc84` | `#7a5f34` | gujiya |
| Limewash blue | `#d3e6ea` | `#b0ccd3` | `#5b7980` | painted houses |
| Limewash pink | `#f4cfc6` | `#dcaaa0` | `#7a4a43` | painted houses |
| Gulal pink | `#f57fb4` | `#d95a93` | `#6e2148` | colour |
| Gulal green | `#94d96e` | `#66b549` | `#2b5c1e` | colour |
| Gulal yellow | `#ffd84d` | `#eab72b` | `#7a5a0e` | colour |
| Gulal blue | `#82a9f2` | `#5b84d8` | `#26407a` | colour |
| Gulal orange | `#ff9159` | `#e66a36` | `#6e2a12` | colour |
| Flame 1 to 4 | `#f46a3e`, `#fb9f40`, `#ffd651`, `#fff5c9` (each with close mid and dark tones) | | | emissive flame tongues, outer to core |

## How the fire is drawn

Each flame is a small cluster of four soft-tipped tongue meshes: lathe teardrops with a rounded tip, bent sideways by
a cubic so they curl. They are coloured red-orange, saffron, gold and a pale core, side by side and each inked. Every
tongue stretches and sways on its own phase. Small detached tongues ("wisps") rise off the tops and shrink away, which
gives the licking-upward motion. The gusts in the fire lean the whole pyre fire the way the wind blows. Smoke is
cloud-palette balls that fade toward the sky colour, and sparks are tiny gold balls. Smoke and sparks only spawn more
than 3.6 m from the camera, so they never fill your view. Near a fire, the toon shader warms the ambient toward
orange, and a flat warm light pool lies on the ground.

## Known gaps and what I did not verify

- Tested only in headless Chrome on SwiftShader at 1280×800. Pointer lock, mouse feel, audio and frame rate on a real
  GPU are **not verified**.
- The shawl's flight is a simple flapping cloth on a curve. It reads as cloth in motion, but it is not simulated.
- Villagers walk in straight lines and only push apart softly.
- Safari and Firefox are not tested, and there are no touch controls for holding or throwing.

## Facts for a practising family to check

These are not verified against a primary source today.
1. **Source:** the Prahlad story is in the Bhagavata Purana, Book 7. Hiranyakashipu's boon, his order that only he be
   worshipped, and Prahlad's devotion to Vishnu are told there. **Holika on the pyre is a later, popular telling**
   (Puranic and folk). I am fairly confident of the outline, not of the verse references.
2. **Holika's shawl:** usually told as a shawl or cloak given by Brahma (some say Shiva) that protected her from fire,
   which flew from her to Prahlad, or whose power failed because she used it to do harm. The game shows the wind
   lifting it onto Prahlad and never shows Holika burning. Medium confidence on who gave the boon.
3. **Narasimha:** Vishnu came as Narasimha, half man and half lion, to protect Prahlad. The game says this in one
   caption and shows nothing of it. High confidence.
4. **Kayadhu** is Prahlad's mother. High confidence on the name. Her lines are invented.
5. **Prahlad's chant:** the game shows "नारायण · Narayana". Many tellings have him chanting "Om Namo Narayanaya" or
   simply "Narayana". Please check what the family prefers.
6. **Holika Dahan customs:** a bonfire on the night of the Phalguna full moon. People walk round it (parikrama), offer
   new grain (wheat ears, green chana, barley), and roast it in the fire. Some wind raw cotton thread round the stack
   and use cow-dung cakes. These vary a lot by region. I am fairly confident on the bonfire, the round and the grain,
   and less sure about the thread and cow-dung cakes, which I believe are mostly north Indian.
7. **Holi date:** the day after Holika Dahan, at the end of Phalguna, usually in March. Check this year's date.
8. **Braj Holi:** Radha and Krishna's colour play is tied to Braj (Mathura, Vrindavan, Barsana, Nandgaon). In **Lathmar
   Holi** at Barsana, women playfully hit men from Nandgaon with sticks while the men shield themselves. High confidence.
9. **"Bura na mano, Holi hai!"** means "Don't mind, it's Holi!". It is a common call. High confidence.
10. **Gujiya** is a sweet dumpling, often filled with khoya and dry fruit, that is typical of Holi in the north. High
    confidence.
11. **Wearing white** on Holi so the colours show is common practice, not a rule.
12. **Depiction:** everyone is a faceless figurine, as in Govardhan. Hiranyakashipu is crowned and stern, standing and
    pointing, with no weapons and no dark or monstrous features. Prahlad is never seen, only his hands. Please ask
    someone from the community to review the tone of all the lines.

## Credit

The look is inspired by **Colorfigures by April Zhu** (https://april-zhu.com/colorfigures, MIT, Copyright (c) 2026 April
Zhu). No Colorfigures code is copied. three.js is MIT and loads from the CDN.
