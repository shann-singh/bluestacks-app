// array for number of videos selection dropdown menu
export const videos = [10, 20, 30, 40, 50];

// snackbar css options, passed when initializing
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

// formats the likes, dislikes, subscriber's numbers into
// thousand (K), million (M), billion(B)
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
    return `${(num / 1000000000).toFixed(2)}B`;
  }
  return num;
}
