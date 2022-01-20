import { Request, Response, Router } from "express";
import { body, validationResult } from 'express-validator';
import { AuthenticateUserController } from "../../components/users/usecases/authenticateUserUseCase/AuthenticateUserController";
import { CreateUserController } from "../../components/users/usecases/createUserUseCase/CreateUserController";
import { RefreshTokenController } from "../../components/users/usecases/refreshTokenUseCase/RefreshTokenController";

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

export const usersRouter = Router()
usersRouter.post('/', 
    body('password').isLength({ min: 6 }).withMessage('Senha tem que ser maior que 6 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    body('name').isString().isLength({ min: 3 }).withMessage('Nome maior que 3 letras'),
    createUserController.execute
)

usersRouter.post('/auth', 
    body('password').isLength({ min: 6 }).withMessage('Senha tem que ser maior que 6 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    authenticateUserController.execute
)

usersRouter.post('/refresh-token', refreshTokenController.execute)
