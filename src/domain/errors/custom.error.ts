export class CustomError extends Error{
    private constructor(
        public readonly statusCode:number,
        public readonly message:string
    ){
        super(message);
    }

    //para mandas un error badrequest y pone automaticament el codigo de error 400
    static badRequest( message:string){
        return new CustomError(400,message);
    }
    //
    static unauthorize( message:string){
        return new CustomError(401,message);
    }
    //
    static forbidden( message:string){
        return new CustomError(403,message);
    }
    //
    static notFound( message:string){
        return new CustomError(404,message);
    }
    //
    static internalServer( message:string){
        console.log(message);
        
        return new CustomError(500,message);
    }
    
}