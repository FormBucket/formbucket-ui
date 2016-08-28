/* A collection of functions to send requests to the server.
Author: Peter Moresi
Date: 2015-12-14

All of these functions return a promise to get a payload.
*/
import {branch} from 'functionfoundry'

export let server = process.env.FORMBUCKET_API_SERVER

// uncomment for server testing. never commit uncommented.
// server = 'http://localhost:3002'

// reads value from qur
export function getQueryParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// generic function to detect common HTTP error codes. Credit to Mozilla.
export function processStatus(response) {
  // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response);
  } else {
    return response.text()
    .then(text => Promise.reject(new Error(text)));
  }
}

export function getText(response) {
  return response.text();
}

export function getJSON(response) {
  return response.json();
}

export function getResource(resource) {

  if (!localStorage.hasOwnProperty('token')) {
    return fetch( server + resource, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  return fetch( server + resource, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    }
  })
}

export function callResource(method, resource, data) {
  return fetch( server + resource, {
    method: method,
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify(data)
  })
}

function postResource(resource, data) {
  return callResource('POST', resource, data)
}

function putResource(resource, data) {
  return callResource('PUT', resource, data)
}

function deleteResource(resource, data) {
  return callResource('DELETE', resource, data)
}

export function requestSignIn(user) {

  return fetch( server + '/signin', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(processStatus)
  .then(getText)

}

export function requestSignUp(user) {

  return fetch( server + '/signup', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })

}

export function requestToken(code){
  return postResource('/token/', { code } )
  .then(processStatus)
  .then(getText)
}

export function requestUpdateUser(user) {

  return fetch( server + '/profile.json', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify(user)
  })
  .then(processStatus)
  .then(res => res.json() )

}
/* Send server request to get user's Forms

Usage:
createBucket({
name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
})
*/
export function requestBuckets(){
  return getResource('/buckets.json')
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to get a specific Buckets

Usage:
createBucket({
name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
})
*/
export function requestBucket(id){
  return getResource(`/buckets/${id}.json`)
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to create new bucket

Usage:
createBucket({
name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
})
*/
export function requestCreateBucket(data){
  return postResource('/buckets.json', data)
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to update existing bucket

Usage:
updateBucket({
name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
})
*/
export function requestUpdateBucket(bucket){
  return putResource( '/buckets/' + bucket.id, bucket )
  .then(processStatus)
  .then(getJSON)
}

// window.requestUpdateBucket = requestUpdateBucket

export function requestDeleteBucket(bucketId){
  return deleteResource('/buckets/' + bucketId)
  .then(processStatus)
  .then(getJSON)
}

// window.requestDeleteBucket = requestDeleteBucket


export function submit(formId, formData) {
  return postResource(`/f/${formId}`, formData )
  .then(processStatus)
  .then(getJSON)
}

// window.submit = submit

export function requestProfile(){
  return getResource('/profile.json')
  .then(processStatus)
  .then(getJSON)
}

export function requestSubscriptionPlans() {
  return getResource('/subscription/plans')
   .then( processStatus )
   .then( getJSON )
}

/* Send server request to get user's submissions

Usage:
getSubmissions(10, 50)
*/
export function requestSubmissions(offset, limit, select){
  return getResource(`/submissions.json?offset=${+offset}&limit=${+limit}&select=${select}`)
  .then(processStatus)
  .then(getJSON)
}

export function requestSubmissionsByBucket(bucket_id, offset, limit, select){
  return getResource(`/buckets/${bucket_id}/submissions.json?offset=${+offset}&limit=${+limit}&select=${select}`)
  .then(processStatus)
  .then(getJSON)
}

export function requestBucketExport(bucket_id, format='json'){
  return getResource(`/export/${bucket_id}.${format}`)
  .then(processStatus)
  .then(res => res.text())
}

export function requestDownloadFile(key) {
  window.location.href = server + '/download/' + key
}

export function requestStripePubKey(){
  return getResource('/stripe/pk')
  .then(processStatus)
  .then(getText)
}

export function requestCharges(){
  return getResource('/subscription/charges')
  .then(processStatus)
  .then(getJSON)
}

export function requestInvoices(){
  return getResource('/subscription/invoices')
  .then(processStatus)
  .then(getJSON)
}

export function requestSubscribe(token, plan) {
  return postResource('/subscribe', { token: token, plan: plan })
  .then(processStatus)
  .then(getJSON)
}

export function unsubscribe() {
  return deleteResource('/subscription')
  .then(processStatus)
  .then(getJSON)
}

export function requestDestroyAccount(bucketId){
  return deleteResource('/account')
  .then(processStatus)
  .then(getJSON)
}

export function requestPasswordReset(email){
  return getResource('/password_reset?email=' + email)
  .then(processStatus)
  .then(getJSON)
}

export function requestPasswordResetUpdate(email, temp_password, password){
  return postResource('/password_reset', { email, temp_password, password})
  .then(processStatus)
  .then(getJSON)
}