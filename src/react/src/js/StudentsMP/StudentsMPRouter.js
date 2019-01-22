import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import StudentMPListView from './StudentMPListView'
import StudentMPHomeView from './StudentMPHomeView'
import StudentMPNewEntry from './StudentMPNewEntry'
import StudentMPDetailView from './StudentMPDetailView'
import Error404 from '../Error404'

class StudentsMPRouter extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <BrowserRouter forceRefreah={!supportsHistory}>
          <Switch>
            <Route exact path='/smp/' component={StudentMPHomeView} />
            <Route exact path='/smp/list/' component={StudentMPListView} />
            <Route exact path='/smp/new_entry/' component={StudentMPNewEntry} />

            <Route path='/smp/student-details/:slug' component={StudentMPDetailView} />

            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default StudentsMPRouter
