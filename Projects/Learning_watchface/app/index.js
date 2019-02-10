import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import {
  getDisplayMonth,
  getDisplayDay,
  calculateDistance,
  zeroPad,  
 } from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const lblDate= document.getElementById("date");
const lblDay = document.getElementById("day");
const lblTime = document.getElementById("time");
const lblFloors = document.getElementById("floors");
const lblSteps = document.getElementById("steps");
const lblDist = document.getElementById("dist");
const lblHr = document.getElementById("hr");

const hrm = new HeartRateSensor();
hrm.onreading = function() {
  console.log("Current heart rate: " + hrm.heartRate);
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
  
  
  lblDate.text = `${zeroPad(dayOfMonth)} ${diplayMonth}`;
  lblDay.text = `${displayDay}`;
  lblTime.text = `${displayHours}:${mins}`;
  
  lblFloors.text = (today.local.elevationGain || 0 );
  lblSteps.text = (today.local.steps || 0);
  
  // lblDist.text = calculateDistance((2300), "miles");
  lblDist.text = calculateDistance((today.local.distance || 0), "miles");
  // lblHr.text = "wwwwwwww";
  
}
