const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  /**
   * @description list all devs of logged user
   * @author David Vilaça
   * @date 2019-08-09
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async index(req, res) {
    const { user } = req.headers;
    const loggedUser = await Dev.findById(user);

    if (!loggedUser) { }

    const devs = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedUser.likes } },
        { _id: { $nin: loggedUser.dislikes } },
      ],
    });

    return res.json(devs);
  },
  /**
   * @description create a new user or return if user exists
   * @author David Vilaça
   * @date 2019-08-09
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async store(req, res) {
    const { username: user } = req.body;

    const userExists = await Dev.findOne({ user });

    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(`https://api.github.com/users/${user}`);

    const {
      name,
      bio,
      avatar_url: avatar
    } = response.data

    const dev = await Dev.create({
      name,
      user,
      bio,
      avatar
    });

    return res.json(dev);
  }
};
