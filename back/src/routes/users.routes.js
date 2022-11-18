const express = require("express");

const router = express.Router();

const UsersDaoMongoDB = require("../DAOs/usersDaoMongoDb");
const HabitsDaoMongoDB = require("../DAOs/habitsDaoMongoDb");
const usersApi = new UsersDaoMongoDB();
const habitsApi = new HabitsDaoMongoDB();
const { hashPassword } = require("../utils/crypt");

var GoogleStrategy = require("passport-google-oauth2").Strategy;
const { googleAuth } = require("../utils/config");
const passport = require("passport");

/* ________________ GOOGLE AUTH */
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
passport.use(
  new GoogleStrategy(googleAuth, function (
    request,
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  })
);
passport.serializeUser((user, done) => {
  done(null, user);
});
router.get(`/auth/google`, async (req, res) => {
  passport.authenticate("google", { scope: ["email", "profile"] });
});
router.get(`/google/callback`, async (req, res) => {
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  });
});
router.get(`/protected`, async (req, res) => {
  res.send("no autorizado");
});
router.get(`/auth/failure`, async (req, res) => {
  res.send("ha habido un error al loguearte");
});

// USER    --> /user -> PUT->updateUser (addFollower*)| GET->getUser(getFollowers) | DELETE->deleteUser
// ADMIN   --> /admin -> GET->getAllUsers | PUT->`:id`updateUser | GET->`:id`getUser | DELETE->`:id` deleteUser

const path = "/api/register";

//ruta para pedir todos los user
router.get(`${path}`, async (req, res) => {
  const user = await usersApi.getAll();
  console.log(user);
  res.json(user);
});

//ruta para pedir un user(name)
router.get(`${path}/one`, async (req, res) => {
  const { username } = req.body;
  const response = usersApi.findOneByName(username);
  res.json(response);
});

//ruta para pedir un user(id)
router.get(`${path}/:id`, async (req, res) => {
  const { id } = req.params;
  const response = await usersApi.findOneById(id);
  res.json(response);
});

//ruta para postear un user
router.post(`${path}`, async (req, res) => {
  const {
    username,
    fullname,
    email,
    password,
    birthday,
    avatar,
    rol,
    isActive,
    isPublic,
  } = req.body;
  const newUser = {
    username,
    fullname,
    email,
    password: hashPassword(password),
    birthday,
    avatar,
    rol,
    isActive,
    isPublic,
    habits: [],
  };
  console.log(newUser);
  usersApi.save(newUser);
  res.send("User created!");
});
// update user
router.put(`${path}`, async (req, res) => {
  
  let username = req.body.username;
  let modifiedUser = {
    _id: req.body._id,
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    birthday: req.body.birthday,
    avatar: req.body.avatar,
    rol: req.body.rol,
    isActive: req.body.isActive,
    isPublic: req.body.isPublic,
    habits: []
}
  usersApi.updateOne(username, modifiedUser);
  res.json({ msg:"User modificado!", data: modifiedUser});
});
//ruta para borrar un user
router.put(`${path}`, async (req, res) => {
  const { name } = req.body;
  habitsApi.deleteOne(name);
  res.json("se modifico el archivo");
});

// POST hábito a un user
// incorpora hábitos al user por ID de hábito
router.post(`${path}/:id/productos`, (req, res) => {
  (async () => {
    let user = await usersApi.findOneById(req.params.id);
    let habit = await habitsApi.findOneById(req.body.id);
    user.habits.push(habit);
    console.log(user);
    await usersApi.updateOne(user.username, user);
    res.status(200).json({ msg: "hábito agregado", data: habit });
  })();
});

module.exports = router;
