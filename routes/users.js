const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUser,
  editUser,
} = require('../controllers/users');

const {
  editUserValidation,
} = require('../validation/validationRules');

router.get('/me', getUser);

router.patch('/me', celebrate(editUserValidation), editUser);

module.exports = router;
