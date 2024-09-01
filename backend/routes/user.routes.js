const userRouter = require("express").Router();

const userCtrl = require("../controller/user.controller");

userRouter.post('/register', userCtrl.registerUser);
userRouter.post('/login', userCtrl.loginUser);
userRouter.post('/dashboard', userCtrl.userDashboard);

module.exports = userRouter;