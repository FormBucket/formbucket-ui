/* A collection of functions to send requests to the server.
Author: Peter Moresi
Date: 2015-12-14

All of these functions return a promise to get a payload.
*/

// FIXME: remove
window.submit = submit

// generic function to detect common HTTP error codes. Credit to Mozilla.
function processStatus(response) {
  // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function getText(response) {
  return response.text();
}

function getJSON(response) {
  return response.json();
}

/* Send server request to get user's Forms

  Usage:
  createBucket({
    name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
  })
*/
export function getBuckets(){
  return fetch('/buckets.json', {
    credentials: 'include',
    method: 'get'
  })
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to get a specific Buckets

  Usage:
  createBucket({
    name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
  })
*/
export function getBucket(id){
  return fetch(`/bucket/${id}.json`, {
    credentials: 'include',
    method: 'get'
  }).then(processStatus)
}

/* Send server request to create new bucket

  Usage:
  createBucket({
    name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
  })
*/
export function requestCreateBucket(data){
  return fetch('/buckets', {
    credentials: 'include',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
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
  return fetch('/buckets/' + bucket.id, {
    method: 'put',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bucket)
  })
  .then(processStatus)
  .then(getJSON)
}

export function requestDeleteBucket(bucketId){
  return fetch('/buckets/' + bucketId, {
    method: 'delete',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(processStatus)
  .then(getJSON)
}


export function submit(formId, formData) {
  return fetch(`/f/${formId}`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to get user's submissions

  Usage:
  getSubmissions(10, 50)
*/
export function getSubmissions(offset, limit){
  return fetch(`/submissions.json?offset=${+offset}&limit=${+limit}`, {
    credentials: 'include',
    method: 'get'
  })
  .then(processStatus)
  .then(getJSON)
}

export function getSubmissionsByBucket(bucket_id, offset, limit){
  return fetch(`/submissions/${bucket_id}.json?offset=${+offset}&limit=${+limit}`, {
    credentials: 'include',
    method: 'get'
  })
  .then(processStatus)
  .then(getJSON)
}
