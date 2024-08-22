import React from "react";
import Upload from "./Upload";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
export default function DocumentStatus({
  documentType,
  name,
  status,
  feedback,
  onUpload,
  previousDocumentApproved,
}) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };
  if (name) {
    return (
      <Paper sx={{ m: 3, p: 3, maxWidth: 500 }}>
        <Typography variant="h3">{documentType}</Typography>
        <p>
          <Typography varian="body1">Document Name: {name}</Typography>
        </p>
        <p>
          <Typography varian="body1">Status: {status}</Typography>
        </p>
        {status === "rejected" && (
          <p>
            <Typography varian="body1">Feedback:</Typography> {feedback}
          </p>
        )}
      </Paper>
    );
  }

  if (previousDocumentApproved && !name) {
    return (
      <Paper sx={{ m: 3, p: 3, maxWidth: 500 }}>
        <Typography variant="h3">{documentType}</Typography>
        <Upload
          id={documentType}
          label={"upload"}
          onChange={handleFileUpload}
        />
      </Paper>
    );
  }

  return null;
}

DocumentStatus.propTypes = {
  documentType: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  feedback: PropTypes.string,
  onUpload: PropTypes.func,
  previousDocumentApproved: PropTypes.bool,
};
