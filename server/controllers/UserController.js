import firebase from 'firebase';
import Firebase from '../../helper/firebase';

Firebase.initializeApp(firebase);

const database = firebase.database();

const usersRef = database.ref('users/');

class UserController {
    /**
     * Method to set the various document routes
     * @param{Object} req - Server req
     * @return{Object} return req parameters
     */
  static postreq(req) {
    return (
        req.body &&
        req.body.userName &&
        req.body.password &&
        req.body.email
    );
  }

  /**
   * Method used to create new user
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static createUser(req, res) {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      res.status(400).send({
        message: 'Please use a valid email address'
      });
    } else if (userName && password) {
      // create user with email and password
      firebase.auth().createUserWithEmailAndPassword(email, password)
       .then((user) => {
         // update the username of the user
         user.updateProfile({
           displayName: userName
         });
         user.sendEmailVerification().then(() => {
           res.send({ message: 'Welcome to the Post It, An email has been sent to you',
        user });
         });
         usersRef.push().set({
           uid: user.uid,
           userName,
           email
         });
       }).catch((error) => {
         const errorMessage = error.message;
         res.status(400).send({ message: `Error signing up :( ${errorMessage}` });
       });
    } else {
      // if email or password or username strings are empty
      res.status(400).send({
        message: 'Please make sure you enter all data'
      });
    }
  }

 /**
   * Method used to login a user
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      res.status(400).send({
        message: 'Please use a valid email address'
      });
    } else if (password) {
      // create user with email and password
      firebase.auth().signInWithEmailAndPassword(email, password)
       .then((user) => {
         res.status(200).send({
           message: 'user successfully logged in',
           user
         });
       }).catch((error) => {
         const errorMessage = error.message;
         res.status(400).send({ message: `Error signing up :( ${errorMessage}` });
       });
    } else {
      // if email or password or username strings are empty
      res.status(400).send({
        message: 'Please make sure you enter all data'
      });
    }
  }

  static getUsers(req, res) {
    usersRef.orderByKey().once('value').then((usersSnap) => {
      res.status(200).send({
        message: 'success',
        users: usersSnap
      });
    }).catch((error) => {
      res.status(400).send({
        message: 'false',
        error: error.message
      });
    });
  }
}

export default UserController;
