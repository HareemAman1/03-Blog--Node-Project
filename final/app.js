const express = require ('express');
const morgan = require ('morgan'); ////morgan
const mongoose = require ('mongoose'); //// mongoose
const app = express(); //// express app
const blogroutes = require('./1routes/2blogroutes') //// express router


//// connect to mongo db
//// replace username and password
//// before ?retry add database name
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.epxvfnx.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts'
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs'); // register view engine

//middleware & static files
app.use(express.static('public'));
////post request
app.use(express.urlencoded({extended: true}));  
//// takes url encoded data that can be later passed on objects
//// without it console will show UNDEFINED instead of body 

////morgan
app.use(morgan('dev'));     // does same work as middleware



////output data
//// routes
app.get('/', (req,res) => {
    res.redirect('/blogs')
});

app.get('/about', (req,res) => {
    //// to use our html pages
    res.render('3about', { title: 'About' });
});

app.get('/blogs/create', (req,res) => {
    res.render('1create', { title: 'Create blog' });
});

// app.use(blogroutes);
app.use('/blogs', blogroutes);

//// 404 page
//// should be all the way at the bottom
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
