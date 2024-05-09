//// from 1blogroutes we cut some chunks of code and paste them in 2blogcontrollers leaving this behind

const express = require ('express');

const blogcontroller = require('../2controllers/2blogcontrollers')

const router = express.Router();  // like a mini app
//// also replace 'app' (before request post, get, delete) with 'router'


///// blog routes
//// sort
router.get('/', blogcontroller.blog_index);
/////post request
router.post('/', blogcontroller.blog_create_post);
////route parameters
router.get('/:id', blogcontroller.blog_details)
////delete request
router.delete('/:id', blogcontroller.blog_delete)

module.exports = router;
