import React from 'react'
import { Col, Row } from 'reactstrap'

import ImageComp from '../components/ImageComp'

import StudentData from './StudentData'

class StudentDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stuData: {
        
      },
      notOwner: null
    }
  }

  loadData =  () => {
    const thisComp = this
    console.log('requesting...')
    const endpoint = `/api/students/details/${this.props.slug}/`
     let authToken = localStorage.getItem('authToken')
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `JWT ${authToken}`
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response)  {
        return response.json()
      }).then(function (responseData) {

        console.log('GOT DATA')
        console.log(responseData)
        if(!('detail' in responseData)){
           thisComp.setState({notOwner: false})
          thisComp.setState({
            stuData: responseData
          })
          thisComp.callBackName()
        }else{
          thisComp.setState({notOwner: true})
          thisComp.callBackName()
        }
        
       
       }).catch(function (error) {
            console.log(error)
          })
  }

  componentDidMount () {
    console.log('mounted')
    this.loadData()
  }

  callBackName = () => {
      const { dataCallbackName } = this.props
        console.log('calling back')
        console.log(this.state.stuData)
        let studentName = this.state.stuData['name']
        if (dataCallbackName !== undefined) { dataCallbackName(studentName) }
  }

  render () {
    const { stuData, notOwner } = this.state
    const { slug } = this.props
    return (
      <div>
      {notOwner===true ? <div> Request not allowed </div> : ''}
      {notOwner===false ?
        <div className='pl-5'>
          <div className='container-fluid'>
            <Row >
              <Col lg={{ size: 10 }} md={{ size: 12 }}>
                <Row>
                  <Col md={{ size: 8, order: 1 }} xs={{ size: 12, order: 2 }}>
                    <StudentData data={stuData} />
                  </Col>
                  <Col md={{ size: 3, order: 2 }} xs={{ size: 12, order: 1 }} className='img_class_local'>
                    <ImageComp src={stuData.image} width='100%' cn='img-responsive img-thumbnail' border_cn='img_border_grey' />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
       : ''
      }
      </div>
    )
  }
}
export default StudentDetails
