const express = require("express");

const {
  handleGetAllUsers,
  handleGetUsersById,
  handleUpdateUsersById,
  handleDeleteUsersById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUsersById)
  .patch(handleUpdateUsersById)
  .delete(handleDeleteUsersById);

module.exports = router;
