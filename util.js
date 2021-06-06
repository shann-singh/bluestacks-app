export const videos = [10, 20, 30, 40, 50];

export const snackBarOptions = {
  position: "bottom-right",
  style: {
    backgroundColor: "midnightblue",
    border: "2px solid blue",
    borderRadius: "5px",
    color: "white",
    fontSize: "16px",
    textAlign: "center",
  },
};

export function numberFormat(num) {
  const len = num.toString().length;
  if (len < 5) {
    return num;
  }
  if (len >= 5 && len < 7) {
    return `${Math.round(num / 1000)}K`;
  }
  if (len >= 7 && len < 10) {
    return `${(num / 1000000).toFixed(2)}M`;
  }
  if (len >= 10) {
    return `${(num / 1000000000).toFixed(2)}M`;
  }
  return num;
};

export function youtubeDuration(duration) {
  var hours = 0;
  var minutes = 0;
  var seconds = 0;

  // Remove PT from duration string
  duration = duration.replace("PT", "");

  // If the string contains hours parse it and remove it from our duration string
  if (duration.indexOf("H") > -1) {
    hours_split = duration.split("H");
    hours = parseInt(hours_split[0]);
    duration = hours_split[1];
  }

  // If the string contains minutes parse it and remove it from our duration string
  if (duration.indexOf("M") > -1) {
    minutes_split = duration.split("M");
    minutes = parseInt(minutes_split[0]);
    duration = minutes_split[1];
  }

  // If the string contains seconds parse it and remove it from our duration string
  if (duration.indexOf("S") > -1) {
    seconds_split = duration.split("S");
    seconds = parseInt(seconds_split[0]);
  }

  // Math the values to return seconds
  return `${hours}:${minutes}:${seconds}`;
}
