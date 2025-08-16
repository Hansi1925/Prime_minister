const zodValidate = (schema) => (req, res, next) => {
  const r = schema.safeParse(req.body);
  if (!r.success) {
    return res.status(422).json({
      errors: r.error.issues.map(i => ({ path: i.path.join('.'), message: i.message }))
    });
  }
  req.validated = r.data;
  next();
};
module.exports = zodValidate;
