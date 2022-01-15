import { Route, Switch } from 'react-router-dom';
import { useContext } from 'react';

import BookingsContext from '../store/booking-context';
import OpeningHoursList from '../components/OpeningHoursList';

function AddRoutes(){
    
    const bookingsCtx = useContext(BookingsContext);
    const doctorList = bookingsCtx.storedDoctors;
    const doctorIdList = doctorList.map(doctor => {return doctor.id});

    function createRoutes(doctorId){
        return(
            <Route key={doctorId} path={`/${doctorId}`}>
                <OpeningHoursList 
                    doctorId={doctorId}
                />
            </Route>
        )
    }

    return(
        <Switch>
            {doctorIdList.map(createRoutes)}
        </Switch>
    )

}

export default AddRoutes;