import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateMaterial, updateSlice } from "../units-reqs"
import { saveCurrentScliceToUnit, selectCurrentSlice } from "../units-slice"

export const useSaveSlice = () => {
    const dispatch = useDispatch()
    // const currentSlice = useSelector(selectCurrentSlice)

    const [isSaving, setIsSaving] = useState(false)
    const [savingErr, setSavingErr] = useState(null)

    const handleSaveUnit = async () => {
        dispatch(saveCurrentScliceToUnit())
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