export const selectHouseDetails = (state) => state.house.houseDetails;
export const selectFacilityReports = (state) => state.house.facilityReports;
export const selectCommentsByReportId = (reportId) => (state) =>
  state.house.comments[reportId] || [];
export const selectHouseLoading = (state) => state.house.loading;
export const selectHouseError = (state) => state.house.error;
