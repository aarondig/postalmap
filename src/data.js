import postalcode from "../src/assets/scans/postalcode.glb";
import cannon from "../src/assets/scans/cannon.glb";
import train from "../src/assets/scans/train.glb";
import sidewalk from "../src/assets/audio/sidewalk1.mp4";

export const data = [
  {
    id: "introduction",
    title: "Guide the user back to LCC or else ...",
    subtitle: "/ Our Mission",
    number: "01",

    object: postalcode,
    audio: sidewalk,

    type: "view",
  },
  {
    id: "description",
    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    lightMode: "dark",
    type: "text",
  },
  {
    id: "image",
    src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",

    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    type: "image",
  },
  {
    id: "detail",
    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    object: train,

    type: "detail",
  },
  {
    id: "description",
    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",


    lightMode: "dark",
    type: "text",
  },
  {
    id: "description",
    title: "Statement on something blah blah blah",
    subtitle: "A Visual Medium",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

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

    images: [
      {
        title: "CLIPPER",
        subtitle: "ARCHITECTURE / PHOTO",
        src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",
      },
      {
        title: "THAMES",
        subtitle: "ARCHITECTURE / PHOTO",
        src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",
      },
      {
        title: "NEW",
        subtitle: "ARCHITECTURE / PHOTO",
        src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",
      },
    ],


    lightMode: "light",
    type: "slider",
  },
  {
    id: "view",
    title: "Guide the user back to LCC or else ...",
    subtitle: "/ Our Mission",
    number: "01",

    object: cannon,
    audio: sidewalk,

    type: "view",
  },
  {
    id: "image",
    src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",

    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    type: "text",
  },

  {
    id: "image",
    src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",

    title: "Statement on something blah blah blah",
    subtitle: "/ Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    type: "image",
  },
];

// Types: Inspect, View, Text
