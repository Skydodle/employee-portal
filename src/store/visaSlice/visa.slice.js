/** @format */

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    visaDocument: null,
    uploadedDocumentUrls: [],
    loading: false,
    error: null,
}

const visaSlice = createSlice({
    name: 'visa',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postVisaDocument.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postVisaDocument.fulfilled, (state, action) => {
            state.visaDocument = action.payload;
            state.loading = false;
            })
            .addCase(postVisaDocument.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            })
            .addCase(fetchVisaDocument.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(fetchVisaDocument.fulfilled, (state, action) => {
            state.visaDocument = action.payload;
            state.loading = false;
            })
            .addCase(fetchVisaDocument.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            })
            .addCase(uploadVisaDocument.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(uploadVisaDocument.fulfilled, (state, action) => {
            state.visaDocument = action.payload;
            state.loading = false;
            })
            .addCase(uploadVisaDocument.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            })
            .addCase(fetchVisaDocumentUrls.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(fetchVisaDocumentUrls.fulfilled, (state, action) => {
            state.uploadedDocumentUrls = action.payload;
            state.loading = false;
            })
            .addCase(fetchVisaDocumentUrls.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            });
    }
})

export default visaSlice.reducer;