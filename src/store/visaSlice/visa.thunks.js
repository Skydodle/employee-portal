/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../interceptors/axiosInstance";


// for new a dataset in visadoc schema when the visa status is F1
export const postVisaDocument = createAsyncThunk(
    'visa/postVisaDocument',
    async (userId , {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/visa/employee', { userid: userId});

            if (response.status === 201) {
                return response.data
            } else {
                throw new Error('Failed to create visa document.')
            }
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || e.message)
        }
    }
)

export const fetchVisaDocument = createAsyncThunk(
    'visa/fetchVisaDocument',
    async (userId, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.get('/visa/employee',{ userid: userId })
            if (response.status === 200) {
                return response.data
            } else {
                throw new Error('Failed to fetch visa document.');
            }
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || e.message)
        }
    }
)

export const uploadVisaDocument = createAsyncThunk(
    'visa/uploadVisaDocument',
    async ({ userId, username, documentType, file }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('document', file);
            formData.append('userid', userId);
            formData.append('username', username);
            formData.append('documentType', documentType);

            const response = await axiosInstance.put('/visa/employee', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            if (response.status === 200) {
                return response.data
            } else {
                throw new Error('Failed to upload visa document.');
            }
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || e.message)
        }
    }
)

export const fetchVisaDocumentUrls = createAsyncThunk(
    'visa/fetchVisaDocumentUrls',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/visa/employee/doc', { userid: userId })
            if (response.status === 200) {
                return response.data
            } else {
                throw new Error('Failed to fetch visa document URLs.');
            }
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || e.message)
        }
    }
)
