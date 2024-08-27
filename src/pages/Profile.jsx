import React, { useEffect } from "react";
import UploadAvatar from "../components/UploadAvatar";
import Box from "@mui/material/Box";
import { selectProfilePicture, getProfilePictureUrl } from "../store";
import { useSelector, useDispatch } from "react-redux";
export default function Profile() {
  const dispatch = useDispatch();
  const profilePicture = useSelector(selectProfilePicture);

  useEffect(() => {
    if (profilePicture) {
      dispatch(getProfilePictureUrl(profilePicture));
    }
  }, [dispatch]);

  return (
    <div>Profile</div>
  )
}
