const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCurrentUser,
  editUser,
} = require('../controllers/users');

const {
  editUserValidation,
} = require('../validation/validationRules');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate(editUserValidation), editUser);

module.exports = router;
