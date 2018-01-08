import axios from 'axios';
import reverseGeoCode from 'latlng-to-zip';
import qs from 'qs';

import {
  FETCH_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringyfy({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region) => async (dispatch) => {
  try {
    let zip = await reverseGeoCode(region);
    const url = await buildJobsUrl(zip);
    // fetch list of jobs over the url and return as response object
    // wir holen uns von dem objekt nur das data property
  let { data } = await axios.get(url);
  console.log(data);
  dispatch({ type: FETCH_JOBS, payload: data });
  } catch (e) {
    console.error(e);
  }
};
