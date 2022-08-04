const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().required(),
})

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

const updateRoleSchema = Joi.object({
  username: Joi.string().required(),
  role: Joi.string()
})


const createBarangSchema = Joi.object({
  nama_barang: Joi.string().required(),
  stok: Joi.number().required(),
})

const updateBarangSchema = Joi.object({
  nama_barang: Joi.string().required(),
  stok: Joi.number().required(),
})

const sendMailSchema = Joi.object({
  to: Joi.string().required(),
  subject: Joi.string().required()
})
  
module.exports = {
  registerSchema,
  loginSchema,
  updateRoleSchema,
  createBarangSchema,
  updateBarangSchema,
  sendMailSchema
}