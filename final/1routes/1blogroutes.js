const express = require ('express');
////get and save data
const Blog = require('../2models/2blog');

const router = express.Router();  // like a mini app
//// also replace 'app' (before request post, get, delete) with 'router'



//// SORT METHOD
router.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1}) //newest first
    .then((result) => {
        res.render('2index', {title: 'All Blogs', blogs:result})
    })
    .catch((err) => {
        console.log(err);
    })
})

///// blog routes
////////// 1-POST REQUEST //////////
router.post('/', (req,res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});


////////// 2-ROUTE PARAMETERS //////////
router.get('/:id', (req,res) => {
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
    .then(result => {
        res.render('23details', {blog: result, title:'Blog Details' })
    }) 
    .catch(err => {
        console.log(err);
      });
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'}) // without JSON we cant redirect
    })
    .catch(err => {
        console.log(err);
      });
})

module.exports = router;
