
import React from 'react'

import './css.css'

class SearchBox extends React.Component {

  handleOnChange = (event) => {
    console.log(event)
     let dataCallbackName = this.props.onChange
     dataCallbackName(event)
  }

  handleOnClick = (event) => {
    let dataCallbackName = this.props.onClick
     dataCallbackName(event)
  }

  componentDidMount(){
     if(this.props.focus){
      this.refs.searchRef.focus()
    }
  }

  componentDidUpdate(){
    if(this.props.focus){
      this.refs.searchRef.focus()
    }
  }

  render () {
    let { nobutton, autoFocus } = this.props
    const btn_type = this.props.type
    var btn_class = `btn btn-outline-${btn_type} my-2 my-sm-0 inline_disp`
    if (btn_type === null || btn_type === undefined) { btn_class = `btn btn-outline-primary my-2 my-sm-0` }
    return (
      <div className={this.props.class}>
        <form className='form-inline my-2 my-lg-0'>
          <input ref="searchRef" className='form-control mr-sm-2' autoFocus={autoFocus} type='search' placeholder={this.props.placeholder}  onChange={this.handleOnChange} aria-label='Search' />
          {nobutton ? '' : <button className={btn_class} type='submit' onClick={this.handleOnClick}> Search </button> }
        </form>
      </div>
    )
  }
}
export default SearchBox
