import React from 'react'

import { FormGroup, Input, Col, Row, Label, CustomInput, Fade, Button, FormText, FormFeedback } from 'reactstrap'
import cookie from 'react-cookies'
import Loader from '../components/Loader'
import RedirectTo from '../components/RedirectTo'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginAction } from '../actions/CamperActions' 



class RegisterForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      password: '',
      vname: undefined,
      vusername: undefined,
      usernameAvail: undefined,
      vpassword: undefined,

      usernameBuffer: false,
      submittingFormBuffer: false,
      redirect: false
      
    }
  }

  sendForm = () => {
    const thisComp = this
    this.setState({submittingFormBuffer: true})
    const endpoint = '/api/accounts/user-register/'
    const csrf_token = cookie.load('csrftoken')
    let data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name
    }

    let lookupOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }

    fetch(endpoint, lookupOptions)
      .then(function (res) {
        return res.json()
      }).then(function (json)  {
       
        let loginData = {
              'username': thisComp.state.username,
              'password': thisComp.state.password
            }
         thisComp.props.loginAction(loginData)
         thisComp.setState({submittingFormBuffer: false, redirect: true})

      })
      .catch(function (error) {
        console.log(error)
      })
  }

  checkUsernameAvalability = (username) => {
    const thisComp  = this
    this.setState({usernameBuffer: true})
    console.log('checking usernmae avalability for', username)
    const endpoint = '/api/accounts/user-check-username-availability/'
    const csrfToken = cookie.load('csrftoken')
    let data = {'username': username}
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(data),
      credentials: 'include'
      })
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log(json)
        if (json=='OK'){
         thisComp.setState({
               usernameBuffer: false,
               usernameAvail: true
             })
          }
         else{
           thisComp.setState({
               usernameBuffer: false,
               usernameAvail: false
             })
          }
         })
  }

  forAllGood = () =>{
    let {vname, vpassword, vusername} = this.state
    if (vname && vpassword && vusername){return true}
      else{
        if(!vname){this.setState({vname: false})}
        if(!vpassword){this.setState({vpassword: false})}
        if(!vusername){this.setState({vusername: false})}  
      }
  }

  form_update = (e) => {
    let key = e.target.name
    let value = e.target.value
    e.preventDefault()
    this.setState({
      [key]: value
    })
    this.validateEach(key, value)
    console.log(this.state)
  }

  validateEach = ( key, value ) => {
    let validator = `v${key}`
    
    if ((key === 'name' && value.length >= 3 && value.length <= 100))
      {this.setState({[validator]: true})}
    else if( key === 'username' && /^[A-Za-z0-9]+$/.test(value) && value.length>=3 && value.length<=12)
      {this.setState({[validator]: true})}
    else if( (key === 'password' && value.length >= 8))
      {this.setState({[validator]: true})}
    else
      {console.log(key, 'FAILERd');this.setState({[validator]: false})}

    if(key==='username'){this.checkUsernameAvalability(value)}

  }

  form_submit = () => {
    console.log('submiting form')
    if(this.forAllGood()){
      this.sendForm()
    }
    else{
      console.log("")
    }
  }

  componentDidMount(){
    this.refs.stu_entry_form.reset()
    
  }


  render () {
    const {vname, vusername, vpassword, name, username,usernameAvail, password, usernameBuffer, redirect, submittingFormBuffer} = this.state
    return (
      <div>

      {redirect ?  <RedirectTo path='/user/profile/edit/' /> :

        <div className="al_re">
          <form ref='stu_entry_form'>
            <FormGroup>
              <Label for='name' sm={10}>Full Name</Label>
              <div className="al_re pl-2">
              <Row>
              <Col sm={8} >
                <Input autoFocus ref="refTest" valid={vname} invalid={!vname && vname !== undefined} type='text' name='name' id='name' placeholder='Jonathan Thakur' value={name} onChange={this.form_update} />
                <FormFeedback invalid className="al_re">Name should have a minimum of 3 letters</FormFeedback>
              </Col></Row></div>
            </FormGroup>


            <FormGroup className="">
              <Label for='username' sm={10}>Choose a username</Label>
              <div className="al_re pl-2">
              <Row>
              <Col sm={8}>
                <Input valid={vusername && usernameAvail} invalid={(!vusername && vusername !== undefined) || (!usernameAvail && usernameAvail !== undefined)} type='text' autoComplete="off" name='username' id='username' placeholder='jonathan123' value={username} onChange={this.form_update} />
                <FormFeedback invalid className="al_re">
                      {usernameAvail===false ? 'Oh noes! that username seems to be taken' : 'Not avalid username'}
                </FormFeedback>
                <FormFeedback valid className="al_re">User name available</FormFeedback>
                <FormText className="al_re" color="muted">
                  username should not contain spaces, allowed character length: 3-12 
                </FormText>
              </Col>
                { usernameBuffer ? <Col className="al_re">
                <div class="spinner-border text-success" role="status"/>
               </Col> : ''}
              </Row>
              </div>
 

            </FormGroup>

            <FormGroup className="">
              <Label for='password' sm={10}>Password</Label>
              <div className="al_re pl-2">
              <Row>
              <Col sm={8}>
                <Input valid={vpassword} invalid={!vpassword && vpassword !== undefined} type='password' name='password' id='password' value={password} onChange={this.form_update} />
              <FormFeedback invalid className="al_re">Password length should be a minimum of 8 characters</FormFeedback>
              <FormText className="al_re" color="muted">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
              </FormText>
              
              </Col></Row></div>
            </FormGroup>

            <Row>
              <Col sm={12} >
                <div className='al_re pl-3' ><Button outline color='primary' size='md' onClick={this.form_submit}>
                  {submittingFormBuffer ? 'Please wait' : 'Sign up'}
                </Button></div>
              </Col>
            </Row>
            

            

          </form>
        </div>
      }
      </div>
    )
  }
}


RegisterForm.propTypes = {
  token: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  toggler: PropTypes.number
}


function mapStateToProps  (state) {
  return {
    token: state.camper.token,
    loggedIn: state.camper.loggedIn,
    toggler: state.camper.toggler,
  }
}

export default connect(mapStateToProps, {loginAction})(RegisterForm)
