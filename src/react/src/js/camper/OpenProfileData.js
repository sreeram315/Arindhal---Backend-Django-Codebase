import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Col, Row, Button } from 'reactstrap'

import FollowersDispModel from './profile/FollowersDispModel'
import './css.css'
import cookie from 'react-cookies'

import { Display2Data, DisplayData } from '../components/DisplayData'
import HRline from '../components/HRline'
import Loader from '../components/Loader'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userOpenDetailAction, checkAuthAction } from '../actions/CamperActions'

class OpenProfileData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: '',
      followersModel: false,
      followingModel: false,
      buffering: true
    }
  }



  closeModel = () => {
    this.setState({followingModel: false, followersModel: false})
  }

  showFollowing = () => {
    this.setState({followingModel: true})
  }

  showFollowers = () => {
    this.setState({followersModel: true})
  }

   componentDidMount() {
    this.props.checkAuthAction()
    this.props.userOpenDetailAction(this.props.slug)
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if('userDetails' in nextProps){
      this.setState({buffering: false})
    }
  }

   toggleFollow = () => {
      const thisComp = this
    // this.setState({submittingFormBuffer: true})
    console.log('performing follow toggle')
    const endpoint = '/api/accounts/user-follow-toggle/'
    const csrf_token = cookie.load('csrftoken')
    let token  = localStorage.getItem('authToken')
    let data = {
      'username': this.props.userDetails.username,
      'action': 'toggle'
    }

    let lookupOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token,
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }

    fetch(endpoint, lookupOptions)
      .then(function (res) {
        return res.json()
      }).then(function (json)  {
         console.log(json)
         thisComp.props.userOpenDetailAction()
      })
      .catch(function (error) {
        console.log(error)
      })
  }




  render () {
    let { buffering } = this.state
    let {isAuthenticated} = this.props
    let data = this.props.userDetails
    if(data.slug!==this.props.slug){this.props.userOpenDetailAction(this.props.slug)}
    return (
      <div>
      { buffering===false ? 
      <div>
        <Row>
          <Col sm={{ size: 9 }}>
            <div className='headname_sd_local lead'>{data.name}</div>
          </Col>
          {isAuthenticated===true ? 
          <Col sm={{ size: 3 }}>
            <div className="local_up2">
              <Button outline color="primary" onClick={this.toggleFollow}>Follow</Button>
            </div>
          </Col> : '' }
        </Row>
        <HRline />

        <div className='container-fluid pb-5'>
          <Row>
            <Col sm={{ size: 6 }} xs={{ size: 12 }}><Display2Data index='Username' value={data.username} big /></Col>
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><Display2Data index='Contact' value={data.contact} big /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='DOB' value={data.dob} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Email' value={data.email} /></Col>
          </Row>

          <Row>
            <Col sm={{ size: 6 }} xs={{ size: 12 }}><a className="no_dec" href="#" onClick={this.showFollowing}><Display2Data index='Following' value={data.following_count} /></a></Col>
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><a className="no_dec" href="#" onClick={this.showFollowers}><Display2Data index='Followers' value={data.followers_count} /></a></Col>
          </Row>

          <HRline cn='padx-10' />

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Address' value={data.address} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Description' value={data.description} /></Col>
          </Row>

        </div>
        <FollowersDispModel isOpen={this.state.followersModel} headline={`${data.name}'s followers (${data.followers_count})`} usersList={data.followers} callBack={this.closeModel}/>
        <FollowersDispModel isOpen={this.state.followingModel} headline={`${data.name}'s followers (${data.following_count})`} usersList={data.following} callBack={this.closeModel}/>
      </div>
      : <Loader className="p-5" big align="center"/> }
      </div>
    )
  }
}


OpenProfileData.propTypes = {
  userDetails: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  userDetails: state.camper.userDetails,
  isAuthenticated: state.camper.isAuthenticated
})

export default connect(mapStateToProps, { userOpenDetailAction, checkAuthAction })(OpenProfileData)




