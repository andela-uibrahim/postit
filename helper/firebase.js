
/**
 * This class represents the capabilities and properties of firebase
 *
 * @class Firebase
 */
class Firebase {

  /**
   * This method initializes the firebase app.
   *
   * @memberof Firebase
   */
  static initializeApp(firebase) {
    firebase.initializeApp({
      apiKey: 'AIzaSyBL4xxwfF4h2YjhPWXkqwLAd_7X25nVpwc',
      authDomain: 'freemile-postit.firebaseapp.com',
      databaseURL: 'https://freemile-postit.firebaseio.com',
      projectId: 'freemile-postit',
      storageBucket: 'freemile-postit.appspot.com',
      messagingSenderId: '30085544216'
    });
    const database = firebase.database();
    return database;
  }
}

export default Firebase;
