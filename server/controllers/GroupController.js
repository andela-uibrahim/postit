import firebase from 'firebase';

const database = firebase.database();
const groupRef = database.ref('groups/');

class GroupController {


  /**
   * Method used to create new user
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static createGroup(req, res) {
    const groupName = req.body.groupName;
    const groupPurpose = req.body.groupPurpose;
    const currentUser = firebase.auth().currentUser;
    let groupAdmin;
    if (currentUser) {
      groupAdmin = currentUser.uid;
      groupRef.push().set({
        groupName,
        groupAdmin,
        groupPurpose
      });
      res.status(201).send({
        message: 'group created successfully',
        groupName,
        groupPurpose
      });
    } else {
      res.status(400).send({
        message: 'please login to create a group'
      });
    }
  }

  static addGroupMember(req, res) {
    const memberId = req.body.memberId;
    const groupId = req.params.id;
    groupRef.child(groupId).child('members')
    .orderByChild('memberId').equalTo(memberId).once('value',
      (snapShot) => {
        if (snapShot.val()) {
          res.status(400).send({
            message: 'user already exist'
          });
        } else {
          groupRef.child(groupId).child('members').push()
          .set({ memberId })
          .then(() => {
            groupRef.child(groupId).child('members').orderByKey().once('value')
            .then((membersSnap) => {
              res.status(200).send({
                message: 'success',
                members: membersSnap
              });
            });
          })
         .catch((error) => {
           res.status(400).send({
             message: 'user was not added',
             error: error.message
           });
         });
        }
      });
  }
  static getGroupMembers(req, res) {
    const currentUser = firebase.auth().currentUser;
    const memberId = currentUser.uid;
    const groupId = req.params.id;
    groupRef.child(groupId).child('members')
    .orderByChild('memberId').equalTo(memberId).once('value',
      (snapShot) => {
        if (!snapShot.val()) {
          res.status(401).send({
            message: 'you are not a member of this group'
          });
        } else {
          groupRef.child(groupId).child('members').orderByKey().once('value')
            .then((membersSnap) => {
              res.status(200).send({
                message: 'success',
                members: membersSnap
              });
            })
           .catch((error) => {
             res.status(400).send({
               message: 'user was not added',
               error: error.message
             });
           });
        }
      });
  }
}

export default GroupController;
