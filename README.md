# indian-festive

Playable prototypes from Festive Hacks 2026 (WeMakeDevs × WeAreDevelopers, Bengaluru). They teach Indian festivals through play, in one hand-inked look.

| Folder | What it is | Open |
|---|---|---|
| `govardhan-fpv/` | First-person game. You are young Krishna: persuade Vraj, lift Govardhan hill on your little finger, and play the flute to bring everyone under it. Three.js, low-poly, hand-inked. | open `govardhan-fpv/index.html` in Chrome |
| `colorfigures/` | The same story as an isometric, hand-inked step-through. This is where the design language comes from. | open `colorfigures/index.html` |

Each folder has `NOTES.md` (mechanics, how it was built, facts to check) and `shots/`. The design language is written up in [`DESIGN.md`](DESIGN.md).

No build step. Both are single HTML files. `govardhan-fpv` loads three.js from a CDN, so it needs internet.

**Controls (govardhan-fpv):** WASD to move, mouse to look (drag if the mouse isn't captured), E to talk, hold the mouse or Space to lift, F or right-click for the flute, Esc to pause.

## Credits

- The look is inspired by [Colorfigures](https://april-zhu.com/colorfigures) by April Zhu (MIT, Copyright (c) 2026 April Zhu), built on iso-glow (April Zhu) and iso-figure (Tolga Cohce). No Colorfigures code is copied; see each `NOTES.md`.
- [three.js](https://threejs.org) (MIT).

## AI use

Built with Claude Code (Anthropic) as the coding assistant. The mythology and festival details are listed in each `NOTES.md` for a practising family to check.
