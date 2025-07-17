import Joi from 'joi';

export const createCompanySchema = Joi.object({
    company_name: Joi.string().max(100).required(),
    company_description: Joi.string().max(255).optional(),
    created_by: Joi.string().max(100).optional(),
});

export const updateCompanySchema = Joi.object({
    company_name: Joi.string().max(100).optional(),
    company_description: Joi.string().max(255).optional(),
    updated_by: Joi.string().max(100).optional(),
});
