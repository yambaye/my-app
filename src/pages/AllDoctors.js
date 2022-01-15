import { useContext } from 'react';

import BookingsContext from '../store/booking-context';
import DoctorList from '../components/DoctorList';
import classes from './AllDoctors.module.css';


function AllDoctorsPage(){

    const bookingsCtx = useContext(BookingsContext);
    const doctorList = bookingsCtx.storedDoctors;
    doctorList[0].img = 'https://www.shareicon.net/data/512x512/2016/08/18/813844_people_512x512.png';
    doctorList[1].img = 'https://www.shareicon.net/data/512x512/2016/08/18/813844_people_512x512.png';
    doctorList[2].img = 'https://www.shareicon.net/data/512x512/2016/08/18/813844_people_512x512.png';
    doctorList[3].img = 'https://www.shareicon.net/data/512x512/2016/09/01/822733_user_512x512.png';
    doctorList[4].img = 'https://www.shareicon.net/data/512x512/2016/09/01/822733_user_512x512.png';

    return (
        <main>
            <div className={classes.allDoctors}>
                <h2>All Doctors</h2>
            </div>
            <DoctorList doctors={doctorList} />
        </main>
        );
}
export default AllDoctorsPage;