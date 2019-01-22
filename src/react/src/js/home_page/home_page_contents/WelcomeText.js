import React from 'react'

import HRline from '../../components/HRline'
import './css.css'

class WelcomeText extends React.Component {
  render () {
    return (
      <div className='m-4'>
        <div className='lead ac_re welcome_hello_ji'>
          Hello ji,
        </div>
        <div className='display-4 ac_re'>

         Welcome to Manant Corp.

        </div><HRline cn='padx-20' />
      </div>
    )
  }
}
export default WelcomeText
