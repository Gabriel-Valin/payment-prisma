import { Request, Response, Router } from "express";
// import { makeAuthenticateUserController } from "../../components/users/usecases/authenticateUserUseCase";
import { body, validationResult } from 'express-validator';
import { AuthenticateUserController } from "../../components/users/usecases/authenticateUserUseCase/AuthenticateUserController";
import { CreateUserController } from "../../components/users/usecases/createUserUseCase/CreateUserController";
import { CreateUserUseCase } from "../../components/users/usecases/createUserUseCase/CreateUserUseCase";

export const usersRouter = Router()
const authController = new AuthenticateUserController()
const createUserController = new CreateUserController()
usersRouter.post('/', 
    body('password').isLength({ min: 6 }).withMessage('Senha tem que ser maior que 6 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    body('name').isString().isLength({ min: 3 }).withMessage('Nome maior que 3 letras'),
    createUserController.execute
)

usersRouter.post('/auth', 
    body('password').isLength({ min: 6 }).withMessage('Senha tem que ser maior que 6 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    authController.execute
)
