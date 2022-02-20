import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import BookingsContext from '../store/booking-context';
import SelectDate from '../components/SelectDate';
import classes from './OpeningHoursList.module.css';

function OpeningHoursList(){
    // Get the doctor id from the URL
    let { id } = useParams();

    const history = useHistory();

    // Get the list of all the doctors from context
    const bookingsCtx = useContext(BookingsContext);
    const doctorList = bookingsCtx.storedDoctors;

    // A nested array storing the opening hours from Monday to Sunday
    const openingHoursNestedArr = [[],[],[],[],[],[],[]];

    const openingHoursStringArr = [];
    let Sun,Mon,Tue,Wed,Thu,Fri,Sat;

    let doctorObject = {};

    // Extract the openings hours of a doctor with the specific id
    for (let x in doctorList){
        if(doctorList[x].id === id){
            doctorObject = doctorList[x];
            const {opening_hours} = doctorList[x];
            for (let y in opening_hours){
                createHourList(opening_hours[y])
            }
            
        }
    }
    // Extract the other detailed info of the doctor
    const {name, address} = doctorObject;
    const {district, line_1, line_2} = address;

    // Convert the opening hours of a doctor to a text form
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

    // The opening hours from Monday to Sunday in text form is stored in this array
    openingHoursStringArr.push(Sun,Mon,Tue,Wed,Thu,Fri,Sat)

    // Create an array of hours, at 1-hour intervals, from starting time to ending time,
    // and store them in the nested array
    function createHoursOfDay(start, end, array){
        let loopNumber = parseFloat(start);
        while (loopNumber <= (parseFloat(end) - 1)){
            array.push(loopNumber);
            loopNumber++;
        }
    }

    // Convert the string of number to time format
    function stringToTime(string){
        const timeNumber = parseFloat(string);
        const hourNumber = Math.floor(timeNumber);
        const minuteNumber = timeNumber % hourNumber * 100;
        const minuteInString = minuteNumber.toString().padStart(2, 0);
        return `${hourNumber}:${minuteInString}`;
    }

    // Display the info about the doctor
    function displayDoctorInfo(){
        return(
            <div>
                <button className={classes.backButton} onClick={() => { history.replace('/'); history.go(0);}}>
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

    // Pass the nested array to datepicker
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