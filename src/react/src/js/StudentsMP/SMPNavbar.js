import React from 'react'
import { Link } from 'react-router-dom'

import './css.css'
import { Nav, NavItem, NavLink } from 'reactstrap'

class SMPNavbar extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render () {
    const active_port = this.props.active
    return (
      <div>
        <Nav tabs>
          <NavItem >
            <Link to='/smp/' className='nodec'><NavLink className={active_port === 'home' ? 'active' : ''}>Home</NavLink></Link>
          </NavItem>
          <NavItem >
            <Link to='/smp/list' className='nodec'><NavLink className={active_port === 'list' ? 'active' : ''}>Student List</NavLink></Link>
          </NavItem>
          <NavItem >
            <Link to='/smp/new_entry' className='nodec'><NavLink className={active_port === 'new_entry' ? 'active' : ''}>New Entry</NavLink></Link>
          </NavItem>
          <NavItem >
            <Link to='/smp/student-details/asda' className='nodec'><NavLink className={active_port === 'custom' ? 'active' : ''} disabled={this.props.disabled} >{this.props.custom}</NavLink></Link>
          </NavItem>
        </Nav>
      </div>
    )
  }
}
export default SMPNavbar
