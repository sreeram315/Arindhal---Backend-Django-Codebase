import { FETCH_POSTS, CREATE_POST } from './types'

export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data =>
      dispatch({
       type: FETCH_POSTS,
       payload: data
      })
    )
}

export const createPost = (post) => dispatch => {
  console.log('posting post')
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(post => dispatch({
        type: CREATE_POST,
        payload: post
        })
      )
}
