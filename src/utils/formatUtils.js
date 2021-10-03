import axios from "axios";
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
formatUtils.uploadImage = (
  imgUrls,
  setImgUrls,
  idx,
  deleteTokens,
  setDeleteTokens
) => {
  try {
    const cloudinary = window.cloudinary;
    cloudinary.openUploadWidget(
      {
        cloudName: "chuong-nguyen",
        uploadPreset: "dsv_intern",
        folder: "dsv_photos",
        cropping: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imgURL = result.info.url;
          const newUrls = [...imgUrls];
          newUrls[idx] = imgURL;
          setImgUrls(newUrls);
          const newDeleteTokens = [...deleteTokens];
          newDeleteTokens[idx] = result.info.delete_token;
          setDeleteTokens(newDeleteTokens);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
formatUtils.deleteImage = async (deleteToken) => {
  try {
    const resp = await axios.post(
      "https://api.cloudinary.com/v1_1/chuong-nguyen/delete_by_token?token=" +
        deleteToken
    );
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};
export default formatUtils;
