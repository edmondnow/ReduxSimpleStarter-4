import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions' //don't need to specigy fily since we import from index.js
import _ from 'lodash';

export default function (state = {} , action){
  switch(action.type){
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POST:
    /* ES5 version
      const post = action.payload.data;
      const newState = {...state, }
      newState[post.id] = post;
      return newState;
    */
    //key interpolations (ES6):
    return {...state, [action.payload.data.id]:action.payload.data}
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}