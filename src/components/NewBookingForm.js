import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import BookingsContext from '../store/booking-context';

function NewBookingForm(props) {
    const history = useHistory();
    
    const nameInputRef = useRef();

    const bookingsCtx = useContext(BookingsContext);

    const [enteredName, setEnteredName] = useState('');
    
    function nameChange(){
        setEnteredName(nameInputRef.current.value); 
    }

    function activateSubmit(){
        if(
            (enteredName !== '') && (bookingsCtx.selectedTime !== 0)
            ){
                return(
                    <button>Make an Appointment</button>
                );
        }
        else{
            return(
                <button disabled>Make an Appointment</button>
            )
        }
    };

    function submitHandler(event) {
        event.preventDefault();
    
        const bookingData = {
            'name': enteredName,
            'start': parseFloat(bookingsCtx.selectedTime),
            'doctorId': props.doctorId,
            'date': props.date,
        }
        console.log(bookingData)
    //     fetch(
    //         'https://fe-assignment-api.herokuapp.com/booking',
    //         {
    //             method: 'POST',
    //             body: JSON.stringify(bookingData),
    //             headers: {
    //             'Content-Type': 'application/json',
    //             'x-api-key': '64c459c1-9458-41fc-a6f7-e5ce6c1e68bb',
    //             }
    //         }   
    //         ).then(() => {history.replace('/');
    //             });
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='name'>Your Name</label>
                    <input type='text' required id='title' ref={nameInputRef} onChange={nameChange}/>
                </div>
                <div>
                    {activateSubmit()}
                </div>
            </form>
            <div>
                My Name is {enteredName}
            </div>
        </div>
    )
};

export default NewBookingForm;