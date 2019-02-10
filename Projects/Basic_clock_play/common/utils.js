// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// pick the image based on the time
export function pickImage( hours ) {
  //set an obvious default
  let backimage = "hot-asian.jpg" ;
  //pick the image based on the time
  if (hours < 6) {
    backimage = "nighttime.jpg";
  } else if (hours < 9) {
    backimage = "morning.jpg";
  } else if (hours < 18) {
    backimage = "daytime.jpg";
  } else if (hours < 20) {
    backimage = "sunset.jpg";
  } else {
    backimage = "nighttime.jpg";
  }
  return backimage;
 }


// for testing
export function minTest( mins ) {
  //set an obvious default
  let backimage = "hot-asian.jpg" ;
  // do the selection 
  if (mins < 10) {
    backimage = "nighttime.jpg";
  } else if (mins < 20) {
    backimage = "morning.jpg";
  } else if (mins < 30) {
    backimage = "hot-asian.jpg";
  } else if (mins < 40) {
    backimage = "sunset.jpg";
  } else if (mins < 50) {
    backimage = "hot-asian.jpg";
  } else {
     backimage = "nighttime.jpg";
  }
  return backimage;
}