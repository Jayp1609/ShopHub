const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "secret@#string";

var fetchUser = require("../middleware/fetchUser");

//<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>
//Route-1 create a user (signup)

router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("lastname", "Enter a Valid lastname").isLength({ min: 3 }),
    body("email", "Enter a Valid Email ").isEmail(),
    body("password", "Password must be at leasat 5 characters").isLength({
      min: 5,
    }),
    body("contact", "Enter a Valid Name").isLength(10),
  ],
  async (req, res) => {
    let success = false;
    //If there is any error it will return error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //.findone() checks whether the user with particular email is already in database or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Email address already exists" });
      }
      //To add salt in the password string
      const salt = await bcrypt.genSalt(10);
      const secPasswd = await bcrypt.hash(req.body.password, salt);
      //To create new user
      user = await User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        password: secPasswd,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        postcode: req.body.postcode,
        state: req.body.state,
        country: req.body.country,
      });

      const data = {
        user: {
          id: user._id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Some error occutrd");
    }
  }
);

//<<<<<<<<<<<<>>>>>>>>>>>>
//Route-2  user login

router.post("/login", [
  body("email", "Enter a Valid Email ").isEmail(),
  body("password", "Password must be at leasat 5 characters").exists(),
  async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Enter valid credentials(Email not found)" });
      }

      let pass_compare = await bcrypt.compare(req.body.password, user.password);
      if (!pass_compare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Enter valid credentials" });
      }

      const data = {
        id: user.id,
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },
]);

//<<<<<<<<>>>>>>>>>>>>
//route-3 Get user info

router.post("/getuser", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

//<<<<<<<<<>>>>>>>>>
//route-4 update user

router.put("/updateuser/:id", async (req, res) => {
  updateuser(req, res);
});

function updateuser(req, res) {
  try {
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          lastname: req.body.lastname,
          contact: req.body.contact,
          address: req.body.address,
          postcode: req.body.postcode,
          state: req.body.state,
          country: req.body.country,
        },
      },
      { new: true }
    ).then((_doc, err) => {
      if (!err) {
        res.status(200).send("Updated");
      } else {
        console.log("Error during record update : " + err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
//<<<<<<<<<>>>>>>>>>>>>>
//Route-5 Updatepassword
router.put(
  "/updatepas",
  [
    body("email", "Enter a Valid Email ").isEmail(),
    body("password", "Password must be at leasat 5 characters").exists(),
    async (req, res) => {
      let success = false;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }

      try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
          success = false;
          return res.status(400).json({
            success,
            error: "Enter valid credentials(Email not found)",
          });
        }

        const salt = await bcrypt.genSalt(10);
        const secPasswd = await bcrypt.hash(req.body.password, salt);

        try {
          User.findOneAndUpdate(
            { _id: user._id },
            {
              $set: {
                password: secPasswd,
              },
            },
            { new: true }
          ).then((_doc, err) => {
            if (!err) {
              res.status(200).send("Updated");
            } else {
              console.log("Error during record update : " + err);
            }
          });
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
      }
    },
  ],
  async (req, res) => {
    updatepassword(req, res);
  }
);
// function updatepassword(req, res) {
//   try {
//     User.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           password: req.body.password,
//         },
//       },
//       { new: true }
//     ).then((_doc, err) => {
//       if (!err) {
//         res.status(200).send("Updated");
//       } else {
//         console.log("Error during record update : " + err);
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

//<<<<<<<<>>>>>>>>>>
//route-6 delete user

router.delete("/deleteuser/:id", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    User.findOneAndDelete({
      _id: req.params.id,
    }).then((_doc, err) => {
      if (!err) {
        res.status(200).send("User deleted");
      } else {
        console.log("Error during delete operation  : " + err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;