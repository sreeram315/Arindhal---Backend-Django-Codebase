import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap'
import { Link } from 'react-router-dom'


class FollowersDispModel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,

    }
  }

  closeModel = () => {
    let {callBack} = this.props
    callBack()
  }

  handleOnClick = () => {
    this.closeModel()
  }

  render () {
    let {headline, usersList, isOpen} = this.props
    return (
      <div>
      <div >
        <Modal isOpen={isOpen} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{headline}</ModalHeader>
          <ModalBody onClick={this.handleOnClick}>
             {usersList!==undefined && usersList.length>0 ? usersList.map((user, index) => {
             return (
               <Link key={user.slug} to={`/user/profile/${user.slug}`} className='no_dec'>
                      <div   className='py-1 pl-3 no_dec'>
                        <DropdownItem>
                          {user.name}<br />
                        </DropdownItem>
                      </div>
                    </Link>

                   
               )
           }) : <div className="apple_font font_20 ac_re">No Users to display</div>  }
           
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.closeModel}>Close</Button>
          </ModalFooter>
        </Modal>
        </div>
      </div>
    )
  }
}

export default FollowersDispModel
