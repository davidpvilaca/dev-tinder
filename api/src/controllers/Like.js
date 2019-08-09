const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev || !loggedDev) {
      return res.status(400).json({
        error: 'Dev not exists.'
      });
    }

    if (loggedDev._id === targetDev._id) {
      return res.status(400).json({
        error: 'can\'t like yourself'
      });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      console.log('deu match');
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
