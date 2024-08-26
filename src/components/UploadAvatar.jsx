import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  selectProfileLoading,
  selectProfilePictureUrl,
  updateProfilePicture,
} from "../store";
import Avatar from "@mui/material/Avatar";

function UploadAvatar(props) {
  const url = useSelector(selectProfilePictureUrl);
  const dispatch = useDispatch();
  const loading = useSelector(selectProfileLoading);

  function handleChange(e) {
    const file = e.target.files[0];
    dispatch(updateProfilePicture(file));
  }
  return (
    <div className="App">
      <Avatar
        alt="avatar"
        src={url}
        sx={{ width: 100, height: 100, marginBottom: "1rem" }}
      />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        disabled={loading}
      >
        Upload
        <input
          style={{
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: 1,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            whiteSpace: "nowrap",
            width: 1,
          }}
          type="file"
          onChange={handleChange}
        />
      </Button>
    </div>
  );
}

UploadAvatar.propTypes = {};

export default UploadAvatar;
