import { envs } from './config/envs';
import { MongoConnectDb } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function main() {

  //*traemos nuestra config. para la conexión de DB
  await MongoConnectDb.connect({
    dbName:envs.MONGO_DB_NAME,
    mongoUrl:envs.MONGO_URL,
  })

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}