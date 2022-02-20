import DatePicker from 'react-datepicker';
import { useState, useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import BookingsContext from '../store/booking-context';
import NewBookingForm from './NewBookingForm';
import TimePicker from './TimePicker';
import classes from './SelectDate.module.css';

function SelectDate(props){

    const [startDate, setStartDate] = useState(new Date());
    
    // Store the selected date in a string format
    const monthSelected = (startDate.getMonth() + 1 ).toString().padStart(2, '0');
    const dateSelected = startDate.getDate().toString().padStart(2, '0');
    const yearSelected = startDate.getFullYear()
    const dateInString = `${yearSelected}-${monthSelected}-${dateSelected}`;

    const bookingsCtx = useContext(BookingsContext);

    // When selecting a new date, the time, stored in context, resets to NaN
    function reloadTime(date){
        setStartDate(date);
        bookingsCtx.updateSelectedTime(NaN);
    };

    // DatePicker: a component used for displaying the dates using a calendar dialog
    // TimePicker: Pass the date information to the component for selecting time
    // NewBookingForm: Pass information to the component for submission of booking
    return(
        <div>
            <p className={classes.date}>Date</p>
            <div className={classes.datePicker}>
                <DatePicker wrapperClassName='date-picker'
                    selected={startDate}
                    onChange={reloadTime}
                    minDate={new Date()}
                    dateFormat="dd-MM-yyyy"
            /></div>
            <div>
                <p className={classes.timeTitle}>Time</p>
                <TimePicker 
                    selectedDate={startDate} 
                    doctorId={props.doctorId}
                    openingHours={props.openingHours}
                />
            </div>
            <div>
                <NewBookingForm 
                    doctorId={props.doctorId}
                    date={dateInString}
            /></div>
        </div>
    )
};

export default SelectDate;