import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFacilityReports,
  submitFacilityReport,
  selectFacilityReports,
  selectUser, // Import the user selector
} from "../../store";
import Comments from "./Comments"; // Import the Comments component
import PropTypes from "prop-types";
import {
  Button,
  Card,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const FacilityReports = ({ houseId }) => {
  const dispatch = useDispatch();
  const facilityReports = useSelector(selectFacilityReports);
  // const facilityReports = [
  //   {
  //     id: "csd",
  //     title: "csdc",
  //     createdAt: "csdcsd",
  //     createdBy: { firstName: "csdc", lastName: "cdc" },
  //   },
  // ];
  const user = useSelector(selectUser); // Get user from Redux state

  // Fallback to get user from local storage if not in Redux state
  const currentUserId =
    user?._id || JSON.parse(localStorage.getItem("user"))._id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (houseId) {
      // Fetch existing facility reports for this house
      dispatch(fetchFacilityReports(houseId));
    }
  }, [dispatch, houseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      // Dispatch action to submit the new facility report
      dispatch(
        submitFacilityReport({ houseId, reportData: { title, description } })
      )
        .unwrap()
        .then(() => {
          // Re-fetch the facility reports after successful submission
          dispatch(fetchFacilityReports(houseId));
        });

      // Clear form fields after submission
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Card className="facility-reports" sx={{ p: "1rem" }}>
      <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
        Facility Reports
      </Typography>
      {/* Form to submit a new facility report */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            type="text"
            label="Title:"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            multiline
            row={3}
            label="Description:"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Submit Report</Button>
      </form>

      {/* Display existing facility reports */}
      <Typography variant="h3">Your Submitted Reports</Typography>
      {facilityReports.length > 0 ? (
        <List sx={{ display: "flex", flexWrap: "nowrap" }}>
          {facilityReports.map((report) => (
            <Paper
              elevation={3}
              key={report._id || report.title + report.createdAt}
              sx={{ display: "block", p: "1rem" }}
            >
              <Typography variant="h4">{report.title}</Typography>
              <p>{report.description}</p>
              <p>
                <strong>Created By:</strong>
                {report.createdBy
                  ? `${report.createdBy.firstName} ${report.createdBy.lastName}`
                  : "Unknown"}
              </p>
              <p>
                <strong>Status:</strong> {report.status || "Open"}
              </p>
              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(report.createdAt || new Date()).toLocaleString()}
              </p>

              {/* Include the Comments component for each report */}
              <Comments reportId={report._id} currentUserId={currentUserId} />
            </Paper>
          ))}
        </List>
      ) : (
        <p>You have not submitted any facility reports yet.</p>
      )}
    </Card>
  );
};

FacilityReports.propTypes = {
  houseId: PropTypes.string.isRequired,
};

export default FacilityReports;
