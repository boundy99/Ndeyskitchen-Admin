const Admin = require('../database/models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { USER_NOT_FOUND, PASSWORD_INCORRECT } = require('../messages');

async function adminLogin(req, res) {
  const { admin } = req.body;

  try {
    const foundAdmin = await Admin.findOne({ username: admin.username });

    if (!foundAdmin) return res.status(404).json({ error: USER_NOT_FOUND });

    const match = await bcrypt.compare(admin.password, foundAdmin.password);

    if (!match) return res.status(404).json({ error: PASSWORD_INCORRECT });

    const token = jwt.sign({ id: foundAdmin._id }, process.env.JWT, {
      expiresIn: '1d',
    });

    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(500).json({ Message: err });
  }
}

module.exports = { adminLogin };
