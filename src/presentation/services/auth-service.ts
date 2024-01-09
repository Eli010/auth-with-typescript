import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";

export class AuthService{
    //DI
    constructor(    ){}

    //aqui nos encargamos de la creación de user
    public async registerUser(registerUserDto:RegisterUserDto){
        const existUser = await UserModel.findOne({email:registerUserDto.email});
        if(existUser) throw CustomError.badRequest('Email already exist');
        
        try {
            //si el usuario no exite entonces creamos un nuevo registro
           const user = new UserModel(registerUserDto); 
           //guardamos el registro

           //encriptar la contraseña
           user.password = bcryptAdapter.hash( registerUserDto.password);
           
           
           await user.save();

           //JWT <---- para mantener la authentication of user


           //email de confirmación

           //ocultamos nuestro passowrd
            const {password, ...userEntity} = UserEntity.fromObject(user);

           return {
            user:userEntity,
            // user:{...rest},
            token:'ABC',
           };
        } catch (error) {
          throw CustomError.internalServer(`${error}`);  
        }
    }


    //login
    public async loginUser( loginUserDto: LoginUserDto){
       //* findone para verificar si existe 
       const user = await UserModel.findOne({email:loginUserDto.email});
       if(!user) throw CustomError.badRequest('Email not exist');

       //* si hay un match::: isMatch... bcryp ...compare(123456,KSADWRASDJQe)
        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);
        if(!isMatching) throw CustomError.badRequest('Password is not valid');

        //entidad para quitar la contraseña a mostrar
        const {password,...userEntity} = UserEntity.fromObject(user);

        //generamos nuestro token
        const token = await JwtAdapter.generateToken({id:user.id,email:user.email});
        //si el token no puede ser creado
        if(!token) throw CustomError.internalServer('Error while creating JWT');

       return {
        user:userEntity,
        token:token,
       }
    }
}