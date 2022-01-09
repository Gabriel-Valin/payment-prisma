import { Request, Response, Router } from "express";
import { makeAuthenticateUserController } from "../../components/users/usecases/authenticateUserUseCase";
import { makeCreateUserController } from "../../components/users/usecases/createUserUseCase";
import { body, validationResult } from 'express-validator';

export const usersRouter = Router()
usersRouter.post('/', 
    body('password').isLength({ min: 6 }).withMessage('Senha tem que ser maior que 6 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    body('name').isString().isLength({ min: 3 }).withMessage('Nome maior que 3 letras'),
    
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()});
        }
        return makeCreateUserController().execute(request, response)
})

usersRouter.post('/auth', 
    body('password').isLength({ min: 6 }).withMessage('Senha tem que ser maior que 6 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()});
        }
        return makeAuthenticateUserController().execute(request, response)
})
