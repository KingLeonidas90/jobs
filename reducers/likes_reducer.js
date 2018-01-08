import _ from 'lodash';
import {
LIKE_JOB,
CLEAR_LIKED_JOBS
}
from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    // WIr sorgen dafür, dass jobs die breits geliked worden sind, nicht doppelt angezeigt werden
    case LIKE_JOB:
    // vergleicht einen datensatz mit dem keyword das man angibt
    // erzeug ein neues Array und benutz die jobs die der user gerade geliked hat
    // und nimm die anderen jobs die er jeweils geliked hat
    return _.uniqBy([
      action.payload, ...state
    ], 'jobkey');

    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
}
