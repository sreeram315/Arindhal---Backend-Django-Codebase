import React from 'react'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Popover, PopoverHeader, Alert } from 'reactstrap'


import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginAction } from '../actions/CamperActions' 
import Loader from '../components/Loader'

import './css.css'

class LoginDropDown extends React.Component {
    constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      popoverOpen: false,
      username: '',
      password: '',
      token: '',
      toggler: false,
      loggedIn: false,
      wrongCredWarning: false,
      submitted: false,
      buffering: false
    }
  }

  toggle () {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }


  handleOnClick = () =>{

    this.setState({
          submitted: true,
          username: this.refs.username.value,
          password: this.refs.password.value,
        }, function(){
           // localStorage.setItem('wait','true')
          let preValue = this.props.token
            let loginData = {
              'username': this.state.username,
              'password': this.state.password
            }
            this.props.loginAction(loginData)
            this.setState({buffering: true})
            
          })
  }


  
  componentDidMount(){
    

  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    if(nextProps.loggedIn===true){
      this.toggle()
      this.setState({
        wrongCredWarning: false,
        buffering: false
      })
      const {callBackFunction}=this.props
      callBackFunction()
    }
    else if(this.state.submitted){
      this.setState({
        wrongCredWarning: true,
        buffering: false
      })
    }
    const {callBackFunction}=this.props
    callBackFunction()

  }



  render () {
    
    
    return (
      <div>
        <Button id='Popover1' color="info">
          Login
        </Button>
        <Popover placement='bottom' className="width_100" isOpen={this.state.popoverOpen} target='Popover1' toggle={this.toggle}>
         <div className="lead pt-3 pb-2 ac_re"><strong> Login Form </strong></div>
          <div>
          {this.state.wrongCredWarning && !this.state.buffering ? <div className="ac_re px-1"><Alert color="danger">
                Incorrect login credentials
              </Alert></div> : ''}

          {this.state.buffering===true ? <div className="ac_re"><Loader align="center" pad="3"/></div> : ''}

            <form className='px-4 py-3'>
              <div className='form-group'>
                <label htmlFor='username'>Email address</label>
                <input ref="username" type='username' className='form-control' name="username" id='username' value={this.state.username} placeholder='jonathan' onChange={this.onChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input ref="password" type='password' className='form-control' name="password" id='password' value={this.state.password} placeholder='Password' onChange={this.onChange} />
              </div>
              <div className='form-group'>
                <div className='form-check'>
                  <input type='checkbox' className='form-check-input' id='dropdownCheck' />
                  <label className='form-check-label' htmlFor='dropdownCheck'>
                      Remember me
                  </label>
                </div>
              </div>
              <div className="al_re">
                <Button color="primary" outline onClick={this.handleOnClick}>
                  <div>
                    {this.state.buffering ? 'Please wait...' : 'Login' }
                   </div>
                </Button>
             </div>
            </form>    
              <div className="lead p-2 font_16">New here? <a href="/user/register">Register</a> now</div>
             </div>   
            </Popover>
      </div>
    )
  }
}


LoginDropDown.propTypes = {
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

export default connect(mapStateToProps, {loginAction})(LoginDropDown)







