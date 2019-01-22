import React from 'react'
import { BrowserRouter, Route, Switch, Link, Input } from 'react-router-dom'
import { Col, Row, Button } from 'reactstrap'

import FollowersDispModel from './FollowersDispModel'
import './css.css'

import { Display2Data } from '../../components/DisplayData'
import { DisplayEdit2Data, DisplayEditData } from '../../components/DisplayEditData'
import HRline from '../../components/HRline'
import RedirectTo from '../../components/RedirectTo'
import Loader from '../../components/Loader'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkAuthAction, userDetailAction, userUpdataAction } from '../../actions/CamperActions'


class UserEditData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: '',
       vname: undefined,
       vcontact: undefined,
       vdob: undefined,
       vemail: undefined,
       vaddress: undefined,
       vdescription: undefined,
       name: '',
       contact: '',
       email: '',
       address: '',
       description: ''
    }
  }

  postForm = () => {
    this.setState({posting: true})
    let {name, contact, dob, email, address, description} = this.state
    let data = {
      'name': name,
      "contact": contact,
       "dob": dob,
       "email": email,
       "address": address,
      'description': description
    }
    this.props.userUpdataAction(data)
    this.setState({redirect: true})
  }

  handleSubmit = () => {
    this.validateAll()
    
    
    console.log("VALIDATING ALL")
    this.setState({misc: true}, function() {
      let {vcontact, vemail, vaddress, vdescription } = this.state
      console.log(vcontact, vemail, vaddress, vdescription)
      if ( vcontact && vemail && vaddress && vdescription){
          console.log("FORM VALID")
          this.postForm()
          }
      else{
          console.log('FORM INVALID')
          }
    })
   

  }
  
  validateAll = () => {
    this.validateEach('contact', this.state.contact)
    this.validateEach('dob', this.state.dob)
    this.validateEach('email', this.state.email)
    this.validateEach('address', this.state.address)
    this.validateEach('description', this.state.description)
  }

  validateEach = (key, value) => {
    console.log('validating', key, value)
    let validater = 'v' + key
    if((key==='contact') && ( (String(value).length >= 10 && /^\d+$/.test(value)) || (value===null || value===undefined) || value.length===0 )){this.setState({[validater]: true})}
    else if(key==='dob'){this.setState({[validater]: true})}
    else if((key==='email') && ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase())) || (value===null || value===undefined) || value.length===0 )){this.setState({[validater]: true})}
    else if(  (key==='address') && ((value===null || value===undefined || value.length===0 ) || (value.length <= 300) )){this.setState({[validater]: true})}
    else if(  (key==='description') && (  (value===null || value===undefined || value.length===0 )  ||  (value.length <= 9999)   )){{this.setState({[validater]: true})}}
    else {this.setState({[validater]: false})}


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

  handleOnChange = (e) => {
    let key = e.target.name
    let value= e.target.value
    console.log(key, value)
    this.setState({[key]: value})
    this.validateEach(key, value)
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    console.log(nextProps.userDetails)
    let data = nextProps.userDetails
    if(data!==undefined){
    this.setState({
       username: data.username,
       name: data.name,
       contact: data.contact,
       dob: data.dob,
       email: data.email,
       address: data.address,
       description: data.description
     })
  }

  }

  componentDidMount() {
    this.props.checkAuthAction()
     this.props.userDetailAction()
  }

  render () {
    let disabled = false
    let {isAuthenticated} = this.props
    const { posting, username, contact, dob, email, address, description, name, vcontact, vdob, vaddress, vemail, vdescription } = this.state
    if(posting===true){disabled=true}else{disabled=false}
    return (
      <div>
      {this.state.redirect===true ? <RedirectTo path="/user/profile"/> :

      <div>
      
      <div>
        <Row>
          <Col sm={{ size: 9 }}>
            <div className='headname_sd_local lead'>{name}</div>
          </Col>
        </Row>
        <HRline />

        <div className='container-fluid pb-5'>
          <Row>
            <Col sm={{ size: 6 }} xs={{ size: 12 }}><Display2Data type="text" name="username" index='Username' value={username} big /></Col>
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><DisplayEdit2Data type="text" name="contact" index='Contact' value={contact} big  onChangeCallBack={this.handleOnChange} valid={vcontact} invalid={vcontact===false ? true : undefined} invalidFeedback="Not a valid contact number"/></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayEditData type="date" name="dob" index='DOB' value={dob}   onChangeCallBack={this.handleOnChange} valid={vdob} invalid={vdob===false ? true : undefined}/></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayEditData type="text" name="email" index='Email' value={email}   onChangeCallBack={this.handleOnChange} valid={vemail} invalid={vemail===false ? true : undefined} invalidFeedback="Not a valid email id"/></Col>
          </Row>

        

          <HRline cn='padx-10' />

          <Row>
            <Col md={{ size: 12 }}><DisplayEditData type="text" name="address" index='Address' value={address}   onChangeCallBack={this.handleOnChange} valid={vaddress} invalid={vaddress===false ? true : undefined} invalidFeedback="Not a valid address"/></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayEditData type="text" name="description" index='Description' value={description}   onChangeCallBack={this.handleOnChange} valid={vdescription} invalid={vdescription===false ? true : undefined}/></Col>
          </Row>

        </div>
        <div className="px-3"><Button disabled={disabled} className="ac_re" color="info" size="lg" block onClick={this.handleSubmit}>{posting ? 'Please wait' : 'Save' }</Button></div>
      </div> 

 
      </div>


      }
      </div>
    )
  }
}




UserEditData.propTypes = {
  userDetails: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  userDetails: state.camper.userDetails,
  isAuthenticated: state.camper.isAuthenticated,
})

// function mapStateToProps = (state) => {
//   console.log(state)
// }

export default connect(mapStateToProps, { userDetailAction, checkAuthAction, userUpdataAction })(UserEditData)
