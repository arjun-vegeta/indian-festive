# indian-festive

Playable prototypes from Festive Hacks 2026 (WeMakeDevs × WeAreDevelopers, Bengaluru). They teach Indian festivals through play, in one hand-inked look.

| Folder | What it is | Open |
|---|---|---|
| `index.html` | Festival Islands hub. Walk to a gate to enter one of the three stories. | open `index.html` in Chrome |
| `dussehra-rama/` | First-person Dussehra story, from building the setu to the modern Ramlila. | open `dussehra-rama/index.html` |
| `diwali-ayodhya/` | First-person Diwali story about Rama returning to Ayodhya and lighting lamps. | open `diwali-ayodhya/index.html` |
| `govardhan-fpv/` | First-person game. You are young Krishna: persuade Vraj, lift Govardhan hill on your little finger, and play the flute to bring everyone under it. Three.js, low-poly, hand-inked. | open `govardhan-fpv/index.html` in Chrome |
| `colorfigures/` | The same story as an isometric, hand-inked step-through. This is where the design language comes from. | open `colorfigures/index.html` |

Each folder has `NOTES.md` (mechanics, how it was built, facts to check) and `shots/`. The design language is written up in [`DESIGN.md`](DESIGN.md).

The game has no build step. The hub and three first-person stories load Three.js from a CDN and share local audio scripts, so keep the folder structure intact and use an internet connection.

**Controls (govardhan-fpv):** WASD to move, mouse to look (drag if the mouse isn't captured), E to talk, hold the mouse or Space to lift, F or right-click for the flute, Esc to pause.

## Audio and verification

Select **Begin** to hear a short Apple Music preview chosen for each island. Each story brings its cue back once at a transition. The previews stream from Apple, and the title cards link to the recordings. The pause menu’s **Sound** slider controls the game's music, narration and effects.

Key conversations, including the player character's replies, are authored in `audio/dialogue.js`. Sarvam voices and the three transition cues are configured in `scripts/generate-narration.ts`. Use Node 22.15 or later and set `SARVAM_API_KEY` in your environment to generate the MP3s and their manifest:

```sh
node --experimental-strip-types scripts/generate-narration.ts
node --experimental-strip-types --test tests/*.test.ts
```

The browser reads the generated assets from `audio/`. The player sees the same authored text when a narration clip is unavailable. Open the hub or a first-person story with `#selftest` in Chrome to run its existing gameplay checks.

## Credits

- The look is inspired by [Colorfigures](https://april-zhu.com/colorfigures) by April Zhu (MIT, Copyright (c) 2026 April Zhu), built on iso-glow (April Zhu) and iso-figure (Tolga Cohce). No Colorfigures code is copied; see each `NOTES.md`.
- [three.js](https://threejs.org) (MIT).

## AI use

Built with Claude Code (Anthropic) as the coding assistant. The mythology and festival details are listed in each `NOTES.md` for a practising family to check.
