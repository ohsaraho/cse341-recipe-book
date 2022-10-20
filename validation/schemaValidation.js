const Joi = require('joi');

const userSchema = Joi.object({
    userName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    email: Joi.string().email().lowercase().required(),

    password: Joi.string()
        .required()

    // email: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

// const recipeSchema = Joi.object({
//     recipeName: Joi.string()
//         .min(3)
//         .max(30)
//         .required(),
    
//     ingredients: Joi.string().required(),

//     instructions: Joi.string()
//         .required(),
    
//     prepareTime: Joi.string()
//         .required(),
    
//     tags: Joi.string()
//         .required()
// })

module.exports = {
    userSchema
}