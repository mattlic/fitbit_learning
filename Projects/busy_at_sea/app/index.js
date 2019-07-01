import clock from "clock";
import document from "document";
import { 
  preferences,
  units
 } from "user-settings";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import {
  getDisplayMonth,
  getDisplayDay,
  calculateDistance,
  zeroPad,  
  pickImage,
  hoursToAngle,
  minutesToAngle,
  secondsToAngle,
  isTime1BeforeTime2,
 } from "../common/utils";
 import * as simpleSettings from "../common/device-settings";

// Update the clock every minute
clock.granularity = "minutes";

// Get the background so we can insert the righ image
const backImage = document.getElementById("bkimage");
// console.log("backImage is: " + backImage.href);

// for testing adding the image
// backImage.href = "images/hot-asian.jpg" ;
// console.log("backImage is: " + backImage.href);

// Get a handle on the <text> elements
const lblDate = document.getElementById("date");
const lblDay = document.getElementById("day");
// const lblTime = document.getElementById("time");
const lblTimeMin = document.getElementById("timeMin");
const lblTimeHr = document.getElementById("timeHr");
const lblTimeSeperator = document.getElementById("timeSep");
const lblFloors = document.getElementById("floors");
const lblSteps = document.getElementById("steps");
const lblDist = document.getElementById("dist");
const lblHr = document.getElementById("hr");

// Get handles on the analog clock parts
const hourHand = document.getElementById("hourHand");
const minHand = document.getElementById("minHand");
const secHand = document.getElementById("secHand");

// Get a handle on the other elements
const leftArc = document.getElementById("leftArc");
const rightArc = document.getElementById("rightArc");

//set up times for switching the background image
let morningStartHour = 6;
let morningStartMinutes = 0;
let daytimeStartHour = 9;
let daytimeStartMinutes = 15;
let sunsetStartHour = 17;
let sunsetStartMinutes = 30;
let nighttimeStartHour = 20;
let nighttimeStartMinutes = 0;

// setup and monitor heart rate (HR)
const hrm = new HeartRateSensor();
hrm.onreading = function() {
  // console.log("Current heart rate: " + hrm.heartRate);
  lblHr.text = `${hrm.heartRate} bpm`; 
}
hrm.start();

//pick the image based on the time
function pickImage( testHours, testMinutes ) {
  //set an obvious default
  let backimage = "images/ufoboat.png" ;
  //pick the image based on the time
  if (isTime1BeforeTime2(testHours, testMinutes, morningStartHour, morningStartMinutes) ) {
    backimage = "images/nighttime.png";
  } else if (isTime1BeforeTime2(testHours, testMinutes, daytimeStartHour, daytimeStartMinutes) ) {
    backimage = "images/morning.png";
  } else if (isTime1BeforeTime2(testHours, testMinutes, sunsetStartHour, sunsetStartMinutes) ) {
    backimage = "images/daytime.png";
  } else if (isTime1BeforeTime2(testHours, testMinutes, nighttimeStartHour, nighttimeStartMinutes) ){
    backimage = "images/sunset.png";
  } else {
    backimage = "images/nighttime.png";
  }
  return backimage;
 }



// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const now = evt.date;
  const month = now.getMonth();
  const day = now.getDay();
  const dayOfMonth = now.getDate();
  const hours = now.getHours();
  const mins = zeroPad(now.getMinutes());  
  const secs = now.getSeconds();
  
  const {clockDisplay} = preferences;
  const displayHours = clockDisplay === "12h" ? hours % 12 || 12 : zeroPad(hours);
  const diplayMonth = getDisplayMonth(month);
  const displayDay = getDisplayDay(day);

  const {distance} = units;
  // console.log("distance units: " + distance);

  const charge = battery.chargeLevel;
  // console.log(Math.floor(battery.chargeLevel) + "%");

  // update background image
  // backImage.href = simplePickImage( hours );
  backImage.href = pickImage( parseInt(hours), parseInt( mins) );

  // set and display the arcs for charge based on percentage
  if (charge > 65) {
    // set arc color to greenyellow
    leftArc.style.fill = "greenyellow";
    rightArc.style.fill = "greenyellow";
  } else if (charge > 35) {
    // set arc color to ornage
    leftArc.style.fill = "#FF5A00";
    rightArc.style.fill = "#FF5A00";
  } else {
    // set color red
    leftArc.style.fill = "red";
    rightArc.style.fill = "red";
  }
  
  // Update the battery power arcs
  leftArc.startAngle = -180 +((180 - (1.8 * charge))/2);
  leftArc.sweepAngle = (1.8 * charge);

  rightArc.startAngle = 0 + ((180 - (1.8 * charge)) /2);
  rightArc.sweepAngle = (1.8 * charge);

  // Update analog clock face based on the time
  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);

  // Update the digital clock face
  lblDate.text = `${zeroPad(dayOfMonth)} ${diplayMonth}`;
  lblDay.text = `${displayDay}`;
  // lblTime.text = `${displayHours}:${mins}`;

  lblTimeHr.text = displayHours;
  lblTimeMin.text = mins;

  // Update the activity status text
  lblFloors.text = (today.local.elevationGain || 0 );
  lblSteps.text = (today.local.steps || 0);
  lblDist.text = calculateDistance((today.local.distance || 0), distance);
  
}

/* -------- SETTINGS -------- */
function settingsCallback(data) {
  // console.log("settings callback triggered");
  console.log('data sent from companion is: ' + JSON.stringify(data));

  if (!data) {
    console.log("NoOp quick return from settings callback - !data")
    return;
  }
  if (data.colorDivider) {
    lblTimeSeperator.style.fill = data.colorDivider;
  }
  if (data.colorTime) {
    lblTimeHr.style.fill = data.colorTime;
    lblTimeMin.style.fill = data.colorTime;
  }
  if (data.colorDate) {
    lblDate.style.fill = data.colorDate;
    lblDay.style.fill = data.colorDate;
  }
  if (data.colorDataText) {
    lblFloors.style.fill = data.colorDataText;
    lblSteps.style.fill = data.colorDataText;
    lblDist.style.fill = data.colorDataText;
    lblHr.style.fill = data.colorDataText;
  }
  if (data.morningTimeStart) {
    // console.log("morningTimeStart[name] is: " + data.morningTimeStart['name']);
    var timeParts = JSON.stringify(data.morningTimeStart['name']).replace(/"/g,'').split(':');
    morningStartHour = parseInt(timeParts[0]);
    morningStartMinutes = parseInt(timeParts[1]);
    console.log('morningStart is ' + morningStartHour + ':' + morningStartMinutes);
  }
  if (data.dayTimeStart) {
    // console.log("dayTimeStart[name] is: " + data.dayTimeStart['name']);
    var timeParts = JSON.stringify(data.dayTimeStart['name']).replace(/"/g,'').split(':');
    daytimeStartHour = parseInt(timeParts[0]);
    daytimeStartMinutes = parseInt(timeParts[1]);
    console.log('dayTimeStart is ' + daytimeStartHour + ':' + daytimeStartMinutes);
  }
  if (data.sunsetTimeStart) {
    // console.log("sunsetTimeStart[name] is: " + data.sunsetTimeStart['name']);
    var timeParts = JSON.stringify(data.sunsetTimeStart['name']).replace(/"/g,'').split(':');
    sunsetStartHour = parseInt(timeParts[0]);
    sunsetStartMinutes = parseInt(timeParts[1]);
    console.log('sunsetTimeStart is ' + sunsetStartHour + ':' + sunsetStartMinutes);
  }
  if (data.nightTimeStart) {
    // console.log("nightTimeStart[name] is: " + data.nightTimeStart['name']);
    var timeParts = JSON.stringify(data.nightTimeStart['name']).replace(/"/g,'').split(':');
    nighttimeStartHour = parseInt(timeParts[0]);
    nighttimeStartMinutes = parseInt(timeParts[1]);
    console.log('nightTimeStart is ' + nighttimeStartHour + ':' + nighttimeStartMinutes);
  }
}
simpleSettings.initialize(settingsCallback);