import React, {useEffect, Fragment} from 'react';
import Menu from './Components/Menu';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import RoomServiceContainer from './Containers/RoomServiceContainer';
import RestaurantContainer from './Containers/RestaurantContainer';
import ManagementContainer from './Containers/ManagementContainer';
import TopBar from './Components/TopBar';
import { getUser } from './actions/user';
import { initialState } from './reducers/user';
import { USER_ID } from './utils/consts';

const mapStateToProps = state => ({
  user: state.user || initialState,
});

function App({ dispatch }) {
  useEffect(() => {
    dispatch(getUser({ userId: USER_ID }));
  }, []);

  return (
    <Fragment>
      <TopBar />

      <Router>
        <Route exact path="/" component={Menu} />
        <Route path="/restaurant" component={RestaurantContainer} />
        {/*<Route path="/spa" component={SpaContainer} />*/}
        <Route exact path="/room-service" component={RoomServiceContainer} />
        {/*<Route path="/events" component={EventsContainer} />*/}
        <Route path="/management" component={ManagementContainer} />
      </Router>
    </Fragment>
  );
}

export default connect(mapStateToProps)(App);
