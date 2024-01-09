
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptAdapter = {
    //para encryptar nuestra contraseña
    hash:(password:string)=>{
        const salt =genSaltSync();
        return hashSync(password,salt)
    },

    //para  comparar nuestra contraseña
    compare: ( password:string,hashed:string) =>{
        return compareSync(password,hashed);
    }
}