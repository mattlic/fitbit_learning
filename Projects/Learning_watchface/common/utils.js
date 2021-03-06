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
