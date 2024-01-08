import { Router } from 'express';
import { AuthRoutes } from './auth/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    //*definimos nuestra ruta principal, relizando la llamda de nuestra authroute
    router.use('/api/auth', AuthRoutes.routes );



    return router;
  }


}

