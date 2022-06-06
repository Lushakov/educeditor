import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../libs/conf-axios";
import { Teacher_Schedule__Path } from "../../../libs/const-path";

export const fetchSchedule = createAsyncThunk(
    "/teacher/schedule/fetchSchedule",
    async (_, { getState }) => {
        try {
            const response = await API.post(Teacher_Schedule__Path.FETCH);
            return response.data;
        } catch(err) {
            console.log('fetchSchedule', err)
            throw new Error("Bad request");
        }
    }
);