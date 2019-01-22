import React from 'react'
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap'
import classNames from 'classnames'

import RedirectTo from './RedirectTo'

class CardView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      redirectNow: false,
      redirectionLink: null
    }
  }

  handleOnClick =  (event) => {
    event.preventDefault()
    this.setState({
      redirectNow: true,
      redirectionLink: this.props.btn_link
    })
  }

  render () {
    if(this.state.redirectNow){return(<RedirectTo path={this.state.redirectionLink}/>)}

    let title_color = `text_${this.props.text_color}`
    var title_classes = classNames('lead ac_re', title_color)
    const { content, content2, content3, content4, headname, title, back_color, button, button_text, btn_outline, footer, footer_link } = this.props
    return (
      <div className="pb-3">
        <Card>
          <div className={`back_${back_color}`}>
            <CardHeader tag='h3' className={title_classes}>
              <strong>{title}</strong>
            </CardHeader>
          </div>

          <CardBody>
            <CardTitle><strong>{headname}</strong></CardTitle>
            <CardText>{content}</CardText>
            {content2 && content2.length > 1 ? <CardText>{content2}</CardText> : ''}
            {content3 && content3.length > 1 ? <CardText>{content3}</CardText> : '' }
            {content4 && content4.length > 1 ? <CardText>{content4}</CardText> : '' }
            <div className='al_re'>
              <Button outline={btn_outline} color={button} onClick={this.handleOnClick}>{button_text}</Button>
            </div>
          </CardBody>

          <a href={footer_link}><CardFooter className='text-muted'>{footer}</CardFooter></a>
        </Card>

      </div>
    )
  }
}

export default CardView

// this.state = {

//       card1: {
//         'title': 'Student View',
//         'headname': 'Student Detail View',
//         'content': "During ch individual chiefs — such as the Holkthe Bhonsles of Nagpur kingdom — \
//                       became more powerful. During Balaji Rao's tenure, the Mara",

//         'button': 'info',
//         'btn_outline': true,
//         'button_text': 'cheack it out!',
//         'footer': 'This is a footer',

//         'back_color': 'blue',
//         'text_color': 'black'
//       }

//     }
//   }
