import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import RegisterView from './RegisterView'
import ProfileView from './profile/ProfileView'
import ProfileEditView from './profile/ProfileEditView'
import OpenProfileView from './OpenProfileView'
import Error404 from '../Error404'

class CamperRouter extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <BrowserRouter forceRefreah={!supportsHistory}>
          <Switch>
            <Route exact path='/user/register/' component={RegisterView} />
            <Route exact path='/user/profile/' component={ProfileView} />
            <Route exact path='/user/profile/edit/' component={ProfileEditView} />
            <Route path='/user/profile/:slug/' component={OpenProfileView} />

            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default CamperRouter
