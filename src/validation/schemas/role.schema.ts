import Joi from 'joi';

export const createRoleSchema = Joi.object({
    role_name: Joi.string().max(50).required(),
    role_description: Joi.string().max(200).optional(),
    created_by: Joi.string().max(100).optional(),
});

export const updateRoleSchema = Joi.object({
    role_name: Joi.string().max(50).optional(),
    role_description: Joi.string().max(200).optional(),
    updated_by: Joi.string().max(100).optional(),
});
