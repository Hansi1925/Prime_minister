const router = require('express').Router();
const auth = require('../middleware/auth.js');
const ctrl = require('../controllers/formController.js');
const zodValidate = require('../validation/zodValidate.js');
const { FormCreateSchema, FormUpdateSchema } = require('../validation/formSchemas');

router.post('/', auth, zodValidate(FormCreateSchema), ctrl.create);
router.get('/', auth, ctrl.list);
router.get('/:id', auth, ctrl.getById);
router.put('/:id', auth, zodValidate(FormUpdateSchema), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { createForm, getForms, getFormById } = require('../controllers/formController');
// const protect = require('../middleware/authMiddleware');

// router.post('/', protect, createForm);
// router.get('/', protect, getForms);
// router.get('/:id', protect, getFormById);

// module.exports = router;
