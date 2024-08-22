import React from "react";
import Upload from "./Upload";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
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
      <Grid item xs={12} md={6}>
        <Paper sx={{ m: 3, p: 3, maxWidth: 500 }}>
          <Typography variant="body1">
            {documentType}{" "}
            <Button href={""} target="_blank">
              preview
            </Button>
          </Typography>
          <p>
            <Typography varian="body1">Document Name: {name} </Typography>
          </p>

          <p>
            <Typography varian="body1">Status: {status}</Typography>
          </p>
          {status === "rejected" && (
            <p>
              <Typography varian="body1">Feedback:</Typography> {feedback}
            </p>
          )}
          {status === "pending" && (
            <p>
              <Typography varian="body1">
                Waiting for HR to approve your {documentType}
                {documentType === "I-983" && " and sign your I-983"}
              </Typography>{" "}
              {feedback}
            </p>
          )}
        </Paper>
      </Grid>
    );
  }

  if (previousDocumentApproved && !name) {
    return (
      <Grid item xs={12} md={6}>
        <Paper sx={{ m: 3, p: 3, maxWidth: 500 }}>
          <Typography variant="body1">
            {documentType === "OPT EAD"
              ? "Please upload a copy of your OPT EAD"
              : documentType === "I-983"
              ? "Please download and fill out the I-983 form"
              : documentType === "I-20"
              ? "Please send the I-983 along with all necessary documents to your school and upload the new I-20"
              : "All documents have been approved"}
          </Typography>
          <Upload
            id={documentType}
            label={"upload"}
            onChange={handleFileUpload}
          />
        </Paper>
      </Grid>
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
