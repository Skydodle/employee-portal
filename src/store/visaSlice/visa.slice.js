/** @format */

import { createSlice } from "@reduxjs/toolkit"
import { fetchVisaDocument, fetchVisaDocumentUrls, uploadVisaDocument } from "./visa.thunks";

const initialState = {
    // visaDocument:{
    //     userid: '123456789', 
    //     optReceipt: {
    //         name: 'OPT_Receipt_2023.pdf',
    //         status: 'approved',
    //         feedback: '',
    //     },
    //     optEAD: {
    //         name: 'OPT_EAD_2023.pdf',
    //         status: 'rejected',
    //         feedback: 'The document is missing a required signature.',
    //     },
    //     i983: {
    //         name: '',
    //         status: 'pending',
    //         feedback: '',
    //     },
    //     i20: {
    //         name: '',
    //         status: 'pending',
    //         feedback: '',
    //     }
    // },
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
            // Fetch Visa Document
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
            // Upload Visa Document
            .addCase(uploadVisaDocument.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(uploadVisaDocument.fulfilled, (state, action) => {
                if (state.visaDocument) {
                    state.visaDocument = {
                        ...state.visaDocument,
                        [action.payload.documentType]: {
                            ...state.visaDocument[action.payload.documentType],
                            name: action.payload.name,
                        }
                    };
                }                        
            state.loading = false;
            })
            .addCase(uploadVisaDocument.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            })
            // Fetch Visa Document URLs
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