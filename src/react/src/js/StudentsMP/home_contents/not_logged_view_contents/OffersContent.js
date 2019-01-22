import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import CardView from '../../../components/CardView'
import Loader from '../../../components/Loader'
import HRline from '../../../components/HRline'

class OffersContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	buffering: true,

      card1: {
        'title': 'Student Detail',
        'headname': 'Student Detail View',
        'content': "A single view to access all of a student's details",
        'content2': "- Ajaxified view get's you the lastest data",
        'content3': '-  Auto reload for remote changes',
        'content4': '-  Custom changes',
        'button': 'info',
        'btn_outline': true,
        'button_text': 'Cheack it out!',
        'btn_link': '/',
        'footer': 'Click here for our old view',
        'footer_link': 'http://frish.herokuapp.com/students/details/a-adityan',

        'back_color': 'blue',
        'text_color': 'black'
      },

      card2: {
        'title': 'Student List',
        'headname': 'Student List View',
        'content': 'One place to list out all the students and filter for need',
        'content2': '-  Fase and precise',
        'content3': '-  Synchronus buffer',
        'content4': '-  Custom search',
        'button': 'info',
        'btn_outline': true,
        'button_text': 'Cheack it out!',
        'btn_link': '/',
        'footer': 'Click here for our old view',
        'footer_link': 'http://frish.herokuapp.com/students/students_list/',

        'back_color': 'lgrey',
        'text_color': 'black'
      },

      card3: {
        'title': 'Attendance Portal',
        'headname': 'Student attendance Portal',
        'content': "A smooth and foolproof way to mark the student's attendace",
        'content2': '-  Section wise, ',
        'content3': '-  Department wise',
        'content4': '-  School wise attendece, with ease',
        'button': 'info',
        'btn_outline': true,
        'button_text': 'Cheack it out!',
        'btn_link': '/',
        'footer': 'Click here for our old view',

        'back_color': 'lred',
        'text_color': 'white'
      }

    }
  }

  componentDidMount () {
  	this.setState({ buffering: false })
  }

  render () {
  	if (this.state.buffering) { return (<Loader big align='center' />) }

  	let { card1, card2, card3 } = this.state
    return (
      <div className='py-3'>
        <div className='lead ac_re headname_offer'>What we Offer</div>

        <div className='pt-5 pb-4'>
          <Container>
            <Row>
              <Col>
                <CardView back_color={card1.back_color} text_color={card1.text_color} content={card1.content} content2={card1.content2} content3={card1.content3} content4={card1.content4} title={card1.title} headname={card1.headname} button={card1.button} btn_outline={card1.btn_outline} button_text={card1.button_text} btn_link={card1.btn_link} footer={card1.footer} footer_link={card1.footer_link} />
              </Col>

              <Col>
                <CardView back_color={card2.back_color} text_color={card2.text_color} content={card2.content} content2={card2.content2} content3={card2.content3} content4={card2.content4} title={card2.title} headname={card2.headname} button={card2.button} btn_outline={card2.btn_outline} button_text={card2.button_text} btn_link={card2.btn_link} footer={card2.footer} footer_link={card2.footer_link} />
              </Col>

              <Col>
                <CardView back_color={card3.back_color} text_color={card3.text_color} content={card3.content} content2={card3.content2} content3={card3.content3} content4={card3.content4} title={card3.title} headname={card3.headname} button={card3.button} btn_outline={card3.btn_outline} button_text={card3.button_text} btn_link={card3.btn_link} footer={card3.footer} footer_link={card3.footer_link} />
              </Col>
            </Row>
          </Container>
        </div>
        <HRline cn='padx-5' />
      </div>
    )
  }
}
export default OffersContent
