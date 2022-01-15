import { createContext, useState, useEffect } from 'react';

const BookingsContext = createContext({
    selectedTime: 0,
    bookings: [],
    storedDoctors: [],
    doctorBookings: (doctorID) => {},
    bookedTime: (bookings) => {},
    bookedDate: (bookings) => {},
    bookedDateAndTime: (bookedDates, bookedTimes) => {},
    updateSelectedTime: (time) => {},
})

export function BookingsContextProvider(props){
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);

    const [loadedBookings, setLoadedBookings] = useState([]);
    const [loadedDoctors, setLoadedDoctors] = useState([]);

    const [userSelectedTime, setUserSelectedTime] = useState(0);
       
    useEffect(() => {
        setIsLoading(true);
        async function bookingData(){
            const response = await fetch('https://fe-assignment-api.herokuapp.com/booking', {
                headers: {'x-api-key': '64c459c1-9458-41fc-a6f7-e5ce6c1e68bb'}
                })
            const data = await response.json();
            console.log(data);
            setLoadedBookings(data); 
            setIsLoading(false)
        }             
        
        //bookingData()//.then(setIsLoading(false));
        
        setIsLoading2(true);
        async function doctorData(){
            const response = await fetch('https://fe-assignment-api.herokuapp.com/doctor', {
                headers: {'x-api-key': '64c459c1-9458-41fc-a6f7-e5ce6c1e68bb'}
                })
            const data = await response.json();
            // data => {
            //     const doctors = [];
            //     for (const key in data) {
            //         const doctor = {
            //             ...data[key]
            //         };
            //         doctors.push(doctor);
            //     }
            // }   
            console.log(data);
            setLoadedDoctors(data);
            setIsLoading2(false)
        }
        doctorData()
        bookingData()

        //Promise.all([doctorData(), bookingData()]).then(setIsLoading(false));
    },[])


    //     setIsLoading2(true);
    //     fetch('https://fe-assignment-api.herokuapp.com/doctor', {
    //         headers: {
    //             'x-api-key': '64c459c1-9458-41fc-a6f7-e5ce6c1e68bb'
    //         }
    //     })
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         const doctors = [];
    //         for (const key in data) {
    //             const doctor = {
    //                 ...data[key]
    //             };
    //             doctors.push(doctor);
    //         }
    //         setIsLoading2(false);
    //         console.log(data);
    //         setLoadedDoctors(doctors);
    //     });
    // }, []);
    if (isLoading || isLoading2) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    };

    function doctorBookingsHandler(doctorID){
        return loadedBookings.filter(booking => booking.doctorId === doctorID);
    }

    function bookedTimeHandler(bookings){
        const bookedTimeArr = [];
        bookings.forEach(booking => {bookedTimeArr.push(booking.start)});
        return bookedTimeArr;
    }

    function bookedDateHandler(bookings){
        const bookedDateArr = [];
        bookings.forEach(booking => {bookedDateArr.push(booking.date)});
        return bookedDateArr;
    }
    
    function bookedDateAndTimeHandler(bookedDates, bookedTimes){
        const dateAndTimeArr = [];
        for (let i = 0; i < bookedDates.length; i++){
            let hour = Math.floor(bookedTimes[i]);
            let minute = bookedTimes[i] % hour * 100;
            let convertedDate = new Date(Date.parse(bookedDates[i]));
            let dateAndTime = new Date(convertedDate.setHours(hour, minute));
            dateAndTimeArr.push(dateAndTime);
        }
        return dateAndTimeArr;
    }
    function updateSelectedTimeHandler(time){
        setUserSelectedTime((preUserSelectedTime) => {
            return time;
        })
    }

    const context = {
        selectedTime: userSelectedTime,
        bookings: loadedBookings,
        storedDoctors: loadedDoctors,
        doctorBookings: doctorBookingsHandler,
        bookedTime: bookedTimeHandler,
        bookedDate: bookedDateHandler,
        bookedDateAndTime: bookedDateAndTimeHandler,
        updateSelectedTime: updateSelectedTimeHandler,
    };

    return (
        <BookingsContext.Provider value={context}>{props.children}</BookingsContext.Provider>
    );
}            

export default BookingsContext;