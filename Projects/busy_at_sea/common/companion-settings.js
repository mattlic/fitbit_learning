import * as messaging from "messaging";
import { settingsStorage } from "settings";

export function initialize() {
  console.log("Initialize companion callback");
  settingsStorage.addEventListener("change", evt => {
    if (evt.oldValue !== evt.newValue) {
      sendValue(evt.key, evt.newValue);
    }
  });
}


function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}


function sendSettingData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
    console.log("Setting sent over peerSocket connection" + data);
  } else {
    console.log("No peerSocket connection");
  }
}