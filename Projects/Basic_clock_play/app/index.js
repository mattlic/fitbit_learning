import clock from "clock";
import document from "document";
import { today } from "user-activity";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const timeText = document.getElementById("timeText");
const backimage = document.getElementById("bkimage");
const stepText = document.getElementById("stepText");
const heartText = document.getElementById("heartText");
// onst arc = document.getElementById("arc");
// the next line goes into the index.gui file
 //  <arc id ="arc" x='61' y='12' width='226' height='226' flll="greenyellow" arc-width='10' start-angle='0' sweep-angle='360' />

backimage.layer = 1;
// arc.layer = 2;
stepText.layer = 2;
heartText.layer = 2;
timeText.layer = 4;

// var hrm = new HeartRateSensor({ frequency: 1, batch: 10 });
var hrm = new HeartRateSensor();

// Declare an event handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values and update the display
  console.log("Current heart rate: " + hrm.heartRate);
  heartText.text = `HR: ${hrm.heartRate || 0}`;
  // heartText.text = "HR: 60";
}

// Declare an event handler that batch HR readings
//hrm.onreading = () => {
  //let index = 0;
  // Peek the current sensor values and update the display
  //console.log("Current heart rate: " + hrm.readings.bpm[index] );
  // heartText.text = `HR: ${hrm.readings.bpm[0] || 0}`;
  //heartText.text = "HR: 60";
// }


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  hrm.start();
  let nowDate = evt.date;
  let hours = nowDate.getHours();
  let mins = nowDate.getMinutes();
  let stepCount = (today.local.steps || 0);

  
  // for testing
  // backimage.href = util.minTest(mins)); 
  
  // update backgroung
  backimage.href = util.pickImage( hours );
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  mins = util.zeroPad(mins);
    
  timeText.text = `${hours}:${mins}`;
  stepText.text = `Steps: ${stepCount}`;
  // hrm.stop();

}
hrm.stop();
