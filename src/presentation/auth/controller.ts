import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AuthService } from "../services/auth-service";
import { CustomError, LoginUserDto } from "../../domain";


export class AuthController{
    //DI
    constructor(
        public readonly authService:AuthService,
    ){}
    
    private handleError = (error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }
        console.log(`${error}`);
        return res.status(500).json({error:'Internal server error'});
        
    }

    //delegamos la creación al service
    registerUser = (req:Request,res:Response) => {
        //utilizamos nuestro dto para la creación de user
        const [error,registerDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.authService.registerUser(registerDto!)
        .then((user) => res.json(user))
        .catch( error => this.handleError(error,res));

        // res.json(registerDto);
    }



    loginUser = (req:Request,res:Response)=>{
        const [error,loginDto] = LoginUserDto.login(req.body);
        if(error)return res.status(400).json({error});

        this.authService.loginUser(loginDto!)
        .then((user)=> res.json(user))
        .catch(error => this.handleError(error,res));
        // res.json('loginUser');
    }

    validateEmail = (req:Request,res:Response)=>{
        res.json('validateEmail');
    }
}