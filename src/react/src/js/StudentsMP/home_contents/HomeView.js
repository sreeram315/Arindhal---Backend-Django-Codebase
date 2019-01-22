import React from 'react'
// import { CustomInput, FormGroup, Label } from 'reactstrap'

import LoggedView from './LoggedView'
import NotLoggedView from './NotLoggedView'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkAuthAction } from '../../actions/CamperActions'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount () {
    this.props.checkAuthAction
  }

  render () {
    const { isAuthenticated } = this.props
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        {isAuthenticated === true
          ? <NotLoggedView /> : ''}
        {isAuthenticated === false
          ? <NotLoggedView /> : ''}
      </div>
    )
  }
}

HomeView.propTypes = {
  checkAuthAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.camper.isAuthenticated
})

export default connect(mapStateToProps, { checkAuthAction })(HomeView)
