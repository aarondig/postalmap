import postcode from "../src/assets/scans/postcode.glb";
import platform from "../src/assets/scans/platform.glb";
import pier from "../src/assets/scans/pier.glb";
import lcc from "../src/assets/scans/lcc.glb";

import hallway from "../src/assets/scans/hallway.glb";
import cannon from "../src/assets/scans/cannon.glb";
import pierpay from "../src/assets/scans/pierpay.glb";
import train from "../src/assets/scans/train.glb";
import embstation from "../src/assets/scans/embstation.glb";

// AUDIO
import sidewalkaud from "../src/assets/audio/sidewalk1.mp4";
import stationaud from "../src/assets/audio/station.mp4";
import lccaud from "../src/assets/audio/lcc.mp4";
import pieraud from "../src/assets/audio/greenwich.mp4";


// VIDEOS
import postalcodevid from "./assets/videos/postcode/postcode.mov"
import uberboatvid from "./assets/videos/greenwich/uberboat.mov"

// IMAGES
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
   


    audio: sidewalkaud,

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
    id: "cannon",
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
    title: "Approach Greenwich Pier",
    subtitle: "",
    text: "You'll see a ship perched in the center of the square. This is where students gather, young families meet, and live music fills the air. Continue walking along the bank, but pay attention to the atmosphere around you.",
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
    id: "pier",
    title: "Join the que for west-bound Uber Boat.",
    subtitle: "/ Greenwich Pier",
    number: "02",

    index: 0,

    object: pier,

    audio: pieraud,

    type: "view",
  },
  {
    id: "pierpay",
    title: "Tap to pay for your Uber Boat ride",
    subtitle: "/ Uber Boat / Greenwhich Pier",
    text: "While walking east along the bank of River Thames, pay attention to the textures of the cannons, which line the walkway. They will guide you to the pier.",
    number: "02",

    index: 0,

    object: pierpay,

    type: "detail",
  },
  {
    id: "title",
    title: "Ride the Uber Boat",
    subtitle: "/ 03",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    index: 0,


    lightMode: "dark",
    type: "title",
  },
  {
    id: "video",
    src: uberboatvid,

    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    index: 0,

    type: "video",
  },
  {
    id: "embstation",
    title: "Walk towards Greenwich Pier",
    subtitle: "/ Walking / South Bank",
    text: "While walking east along the bank of River Thames, pay attention to the textures of the cannons, which line the walkway. They will guide you to the pier.",
    number: "02",

    index: 0,

    object: embstation,

    type: "detail",
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
  
  {
    id: "station",
    title: "You're almost there. This is your final stop.",
    subtitle: "/ Embankment Station",
    number: "02",

    index: 0,

    object: hallway,

    audio: stationaud,

    type: "view",
  },
  {
    id: "stationplatform",
    title: "Tap to pay for your Uber Boat ride",
    subtitle: "/ Uber Boat / Greenwhich Pier",
    text: "While walking east along the bank of River Thames, pay attention to the textures of the cannons, which line the walkway. They will guide you to the pier.",
    number: "02",

    index: 0,

    object: platform,

    type: "detail",
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


    lightMode: "light",
    type: "slider",
  },
  //   {
  //   id: "lcc",
  //   title: "You're almost there. This is your final stop.",
  //   subtitle: "/ Embankment Station",
  //   number: "02",

  //   index: 0,

  //   object: lcc,

  //   audio: lccaud,

  //   type: "view",
  // },
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
  // {
  //   id: "slider",
  //   src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",

  //   title: "Statement on something blah blah blah",
  //   subtitle: "/ Photography",
  //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
  //   number: "02",

  //   index: 0,

  //   images: [
  //     {
  //       title: "Postal Code SE10-9DD",
  //       subtitle: "ARCHITECTURE / PHOTO",
  //       src: postalcodeimg,
  //     },
  //     {
  //       title: "University of Greenwich",
  //       subtitle: "ARCHITECTURE / PHOTO",
  //       src: uniofgreenwichimg,
  //     },
      
  //     {
  //       title: "Greenwich Intersection",
  //       subtitle: "ENVIRONMENT / PHOTO",
  //       src: greenwhichimg,
  //     },
  //   ],


  //   lightMode: "dark",
  //   type: "slider",
  // },
  //  {
  //   id: "title",
  //   title: "End of Line",
  //   subtitle: "/ 02",
  //   text: "Walk east along the river towards Greenwich Pier.",
  //   number: "02",

  //   index: 0,


  //   lightMode: "dark",
  //   type: "title",
  // },
];

// Types: Inspect, View, Text
