import React from 'react'
import cookie from 'react-cookies'
import './css.css'
import NavbarMain from '../navbar/NavbarMain'
import SMPNavbar from './SMPNavbar'
import EntryForm from './EntryForm'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkAuthAction } from '../actions/CamperActions'

class StudentMPNewEntry extends React.Component {
  render () {
    let { isAuthenticated } = this.props
    return (
      <div>
        <NavbarMain active='smp' />
        <div className='pt-3 px-5'>

          <div><SMPNavbar active='new_entry' /></div>
          {isAuthenticated === true
            ? <div className='pt-5 pb-5'>
              <EntryForm />
            </div>
            : '' }

          {isAuthenticated === false
            ? <div className='apple_font font_20 ac_re p-5'> Please login or <a href='/user/register/'>register</a> to add students and list them here.</div>
            : '' }

        </div>
      </div>
    )
  }
}

StudentMPNewEntry.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.camper.isAuthenticated
})

export default connect(mapStateToProps, { checkAuthAction })(StudentMPNewEntry)
