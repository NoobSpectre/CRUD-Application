// const { isObjectIdOrHexString } = require('mongoose');
const User = require('../model/model');

//create and save new user
exports.create = async (req, res) => {
  //validate request
  if (!req.body) {
    return res.status(400).json({
      message: 'Content can not be empty!',
    });
  }

  //create and save new user in the database
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email, // can't send data having same email
      gender: req.body.gender,
      status: req.body.status,
    });
    // res.send(newUser);
    res.redirect('/'); //redirect to home page
  } catch (err) {
    res.status(400).redirect('/add-user');
  }
};

//retrieve and return all users
exports.find = async (req, res) => {
  try {
    const existingUsers = await User.find();
    res.send(existingUsers);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Error occurred while retrieving user information',
    });
  }
};

//retrieve and return a single user
exports.findOne = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).send({
        message: 'User not found!',
      });
    }
    res.send(existingUser);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
};

//update an existing user by user id
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  try {
    const updateUser = await User.findById(req.params.id);
    if (!updateUser) {
      return res.status(404).send({
        message: 'User not found!',
      });
    }
    Object.assign(updateUser, req.body); // updating the user
    await updateUser.save(); // saving the changes
    res.send(updateUser);
    // res.redirect('/');
    // setTimeout(() => {
    //   res.redirect('/');
    // }, 0);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Error while updating the user',
    });
  }
};

//delete a specified user by user id
exports.delete = async (req, res) => {
  try {
    const deleteUser = await User.findById(req.params.id);
    if (!deleteUser) {
      return res.status(404).send({
        message: 'User not found!',
      });
    }
    await deleteUser.delete();
    res.send({
      message: 'User deleted!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Server error while deleting the user!',
    });
  }
};
