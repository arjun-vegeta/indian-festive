# Design language

Hand-inked, paper-and-ink festival figures. It started as isometric SVG (`colorfigures/`) and was carried into first-person 3D (`govardhan-fpv/`). Inspired by Colorfigures by April Zhu (MIT).

## Rules

1. **Paper, not screen.** The background is paper `#f4efe3` with a fine fractal-noise grain multiplied over everything. The storm turns it to grey paper (`#e3e3dd`) and night to indigo paper.
2. **Warm ink.** Every part gets an outline in `#2a2118`. Silhouettes are heavy and lines between parts are finer. Never pure black.
3. **Three flat tones per surface**, from one light: light, mid and dark, picked by `dot(normal, light)`. The thresholds are `hi .45` and `lo -.28`, blended over a narrow band (`w .09`). The light sits to the right, high and a little behind, and turns with the viewer, so tops read light, fronts mid and far sides dark.
4. **Hand-drawn wobble.** Noise displacement moves fills and lines together. SVG uses `feTurbulence` at `baseFrequency .055`, 2 octaves, `feDisplacementMap` at scale `2.4`. The slider runs 0 to 7. In 3D it's a post-pass UV displacement that re-rolls 4 times a second.
5. **Short flat blue shadows** in `#4f5f9a`, cast along one fixed sun.
6. **Chunky figurines:** a cone dhoti or kurta, a ball head, a hair cap or turban. Low-poly forms are real meshes, never sprites or billboards.
7. **Type and UI:** Baloo 2 (500/700/800). Buttons and toasts are paper pills with a `1.7px` ink border, plus a `3px 3px 0` offset ink shadow on the active one. Accent `#f6b93b`, muted text `#8a7f6c`, rules `#dcd3c1`.

## Palette (light / mid / dark)

| Name | Light | Mid | Dark |
|---|---|---|---|
| Grass | `#b4d98b` | `#93c16c` | `#4d7739` |
| Hill | `#a3d27b` | `#7fb258` | `#3e6530` |
| Earth | `#d6b07e` | `#b58b58` | `#6b4a2a` |
| Rock | `#e7c38f` | `#c9a068` | `#7c5934` |
| Krishna blue | `#86a5e3` | `#6383c6` | `#2e4278` |
| Gold | `#f7c84a` | `#d9a32b` | `#6e5015` |
| Tomato | `#ef7157` | `#cf5641` | `#5a251a` |
| Blush | `#f4abc0` | `#d98ba2` | `#5b2b39` |
| Teal | `#82d0c2` | `#5fb2a4` | `#204b43` |
| Indigo | `#9195e3` | `#6e72c6` | `#2d306c` |
| Mustard | `#f4bf45` | `#d59f2a` | `#5f4614` |
| White cloth | `#fbf7ec` | `#e3dbca` | `#a89d86` |
| Skin 1 | `#e1a87b` | `#c48a5e` | `#6d4429` |
| Skin 2 | `#cf9466` | `#ae754b` | `#5f3b22` |
| Hair | `#4b3a2e` | `#32261d` | `#1c140e` |
| Thatch | `#f3d980` | `#d7b75b` | `#806427` |
| Mud wall | `#ecc791` | `#d0a56d` | `#7a5833` |
| Clay | `#e48e5d` | `#c56a3d` | `#5f2c16` |
| Cloud | `#b8bdc8` | `#9097a5` | `#5c6272` |
| Leaf | `#9ad17a` | `#73b055` | `#2f5a25` |
| Bark | `#a77a52` | `#865c38` | `#43301d` |

## From 2D to 3D (govardhan-fpv)

- **Tones:** a custom `ShaderMaterial` with the exact palette values and thresholds above. Flat facet normals on low-poly parts and smooth normals on balls give the three nested discs.
- **Ink:** an id-and-depth pass, then a post pass that inks where the part id changes or the depth folds. A wider ring on silhouettes makes the outer line heavier.
- **Wobble and grain:** in the same post pass. Targets get gold ink and a soft pulsing halo instead of UI arrows.

Full details are in `govardhan-fpv/NOTES.md`, under "How the 2D style was carried into 3D".
