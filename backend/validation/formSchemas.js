const { z } = require('zod');

const FormCreateSchema = z.object({
  title: z.string().min(1, 'title is required'),
  description: z.string().optional(),
  data: z.record(z.any()).optional()
});

const FormUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  data: z.record(z.any()).optional()
});

module.exports = { FormCreateSchema, FormUpdateSchema };
