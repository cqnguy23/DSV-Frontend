import moment from "moment";

const formatUtils = {};

formatUtils.capitalizeFirstLetter = (str) => {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  else return str;
};
formatUtils.convertToCalendarDate = (str) => {
  const date = moment(str).calendar(null, {
    sameDay: "[Today], Do MMM, YYYY",
    lastDay: "[Yesterday], Do MMM, YYYY",
    sameElse: "ddd, Do MMM, YYYY",
  });
  return date;
};
export default formatUtils;
