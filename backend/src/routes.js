const express = require("express");
const multer = require("multer");

const routes = express.Router();

// Controllers
const AuthController = require("./controllers/AuthController");
const SpotController = require("./controllers/SpotController");
const ProfileController = require("./controllers/ProfileController");
const BookingController = require("./controllers/BookingController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

//upload config
const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

//sessions
routes.post("/sessions", AuthController.store);

//spots
routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

//profile
routes.get("/profile", ProfileController.show);

//bookings
routes.post("/spots/:id/bookings", BookingController.store);
routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejectionController.store);

module.exports = routes;
