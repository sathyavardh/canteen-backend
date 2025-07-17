import Joi from 'joi';

export const createCanteenSchema = Joi.object({
    canteen_name: Joi.string().max(100).required(),
    created_by: Joi.string().max(100).optional(),
});

export const updateCanteenSchema = Joi.object({
    canteen_name: Joi.string().max(100).optional(),
    updated_by: Joi.string().max(100).optional(),
});
