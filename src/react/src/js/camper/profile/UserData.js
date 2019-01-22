import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'


import FollowersDispModel from './FollowersDispModel'

import { Display2Data, DisplayData } from '../../components/DisplayData'
import HRline from '../../components/HRline'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userDetailAction, checkAuthAction } from '../../actions/CamperActions'

class UserData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: '',
      followersModel: false,
      followingModel: false
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
    this.props.userDetailAction()
  }

  render () {
    const data = this.props.userDetails
    let {isAuthenticated} = this.props

    return (
      <div>

      
        <div>
        <Row>
          <Col sm={{ size: 9 }}>
            <div className='headname_sd_local lead'>{data.name}</div>
          </Col>
          <Col sm={{ size: 3 }}>
            <div className="font_small align-items-center float-bottom local_up">
              <Link to="/user/profile/edit/"><div className="no_dec color_grey">Update profile</div></Link>
             </div>
          </Col>
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

          <FollowersDispModel isOpen={this.state.followersModel} headline={`${data.name}'s followers (${data.followers_count})`} usersList={data.followers} callBack={this.closeModel}/>
          <FollowersDispModel isOpen={this.state.followingModel} headline={`${data.name}'s followers (${data.following_count})`} usersList={data.following} callBack={this.closeModel}/>
      

        </div></div>

       


      </div>
    )
  }
}


UserData.propTypes = {
  userDetails: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  userDetails: state.camper.userDetails,
  isAuthenticated: state.camper.isAuthenticated
})

// function mapStateToProps = (state) => {
//   console.log(state)
// }

export default connect(mapStateToProps, { userDetailAction, checkAuthAction })(UserData)
