import React from 'react'
// import { CustomInput, FormGroup, Label } from 'reactstrap'

import HRline from '../../../components/HRline'

import '../css.css'

class WelcomeText extends React.Component {
  render () {
    return (
      <div>
        <div className='disp_inline'>
          <div className='head_name_local apple_font ac_re pt-3'>Student Management Portal</div>
          <div className='ac_re font_20'><small className='apple_font'>A one place to manage all your student's data</small></div>
        </div>
        <HRline cn='padx-25' />
      </div>
    )
  }
}
export default WelcomeText
