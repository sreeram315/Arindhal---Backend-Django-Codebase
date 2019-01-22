import React from 'react'
import { CustomInput, FormGroup, Label } from 'reactstrap'

class StudentsMPRouter extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <div className='ac_re'>
          <img src='https://i.ibb.co/frHJzCW/image-not-found.gif' className='img-responsive hover_pointer' />
          <FormGroup className='pt-4 px-4'>
            <div className='hover_pointer'><CustomInput type='file' id='exampleCustomFileBrowser' name='customFile' label='a selfie?' /></div>
          </FormGroup>
        </div>
      </div>
    )
  }
}
export default StudentsMPRouter
