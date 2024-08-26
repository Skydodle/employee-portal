import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import src from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { selectProfilePicture, updateProfilePicture } from "../store";
import Avatar from "@mui/material/Avatar";

function UploadAvatar(props) {
  const picture = useSelector(selectProfilePicture);
  const dispatch = useDispatch();
  function handleChange(e) {
    console.log(e.target.files);
    dispatch(updateProfilePicture(e.target.files[0]));
  }

  return (
    <div className="App">
      <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} />
      <Avatar alt="avatar" src={picture} />
    </div>
  );
}

UploadAvatar.propTypes = {};

export default UploadAvatar;
