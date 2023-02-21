const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/doctorModel");
const router = express.Router();

router.post("/get-doctor-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).send({
      message: "Doctor Info Fetched Successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error Getting in Doctor Info",
      success: false,
      error,
    });
  }
});
router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      message: "Doctor Profile Updated Successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error Getting in Doctor Info",
      success: false,
      error,
    });
  }
});

router.post("/get-doctor-info-by-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne(
      { _id: req.body.doctorId }
    );
    res.status(200).send({
      message: "Doctor Info Fetched Successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error Getting in Doctor Info",
      success: false,
      error,
    });
  }
});


module.exports = router;
