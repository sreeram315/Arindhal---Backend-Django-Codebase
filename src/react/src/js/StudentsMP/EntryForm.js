import React from 'react'
import { Button, CustomInput, Col, Fade, FormGroup, Input, Label, Row} from 'reactstrap'
import classNames from 'classnames'
import cookie from 'react-cookies'

import RedirectTo from '../components/RedirectTo'

import './css.css'


class EntryForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reset_btn_classes : classNames('btn btn-outline-danger', 'tester'),
      fadeInDanger: false,
      validation : {
        'name': undefined,
        'reg_no': undefined,
        'cgpa': undefined,
        'section': undefined,
        'gender': undefined,
        'dob': undefined,
        'contact': undefined,
        'address': undefined,
        'father_name': undefined,
        'mother_name': undefined,
        'father_contact': undefined,
        'mother_contact': undefined,
        'department': undefined,
        'school': undefined,
        'description': undefined,
        'extra_content': undefined
      }
    }
  }


    postData =  (data) => {
    let thisComp = this
    console.log('requesting...')
    const endpoint = '/api/students/create/'
    const csrfToken = cookie.load('csrftoken')
    let token = localStorage.getItem('authToken')
    let lookupOptions = {
      method: 'POST',
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
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
        const data = responseData
        var slug = responseData['slug']
        thisComp.setState({
          redirectPath: `/smp/student-details/${slug}`,
          redirect : true
        })

      }).catch(function (error) {
        console.log(error)
      })
  }

   handleGenderSelect = (key, value) =>{
     if (key === 'gmale'){
       this.setState({gender: 'M'});
        this.setState({validation: {'gender': true}})
     } else if (key === 'gfemale'){
       this.setState({gender: 'F'})
       this.setState({validation: {'gender': true}})
     } else {
       this.setState({validation: {'gender': false}})
     }
   }

   form_get_cheakers = () =>{
     let cheakers = [
                       this.state.validation.name && this.state.validation.name!==undefined && this.state.validation.name!==null,
                       this.state.validation.reg_no && this.state.validation.reg_no!==undefined && this.state.validation.reg_no!==null,
                       this.state.validation.cgpa || this.state.validation.cgpa === undefined || this.state.validation.cgpa === null,
                       this.state.validation.section || this.state.validation.section === undefined || this.state.validation.section === null,
                       this.state.validation.gender || this.state.validation.gender === undefined || this.state.validation.gender === null,
                       this.state.validation.dob || this.state.validation.dob === undefined || this.state.validation.dob === null,
                       this.state.validation.contact || this.state.validation.contact === undefined || this.state.validation.contact === null,
                       this.state.validation.address || this.state.validation.address === undefined || this.state.validation.address === null,
                       this.state.validation.father_name || this.state.validation.father_name === undefined || this.state.validation.father_name === null,
                       this.state.validation.mother_name || this.state.validation.mother_name === undefined || this.state.validation.mother_name === null,
                       this.state.validation.father_contact || this.state.validation.father_contact === undefined || this.state.validation.father_contact === null,
                       this.state.validation.mother_contact || this.state.validation.mother_contact === undefined || this.state.validation.mother_contact === null,
                       this.state.validation.department || this.state.validation.department === undefined || this.state.validation.department === null,
                       this.state.validation.school || this.state.validation.school === undefined || this.state.validation.school === null,
                       this.state.validation.description || this.state.validation.description === undefined || this.state.validation.description === null,
                       this.state.validation.extra_content || this.state.validation.extra_content === undefined || this.state.validation.extra_content === null
                   ]
         
          return cheakers
   }

  form_update =(event) =>{
    let key = event.target.id
    let value = event.target.value
    if (key === 'gmale' || key === 'gfemale') {(this.handleGenderSelect(key, value));}
    this.setState({
      [key]: value,
    })
    this.validate(key, value);

  }

  reset_form_hover_enter = () => {this.setState({reset_btn_classes: classNames('btn btn-outline-danger'), fadeInDanger: !this.state.fadeInDanger})}
  reset_form_hover_leave = () => {this.setState({reset_btn_classes: classNames('btn btn-outline-danger', 'tester'), fadeInDanger: !this.state.fadeInDanger})}

  reset_form = (event) =>{
    event.preventDefault()
    this.refs.stu_entry_form.reset()
  }


  allTrue = (array) => {
    for(var i = 1; i < array.length; i++){
      if (array[i]===undefined || array[i]===null || array[i]===false){
        return false
      }
    }
    return true
  }



  validate_form = (event) =>{
    event.preventDefault()
    var cheakers = this.form_get_cheakers()
    for(var i = 0; i < cheakers.length; i++){if (cheakers[i] === undefined || cheakers[i] ===null){cheakers[i] = false}}
    if (this.allTrue(cheakers)){
      var apiData = this.getAPIData()
      console.log(apiData)
      this.postData(apiData)
    }
    else{
      console.log('errors found')
      this.showAllErrors(cheakers)
    } 
  }

  getAPIData = () => {
    var data = {
                "name": this.state.name,
                "reg_no": this.state.reg_no,
                "cgpa": this.state.cgpa,
                "section": this.state.section,
                "gender": this.state.gender,
                "dob": this.state.dob,
                "batch": this.state.batch,
                "contact": this.state.contact,
                "address": this.state.address,
                "description": this.state.description,
                "father_name": this.state.father_name,
                "mother_name": this.state.mother_name,
                "father_contact": this.state.father_contact,
                "mother_contact": this.state.mother_contact,
                "department": this.state.department,
                "school": this.state.school,
                "extra_content": this.state.extra_content,
                "image": null
            }
           return data
  }

  showAllErrors = (cheakers) =>{
    var newValidations = this.state.validation
    var i=0;
    for (var key in newValidations) {
      newValidations[key] = cheakers[i]
      i = i + 1;
    }
    this.setState({
      validation: newValidations
    })

  }

  validate = (key, value) => {
    var isValid = false;
    if (key === 'name'){
      if (value.length > 2 && value.length < 300 && /^[a-zA-Z\s]+$/.test(value)){ isValid = true}
    }

    else if (key === 'reg_no'){
      if (/^\d+$/.test(value) && value.length < 25){isValid = true}
    }

    else if (key === 'cgpa'){
      if (value <= 10 && /^[\d\.]+$/.test(value) ){isValid = true}
    }

    else if (key === 'section'){
      if (value.length >= 2 && /^[a-zA-Z]{1,3}\d+$/.test(value)){isValid = true}
    }

    else if (key === 'dob'){
      if (true){isValid = true}
    }

     else if (key === 'contact'){
       if (/^\d+$/.test(value) && value.length < 15){isValid = true}
    }

    else if (key === 'address'){
      if (value.length > 1 && value.length < 1000){isValid = true}
    }

    else if (key === 'father_name'){
      if (value.length > 2 && value.length < 300 && /^[a-zA-Z\s]+$/.test(value)){isValid = true}
    }

    else if (key === 'mother_name'){
      if (value.length > 2 && value.length < 300 && /^[a-zA-Z\s]+$/.test(value)){isValid = true}
    }

    else if (key === 'father_contact'){
      if (/^\d+$/.test(value) && value.length < 15){isValid = true}
    }

    else if (key === 'mother_contact'){
      if (/^\d+$/.test(value) && value.length < 15){isValid = true}
    }

    else if (key === 'department'){
      if (value.length > 3 && value.length < 300){isValid = true}
    }

    else if (key === 'school'){
      if (value.length > 1 && value.length < 300){isValid = true}
    }

    else if (key === 'description'){
      if (value.length > 1 && value.length < 999){isValid = true}
    }

    else if (key === 'extra_content'){
      if (value.length > 1 && value.length < 9999){isValid = true}
    }

     let new_validation = this.state.validation
      new_validation[key] = isValid 
      this.setState({validation: new_validation})

  }



  render () {
    if (this.state.redirect){
      return(
        <div>
            <RedirectTo path={this.state.redirectPath}/>
        </div>
        )
    }

    return (
      <div>

        <Row>
        <Col md={{size: 8, order: 1}} xs={{size: 12, order: 1}}>
          <Col xs='12'>
            <div className='entry_form pl-1'>
            <div>
              <form ref="stu_entry_form">
                <FormGroup row>
                  <Label for='name' sm={2}>Full Name</Label>
                  <Col sm={10}>
                    <Input valid={this.state.validation.name} invalid={!this.state.validation.name && this.state.validation.name!==undefined}  type='text' name='name' id='name' placeholder='Jonathan Thakur' onChange={this.form_update} />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for='reg_no' sm={2}>Reg Number</Label>
                  <Col sm={10}>
                    <Input valid={this.state.validation.reg_no} invalid={!this.state.validation.reg_no && this.state.validation.reg_no!==undefined} type='text' name='reg_no' id='reg_no' placeholder='11617892'  onChange={this.form_update}/>
                  </Col>
                </FormGroup>

                <Row>
                  <Col md='6'>
                    <FormGroup row>
                      <Label for='cgpa' sm={4}>CGPA</Label>
                      <Col sm={8}>
                        <Input valid={this.state.validation.cgpa} invalid={!this.state.validation.cgpa && this.state.validation.cgpa!==undefined} type='text' name='cgpa' id='cgpa' placeholder='8.7 (optional)'  onChange={this.form_update}/>
                      </Col>
                    </FormGroup>
                  </Col>

                  <Col md='6'>
                    <FormGroup row>
                      <Label for='section' sm={4}>Section</Label>
                      <Col sm={8}>
                        <Input valid={this.state.validation.section} invalid={!this.state.validation.section && this.state.validation.section!==undefined} type='text' name='section' id='section' placeholder='E1704 (optional)' onChange={this.form_update} />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup row>
                  <Label for='gender' sm={2}>Gender</Label>
                  <Col sm={10}>
                    <div className='testt'>
                      <CustomInput valid={this.state.validation.gender} invalid={!this.state.validation.gender && this.state.validation.gender!==undefined} type='radio' name='gender' id='gmale' label='Male'  onChange={this.form_update}/>
                      <CustomInput valid={this.state.validation.gender} invalid={!this.state.validation.gender && this.state.validation.gender!==undefined} type='radio' name='gender' id='gfemale' label='Female'  onChange={this.form_update}/>
                    </div>
                  </Col>
                </FormGroup>

                <Row>
                  <Col md='6'>
                    <FormGroup row>
                      <Label for='dob' sm={4}>DOB</Label>
                      <Col sm={8}>
                        <Input
                          type='date'
                          name='dob'
                          id='dob'
                          placeholder='DOB (optional)'
                          onChange={this.form_update}
                          valid={this.state.validation.dob}
                          invalid={!this.state.validation.dob && this.state.validation.dob!==undefined}
                        />
                      </Col>
                    </FormGroup>
                  </Col>

                  <Col md='6'>
                    <FormGroup row>
                      <Label for='contact' sm={4}>Contact. </Label>
                      <Col sm={8}>
                        <Input valid={this.state.validation.contact} invalid={!this.state.validation.contact && this.state.validation.contact!==undefined} type='text' name='contact' id='contact' placeholder='9898755784 (optional)' onChange={this.form_update} />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup row>
                  <Label for='address' sm={2}>Address</Label>
                  <Col sm={10}><Input valid={this.state.validation.address} invalid={!this.state.validation.address && this.state.validation.address!==undefined} type='textarea' name='address' id='address' placeholder='Afzal gunj, Hyderabad, Telangana (optional)'  onChange={this.form_update}/></Col>
                </FormGroup>

                <Row>
                  <Col md='6'>
                    <FormGroup row>
                      <Label for='father_name' sm={4}>Father's Name</Label>
                      <Col sm={8}>
                        <Input valid={this.state.validation.father_name} invalid={!this.state.validation.father_name && this.state.validation.father_name!==undefined} type='text' name='father_name' id='father_name' placeholder="(optional)"  onChange={this.form_update}/>
                      </Col>
                    </FormGroup>
                  </Col>

                  <Col md='6'>
                    <FormGroup row>
                      <Label for='mother_name' sm={4}>Mother's Name</Label>
                      <Col sm={8}>
                        <Input valid={this.state.validation.mother_name} invalid={!this.state.validation.mother_name && this.state.validation.mother_name!==undefined} type='text' name='mother_name' id='mother_name' placeholder="(optional)" onChange={this.form_update}/>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md='6'>
                    <FormGroup row>
                      <Label for='father_contact' sm={4}>Contact</Label>
                      <Col sm={8}>
                        <Input valid={this.state.validation.father_contact} invalid={!this.state.validation.father_contact && this.state.validation.father_contact!==undefined} type='text' name='father_contact' id='father_contact' placeholder="(optional)"  onChange={this.form_update}/>
                      </Col>
                    </FormGroup>
                  </Col>

                  <Col md='6'>
                    <FormGroup row>
                      <Label for='mother_contact' sm={4}>Contact</Label>
                      <Col sm={8}>
                        <Input valid={this.state.validation.mother_contact} invalid={!this.state.validation.mother_contact && this.state.validation.mother_contact!==undefined} type='text' name='mother_contact' id='mother_contact' placeholder="(optional)" onChange={this.form_update}/>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup row>
                  <Label for='department' sm={2}>Department</Label>
                  <Col sm={10}>
                    <Input valid={this.state.validation.department} invalid={!this.state.validation.department && this.state.validation.department!==undefined} type='text' name='department' id='department' placeholder='Bcom (Hons)  (optional)'  onChange={this.form_update}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for='school' sm={2}>School</Label>
                  <Col sm={10}>
                    <Input valid={this.state.validation.school} invalid={!this.state.validation.school && this.state.validation.school!==undefined} type='text' name='school' id='school' placeholder='School of Finance (optional)' onChange={this.form_update} />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for='description' sm={2}>Description</Label>
                  <Col sm={10}><Input valid={this.state.validation.description} invalid={!this.state.validation.description && this.state.validation.description!==undefined} type='textarea' name='description' id='description' placeholder='He was a good boy (optional)' onChange={this.form_update} /></Col>
                </FormGroup>

                <FormGroup row>
                  <Label for='extra_content' sm={2}>Additional content</Label>
                  <Col sm={10}><Input valid={this.state.validation.extra_content} invalid={!this.state.validation.extra_content && this.state.validation.extra_content!==undefined} type='textarea' name='extra_content' id='extra_content' placeholder='Anything else... (optional)' onChange={this.form_update} /></Col>
                </FormGroup>

                <Row>
                  <Col sm={2} >
                    <Fade in={this.state.fadeInDanger} tag="h5" className="mt-1 ar_re">
                      <span className="danger_fade">Danger !</span>
                    </Fade>
                  </Col>
                  <Col sm={2}>
                    <div className={this.state.reset_btn_classes} onMouseEnter={this.reset_form_hover_enter} onMouseLeave={this.reset_form_hover_leave} onClick={this.reset_form}><a href="/" className="ac_re reset_btn_local" >Reset form</a></div>
                  </Col>
                  <Col sm={8} >
                    <div className='ar_re' ><Button color='secondary' size='lg' onClick={this.validate_form}>Submit</Button></div>
                  </Col>
                </Row>

              </form>
              </div>
            </div>
          </Col>
          </Col>

        <Col md={{size: 4, order: 2}} xs={{size: 12, order: 2}}>
          <div className='ac_re'>
            <img src='https://i.ibb.co/frHJzCW/image-not-found.gif' className='img-responsive' alt="Student" />
              <FormGroup className='pt-4 px-4'>
                <div className='hover_pointer'><CustomInput type='file' id='exampleCustomFileBrowser' name='customFile' label='a selfie?' /></div>
              </FormGroup>
          </div>
        </Col>

        </Row>
      </div>
    )
  }
}

export default EntryForm

//     "batch": null,
//     "father_name": "",
//     "mother_name": "",
//     "father_contact": "",
//     "mother_contact": "",
//     "image": null
// }
