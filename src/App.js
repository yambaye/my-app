import { Route, Switch } from 'react-router-dom';

import AllDoctorsPage from './pages/AllDoctors';
import Layout from './components/Layout/Layout';
import AddRoutes from './components/AddRoutes';
import Success from './pages/Success';

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
        <AddRoutes />
      </Switch>
    </Layout>
  );
}

export default App;