export function getDisplayDay(day) {
  const strDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return strDays[day];
}

export function getDisplayMonth(month) {
  const strMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return strMonths[month];
}

function round(n, digits) {
     if (digits === undefined) {
       digits = 0;
     }

     var multiplicator = Math.pow(10, digits);
     n = parseFloat((n * multiplicator).toFixed(11));
     var test =(Math.round(n) / multiplicator);
     return +(test.toFixed(digits));
   }

export function calculateDistance( meters, units ) {
  if (units == "km") {
    return `${round(meters /1000, 2)} km`;
  } else if (units == "miles") {
    return `${round(meters * 0.000621371192, 2)} mi`;
  } else {
    return `${meters} m`;
  }
}

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Returns an angle (0-360) for the current hour in the day, including minutes
export function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
export function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
export function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}


//pick the image based on the time
export function pickImage( hours ) {
  //set an obvious default
  let backimage = "images/ufoboat.png" ;
  //pick the image based on the time
  if (hours < 6) {
    backimage = "images/nighttime.png";
  } else if (hours < 9) {
    backimage = "images/morning.png";
  } else if (hours < 17) {
    backimage = "images/daytime.png";
  } else if (hours < 20) {
    backimage = "images/sunset.png";
  } else {
    backimage = "images/nighttime.png";
  }
  return backimage;
 }
