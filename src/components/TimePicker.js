import { useContext } from 'react';

import BookingsContext from '../store/booking-context';

function TimePicker(props){
    const bookingsCtx = useContext(BookingsContext);
    const doctorBookingList = bookingsCtx.doctorBookings(props.doctorId);
    const bookingTimeArr = bookingsCtx.bookedTime(doctorBookingList);
    const bookingDateArr = bookingsCtx.bookedDate(doctorBookingList);
    const bookingDateAndTimeArr = bookingsCtx.bookedDateAndTime(bookingDateArr,bookingTimeArr);
    
    let modifiedButtonList;

    //Obtain the data of today, which is used in filterPastTime function
    const dayInMonth = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const minute = new Date().getMinutes();
    const hour = new Date().getHours();
    const convertedTime = hour + (minute/100);
    
    const selectedDayInMonth = props.selectedDate.getDate();
    const selectedMonth = props.selectedDate.getMonth();
    const selectedYear = props.selectedDate.getFullYear();

    function filterTimeSlots(){

        if (props.selectedDate.getDay() === 0){
            modifiedButtonList = props.openingHours[6];
        }
        if (props.selectedDate.getDay() === 1){
            modifiedButtonList = props.openingHours[0];
        }
        if (props.selectedDate.getDay() === 2){
            modifiedButtonList = props.openingHours[1];
        }
        if (props.selectedDate.getDay() === 3){
            modifiedButtonList = props.openingHours[2];
        }
        if (props.selectedDate.getDay() === 4){
            modifiedButtonList = props.openingHours[3];
        }
        if (props.selectedDate.getDay() === 5){
            modifiedButtonList = props.openingHours[4];
        }
        if (props.selectedDate.getDay() === 6){
            modifiedButtonList = props.openingHours[5];
        }
    };

    function filterPastTime(time){
        
        if (selectedDayInMonth === dayInMonth &&
            selectedMonth === month &&
            selectedYear === year
            ){
                return time < convertedTime;
        }
        else {
            return false;
        }
    };

    function filterBookedTime(time){
        
        for (let x in bookingDateAndTimeArr){
            let bookedDay = bookingDateAndTimeArr[x].getDate();
            let bookedMonth = bookingDateAndTimeArr[x].getMonth();
            let bookedYear = bookingDateAndTimeArr[x].getFullYear();
            let bookedHour = bookingDateAndTimeArr[x].getHours();
            let bookedMinute = bookingDateAndTimeArr[x].getMinutes();
            let bookedTime = bookedHour + (bookedMinute / 100);
        if (
            selectedDayInMonth === bookedDay &&
            selectedMonth === bookedMonth &&
            selectedYear === bookedYear &&
            bookedTime === time
            ){
                return true;
            }
        } 
    };
    
    function createTimeSlotList(){
        
        filterTimeSlots();
        const timeSlotsArray = modifiedButtonList.map(time => createTimeSlot(time))
        return timeSlotsArray
    };

    function createTimeSlot(timeNumber){
        
        const hourNumber = Math.floor(timeNumber);
        const minuteNumber = timeNumber % hourNumber * 100;
        const minuteInString = minuteNumber.toString().padStart(2, 0);
        const text = `${hourNumber}:${minuteInString}`;
        
        if (filterBookedTime(timeNumber)){
            return(
                <button key={timeNumber} value={timeNumber} disabled>
                    {text}
                </button>
            )
        }
        if (filterPastTime(timeNumber)){
            return(
                <button key={timeNumber} value={timeNumber} disabled>
                    {text}
                </button>
            )
        }
        else{
            return(
                <button key={timeNumber} value={timeNumber} onClick={sumbitTimeHandler}>
                    {text}
                </button>
            )
        }
    };

    function sumbitTimeHandler(event){
        
        event.preventDefault();
        bookingsCtx.updateSelectedTime(event.target.value);
    };

    return(
        <div>
            {createTimeSlotList(modifiedButtonList)}
            {bookingsCtx.selectedTime}
        </div>
    )
};

export default TimePicker;