import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../libs/conf-axios";
import { CDN__Path } from "../../../libs/const-path";


export const CDN_UploadByFile = createAsyncThunk(
    "materials/CDN_UploadByFile",
    async ({file, signal}) => {
        let response;
        try {
            response = await API.post('http://45.135.134.152:8080' + CDN__Path.UPLOAD_BY_FILE, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    type: 'images'
                },
                signal
            });
            return response?.data;
        } catch(error) {
            console.log('error inreq', error)
            throw error
        }
    }
);
export const CDN_UploadByB64 = createAsyncThunk(
    "materials/CDN_UploadByB64",
    async () => {
        let response;
        try {
            response = await API.post(CDN__Path.UPLOAD_BY_B64);
        } catch {
            throw new Error(error.response);
        }
        return response.data;
    }
);
export const CDN_UploadByUrl = createAsyncThunk(
    "materials/CDN_UploadByUrl",
    async () => {
        let response;
        try {
            response = await API.post(CDN__Path.UPLOAD_BY_URL);
        } catch {
            throw new Error(error.response);
        }
        return response.data;
    }
);
export const CDN_Download = createAsyncThunk(
    "materials/CDN_Download",
    async ({ type, filename }) => {
        let response;
        try {
            response = await API.get(CDN__Path.DOWNLOAD + `?type=${type}&filename=${filename}`);
        } catch {
            throw new Error(error.response);
        }
        return response.data;
    }
);
