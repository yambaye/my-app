import { useContext } from 'react';

import BookingsContext from '../store/booking-context';
import SelectDate from '../components/SelectDate';

function OpeningHoursList(props){
    
    const bookingsCtx = useContext(BookingsContext);
    const doctorList = bookingsCtx.storedDoctors;

    const openingHoursNestedArr = [[],[],[],[],[],[],[]];

    function createHourList(hourObject){
        if(hourObject.day === 'MON'){

            createHoursOfDay(hourObject.start, hourObject.end, openingHoursNestedArr[0])
        }
        if(hourObject.day === 'TUE'){

            createHoursOfDay(hourObject.start, hourObject.end, openingHoursNestedArr[1])
        }
        if(hourObject.day === 'WED'){

            createHoursOfDay(hourObject.start, hourObject.end, openingHoursNestedArr[2])
        }
        if(hourObject.day === 'THU'){

            createHoursOfDay(hourObject.start, hourObject.end, openingHoursNestedArr[3])
        }
        if(hourObject.day === 'FRI'){

            createHoursOfDay(hourObject.start, hourObject.end, openingHoursNestedArr[4])
        }
        if(hourObject.day === 'SAT'){

            createHoursOfDay(hourObject.start, hourObject.end, openingHoursNestedArr[5])
        }
        if(hourObject.day === 'SUN'){

            createHoursOfDay(hourObject.start, hourObject.end, openingHoursNestedArr[6])
        }
    }

    function createHoursOfDay(start, end, array){
        let loopNumber = parseFloat(start);
        while (loopNumber <= (parseFloat(end) - 1)){
            array.push(loopNumber);
            loopNumber++;
        }
    }

    for (let x in doctorList){
        if(doctorList[x].id === props.doctorId){
            for (let y in doctorList[x].opening_hours){
                createHourList(doctorList[x].opening_hours[y])
            }
            
        }
    }
    return(
        <SelectDate openingHours={openingHoursNestedArr}
                    doctorId={props.doctorId}
        />
    )
}

export default OpeningHoursList;