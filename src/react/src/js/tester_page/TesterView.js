import React from 'react'
import { Button, CustomInput, Col, Fade, FormGroup, Input, Label, Row} from 'reactstrap'
import classNames from 'classnames'
import cookie from 'react-cookies'


import NavbarMain from '../navbar/NavbarMain'
import './css.css'

class GetToken extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       
    }
  }

  getUserData = () => {
    let thisComp = this
    console.log('requesting login...')
    const endpoint = '/api/accounts/user-details/'
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${thisComp.state.token}`
      },
      credentials: 'include'
    }

    fetch(endpoint, lookupOptions)
      .then(function (response)  {
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
      }).catch(function (error) {
        console.log(error)
      })
  }

  postData =  () => {
    let thisComp = this
    console.log('requesting login...')
    const endpoint = '/api-token-auth/'
    const csrfToken = cookie.load('csrftoken')
    let data = {
      'username': 'gkm',
      'password': 'guru123@'
    }
    let lookupOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }

    fetch(endpoint, lookupOptions)
      .then(function (response)  {
        console.log(response)
        return response.json()
      }).then(function (responseData) {
        thisComp.setState({token: responseData['token']})
      }).catch(function (error) {
        console.log(error)
      })

      console.log(this.state)
  }

  showState= () =>{
    console.log(this.state)
  }

  componentDidMount(){
    this.postData()
  }


  render () {
    return (
      <div>
          <Button color="primary" onClick={this.getUserData}>BUTT</Button>
          <Button color="primary" onClick={this.showState}>Show state</Button>

      </div>
    )
  }
}
export default GetToken

//     "batch": null,
//     "father_name": "",
//     "mother_name": "",
//     "father_contact": "",
//     "mother_contact": "",
//     "image": null
// }
