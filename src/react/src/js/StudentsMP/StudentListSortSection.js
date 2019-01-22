import React from 'react'
import { CustomInput, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, FormGroup, Input, Label, Row, Col } from 'reactstrap'


class StudentListSortSection extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false,
      states: []
    }
  }

  loadStates =  () => {
    const thisComp = this
    const endpoint = "/api/students/all-states/"

    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response)  {
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
        thisComp.setState({
          states: responseData,
        })
      }).catch(function (error) {
        console.log(error)
      })
  }

  toggle () {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  validate_limit = (value) => {
    if(/^\d+$/.test(value) || value.length===0){
      this.setState({limit_valid : false})
    }else{
      this.setState({limit_valid : true})
    }
  }

  updateQueries = (event) =>{
    if(event.target.name === 'limit'){this.validate_limit(event.target.value)}
    var {onChangeHandle}  = this.props
    onChangeHandle(event)
  }

  componentDidMount(){
    this.loadStates()
  }

  render () {
    let {states} = this.state
    return (
      <div>
        <div className='container-fluid'>

          <Row>
            <Col xs={{ size: 3, order: 1 }} >
              <div className='apple_font ac_re pt-2'> By: </div>
            </Col>
            <Col xs={{ size: 9, order: 2 }}>
              <FormGroup>
                <div className='ac_re px-2'>
                  <Input type='select' name='order_by' id='order_by' onChange={this.updateQueries}>
                    <option value="name">Name</option>
                    <option value="cgpa">CGPA</option>
                    <option value="section">Sectiom</option>
                    <option value="reg_no">Reg no.</option>
                  </Input>
                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={{ size: 3, order: 1 }} >
              <div className='apple_font ac_re pt-2'> Gender: </div>
            </Col>
            <Col xs={{ size: 9, order: 2 }}>
              <FormGroup>
                <div className='ac_re px-2'>
                  <Input type='select' name='gender' id='gender' onChange={this.updateQueries}>
                    <option value="">All</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Input>
                </div>
              </FormGroup>
            </Col>
          </Row>


          <Row>
            <Col xs={{ size: 3, order: 1 }} >
              <div className='apple_font ac_re pt-2'> State: </div>
            </Col>
            <Col xs={{ size: 9, order: 2 }}>
              <FormGroup>
                <div className='ac_re px-2'>
                  <Input type='select' name='state' id='state' onChange={this.updateQueries}>
                    <option value="">All</option>
                    {states.map((s, index) => {
                      return(<option value={s}>{s}</option>)
                    })}
                    
                  </Input>
                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={{ size: 3, order: 1 }} >
              <div className='apple_font ac_re pt-2'> Reverse: </div>
            </Col>
            <Col xs={{ size: 6, order: 2 }}>
              <div class="col-auto my-1 px-2">
                <div class="custom-control custom-checkbox mr-sm-2">
                  <input type="checkbox"  id="reverse" name="reverse" onChange={this.updateQueries}/>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={{ size: 3, order: 1 }} >
              <div className='apple_font ac_re pt-4'> List top: </div>
            </Col>
            <Col xs={{ size: 9, order: 2 }}>
              <FormGroup>
              <div className="px-2 pt-3">
                <Input invalid={this.state.limit_valid && this.state.limit_valid!==undefined} type="text" name="limit" id="limit" placeholder="37, 12, ... (optional)" onChange={this.updateQueries}/></div>
              </FormGroup>
            </Col>
          </Row>

          

        </div>
      </div>
    )
  }
}
export default StudentListSortSection
