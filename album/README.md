# Dadi's photo album

When you talk to Dadi in the hub, she opens her photo album. Each festival has its own pages, with your family's
photos of that festival. The photos are listed in `album/album.js` and live in `album/photos/<festival>/`.

The six festival folders are `holi`, `ganesh`, `durga`, `dussehra`, `diwali` and `govardhan`.

## Add a photo

1. Copy the photo into its festival folder, for example `album/photos/diwali/1.jpg`.
2. Open `album/album.js` and add a line to that festival's list:

   ```js
   diwali: [
     { src: 'album/photos/diwali/1.jpg', caption: 'Diwali 2025, the front step' },
   ],
   ```

3. Reload the hub (`index.html`) and talk to Dadi.

The `src` path is relative to the hub's `index.html`, so it always starts with `album/photos/`. Photos show in the
order you list them. Three photos fill one spread (two on the left page, one large on the right); a fourth starts a
new spread for the same festival. A bare file name such as `'1.jpg'` also works: it is looked up in that festival's folder.

## Formats and sizes

- Use **jpg**, **png** or **webp**.
- **HEIC** (iPhone photos) does not show in Chrome. Convert it first. On a Mac, open it in Preview and use
  File > Export as JPEG, or run `sips -s format jpeg IMG_1234.HEIC --out 1.jpg`.
- Resize to about **1600 px** on the long side. Big phone photos (4000 px and more) make the album slow to open. On a
  Mac: `sips -Z 1600 1.jpg`.
- Landscape and portrait both work. The frame is 4:3 or 3:4, chosen from the photo's shape, and the photo is cropped
  to fill it, so keep faces away from the very edges.

## Captions

Keep captions short, about four to six words: "Holi 2025, the terrace". They are shown under each photo in one line.

## Dadi's line

Each festival page has Dadi's question at the bottom. To change it for your family, add a `dadi` entry in
`album.js`:

```js
dadi: { diwali: 'So many diyas on our balcony! Do you know who we light them for?' },
```

## If something looks wrong

- An empty dashed slot where you expected a photo means the `src` path does not match a file. Check the
  folder name and the file name, including `.jpg` versus `.jpeg` and capital letters.
- A festival with no photos shows empty dashed slots and the folder to put them in. That is expected.
