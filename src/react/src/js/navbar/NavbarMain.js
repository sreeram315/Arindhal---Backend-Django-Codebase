import React from 'react'
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkAuthAction, userBasicDetailsAction } from '../actions/CamperActions'

import './css.css'
import SearchBox from '../components/SearchBox'
import LoginDropDown from './LoginDropDown'
import UserDropDown from './UserDropDown'
import KaalaSearchBox from './KaalaSearchBox'

class NavbarMain extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      isAuthenticated: false,
      Uname: '', 
      userBasicDetails: {}
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  showState = () => {
  }

 

  refreshPage = () =>{
      this.props.checkAuthAction() 
  }

  handleCallBack = (string) => {
    this.props.checkAuthAction()
    this.getUserName()
  }

  getUserName = () => {
    this.props.userBasicDetailsAction()
    let userData = this.props.userBasicDetails
    if (userData!==undefined && userData!==null && 'name' in userData )
      {this.setState({Uname: userData.name, Uusername: userData.username})}
  }

   UNSAFE_componentWillReceiveProps(nextProps) {
     if (nextProps.isAuthenticated===true && this.state.Uname==''){
       this.getUserName()
     }
   }

  componentDidMount(){
    this.getUserName()
  }

  render () {
    if(this.state.Uname==='' && this.props.isAuthenticated){this.getUserName()}
    this.props.checkAuthAction()
    var a_link = this.props.active
    let {isAuthenticated} = this.props
    return (
      <div>
        <div className='navbar_re'>
          <Navbar light expand='md'>

            <a className='navbar-brand' href='/'>
              <img src='https://i.ibb.co/NC3rTCy/logo-big.png' width='30' height='30' alt='' />
            </a>

            <NavbarBrand href='/'>Manant Corp.</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />

            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>

                <NavItem className={(a_link === 'home') ? 'active' : ''}>
                  <NavLink href='/' >Home</NavLink>
                </NavItem>

                <NavItem className={(a_link === 'smp') ? 'active' : ''}>
                  <NavLink href='/smp' >Students MP</NavLink>
                </NavItem>

                <NavItem className={(a_link === 'tester') ? 'active' : ''}>
                  <NavLink href='/tester' >Tester</NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>

                  <DropdownToggle nav caret>
                        {this.state.Uname}
                  </DropdownToggle>
                  <DropdownMenu right>

                    <DropdownItem>
                            Option 1
                    </DropdownItem>
                    <DropdownItem>
                            Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                            Reset
                    </DropdownItem>

                  </DropdownMenu>

                </UncontrolledDropdown>

              </Nav>
            </Collapse>

            <div className="ar_re"><KaalaSearchBox /></div>

            {isAuthenticated===true
            ? <div className='pl-2'> <UserDropDown Uname={this.state.Uname} refreshPage={this.refreshPage}/> </div>
            : ""}

            {isAuthenticated===false || isAuthenticated==null
              ? <div className='pl-3'><LoginDropDown callBackFunction={this.handleCallBack} isAuthenticated={isAuthenticated} /></div>  
              : ""}

          </Navbar>

        </div>

      </div>
    )
  }
}

NavbarMain.propTypes = {
  checkAuthAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  userBasicDetailsAction: PropTypes.func.isRequired,
  userBasicDetails: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.camper.isAuthenticated,
  userBasicDetails: state.camper.userBasicDetails
})


export default connect(mapStateToProps, { checkAuthAction, userBasicDetailsAction })(NavbarMain)
