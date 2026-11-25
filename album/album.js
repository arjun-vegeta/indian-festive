/* Dadi's photo album: your own photos of past festivals.

   1. Put photos in album/photos/<festival>/ (jpg, png or webp; about 1600 px on the long side is plenty).
   2. List them below in the order you want them shown, with a short caption.
   Festivals: holi, ganesh, durga, dussehra, diwali, govardhan.
   src is a file name inside that festival's folder, or a path from the repo root.
   Optional: dadi: { diwali: 'Dadi's own line for the Diwali page' } replaces her default line. */
window.FESTIVE_ALBUM = {
  holi: [
    { src: '1.jpg', caption: 'Family portrait covered in colours' },
    { src: '2.jpg', caption: 'Water guns in the garden' },
    { src: '3.jpg', caption: 'Pink hands, big smile' },
    { src: '4.jpg', caption: 'Brothers hugging in Holi colours' },
  ],
  ganesh: [
    { src: '1.jpg', caption: 'Family with Ganpati and modaks' },
    { src: '2.jpg', caption: 'Prayers before our Ganpati' },
    { src: '3.jpg', caption: 'Brothers making a Ganesh rangoli' },
    { src: '4.jpg', caption: 'Feeding sweets to the little one' },
  ],
  durga: [],
  dussehra: [
    { src: '1.jpg', caption: 'Family with Happy Dussehra sign' },
    { src: '2.jpg', caption: 'Little archer with his bow' },
    { src: '3.jpg', caption: 'Making a flower rangoli with diyas' },
    { src: '4.jpg', caption: 'Ravana figure and marigold rangoli' },
  ],
  diwali: [
    { src: '1.jpg', caption: 'Family portrait with Diwali diyas' },
    { src: '2.jpg', caption: 'Sparklers on the terrace' },
    { src: '3.jpg', caption: 'Lighting diyas by the rangoli' },
    { src: '4.jpg', caption: 'Holding a sparkler at night' },
  ],
  govardhan: [],
  dadi: {},
};
