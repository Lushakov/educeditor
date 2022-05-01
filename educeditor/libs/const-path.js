export const BASE_URL = `http://localhost:3004`
export const BASE_API_URL = `http://45.135.134.152:8080`


//======================================================= PAGES =======================================================//
export const Path = {
    BASE_URL: BASE_URL,
    _SECTION: '',
    BASE: `/`,
    PROFILE: '/profile',
    MATERIALS: '/materials',
    UNITS: '/units',
    LESSONS: '/lessons',
    STUDENTS: '/students',
    
    LOGIN: '/login',
    SINGUP: '/singup',
}

export const MaterialsPath = {
    BASE_URL: BASE_URL,
    _SECTION: '/materials',
    LESSONS: '/lessons',
    UNITS: '/units',
    COURSES: '/courses',
    SLICES: '/slices'
}


//===================================================== API =========================================================//

/* Teacher */
const TEACHER_SLICE = '/teacher/slice'
export const Teacher_Slice__Path = {
    FETCH: TEACHER_SLICE + '/fetch',
    CREATE: TEACHER_SLICE + '/create',
    GET_DETAILS: TEACHER_SLICE + '/get_details',
    UPDATE: TEACHER_SLICE + '/update',
    DELETE: TEACHER_SLICE + '/delete',
}

const TEACHER_UNIT = '/teacher/unit'
export const Teacher_Unit__Path = {
    FETCH: TEACHER_UNIT + '/fetch',
    CREATE: TEACHER_UNIT + '/create',
    GET_DETAILS: TEACHER_UNIT + '/get_details',
    UPDATE_SLICE_PRIORITY: TEACHER_UNIT + '/update_slice_priority',
    ADD_EXISTS_SLICE_IN_UNIT: TEACHER_UNIT + '/add_exists_slice_in_unit',
    ADD_NEW_SLICE_IN_UNIT: TEACHER_UNIT + '/add_new_slice_in_unit',
    DELETE_SLICE_FROM_UNIT: TEACHER_UNIT + '/delete_slice_from_unit',
    DELETE_UNIT: TEACHER_UNIT + '/delete_unit',

}

/* CDN */
const CDN = '/cdn'
export const CDN__Path = {
    UPLOAD_BY_FILE: CDN + '/upload_by_file',
    UPLOAD_BY_B64: CDN + '/upload_by_b64',
    UPLOAD_BY_URL: CDN + '/upload_by_url',
    DOWNLOAD: CDN + '/download',
}

