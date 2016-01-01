import {createStore} from 'sweetflux'
import {SET_BUCKET} from './actions'

const BucketStore = createStore(
  'BucketStore',
  { },
  (state, action) => {
    switch (action.type) {
      case SET_BUCKET:
        var obj = {}
        obj[action.data.id] = action.data
        console.log(SET_BUCKET, state, obj)
        return Object.assign({}, state, obj)
      default:
        return state
    }
  },
  {
    getBuckets: (state) => Object.keys(state).reduce( (a,b) => a.concat([state[b]]), []), // convert list to array
    find: (state, id) => state[id],
    findByName: (state, name) => state.filter(n => n.name === name)
  }
)

// FIXME: REMOVE DEV HACK
window.BucketStore = BucketStore

export default BucketStore