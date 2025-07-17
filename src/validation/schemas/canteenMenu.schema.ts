import Joi from 'joi';

export const createCanteenMenuSchema = Joi.object({
    menu_item_name: Joi.string().max(100).required(),
    menu_item_price: Joi.number().optional(),
    canteen_id: Joi.string().required(),
    menu_item_description: Joi.string().max(255).optional(),
    created_by: Joi.string().max(100).optional(),
});

export const updateCanteenMenuSchema = Joi.object({
    menu_item_name: Joi.string().max(100).required(),
    menu_item_price: Joi.number().optional(),
    canteen_id: Joi.string().required(),
    menu_item_description: Joi.string().max(255).optional(),
    updated_by: Joi.string().max(100).optional(),
});
