import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSlice } from "../units-reqs"
import { saveCurrentScliceToUnit, selectCurrentSlice, selectUnit } from "../units-slice"
import isEqual from "lodash/isEqual";

export const useSaveSlice = () => {
    const dispatch = useDispatch()
    // const currentSlice = useSelector(selectCurrentSlice)

    const [isSaving, setIsSaving] = useState(false)
    const [savingErr, setSavingErr] = useState(null)

    const currentSlice = useSelector(selectCurrentSlice)
    const unit = useSelector(selectUnit)

    const handleSaveUnit = async () => {
        dispatch(saveCurrentScliceToUnit())

        const isEqualSlice = isEqual(currentSlice, unit?.sliceList?.find(el => el?.unitSliceID === currentSlice?.unitSliceID))
        console.log('isEqual', isEqualSlice)
        if(isEqualSlice) return 

        setIsSaving(true)
        try {
            // await dispatch(updateMaterial()).unwrap()
            await dispatch(updateSlice()).unwrap()
        } catch (err) {
            setSavingErr(err)
        }
        setIsSaving(false)
    }
    return {handleSaveUnit, savingErr, isSaving}
}