
import React from 'react'
import classNames from 'classnames'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem , UncontrolledDropdown} from 'reactstrap'

class UserDropDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }



  logout = () => {
    localStorage.setItem('authToken', '')
    const {refreshPage} = this.props
    refreshPage()
  }

  render () {
    let {Uname} = this.props
    const dropItemClasses = classNames('color_black nodec')
    return (
      <div>
        <UncontrolledDropdown inNavbar>
                <DropdownToggle nav caret>
                  <div className="disp_inline nodec color_black">
                    { Uname!==undefined && Uname!==null && Uname.length > 0 ? Uname : 'Options' }
                   </div>
                </DropdownToggle>
                <DropdownMenu right>

                  <a href="/user/profile" className={dropItemClasses}>
                      <DropdownItem>
                        Profile
                      </DropdownItem>
                  </a>

                  <a href="/user/settings" className={dropItemClasses}>
                      <DropdownItem>
                        Settings
                      </DropdownItem>
                  </a>

                  <DropdownItem divider />

                  <a href="/user/deactivate" className={dropItemClasses}>
                      <DropdownItem>
                        deactivate account
                      </DropdownItem>
                  </a>

                   <a onClick={this.logout} className={dropItemClasses}>
                      <DropdownItem>
                        logout
                      </DropdownItem>
                  </a>

                  
                </DropdownMenu>
              </UncontrolledDropdown>
      </div>
    )
  }
}

export default UserDropDown









