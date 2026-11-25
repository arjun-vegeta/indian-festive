# Colorfigures study and the Govardhan mockup

Festive Hacks, Bengaluru, 25 Nov 2026. Open `index.html` in a browser. It is one file and needs no server. The only
outside request is the Google Font (Baloo 2), and the page falls back to system fonts without it.

## 1. What the demo is and why it feels good

https://april-zhu.com/colorfigures-demo is a gallery of 26 "Colorfigures": everyday machines (washing machine,
espresso machine, claw machine, toaster and so on) drawn as hand-inked isometric objects you can play with. Each one is
a self-contained HTML page made by an AI agent using April Zhu's Colorfigures skill. The gallery loads each page into an
iframe with `srcdoc`.

How it plays:
- Buttons down the left follow the real process in order, for example Load laundry, Add soap, Choose program,
  Start, Open door. Each press animates a real step. A press out of order shows a short notice ("Insert a coin first")
  or runs the missing step.
- You drag to turn the object all the way round. There are also Front view and Turntable buttons and arrow keys.
- "See-through" fades the case to a ghost and shows the working parts moving inside. "Labels" adds name pills with
  leader lines, and a part's pill lights up while that part is working.
- Big numbers in the top right show a measured quantity (credit, score). There is a zoom chip and a phone layout.

Why it feels good:
- It looks hand-made but stays crisp: three flat shading tones per surface, a heavier ink line on the outer
  silhouette, a flat blue cast shadow, warm paper grain and an SVG wobble filter.
- Every button does something physical and true. Nothing is decoration.
- No instructions on the page. The buttons and the motion tell the story.
- Turning it round and seeing inside rewards curiosity, which suits kids and curious elders.

## 2. Repo and licence

- **April Zhu has no official GitHub repo.** Her skill page has a "View on GitHub" button, but it is hidden because
  its `GITHUB_URL` setting is empty. The official source is the download at
  https://april-zhu.com/colorfigures/colorfigures.zip (also `.tar.gz` and `.skill`).
