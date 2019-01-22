import React from 'react'
import { Button, CustomInput, Col, Fade, FormGroup, Input, Label, Row} from 'reactstrap'
import classNames from 'classnames'
import cookie from 'react-cookies'


import NavbarMain from '../navbar/NavbarMain'
import './css.css'

class Tester4 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       
    }
  }

  postData =  () => {
    console.log('requesting profile update...')
    let endpoint = '/api/accounts/user-update/'
    let csrfToken = cookie.load('csrftoken')
    let token = localStorage.getItem('authToken')
    let data = {
      'name': 'Sreeram Maram',
      'description': 'He is a bad boy'
    }
    let lookupOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
         'Authorization': `JWT ${token}`

      },
      body: JSON.stringify(data),
      credentials: 'include'
    }

    fetch(endpoint, lookupOptions)
      .then(function (response)  {
        console.log(response)
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
      }).catch(function (error) {
        console.log(error)
      })
  }

  showState= () =>{
    console.log(this.state)
  }



  render () {
    return (
      <div>
          <Button color="primary" onClick={this.postData}>POST</Button>
          <Button color="primary" onClick={this.showState}>Show state</Button>

      </div>
    )
  }
}
export default Tester4

//     "batch": null,
//     "father_name": "",
//     "mother_name": "",
//     "father_contact": "",
//     "mother_contact": "",
//     "image": null
// }
