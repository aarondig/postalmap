import postalcode from "../src/assets/scans/postalcode.glb"
import cannon from "../src/assets/scans/cannon.glb"
import train from "../src/assets/scans/train.glb"


export const data = [
  {
    id: "introduction",
    title: "Guide the user back to LCC or else ...",
    subtitle: "Our Mission",
    number: "01",

    object: postalcode,

    type: "view",
  },
  {
    id: "description",
    title: "Statement on something blah blah blah",
    subtitle: "Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    type: "text",
  },
  {
    id: "image",
    src: "https://images.squarespace-cdn.com/content/v1/5af1c54f36099b9870f769e8/1526312872167-EQ7IZI4P1P7CGPS0NUD9/DSC07835.JPG?format=2500w",

    title: "Statement on something blah blah blah",
    subtitle: "Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    type: "image",
  },
  {
    id: "detail",
    title: "Statement on something blah blah blah",
    subtitle: "Introduction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa egestas commodo risus orci feugiat sagittis, ut cursus.",
    number: "02",

    object: train,

    type: "detail",
  },
  {
    id: "view",
    title: "Guide the user back to LCC or else ...",
    subtitle: "Our Mission",
    number: "01",

    object: cannon,

    type: "view",
  },


  
];

// Types: Inspect, View, Text
