const { omit } = require('lodash');
const User = require('../models/user');

/**
 * Get logged in user info
 * @public
 */
exports.LoginUser = (req, res) => res.json(req.user.transform());

/**
 * Create User
 * @public
 *
 * @param {Object} userData userData
 * @param {String} userData.email User's Email
 * @param {String} userData.password User's Password
 * @param {String} userData.name User's Name
 *
 * @returns {User} Created User Object
 */
exports.CreateUser = async (userData) => {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser.transform();
  } catch (err) {
    throw User.checkDuplication(err);
  }
};

/**
 * Get User By ID
 * @public
 *
 * @param {ObjectId} id mongoose Object id of user
 * @returns {Promise<User>} user data
 */
exports.Get = async (id) => User.get(id);

/**
 * Remove User
 * @public
 *
 * @param {Object} user User to be Removed
 */
exports.RemoveUser = async (user) => user.remove();
