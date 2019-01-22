import React from 'react'
// import { CustomInput, FormGroup, Label } from 'reactstrap'

import WelcomeText from './not_logged_view_contents/WelcomeText'
import EndingText from './not_logged_view_contents/EndingText'
import OffersContent from './not_logged_view_contents/OffersContent'

import './css.css'

class NotLoggedView extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <div className='pb-5'>
          <WelcomeText />
          <OffersContent />
          <EndingText />
        </div>
      </div>
    )
  }
}
export default NotLoggedView
