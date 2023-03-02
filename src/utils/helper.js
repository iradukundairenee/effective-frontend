import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const notifUser = (user = {}, notif = {}) => {
  let name = "You";
  if (user.role === notif.userRole) {
    return name;
  }
  if (user.role === "Client") {
    return `${notif.createdBy?.fullName}[${notif.userRole}]`;
  } else {
    return notif.createdBy?.companyName;
  }
};

export const toHtml = (editorContent) => {
  return draftToHtml(convertToRaw(editorContent?.getCurrentContent()));
};
