import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../libs/conf-axios';

const to = (tail) => `/materials/${tail}`;

export const fetchMaterials = createAsyncThunk(
    "materials/fetchMaterialsAction",
    async () => {
        let response;
        try {
            response = await API.post(to("fetch_materials"), {
                limit: 10,
                offset: 0
            });
        } catch {
            throw new Error("Bad request");
        }
        return response.data;
    }
);

export const createMaterials = createAsyncThunk(
    "materials/createMaterialsAction",
    async ({name, data}) => {
        try {
            return await API.post(to("create_material"), {
                name,
                data
            });
        } catch(error) {
            throw new Error(error.response?.data?.message);
        }
    }
);

export const getMaterialDetails = createAsyncThunk(
    "materials/getMaterialDetailsAction",
    async ({ID}) => {
        try {
            const response = await API.post(to("get_material_details"), {
                ID
            });
            return response.data;
        } catch(error) {
            throw new Error(error.response?.data?.message);
        }
    }
);

export const updateMaterial = createAsyncThunk(
    "materials/updateMaterialAction",
    async ({ID, unit}) => {
        try {
            const response = await API.put(to("update_material"), {
                ID, unit
            });
            return response.data;
        } catch(error) {
            throw new Error(error);
        }
    }
)
;
export const deleteMaterial = createAsyncThunk(
    "materials/deleteMaterialAction",
    async ({ID}) => {
        try {
            const response = await API.delete(to("delete_material"), {
                data: {ID}
            });
            return response.data;
        } catch(error) {
            throw new Error(error);
        }
    }
);