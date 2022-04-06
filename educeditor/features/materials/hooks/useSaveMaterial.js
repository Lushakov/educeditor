import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateMaterial } from "../materials-reqs"
import { saveCurrentScliceToUnit, selectCurrentSlice } from "../materials-slice"

export const useSaveMaterial = () => {
    const dispatch = useDispatch()
    // const currentSlice = useSelector(selectCurrentSlice)

    const [isSaving, setIsSaving] = useState(false)
    const [savingErr, setSavingErr] = useState(null)

    const handleSaveUnit = async () => {
        dispatch(saveCurrentScliceToUnit())
        setIsSaving(true)
        try {
            await dispatch(updateMaterial()).unwrap()
        } catch (err) {
            setSavingErr(err)
        }
        setIsSaving(false)
    }
    return {handleSaveUnit, savingErr, isSaving}
}