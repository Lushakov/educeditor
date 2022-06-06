import Kalend, { CalendarView } from 'kalend' // import component
import 'kalend/dist/styles/index.css'; // import styles
import moment from "moment";
import { memo, useEffect } from 'react';

import styled from "styled-components"
import { useFetchSchedule } from '../_feature/hooks/useFetchSchedule';

const ScheduleContainer = styled.div`
    border: 1px solid #DDD;
    border-radius: 10px;;
    height: 600px;
`

const ScheduleKalend = () => {
    const {handleFetchSchedule, schedule, errFetchSchedule, isLoading} = useFetchSchedule()


    const onEventClick = (evt) => {
        console.log('onEventClick', evt)
    }
    const onNewEventClick = (evt) => {
        console.log('onNewEventClick', evt)
    }
    const onSelectView = (evt) => {
        console.log('onSelectView', evt)
    }
    const onPageChange = (evt) => {
        console.log('onPageChange', evt)
    }
    const onEventDragFinish = (evt) => {
        console.log('onEventDragFinish', evt)
    }

    useEffect(() => {
        handleFetchSchedule()
    }, [])

    return (
        <ScheduleContainer>
            {process.browser && <Kalend
                onEventClick={onEventClick}
                onNewEventClick={onNewEventClick}
                // events={[
                //     {
                //         id: 1,
                //         startAt: '2022-06-05T18:00:00.000Z',
                //         endAt: '2022-06-05T19:00:00.000Z',
                //         timezoneStartAt: 'Europe/Berlin', // optional
                //         summary: 'test Artem Vasilev',
                //         color: 'blue',
                //         calendarID: 'work',
                //         key: 'hold'
                //     },
                //     {
                //         id: 2,
                //         startAt: '2022-06-05T19:00:00.000Z',
                //         endAt: '2022-06-05T20:00:00.000Z',
                //         timezoneStartAt: 'Europe/Berlin', // optional
                //         summary: 'Natasha Prostakova',
                //         color: 'blue',
                //         calendarID: 'work',
                //         key: 'hold'
                //     },
                //     {
                //         id: 3,
                //         startAt: '2022-06-05T20:00:00.000Z',
                //         endAt: '2022-06-05T21:00:00.000Z',
                //         timezoneStartAt: 'Europe/Berlin', // optional
                //         summary: 'Oleg Dolgoprudni',
                //         color: 'blue',
                //         calendarID: 'work',
                //         key: 'hold'
                //     },
                //     {
                //         id: 4,
                //         startAt: '2021-11-21T18:00:00.000Z',
                //         endAt: '2021-11-21T19:00:00.000Z',
                //         timezoneStartAt: 'Europe/Berlin', // optional
                //         summary: 'test',
                //         color: 'blue',
                //     }
                // ]}
                events={schedule}
                initialDate={new Date().toISOString()}
                hourHeight={27}
                initialView={CalendarView.WEEK}
                // disabledViews={[CalendarView.DAY]}
                onSelectView={onSelectView}
                // selectedView={CalendarView.WEEK}
                onPageChange={onPageChange}
                timeFormat={'24'}
                weekDayStart={'Monday'}
                calendarIDsHidden={['work']}
                language={'ru'}
                onEventDragFinish={onEventDragFinish}
                isNewEventOpen={true}
                draggingDisabledConditions={{'work': true}}
                disabledDragging={true}
                showTimeLine={true}
                autoScroll={true}
                // style={{height: '500px'}}
            />}
        </ScheduleContainer>
    )
}
export default ScheduleKalend