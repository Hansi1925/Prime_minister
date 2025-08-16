const { Form } = require('../models/Index.js');

exports.create = async (req, res) => {
  try {
    const body = req.validated || req.body;
    const form = await Form.create({
      title: body.title,
      description: body.description || null,
      data: body.data || null,
      createdBy: req.user.id
    });
    res.status(201).json(form);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.list = async (req, res) => {
  const where = req.user.role === 'admin' ? {} : { createdBy: req.user.id };
  const forms = await Form.findAll({ where, order: [['createdAt','DESC']] });
  res.json(forms);
};

exports.getById = async (req, res) => {
  const form = await Form.findByPk(req.params.id);
  if (!form) return res.status(404).json({ message: 'Not found' });
  if (req.user.role !== 'admin' && form.createdBy !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  res.json(form);
};

exports.update = async (req, res) => {
  const form = await Form.findByPk(req.params.id);
  if (!form) return res.status(404).json({ message: 'Not found' });
  if (req.user.role !== 'admin' && form.createdBy !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const body = req.validated || req.body;
  await form.update({
    title: body.title ?? form.title,
    description: body.description ?? form.description,
    data: body.data ?? form.data
  });
  res.json(form);
};

exports.remove = async (req, res) => {
  const form = await Form.findByPk(req.params.id);
  if (!form) return res.status(404).json({ message: 'Not found' });
  if (req.user.role !== 'admin' && form.createdBy !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  await form.destroy();
  res.json({ ok: true });
};



// const Form = require('../models/Form');

// // Create form
// exports.createForm = async (req, res) => {
//   try {
//     const form = await Form.create({ ...req.body, createdBy: req.user._id });
//     res.status(201).json(form);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Get all forms
// exports.getForms = async (req, res) => {
//   const forms = await Form.find().populate('createdBy', 'username email');
//   res.json(forms);
// };

// // Get form by id
// exports.getFormById = async (req, res) => {
//   const form = await Form.findById(req.params.id);
//   if (!form) return res.status(404).json({ message: 'Form not found' });
//   res.json(form);
// };
