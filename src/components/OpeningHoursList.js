import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import BookingsContext from '../store/booking-context';
import SelectDate from '../components/SelectDate';
import classes from './OpeningHoursList.module.css';

function OpeningHoursList(){
    let { id } = useParams();

    const history = useHistory();

    const bookingsCtx = useContext(BookingsContext);
    const doctorList = bookingsCtx.storedDoctors;

    const openingHoursNestedArr = [[],[],[],[],[],[],[]];

    const openingHoursStringArr = [];
    let Sun,Mon,Tue,Wed,Thu,Fri,Sat;

    let doctorObject = {};

    for (let x in doctorList){
        if(doctorList[x].id === id){
            doctorObject = doctorList[x];
            const {opening_hours} = doctorList[x];
            for (let y in opening_hours){
                createHourList(opening_hours[y])
            }
            
        }
    }

    const {name, address} = doctorObject;
    const {district, line_1, line_2} = address;

    openingHoursStringArr.push(Sun,Mon,Tue,Wed,Thu,Fri,Sat)

    //Obtain the opening hours of a doctor and create displaying opening hours
    function createHourList(hourObject){
        const {day, start, end} = hourObject;
        
        if(day === 'MON'){

            Mon = `MON\t${stringToTime(start)} - ${stringToTime(end)}`;
            createHoursOfDay(start, end, openingHoursNestedArr[0])
        }
        if(day === 'TUE'){

            Tue = `TUE\t\t${stringToTime(start)} - ${stringToTime(end)}`;
            createHoursOfDay(start, end, openingHoursNestedArr[1])
        }
        if(day === 'WED'){

            Wed = `WED\t${stringToTime(start)} - ${stringToTime(end)}`;
            createHoursOfDay(start, end, openingHoursNestedArr[2])
        }
        if(day === 'THU'){

            Thu = `THU\t\t${stringToTime(start)} - ${stringToTime(end)}`;
            createHoursOfDay(start, end, openingHoursNestedArr[3])
        }
        if(day === 'FRI'){

            Fri = `FRI\t\t${stringToTime(start)} - ${stringToTime(end)}`;
            createHoursOfDay(start, end, openingHoursNestedArr[4])
        }
        if(day === 'SAT'){

            Sat = `SAT\t\t${stringToTime(start)} - ${stringToTime(end)}`;
            createHoursOfDay(start, end, openingHoursNestedArr[5])
        }
        if(day === 'SUN'){

            Sun = `SUN\t${stringToTime(start)} - ${stringToTime(end)}`;
            createHoursOfDay(start, end, openingHoursNestedArr[6])
        }
    }

    function createHoursOfDay(start, end, array){
        let loopNumber = parseFloat(start);
        while (loopNumber <= (parseFloat(end) - 1)){
            array.push(loopNumber);
            loopNumber++;
        }
    }

    function stringToTime(string){
        const timeNumber = parseFloat(string);
        const hourNumber = Math.floor(timeNumber);
        const minuteNumber = timeNumber % hourNumber * 100;
        const minuteInString = minuteNumber.toString().padStart(2, 0);
        return `${hourNumber}:${minuteInString}`;
    }

    function displayDoctorInfo(){
        return(
            <div>
                <button className={classes.backButton} onClick={() => history.replace('/')}>
                    Go Back
                </button>
                <p className={classes.name}>
                        {name}
                </p>
                <div className={classes.address}>
                    <div className={classes.addressTitle}>Address</div>
                    <div className={classes.addressDetails}>
                        <p>
                            {line_1}
                        </p>
                        <p>
                            {line_2}
                        </p>
                        <p>
                            {district}
                        </p>
                    </div>
                </div>
                <div className={classes.hours}>
                    <div className={classes.hoursTitle}>Opening Hours</div>
                    <div className={classes.openingHours}>
                        {openingHoursStringArr.map(str => <p key={str}>{str}</p>)}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className={classes.bookingPage}>
            <div>
                {displayDoctorInfo()}
            </div>
            <SelectDate openingHours={openingHoursNestedArr}
                    doctorId={id}
            />
        </section>
    )
}

export default OpeningHoursList;