import UsersRoute from './user';
import GroupsRoute from './group';


/**
 * IndexRoute contains all the routes for the api
 */
class IndexRoute {
/**
 * Index IndexRoute for catch all
 * @param{Object} app express app
 * @return{Void} return void
 */
  static index(app) {
    app.all('/*', (req, res) => {
      res.status(200)
        .send('welcome to postit api');
    });
  }

/**
 * Users Route
 * @param{Object} app express app
 * @return{Void} return void
 */
  static users(app) {
    app.use('/users', UsersRoute);
  }

  /**
 * Groups Route
 * @param{Object} app express app
 * @return{Void} return void
 */
  static groups(app) {
    app.use('/groups', GroupsRoute);
  }

}
export default IndexRoute;
