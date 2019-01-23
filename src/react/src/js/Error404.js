import React from 'react'

import { Container } from 'reactstrap'

class Error404 extends React.Component {
  render () {
    return (
      <div>
        <div className='padt-10 ac_re display-4 apple_font' >
          Error 404
        </div>
        <div>
          <Container>
            <div className='ac_re lead'>
              <div>Of all the things we offer, it's unfortunate you had to come here, which we regret deeply.</div>

              <div>We have recorded the error and if there is an issue from our side, we will do our best to make sure this
            does not happen again.</div>
              <div>For now, let us redirect you to the <a className='nodec' href='/'>home page</a></div>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}
export default Error404
