import axios from 'axios';

const fetch = (url: string) => {
  return axios({
    method: 'GET',
    url,
  })
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default (url: string) =>
  Promise.all([fetch(url), fetch(`${url}?page=2`)]).then((res) => {
    return res.flat();
  });
