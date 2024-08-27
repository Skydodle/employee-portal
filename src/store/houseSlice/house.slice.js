import { createSlice } from '@reduxjs/toolkit';
import {
  fetchHouseDetails,
  fetchFacilityReports,
  submitFacilityReport,
  fetchComments,
  addComment,
  updateComment
} from './house.thunks';

const initialState = {
  houseDetails: null,
  facilityReports: [],
  comments: {},
  loading: false,
  error: null
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    // Optimistically add a report to the state
    addReportOptimistic: (state, action) => {
      state.facilityReports.push(action.payload);
    },
    // Replace the optimistic report with the real one
    replaceOptimisticReport: (state, action) => {
      state.facilityReports = state.facilityReports.map((report) =>
        report._id === action.payload.tempId
          ? action.payload.realReport
          : report
      );
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch House Details
      .addCase(fetchHouseDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHouseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.houseDetails = action.payload;
      })
      .addCase(fetchHouseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Facility Reports
      .addCase(fetchFacilityReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilityReports.fulfilled, (state, action) => {
        state.loading = false;
        state.facilityReports = action.payload;
      })
      .addCase(fetchFacilityReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments[action.meta.arg] = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Comment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const { reportId, comment } = action.payload;
        if (!state.comments[reportId]) {
          state.comments[reportId] = [];
        }
        state.comments[reportId].push(comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Comment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const { reportId, updatedComment } = action.payload;

        if (state.comments[reportId]) {
          state.comments[reportId] = state.comments[reportId].map((comment) =>
            comment._id === updatedComment._id ? updatedComment : comment
          );
        } else {
          // Handle the case where state.comments[reportId] is undefined
          state.comments[reportId] = [updatedComment];
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit Facility Report
      .addCase(submitFacilityReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFacilityReport.fulfilled, (state, action) => {
        state.loading = false;
        state.facilityReports.push(action.payload);
      })
      .addCase(submitFacilityReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default houseSlice.reducer;
