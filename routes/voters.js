const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const Voter = require("../models/Voter");

//route         POST
//description   Voter sign-up
//access        Public
router.post(
  "/",
  [
    check("firstName", "Enter First Name")
      .not()
      .isEmpty(),
    check("lastName", "Enter your last name")
      .not()
      .isEmpty(),
    check("zipcode", "Enter a valid zipcode").isLength(5),
    check("county", "Enter your county")
      .not()
      .isEmpty(),
    check("licenseNumber", "Enter Driver's License Number")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    //res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, zipcode, county, licenseNumber } = req.body;

    try {
      let voter = await Voter.findOne({ licenseNumber });
      //prevents duplicate License numbers from voting more than once
      if (voter) {
        return res.status(400).json({
          msg:
            "Voter Not Authorized. Check with your local DMV for more information."
        });
      }
      //signs in voter for voting
      voter = new Voter({
        firstName,
        lastName,
        zipcode,
        county,
        licenseNumber
      });
      //salt encrypts the information
      const salt = await bcrypt.hash(password, salt);
      //saves voter registration data
      await voter.save();

      const payload = {
        id: user.id
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);
