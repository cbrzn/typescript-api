import App from '../src/app';
import UserController from './users';
 
const app = new App(
  [
    new UserController(),
  ],
);

// router.use('/user/:userId', UserController.getUserInformation)
// router.get('/user/:userId/avatar', getAvatar)
// router.delete('/user/:userId/avatar', deleteAvatar)


export default app