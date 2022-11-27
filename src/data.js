import postcode from "../src/assets/scans/postcode.glb";
import platform from "../src/assets/scans/platform.glb";
import pier from "../src/assets/scans/pier.glb";
import lcc from "../src/assets/scans/lcc.glb";

import hallway from "../src/assets/scans/hallway.glb";
import cannon from "../src/assets/scans/cannon.glb";
import train from "../src/assets/scans/train.glb";

import sidewalk from "../src/assets/audio/sidewalk1.mp4";
import station from "../src/assets/audio/station.mp4";

import postalcodevid from "./assets/videos/postcode/postcode.mov"


import postalcodeimg from "./assets/images/greenwhich/postalcode.png"
import uniofgreenwichimg from "./assets/images/greenwhich/uniofgreenwich.jpg"
import greenwhichimg from "./assets/images/greenwhich/greenwich.jpg"


export const data = [
  // {
  //   id: "description",
  //   title: "Statement on something blah blah blah",
  //   subtitle: "A Visual Medium",
  //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
  //   number: "02",

  //   index: 0,

  //   button: {
  //       text: "Learn More",
  //       link: "https://www.aarondiggdon.com"
  //   },


  //   lightMode: "dark",
  //   type: "text",
  // },
  {
    id: "postcode",
    title: "Welcome to our postal code: SE109DD",
    subtitle: "/ Postal Code - SE10-9DD",
    number: "01",

    index: 0,

    object: postcode,
   


    audio: sidewalk,

    type: "view",
  },
  {
    id: "description",
    title: "A New / Changing Greenwhich",
    subtitle: "/ Postal Code / About",
    text: "Situated on the southern bank of the River Thames, its architecture is remenicient of an older, grittier, Greenwhich. Before the influx of modern highrises and students, this location feels like an undisturbed enclave.",
    number: "02",

    index: 0,

    lightMode: "dark",
    type: "text",
  },
  {
    id: "slider",
    src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",

    title: "Statement on something blah blah blah",
    subtitle: "/ Photography",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    index: 0,

    images: [
      {
        title: "Postal Code SE10-9DD",
        subtitle: "ARCHITECTURE / PHOTO",
        src: postalcodeimg,
      },
      {
        title: "University of Greenwich",
        subtitle: "ARCHITECTURE / PHOTO",
        src: uniofgreenwichimg,
      },
      
      {
        title: "Greenwich Intersection",
        subtitle: "ENVIRONMENT / PHOTO",
        src: greenwhichimg,
      },
    ],


    lightMode: "dark",
    type: "slider",
  },
  // {
  //   id: "title",
  //   title: "Walk East",
  //   subtitle: "/ 02",
  //   text: "Walk east along the river towards Greenwich Pier.",
  //   number: "02",

  //   index: 0,


  //   lightMode: "dark",
  //   type: "title",
  // },
  {
    id: "video",
    src: postalcodevid,

    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    index: 0,

    type: "video",
  },
  {
    id: "detail",
    title: "Walk towards Greenwich Pier",
    subtitle: "/ Walking / South Bank",
    text: "While walking east along the bank of River Thames, pay attention to the textures of the cannons, which line the walkway. They will guide you to the pier.",
    number: "02",

    index: 0,

    object: cannon,

    type: "detail",
  },
  {
    id: "description",
    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    index: 0,


    lightMode: "dark",
    type: "text",
  },
  // {
  //   id: "description",
  //   title: "Statement on something blah blah blah",
  //   subtitle: "A Visual Medium",
  //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
  //   number: "02",

  //   index: 0,

  //   button: {
  //       text: "Learn More",
  //       link: "https://www.aarondiggdon.com"
  //   },


  //   lightMode: "light",
  //   type: "text",
  // },

  {
    id: "station",
    title: "You're almost there. This is your final stop.",
    subtitle: "/ Embankment Station",
    number: "02",

    index: 0,

    object: hallway,

    audio: station,

    type: "view",
  },
  {
    id: "description",
    title: "Statement on something blah blah blah",
    subtitle: "A Visual Medium",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    index: 0,

    button: {
        text: "Learn More",
        link: "https://www.aarondiggdon.com"
    },


    lightMode: "light",
    type: "text",
  },
  {
    id: "video",
    src: postalcodevid,

    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    index: 0,

    type: "video",
  },
  // {
  //   id: "platform",
  //   title: "You're almost there. This is your final stop.",
  //   subtitle: "/ Embankment Station",
  //   number: "02",

  //   index: 0,

  //   object: platform,

  //   audio: sidewalk,

  //   type: "view",
  // },
  {
    id: "lcc",
    title: "You're almost there. This is your final stop.",
    subtitle: "/ Embankment Station",
    number: "02",

    index: 0,

    object: lcc,

    audio: sidewalk,

    type: "view",
  },

  {
    id: "video",
    src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",

    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    index: 0,

    type: "video",
  },
  // {
  //   id: "pier",
  //   title: "Guide the user back to LCC or else ...",
  //   subtitle: "/ Our Mission",
  //   number: "01",

  //   index: 0,

  //   object: cannon,

  //   audio: sidewalk,

  //   type: "view",
  // },
];

// Types: Inspect, View, Text
