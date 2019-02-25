const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../../controller/profileController");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.createProfile
);
//add device_______________________________________________________________________
router.post(
  "/device",
  passport.authenticate("jwt", { session: false }),
  controller.addDevice
);
//add section________________________________________________________________________

router.post(
  "/section",
  passport.authenticate("jwt", { session: false }),
  controller.addsection
);
//_________________delete device in section
router.delete(
  "/device/:sectionId/:deviceId",
  passport.authenticate("jwt", { session: false }),
  controller.deleteDevice
);

//_________________delete  section
router.delete(
  "/device/:sectionId",
  passport.authenticate("jwt", { session: false }),
  controller.deleteSection
);
//on /off___________________________________________________________________
router.post(
  "/device/:sectionId/:deviceId",
  passport.authenticate("jwt", { session: false }),
  controller.switchDevice
);
//____________________________________________________________________
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.userProfile
);

router.post(
  "/code",
  passport.authenticate("jwt", { session: false }),
  controller.activeEmail
);
router.put('/editUser',
passport.authenticate('jwt',{session:false}),controller.editProfile
)

module.exports = router;

