import React from 'react'

import WelcomeText from './home_page_contents/WelcomeText'
import NavbarMain from '../navbar/NavbarMain'
import ManantIntro from './home_page_contents/ManantIntro'

class HomeView extends React.Component {
  render () {
    return (
      <div>
        <div> <NavbarMain active='home' /></div>
        <div> <WelcomeText /></div>
        <div> <ManantIntro /> </div>

      </div>
    )
  }
}
export default HomeView
