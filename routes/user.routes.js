const {
  getUserByUserId,
  getAllUsers,
  updateUserDetails,
} = require("../controllers/user.controller");
const { isAdmin } = require("../middlewares/verifyJwt");

module.exports = function (app) {
  app.get("/crm/api/v1/users", [isAdmin], getAllUsers);

  app.get("/crm/api/v1/users/:userId", [isAdmin], getUserByUserId);

  app.put("/crm/api/v1/users/:userId", [isAdmin], updateUserDetails);
};
