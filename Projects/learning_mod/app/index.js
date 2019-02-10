import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import {
  getDisplayMonth,
  getDisplayDay,
  calculateDistance,
  zeroPad,  
  pickImage,
 } from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get the background so we can insert the righ image
const backImage = document.getElementById("bkimage");
console.log("backImage is: " + backImage.href);

// for testing adding the image
backImage.href = "images/hot-asian.jpg" ;
console.log("backImage is: " + backImage.href);

// Get a handle on the <text> elements
const lblDate = document.getElementById("date");
const lblDay = document.getElementById("day");
const lblTime = document.getElementById("time");
const lblFloors = document.getElementById("floors");
const lblSteps = document.getElementById("steps");
const lblDist = document.getElementById("dist");
const lblHr = document.getElementById("hr");

// Get a handle on the other elements
const leftArc = document.getElementById("leftArc");
const rightArc = document.getElementById("rightArc");

const hrm = new HeartRateSensor();
hrm.onreading = function() {
  // console.log("Current heart rate: " + hrm.heartRate);
  lblHr.text = `${hrm.heartRate} bpm`; 
}
hrm.start();

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const now = evt.date;
  const month = now.getMonth();
  const day = now.getDay();
  const dayOfMonth = now.getDate();
  const hours = now.getHours();
  const mins = zeroPad(now.getMinutes());  
  
  const {clockDisplay} = preferences;
  const displayHours = clockDisplay === "12h" ? hours % 12 || 12 : zeroPad(hours);
  const diplayMonth = getDisplayMonth(month);
  const displayDay = getDisplayDay(day);

  const charge = battery.chargeLevel;
  console.log(Math.floor(battery.chargeLevel) + "%");

  // update background image
  backImage.href = pickImage( hours );
  

  // set and display the arcs for charge based on percentage
  if (charge > 60) {
    // set arc color to greenyellow
    leftArc.style.fill = "greenyellow";
    rightArc.style.fill = "greenyellow";
  } else if (charge > 30) {
    // set arc color to ornage
    leftArc.style.fill = "#FF5A00";
    rightArc.style.fill = "#FF5A00";
  } else {
    // set color red
    leftArc.style.fill = "red";
    rightArc.style.fill = "red";
  }
  
  leftArc.startAngle = -180 +((180 - (1.8 * charge))/2);
  leftArc.sweepAngle = (1.8 * charge);

  rightArc.startAngle = 0 + ((180 - (1.8 * charge)) /2);
  rightArc.sweepAngle = (1.8 * charge);

  lblDate.text = `${zeroPad(dayOfMonth)} ${diplayMonth}`;
  lblDay.text = `${displayDay}`;
  lblTime.text = `${displayHours}:${mins}`;
  
  lblFloors.text = (today.local.elevationGain || 0 );
  lblSteps.text = (today.local.steps || 0);
  
  // lblDist.text = calculateDistance((2300), "miles");
  lblDist.text = calculateDistance((today.local.distance || 0), "miles");
  // lblHr.text = "wwwwwwww";
  
}
