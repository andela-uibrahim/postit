import express from 'express';
import GroupController from '../controllers/GroupController';


const router = express.Router();


// router.route('/')
//     .get(GroupController.getGroups);
router.route('/')
    .post(GroupController.createGroup);
router.route('/:id/users')
    .post(GroupController.addGroupMember)
    .get(GroupController.getGroupMembers);

export default router;
