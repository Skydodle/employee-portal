import { Box, Card, List, ListItem, Typography } from "@mui/material";
import PropTypes from "prop-types";

const HouseDetails = ({ address, roommates }) => {
  return (
    <Card
      className="house-details"
      sx={{
        p: "1rem",
        my: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ mb: "1rem" }}>
          House Details
        </Typography>
        <Box className="address">
          <strong>Address:</strong>
          <p>{address}</p>
        </Box>
      </Box>
      <Box className="roommates">
        <Typography variant="h3">Roommates</Typography>
        {roommates.length > 0 ? (
          <List>
            {roommates.map((roommate, index) => (
              <ListItem key={index}>
                <div style={{ marginRight: "1rem" }}>
                  <strong>Name:</strong> {roommate.firstName}{" "}
                  {roommate.lastName}
                </div>
                <div>
                  <strong>Phone:</strong>{" "}
                  {roommate.cellPhoneNumber || "Not Provided"}
                </div>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No roommates assigned to this house.</p>
        )}
      </Box>
    </Card>
  );
};

HouseDetails.propTypes = {
  address: PropTypes.string.isRequired,
  roommates: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      cellPhoneNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HouseDetails;
