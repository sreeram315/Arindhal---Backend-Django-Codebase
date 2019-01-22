import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomeView from './home_page/HomeView'
// import TesterView2 from './tester_page/TesterView2'
import CamperRouter from './camper/CamperRouter'
import Tester4 from './tester_page/Tester4'
import StudentsMPRouter from './StudentsMP/StudentsMPRouter'
import RegisterView from './camper/RegisterView'
import Error404 from './Error404'

class RouterMain extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <BrowserRouter forceRefreah={!supportsHistory}>
          <Switch>
            <Route exact path='/' component={HomeView} />
            <Route path='/tester' component={Tester4} />
            <Route path='/smp' component={StudentsMPRouter} />
            <Route path='/user' component={CamperRouter} />

            <Route component={Error404} />
          </Switch>
        </BrowserRouter>

      </div>
    )
  }
}
export default RouterMain
