const express = require("express");
const router = express.Router();
const {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
} = require("../controllers/userController");

router.route("/").post(registerUser).get(getUsers);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
 router.route('/:id').delete(deleteUser).get(getUserByID).put(updateUser);

module.exports = router;
