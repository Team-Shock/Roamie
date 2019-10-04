const axios = require('axios');
// import yelp from 'yelp-fusion';
// import { yelpKey } from '../../secrets';

// const client = yelp.client(yelpKey);

// module.export = client;

router.get('/', async (req, res, next) => {
    try(
        axios.get()
    )
});

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
});
