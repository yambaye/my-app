import { Route } from 'react-router-dom';

import OpeningHoursList from '../components/OpeningHoursList';

function AddRoutes(){

    return (
        <Route path='/:id' children={<OpeningHoursList />} />
    )

};

export default AddRoutes;