const axios = require('axios');
const {yelpKey} = require('../../secrets');

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: `Bearer ${yelpKey}`,
  },
});
