import postcode from "../src/assets/scans/postcode.glb";
import tunnel from "../src/assets/scans/tunnel.glb";
import pier from "../src/assets/scans/pier.glb";
import lcc from "../src/assets/scans/lcc.glb";

import hallway from "../src/assets/scans/hallway.glb";
import cannon from "../src/assets/scans/cannon.glb";
import pccar from "../src/assets/scans/pccar.glb";
import lcstudent from "../src/assets/scans/lcstudent.glb";
import lcstudents from "../src/assets/scans/lcstudents.glb";
// import pierpay from "../src/assets/scans/pierpay.glb";
import pierpay from "../src/assets/scans/gppay.glb";
import gpstudents from "../src/assets/scans/gpstudents.glb";
import train from "../src/assets/scans/train.glb";

import trainseats from "../src/assets/scans/train.glb";

import embpier from "../src/assets/scans/embpier.glb";
import embfront from "../src/assets/scans/embfront.glb";
import embplatform from "../src/assets/scans/embplatform.glb";



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
  {
    id: "postcode",
    title: "Postal Code",
    subtitle: "/ Postal Code - SE10-9DD",
    text: "Situated on the southern bank of the River Thames, its architecture is reminiscent of an older, grittier, Greenwich.",
    number: "01",
  
    index: 0,
  
    object: pccar,
    scale: 1.4,
    posiY: -.8,
    audio: sidewalkaud,
  
    sections: [  {
      id: "postcode",
      title: "Postcode: SE10-9DD",
      subtitle: "/ Postal Code - SE10-9DD",
      text: "Situated on the southern bank of the River Thames, its architecture is reminiscent of an older, grittier, Greenwich.",
      number: "01",
       index: 0,
       object: postcode,
      audio: sidewalkaud,
       type: "view",
    },{
      id: "description",
      title: "A New / Changing Greenwich",
      subtitle: "/ Postal Code / About",
      text: "Situated on the southern bank of the River Thames, its architecture is reminiscent of an older, grittier, Greenwich. Before the influx of modern highrises and students, this location feels like an undisturbed enclave.",
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
    },],
  
    type: "view",
  },
   {
    id: "pier",
    title: "Greenwich Pier",
    subtitle: "/ Greenwich Pier",
    text: "Located next to Greenwich University, indulge in this immersive environment while you que for the Uber Boat.",
    number: "02",
  
    index: 0,
  
    object: cannon,
    scale: 2.2,
    posiY: -1.8,
    audio: pieraud,
  
  
    sections: [{
    id: "pier",
    title: "Greenwich Pier",
    subtitle: "/ Greenwich Pier",
    text: "Located next to Greenwich University, indulge in this immersive environment while you que for the Uber Boat.",
    number: "02",
  
    index: 0,
  
    object: pier,
    audio: pieraud,
     type: "view",
    },{
      id: "pierpay",
      title: "Tap to pay for your Uber Boat ride",
      subtitle: "/ Uber Boat / Greenwich Pier",
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
      text: "Jump on board, and enjoy the ride. You will pass by some of London's most iconic monuments, with an incredibly unique view.",
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
    },],
  
  
    type: "view",
  },
 
  {
    id: "station",
    title: "Embankment Station",
    subtitle: "/ Embankment Station",
    text: "Navigate through the hustle and bustle of this transit hub and look for the Northern Line.",
    number: "02",

    index: 0,

    object: train,
    scale: .6,
    posiY: .2,
    audio: stationaud,

    sections: [{
      id: "station",
      title: "Embankment Station",
      subtitle: "/ Embankment Station",
      text: "Navigate through the hustle and bustle of this transit hub and look for the Northern Line.",
      number: "02",
  
      index: 0,
  
      object: hallway,
      audio: stationaud,
  
      type: "view",
    },{
      id: "description",
      title: "Welcome to Embankment Station",
      subtitle: "/ Embankment / About",
      text: "Situated on the southern bank of the River Thames, its architecture is remenicient of an older, grittier, Greenwhich. Before the influx of modern highrises and students, this location feels like an undisturbed enclave.",
      number: "02",
  
      index: 0,
  
      lightMode: "dark",
      type: "text",
    },
    {
      id: "stationplatform",
      title: "Get on the Northern Line Train",
      subtitle: "/ Embankment / Greenwich Pier",
      text: "Head to the platform and join wait for the next southbound Northern Line Train.",
      number: "02",
       index: 0,
       object: train,
       type: "detail",
    },{
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
    },],
  
    type: "view",
  },
  
    {
    id: "lcc",
    title: "London College of Communication",
    subtitle: "/ London College of Communication",
    text: "Your destination is the epicenter of creative student culture in Elephant and Castle.",
    number: "02",
  
    index: 0,
  
    object: lcstudent,
    scale: 3.1,
    posiY: -3.2,
    audio: lccaud,
  
    sections: [{
      id: "lcc",
      title: "London College of Communication",
      subtitle: "/ London College of Communication",
      text: "Your destination is the epicenter of creative student culture in Elephant and Castle.",
      number: "02",
       index: 0,
       object: lcc,
       audio: lccaud,
       type: "view",
    },{
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
    },],
  
    type: "view",
  },
 ];
 
// Types: Inspect, View, Text
