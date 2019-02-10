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
  let backimage = "images/hot-asian.jpg" ;
  //pick the image based on the time
  if (hours < 6) {
    backimage = "images/nighttime.jpg";
  } else if (hours < 9) {
    backimage = "images/morning.jpg";
  } else if (hours < 18) {
    backimage = "images/daytime.jpg";
  } else if (hours < 20) {
    backimage = "images/sunset.jpg";
  } else {
    backimage = "images/nighttime.jpg";
  }
  return backimage;
 }


// for testing
export function minTest( mins ) {
  //set an obvious default
  let backimage = "images/hot-asian.jpg" ;
  // do the selection 
  if (mins < 10) {
    backimage = "images/nighttime.jpg";
  } else if (mins < 20) {
    backimage = "images/morning.jpg";
  } else if (mins < 30) {
    backimage = "images/hot-asian.jpg";
  } else if (mins < 40) {
    backimage = "images/sunset.jpg";
  } else if (mins < 50) {
    backimage = "images/hot-asian.jpg";
  } else {
     backimage = "images/nighttime.jpg";
  }
  return backimage;
}