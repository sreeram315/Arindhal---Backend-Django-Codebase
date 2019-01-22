// import cookie from 'react-cookies'

// function isAuthenticated () {
//   let authToken = localStorage.getItem('authToken')

//   try {
//   	let trashVarAuthToken = localStorage.authToken
//   	let tok
//   	if (trashVarAuthToken.length > 0) {
//   		console.log(this)
//   		let retuner
// 	    console.log('requesting auth...')
// 	    const endpoint = '/api-token-verify/'
// 	    const csrfToken = cookie.load('csrftoken')
// 	    let data = {
// 	      'token': trashVarAuthToken
// 	    }
// 	    let lookupOptions = {
// 	      method: 'POST',
// 	      headers: {
// 	        'Content-Type': 'application/json',
// 	        'X-CSRFToken': csrfToken
// 	      },
// 	      body: JSON.stringify(data),
// 	      credentials: 'include'
// 	   }
// 	   console.log('fetching')

// 	      let dataa = fetch(endpoint, lookupOptions)
// 	      .then((response) => {
// 	      	return response.json()
// 	      }).then(json => {
// 	      	console.log(json.token)
// 	      	tok = json.token
// 	      })

// 	      console.log(tok)
// 	  	}
//   } catch (err) {
//   	console.log('error authenticating')
//   	return true
//   }
// }

// export {
//   isAuthenticated
// }
