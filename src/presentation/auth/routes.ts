import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth-service';




export class AuthRoutes {


  static get routes(): Router {
    //inicializo mi services
    const authService = new AuthService();
    const router = Router();
    //*llamamos a nuestro controlador
    const controller = new AuthController(authService);//coloco mi servicio como parametro
    
    // Definir las rutas
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );

    router.get('/validate-email/:token', controller.validateEmail );



    return router;
  }


}