- **Licence: MIT**, Copyright (c) 2026 April Zhu (Colorfigures and iso-glow) and Tolga Cohce (iso-figure). It adds a
  credit clause: anyone who shares, forks or builds on the skill must keep the licence and credit Colorfigures
  (https://april-zhu.com/colorfigures). Crediting figures made with it is a request, not a requirement.
- Upstream credits: built on ISO-GLOW (https://isoglow.dev, April Zhu, MIT), which is built on iso-figure
  (https://github.com/MrBongoC/ai-iso-skill, Tolga Cohce, MIT). The see-through views follow Anatomy
  (https://github.com/wheresryan22/anatomy, Ryan, MIT). I checked both repos' licences with `gh api`.
- **GitHub mirror:** https://github.com/madearga/colorfigures (MIT). It is a third-party mirror of an **older**
  version of the skill (fixed view, no turning) plus the mirror owner's own examples.
- Where I looked: the demo page's HTML and JS, the skill page (april-zhu.com/colorfigures), the author's home page,
  `gh search repos colorfigures`, `gh api search/users`, and `gh api search/code` for `SKILL.md`. Many other repos
  reuse the skill (pascalandy/skills, jspearson/explainers, lelouvincx/agent-skills and others).
- Local read-only copies (nothing was run or installed):
  - official zip: `(local scratch copy: colorfigures-official-zip/unz/colorfigures/, not in this repo)`
  - GitHub mirror: `(local scratch copy: colorfigures-mirror-repo/repo/, not in this repo)`
  - demo page and its 26 extracted figures: `(local scratch copy: colorfigures-src/, not in this repo)`

## 3. The "skills" and techniques

There is **one agent skill**, `colorfigures` (`SKILL.md` with `name: colorfigures`). It makes an agent build one
self-contained interactive figure. The skill page also offers versions for Claude Code, Claude.ai, ChatGPT/Codex and
Gemini. It points to a sister skill, **iso-glow**, for dark glowing line art; that is not included here. The package
contains:

| File | What it does |
|---|---|
| `SKILL.md` | The instructions the agent follows: workflow, "truth first" research, drawing rules, look, see-through, interaction, reserved names and a verification checklist. |
| `assets/core.js` (~56 KB) | The engine: free orthographic camera, 3D shapes, shading, ink, cast shadows, see-through kit, labels, game keypad and the page shell (`mountFigure`). |
| `assets/examples/` | Reference figures for the agent to read: toaster (smallest), desk lamp, claw machine. |
| `scripts/build.py` | Inlines `core.js` into the figure and appends zoom, notices, phone layout, label legend and keypad CSS/JS, producing one HTML file. |

The techniques the skill teaches (the part worth learning from):
1. **Truth first.** Before drawing, write how the real thing works as steps, and a 30–60 part list in a code
   comment. Every part is held by another, every drive touches what it drives, and moving paths are laid out with
   numbers. Each button is one real step.
2. **No depth buffer, so sort carefully.** Every part goes through `byDepth` with a 3D box. If a plane separates two
   boxes, the one on the viewer's side is drawn last. Faces and anything on them are drawn only when they face the
   viewer (`vis`). Wrapping things (cups, drums) are split into far half, contents, near half.
3. **The look.** Three flat tones from `normal · light`, with the light fixed relative to the viewer so it reads the
   same at every angle. Silhouette ink weighted by thickness on screen. A short flat blue cast shadow. An SVG
   `feTurbulence` + `feDisplacementMap` wobble with paper grain, and the noise is pre-rendered for phones.
4. **See-through and labels.** The case fades to a ghost and the working parts draw over it. Labels are pills in two
   columns either side, sorted so leaders never cross, and lit while their part works. On a phone they become
   numbered badges with a legend.
5. **Interaction.** 2–5 meaningful buttons in the order a person would use them. Every supply comes from something in
   the scene. Out-of-order presses do something sensible. Stats sit top right. URL params open any state for
   screenshots.
6. **Verify.** Headless Chrome screenshots from 7 angles, closed and see-through, plus a `?press=` run of the main
   sequence, a phone shot and an error check through `data-errors`.

## 4. Concepts

1. **Govardhan: the hill that became an umbrella (built).** A village diorama you turn round. Krishna lifts the hill,
   everyone shelters under it through seven days of Indra's rain, then the Annakut "mountain of food" says thank you.
   "See under the hill" ghosts the hill to show who is sheltering. Season: Govardhan Puja, the day after Diwali.
2. **Karthigai Deepam: the endless column of light.** Shiva appears as a pillar of fire with no visible end. Brahma
   flies up as a swan and Vishnu digs down as a boar. See-through cuts away the earth to show the boar digging, the
   camera follows the swan up, and at the end you light the Maha Deepam on Tiruvannamalai hill. Season: Karthigai
   Deepam, Tamil Nadu.
3. **How a diya works, for Rama's return.** A clay lamp as a true "how does it work" figure: pour oil, twist a cotton
   wick, light it. See-through shows oil climbing the wick. Then the lamps line Ayodhya's road for Rama's
   homecoming. Season: Diwali in the north.

**Why Govardhan.** It fits the demo's mechanic best:
- The hill is a real 3D object that physically lifts. Its cast shadow becomes the shelter you can see, and
  "see-through" has a real job: the hill hides the people underneath.
- The story already comes in ordered steps (storm, lift, shelter, seven days, set down, thank-you), so each one
  becomes a button.
- There is a natural measured quantity ("days of rain 3 of 7", "dry and safe 9 of 9"). It counts shelter, not
  worship.
- It ends in a real festival practice (Annakut and Govardhan Puja), which makes the "why we celebrate" moment
  concrete.

The Karthigai column is visually strong, but it is about something without ends, which fights a bounded, framed
figure. The diya is the closest to Colorfigures' "how does X work" idea, but it carries less story.

## 5. What is playable in `index.html`

- Seven story buttons in order: Indra's storm, Lift the hill, Shelter everyone, Seven days pass, Set the hill down,
  Offer the Annakut, and Why we celebrate. The next step is highlighted. Out-of-order presses show a gentle notice
  ("Lift the hill first: there is no room under it yet"). "Seven days pass" runs the shelter step first if needed.
- Drag to turn the village all the way round, double-click or press "Front view" to reset. Turntable, arrow keys and
  a hand-drawn wobble slider are included.
- "See under the hill" (ghosts the hill) and "Names" (labels in two columns on desktop, numbered badges and a legend
  on a phone).
- Stats: "Days of rain N of 7" and "Dry and safe N of 9". The Annakut has no counter and no timer, so worship is
  never scored or rushed.
- A one-line story caption under the figure for each step. Colorfigures deliberately has no text on the page; for
  kids learning a story, I added one sentence per step.
- The "Why we celebrate Govardhan Puja" card, with four short points and Hindi word chips (गोवर्धन, अन्नकूट,
  गिरिधारी, इंद्रधनुष).
- Hash states for direct links and screenshots: `#start #storm #lifted #sheltered #days #rainbow #down #annakut
  #why`. Add `&xr`, `&labels`, `&yaw=150`, `&pitch=35` as needed. `&play=N` auto-plays the first N buttons, which
  is useful for a demo loop and for tests.
- Screenshots are in `shots/` (desktop states, a view from behind, the auto-played flow, and two phone views at a
  true 390 px width).

Verified: no console errors in any state, and `data-errors` stays empty. The auto-played run goes all the way to the
why-card. The hill correctly hides things behind it.

Known limits:
- Rain is not drawn inside the "see-through" ghost. The hill's underside cap is never visible because pitch stays
  between 8° and 40°.
- Walkers move in straight lines and can briefly pass through each other.
- I did not test on a real phone, only in headless Chrome at 390 px. I also did not measure performance on a
  low-end phone; the SVG filter runs every frame while it rains.
- Headless Chrome on macOS has a minimum window width of 500 px, so a plain `--window-size=390,844` screenshot is a
  crop of a 500 px layout. The phone shots were taken through a 390 px iframe instead.

## 6. What was reused and what was written

- **No Colorfigures code is copied.** The engine in `index.html` (camera, shading, loft, rods, balls, ellipsoids,
  hull ink, the topological depth sort, cast shadows, labels, animation driver) and every piece of art were written
  for this mockup in SVG drawn from code. No images were downloaded, embedded or traced.
- **Ideas taken from Colorfigures, with credit** in the file header, the page footer and here:
  - the overall look (flat three-tone shading with the light fixed to the viewer, heavier silhouette ink, a flat
    blue cast shadow, paper grain and a wobble filter);
  - the play pattern (ordered real-step buttons, a turnable view, see-through with lit labels, top-right stats,
    gentle out-of-order notices, URL states for screenshots);
  - the box-separation rule for draw order.
- These are general graphics techniques (orthographic projection, painter's algorithm with separating planes,
  Andrew's monotone-chain hull, SVG feTurbulence and feDisplacementMap). The specific code, palettes and parameters
  here are our own.
- If the team later decides to adopt `core.js` itself, MIT allows it, but the LICENSE text and the Colorfigures
  credit must ship with it.

## 7. Mythology and festival facts to check before the demo

I have not verified these against a primary source today. Please check them:
1. The story is from the **Bhagavata Purana, Book (Skandha) 10, chapters 24–25**. Krishna asks the people of Vraj
   to honour Govardhan hill, the cows and the brahmins instead of holding their yearly sacrifice to Indra. Indra
   sends a storm, and Krishna lifts the hill. Confirm the chapter numbers.
2. **Seven days** of rain, with the hill held up all that time. This is widely stated; confirm the verse.
3. **"Little finger of his left hand."** This is the popular telling and the common image. As I recall, the
   Bhagavata itself says "with one hand", easily, like a child holding a mushroom. The story caption says
   "little finger of his left hand", and that line may need softening.
4. **"Little Krishna."** He is usually said to be about seven years old. The page avoids stating an age.
5. Afterwards **Indra apologises**, and in the text Surabhi the cow bathes Krishna and he is named **Govinda**. The
   page only says Indra "stops the rain and is sorry".
6. The **rainbow** is my artistic choice and is not in the story. The page only states the language fact: in Hindi a
   rainbow is **इंद्रधनुष (Indradhanush), "Indra's bow"**. Check that this framing is acceptable.
7. **Govardhan Puja falls the day after Diwali** (Kartika Shukla Pratipada). In some years there is a one-day gap
   because of the tithi. I did not check this year's date.
8. A **Govardhan figure traditionally made of cow dung** and walked around (parikrama) in North Indian homes; also the
   **Annakut** (अन्नकूट, "mountain of food"), often said to be **56 dishes (chhappan bhog)**. The page does not
   state the number.
9. **Giridhari** (गिरिधारी), "the one who holds the mountain". Also check the spelling of each Hindi word chip.
10. Depiction: Krishna is drawn as a simple figurine like everyone else, with blue skin, yellow pitambar, a gold crown
    and a peacock feather, and no face details. Ask someone from the community to review it for respectfulness.
11. The cowherds are called gopas and gopis. Govardhan hill is near Mathura in Uttar Pradesh. Neither fact is stated
    as a number on the page.
