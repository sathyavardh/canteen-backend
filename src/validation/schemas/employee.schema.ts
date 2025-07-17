import Joi from 'joi';

export const createEmployeeSchema = Joi.object({
  employee_name: Joi.string().required(),
  employee_email: Joi.string().email().required(),
  employee_password: Joi.string().min(6).required(),
  employee_phone: Joi.string(),
  employee_address: Joi.string(),
  employee_position: Joi.string(),
  employee_role_id: Joi.string().optional(),
  employee_company_id: Joi.string().optional(),
});


export const updateEmployeeSchema = Joi.object({
  employee_name: Joi.string().optional(),
  employee_email: Joi.string().email().optional(),
  employee_password: Joi.string().min(6).optional(),
  employee_phone: Joi.string(),
  employee_address: Joi.string(),
  employee_position: Joi.string(),
  employee_role_id: Joi.string().optional(),
  employee_company_id: Joi.string().optional(),
  updatedBy: Joi.string().optional(),
});