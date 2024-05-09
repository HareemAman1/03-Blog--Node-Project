////we will create: blog_index, blog_details, blog_create_post, blog_delete

////get and save data
const Blog = require('../2models/2blog');

const blog_index =(req, res) => {
    Blog.find().sort({createdAt: -1}) //newest first
    .then((result) => {
        res.render('2index', {title: 'All Blogs', blogs:result})
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
    .then(result => {
        res.render('23details', {blog: result, title:'Blog Details' })
    }) 
    .catch(err => {
        res.status(404).render('404', { title: 'Blog not Found' })
      });
}

const blog_create_post = (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'}) // without JSON we cant redirect
    })
    .catch(err => {
        console.log(err);
      });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_post,
    blog_delete
}