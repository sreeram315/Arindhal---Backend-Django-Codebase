import React from 'react'

import './css.css'
import NavbarMain from '../navbar/NavbarMain'
import SMPNavbar from './SMPNavbar'
import HomeView from './home_contents/HomeView'

class StudentMPListView extends React.Component {
  render () {
    return (
      <div>
        <NavbarMain active='smp' />

        <div className='pt-3 px-5'>

          <div><SMPNavbar active='home' /></div>

          <HomeView />

        </div>
      </div>

    )
  }
}
export default StudentMPListView
