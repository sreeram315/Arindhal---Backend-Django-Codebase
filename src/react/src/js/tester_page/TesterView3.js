import React from 'react'

import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Popover, PopoverHeader, PopoverBody } from 'reactstrap'

export default class Example extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      popoverOpen: false
    }
  }

  toggle () {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }

  render () {
    return (
      <div>
        <Button id='Popover1' type='button' caret>
          Launch Popover
        </Button>
        <Popover placement='bottom' isOpen={this.state.popoverOpen} target='Popover1' toggle={this.toggle}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <div>
            <form class='px-4 py-3'>
              <div class='form-group'>
                <label for='exampleDropdownFormEmail1'>Email address</label>
                <input type='email' class='form-control' id='exampleDropdownFormEmail1' placeholder='email@example.com' />
              </div>
              <div class='form-group'>
                <label for='exampleDropdownFormPassword1'>Password</label>
                <input type='password' class='form-control' id='exampleDropdownFormPassword1' placeholder='Password' />
              </div>
              <div class='form-group'>
                <div class='form-check'>
                  <input type='checkbox' class='form-check-input' id='dropdownCheck' />
                  <label class='form-check-label' for='dropdownCheck'>
          Remember me
                  </label>
                </div>
              </div>
              <button type='submit' class='btn btn-primary'>Sign in</button>
            </form>     </div>   </Popover>
      </div>
    )
  }
}
