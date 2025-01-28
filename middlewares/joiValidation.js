import Joi from 'joi'

export const signUpValidation = Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8) ,
 });


 export const productValidation = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().hex().length(24).required(), 
    subcategory: Joi.string().required(), 
    description: Joi.string().default("description"),
    quantity: Joi.number().min(0).default(1),
    imageSrc: Joi.string().uri().default("https://via.placeholder.com/150"),
  });

  export const updateproductValidation=Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    quantity: Joi.number().min(0),
    isDeleted: Joi.boolean(),
    imageSrc: Joi.string().uri(),
  })