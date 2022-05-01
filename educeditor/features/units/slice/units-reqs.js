import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../libs/conf-axios';
import { Teacher_Unit__Path } from '../../../libs/const-path';

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
    async (_, { getState }) => {
        const unit = getState().units.unit
        try {
            const response = await API.put(to("update_material"), {
                ID: unit._id, 
                unit
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


// ===========================================================================

export const fetchUnits = createAsyncThunk(
    "materials/fetchUnits",
    async (_, { getState }) => {
        const state = getState()
        const { units } = state

        try {
            const response = await API.post(Teacher_Unit__Path.FETCH, {
                limit: units?.unitsListReq.limit,
                offset: units?.unitsListReq.offset
            });
            return response.data;
        } catch {
            throw new Error("Bad request");
        }
        
    }
);

export const getDetails = createAsyncThunk(
    "materials/fetchUnits",
    async ({ID}) => {
        try {
            const response = await API.post(Teacher_Unit__Path.GET_DETAILS, {
                unitID: ID
            });
            return response.data;
        } catch {
            throw new Error("Bad request");
        }
        
    }
);

// export const getDetails = createAsyncThunk(
//     "materials/fetchUnits",
//     async ({ID}) => {
//         try {
//             const response = await API.post(Teacher_Unit__Path.GET_DETAILS, {
//                 unitID: ID
//             });
//             return response.data;
//         } catch {
//             throw new Error("Bad request");
//         }
        
//     }
// );

