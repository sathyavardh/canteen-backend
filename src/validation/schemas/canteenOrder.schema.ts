import Joi from 'joi';

export const createCanteenOrderSchema = Joi.object({
  canteen_id: Joi.string().required(), // UUID or custom ID, adjust if needed
  employee_id: Joi.string().required(),
  canteen_menu_ids: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .label('canteen_menu_ids must be an array of menu item IDs'),
  total_price: Joi.number().min(0).optional(),
  created_by: Joi.string().max(100).optional(),
});

export const updateCanteenOrderSchema = Joi.object({
  canteen_id: Joi.string().optional(),
  employee_id: Joi.string().optional(),

  canteen_menu_ids: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .optional()
    .label('canteen_menu_ids must be an array of menu item IDs'),

  total_price: Joi.number().min(0).optional(),

  updated_by: Joi.string().max(100).optional(),
});