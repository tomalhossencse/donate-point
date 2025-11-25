import { auth } from "@/Firebase/firebase.config";
import Cookies from "js-cookie";

export const SaveToken = async () => {
  const token = await auth.currentUser.getIdToken();
  Cookies.set("token", token, { expires: 7 });
};
