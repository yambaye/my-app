import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import BookingsContext from '../store/booking-context';
import classes from './NewBookingForm.module.css';

function NewBookingForm(props) {
    const history = useHistory();
    
    const nameInputRef = useRef();

    const bookingsCtx = useContext(BookingsContext);

    // User's name is stored here
    const [enteredName, setEnteredName] = useState('');
    
    // Store the input of user's name

    function nameChange(){
        setEnteredName(nameInputRef.current.value); 
    }

    // Submit the booking to the API
    function submitHandler(event) {
        event.preventDefault();
    
        const bookingData = {
            'name': enteredName,
            'start': bookingsCtx.selectedTime,
            'doctorId': props.doctorId,
            'date': props.date,
        }
        fetch(
            'https://fe-assignment-api.herokuapp.com/booking',
            {
                method: 'POST',
                body: JSON.stringify(bookingData),
                headers: {
                'Content-Type': 'application/json',
                'x-api-key': '64c459c1-9458-41fc-a6f7-e5ce6c1e68bb',
                }
            }   
            ).then(() => {history.replace('/success');
                });
    };

    // Users fill in their names and click submit after they pick the date and time
    return (
            <form className={classes.form} onSubmit={submitHandler}>
                <div>
                    <label htmlFor='name'>Your Name</label>
                    <input 
                        type='text' 
                        required id='name' 
                        ref={nameInputRef} 
                        onChange={nameChange} 
                        placeholder={'Please input your name'}/>
                </div>
                <button 
                    className={classes.submitButton} 
                    disabled={(enteredName === '') || (isNaN(bookingsCtx.selectedTime))}>
                    Make an Appointment
                </button>
            </form>
    )
};

export default NewBookingForm;