import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectSchedule } from "../lesson-slice";
import { fetchSchedule } from "../lesson-reqs";


const normalazeSchedule = point => ({
    id: point?.ID,    
    startAt: new Date(point?.startAt * 1000).toISOString(),    
    endAt: new Date(point?.finishAt * 1000).toISOString(),      
    timezoneStartAt: 'Europe/Moscow',    
    summary: point?.studentInfo?.fullName,    
    color: 'blue',    
    calendarID: 'student' 
})

export const useFetchSchedule = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [errFetchSchedule, setErrFetchSchedule] = useState(null)

    const schedule = useSelector(selectSchedule)?.map(point => normalazeSchedule(point))
    console.log('schedule', schedule)

    const handleFetchSchedule = async () => {
        setIsLoading(true)
        try {
            await dispatch(fetchSchedule()).unwrap()
        } catch (err) {
            setErrFetchSchedule(err)
        }
        setIsLoading(false)
    }
    return { handleFetchSchedule, schedule, errFetchSchedule, isLoading }
}