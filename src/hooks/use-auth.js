import {  useSelector } from "react-redux";

import { selectCurrentUser } from "src/redux/features/auth/authSlice";


export default function useAuth() {
   const currentUser = useSelector(selectCurrentUser);
  return !!currentUser;
}