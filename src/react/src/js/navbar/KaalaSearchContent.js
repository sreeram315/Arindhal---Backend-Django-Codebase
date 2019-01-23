import React from 'react'
import { DropdownItem } from 'reactstrap'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import HRline from '../components/HRline'
import Loader from '../components/Loader'

import './css.css'

class KaalaSearchContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      buffering : false,
      data: []
    }
  }

  loadData = (q) => {
    this.setState({buffering: true})
    let thisComp = this
    const endpoint = `/api/camper-kaala-search/?q=${q}`
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(endpoint, lookupOptions)
      .then(function (response)  {
        return response.json()
      }).then(function (responseData) {
        thisComp.setState({buffering: false})
        thisComp.setState({data: responseData})
      }).catch(function (error) {
        console.log(error)
      })
  }

  componentDidMount(){
    this.loadData(this.props.q)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
     this.loadData(nextProps.q)
  }



  

  render () {
    let users = this.state.data.users
    let {data, buffering} = this.state
    return (
      <div className=''>

      {buffering===true ? <div className="p-3"><Loader  align="center"/></div> : 

      <div>
          {data==='NaN' ? <div className="apple_font ac_re p-3">Nothing to show</div> :

            <div className='kaala_users'>
              <div className='pl-2 pt-2 pb-1 apple_font font_20 shead'>Users</div>
              <div>
                {users!==undefined ? users.map((user, index) => {
                  return (
                    <Link key={user.slug} to={`/user/profile/${user.slug}`} className='no_dec'>
                      <div  className='py-1 pl-3 no_dec'>
                        <DropdownItem onClick={this.onClick}>
                          {user.name}  ({user.username})<br /><small>followers: {user.followers}&ensp; following: {user.following}</small>
                        </DropdownItem>
                      </div>
                    </Link>
                  )
                }): ''}
              </div>
            </div>

          }
      </div>
    }

      </div>
    )
  }
}

export default KaalaSearchContent
