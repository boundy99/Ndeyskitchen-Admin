const Admin = require('../database/models/adminModel');
const jwt = require('jsonwebtoken');

const { TOKEN_EXPIRED, ADMIN_NOT_FOUND } = require('../messages');

async function validateAdmin(req, res, next) {
  const { admin } = req.body;

  try {
    jwt.verify(admin, process.env.JWT, async (err, data) => {
      const payload = jwt.verify(admin, process.env.JWT, {
        ignoreExpiration: true,
      });

      if (err === null) {
        const admin = await Admin.findOne({ _id: payload.id });

        if (!admin) return res.status(404).json({ message: ADMIN_NOT_FOUND });

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
