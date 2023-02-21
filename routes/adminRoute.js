const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctor Fetched Successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in Fetching the Doctor",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "User Fetched Successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in Fetching the User",
      success: false,
      error,
    });
  }
});

router.post(
  "/change-doctor-account-status",
  authMiddleware,
  async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });

      const user = await User.findOne({ _id: doctor.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "doctor-request-changed",
        message: `Your Doctor Account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Doctor Account Updated Successfully",
        success: true,
        data: doctor,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error in Applying the Doctor",
        success: false,
        error,
      });
    }
  }
);

module.exports = router;
