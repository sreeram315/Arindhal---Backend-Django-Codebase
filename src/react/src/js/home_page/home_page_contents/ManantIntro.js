import React from 'react'
import { Row, Col } from 'reactstrap'

import HRline from '../../components/HRline'
import './css.css'

class ManantIntro extends React.Component {
  render () {
    return (
      <div>
        <div className='container-fluid intro_re'>
          <Row>
            <Col md={{ size: 4 }} xs={{ size: 12 }} >
              <div>
                <img className='img-thumbnail align_center_re' width='70%' src='https://i.ibb.co/thf1sZW/salman.jpg' alt='' />
              </div>
            </Col>
            <Col md={{ size: 8 }} xs={{ size: 12 }}>
              <div className='lead al_re'>
              Somthing elsThe Maratha noblewoman Tarabai was the head of a family that was a rival claimant to the Chhatrapati title. Originally a rival of Chhatrapati Shahu, she later pretended reconciliation with him. In the 1740s, during the last years of Shahu's life, Tarabai brought a child to him: Rajaram II. She presented the child as her grandson, and thus, a direct descendant of Shivaji. Shahu adopted the child, and after his death in 1749, Rajaram II succeeded <br /><br />him as the Chhatrapati.[5] The next year, Peshwa Balaji Rao left to fight against the Nizam of Hyderabad. In his absence, Tarabai urged Rajaram II to remove him from the post of Peshwa. When Rajaram refused, she imprisoned him in a dungeon at Satara, on 24 November 1750.<br /><br /> She claimed that he was an impostor, and that she had falsely presented him as her grandson. Tarabai was unsuccessful in getting support from other ministers and the Nizam Salabat Jung. However, she managed to enlist the help of another noblewoman, Umabai Dabhade.[6]

              </div>
            </Col>

          </Row>
        </div><br /><HRline cn='padx-30' />
      </div>
    )
  }
}
export default ManantIntro
