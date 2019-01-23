import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import SearchBox from '../components/SearchBox'
import KaalaSearchContent from './KaalaSearchContent'

import './css.css'

class KaalaSearchBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      q: ''
    }
  }

  closeMenu = () => {
    this.setState({dropdownOpen: false})
  }

  handleOnClick = (e) =>{
    e.preventDefault()
  }

  handleOnChange = (e) => {
    let value = e.target.value
    this.handleToggle(value)
    this.setState({q: value})
  }

  handleToggle = (value) => {
    if(value.length > 0){this.setState({dropdownOpen: true})}
    else{this.setState({dropdownOpen: false})}
  }

  toggle = () => {
    console.log('toggle')
    this.setState({focus: true})
  }

  componentDidMount(){
    console.log(this.refs.kaalaSearchref)
  }

  render () {
    return (
      <div className='ac_re'>
      <Dropdown isOpen={this.state.dropdownOpen} className="">
      
        <DropdownToggle onClick={this.toggle} className="no_back hover_cursor pad_0">
        <SearchBox focus={this.state.focus} nobutton type='info' onChange={this.handleOnChange} placeholder="Kaala Search" onClick={this.handleOnClick}/></DropdownToggle>
        <div className="width_100 child_indi">
            <DropdownMenu left className="pad_0" onClick={this.closeMenu} >
              <KaalaSearchContent q={this.state.q}/>
            </DropdownMenu>
        </div>
      </Dropdown>
      </div>
    )
  }
}


export default KaalaSearchBox
