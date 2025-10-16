import Joi from "joi";

// Auth validation schemas
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

// Task validation schemas
export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required().messages({
    "string.empty": "Title is required",
    "string.max": "Title cannot exceed 200 characters",
  }),
  description: Joi.string().max(1000).allow("").optional().messages({
    "string.max": "Description cannot exceed 1000 characters",
  }),
  priority: Joi.string().valid("Low", "Medium", "High").optional().messages({
    "any.only": "Priority must be Low, Medium, or High",
  }),
  status: Joi.string()
    .valid("Todo", "In Progress", "Completed")
    .optional()
    .messages({
      "any.only": "Status must be Todo, In Progress, or Completed",
    }),
  dueDate: Joi.date().optional().messages({
    "date.base": "Please provide a valid date",
  }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).optional().messages({
    "string.empty": "Title cannot be empty",
    "string.max": "Title cannot exceed 200 characters",
  }),
  description: Joi.string().max(1000).allow("").optional().messages({
    "string.max": "Description cannot exceed 1000 characters",
  }),
  priority: Joi.string().valid("Low", "Medium", "High").optional().messages({
    "any.only": "Priority must be Low, Medium, or High",
  }),
  status: Joi.string()
    .valid("Todo", "In Progress", "Completed")
    .optional()
    .messages({
      "any.only": "Status must be Todo, In Progress, or Completed",
    }),
  dueDate: Joi.date().optional().messages({
    "date.base": "Please provide a valid date",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
