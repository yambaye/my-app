import { Route, Switch } from 'react-router-dom';

import AllDoctorsPage from './pages/AllDoctors';
import Layout from './components/Layout/Layout';
import Success from './pages/Success';
import OpeningHoursList from '../components/OpeningHoursList';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <AllDoctorsPage />
        </Route>
        <Route path='/success'>
          <Success />
        </Route>
        <Route path='/:id' children={<OpeningHoursList />} />
      </Switch>
    </Layout>
  );
}

export default App;