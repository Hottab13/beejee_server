const Router = require("express");
const router = new Router();
const {
  getAllEvents,
  addUserEvent,
  delUserEvent,
  postFiltrEvent,
  getEvent,
  createEvent,
  deleteEvent,
  createEventImg,
  editEventData,
} = require("../controllers/event-controller");
const authMiddlewares = require("../middlewares/auth-middlewares");
const upload = require("../middlewares/multerUpload-middlewares");

router.get("/events/", getAllEvents);
router.get("/event/:id", getEvent);
router.post("/filtr-events", postFiltrEvent);
router.patch("/add-user-event/:id", authMiddlewares, addUserEvent);
router.patch("/del-user-event/:id", authMiddlewares, delUserEvent);
router.post("/create-event/:id", authMiddlewares, createEvent);
router.post(
  "/create-event-img/:id",
  upload.single("fileEvent"),
  authMiddlewares,
  createEventImg
);
router.delete("/event/:id", authMiddlewares, deleteEvent);
router.patch("/edit-event-data/:id", authMiddlewares, editEventData);

module.exports = router;
