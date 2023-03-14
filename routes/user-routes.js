const Router = require("express");
const router = new Router();

const {
  getUserId,
  putUserAvatar,
  putUserData,
  getUsers,
} = require("../controllers/user-controller");
const authMiddlewares = require("../middlewares/auth-middlewares");
const upload = require("../middlewares/multerUpload-middlewares");

router.get("/user/:id", getUserId);
router.get("/users", authMiddlewares, getUsers);
router.put(
  "/edit-user-ava/:id",
  upload.single("fileUser"),
  authMiddlewares,
  putUserAvatar
);
router.patch("/edit-user-data/:id", authMiddlewares, putUserData);

module.exports = router;
