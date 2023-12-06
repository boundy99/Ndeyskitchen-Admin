const Admin = require('../database/models/adminModel');
const jwt = require('jsonwebtoken');

const { TOKEN_EXPIRED } = require('../messages');

async function validateAdmin(req, res, next) {
  const { admin } = req.body;

  try {
    jwt.verify(admin, process.env.JWT, async (err, data) => {
      const payload = jwt.verify(admin, process.env.JWT, {
        ignoreExpiration: true,
      });

      if (err === null) {
        const admin = await Admin.findOne({ _id: payload.id });
        req.admin = admin;

        next();
      }

      if (err && err.name === 'TokenExpiredError') {
        return res.status(401).json({ Message: TOKEN_EXPIRED });
      }
    });
  } catch (err) {
    return res.status(401);
  }
}

module.exports = {
  validateAdmin,
};
