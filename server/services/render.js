const axios = require('axios');

exports.homeRoutes = async (req, res) => {
  try {
    //GET request to api/users
    const response = await axios.get('http://localhost:3000/api/users');
    //axios.get returns a promise which is response
    //response.data contains the actual data
    res.render('index', { users: response.data });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.add_user = (req, res) => {
  res.render('add_user');
};

exports.update_user = async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${req.params.id}`);
    res.render('update_user', {user: response.data});
  } catch (err) {
    res.status(500).send(err.message);
  }
};
