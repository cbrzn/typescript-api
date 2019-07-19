import * as express from 'express';
import * as mongoose from 'mongoose';

export default class App {
  public app: express.Application;
  constructor(controllers) {
    this.app = express();
    this.setDatabase()
    this.initializeControllers(controllers);
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  private setDatabase() {
    mongoose.connect('mongodb://localhost/usersApi', { useNewUrlParser: true })
  }
  
  public listen() {
    this.app.listen(3000, () => {
      console.log(`App listening on the port ${3000}`);
    });
  }
}
 
