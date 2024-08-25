import Upload from "./Upload";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
export default function DocumentStatus({
  documentType,
  name,
  status,
  feedback,
  onUpload,
  previousDocumentApproved,
  url,
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
            <Button href={url} target="_blank">
              preview
            </Button>
          </Typography>
          <Box>
            <Typography varian="body1">Document Name: {name} </Typography>
          </Box>

          <Box>
            <Typography varian="body1">Status: {status}</Typography>
          </Box>
          {status === "rejected" && (
            <Box>
              <Typography varian="body1">Feedback:</Typography> {feedback}
            </Box>
          )}
          {status === "pending" && (
            <Box>
              <Typography varian="body1">
                Waiting for HR to approve your {documentType}
                {documentType === "I-983" && " and sign your I-983"}
              </Typography>{" "}
              {feedback}
            </Box>
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
          {documentType === "I-983" && (
            <>
              <Button
                variant="outlined"
                href="https://i983public.s3.amazonaws.com/i983.pdf"
                target="_blank"
                sx={{ mr: 2 }}
              >
                I-983 Form
              </Button>
              <Button
                variant="outlined"
                href="https://isss.utah.edu/forms-publications/documents/f-1/f1-form-i-983-sample.pdf"
                target="_blank"
              >
                I-983 Sample
              </Button>
            </>
          )}
          <Upload
            id={documentType}
            label={`upload ${documentType}`}
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
  url: PropTypes.string
};
