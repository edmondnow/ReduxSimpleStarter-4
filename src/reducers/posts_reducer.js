import { FETCH_POSTS, FETCH_POST } from '../actions' //don't need to specigy fily since we import from index.js
import _ from 'lodash';

export default function (state = {} , action){
  switch(action.type){
    case FETCH_POST:
      const post = action.payload.data;

      const newState = {...state, }
      newState[post.id] = post;
    
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}