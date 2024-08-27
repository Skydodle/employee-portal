
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HouseDetails from "../components/housing/HouseDetails";
import FacilityReports from "../components/housing/FacilityReports";
// import CommentSection from '../components/CommentSection';
import { fetchHouseDetails, selectHouseDetails } from "../store";
import { selectUser } from "../store";
import { Box, Typography } from "@mui/material";


const Housing = () => {
  const dispatch = useDispatch();

  // Accessing the user object correctly from Redux state or localStorage
  const userState = useSelector(selectUser);

  const user = userState || JSON.parse(localStorage.getItem('user'));
  const assignedHouseId = user?.assignedHouse;

  const houseDetails = useSelector(selectHouseDetails);


  useEffect(() => {
    if (assignedHouseId) {
      dispatch(fetchHouseDetails(assignedHouseId));
    }
  }, [dispatch, assignedHouseId]);

  return (

    <Box className="housing-page" sx={{ padding: "2rem" }}>
      <Typography variant="h2">Housing</Typography>

      {houseDetails && (
        <>
          <HouseDetails
            address={houseDetails.address}
            roommates={houseDetails.residents.map((resident) => ({
              firstName: resident.userId.firstName,
              lastName: resident.userId.lastName,
              cellPhoneNumber: resident.userId.cellPhoneNumber
            }))}
          />

          {/* FacilityReports component added here */}
          <FacilityReports houseId={assignedHouseId} />
        </>
      )}

      {/* CommentSection component will be added here */}
      {/* <CommentSection reportId="someReportId" comments={[]} /> */}
    </Box>

  );
};

export default Housing;
