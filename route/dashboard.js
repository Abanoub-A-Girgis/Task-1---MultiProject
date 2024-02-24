const express = require('express');
const dashboardRouter = express.Router();
const app = express();

/* ------------- controllers ------------------- */

const bannerController = require('../controllers/dashboard/bannerController');
const contactformController = require('../controllers/dashboard/contactformController');
const projectController = require('../controllers/dashboard/projectController');
const categoryController = require('../controllers/dashboard/categoryController');
const catprjController = require('../controllers/dashboard/catprjController');

/* -------------- parse of form ------------------- */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        if(file){
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }
});

const upload = multer({
    storage: storage
});


/* ---------------------------------------------------- */
/* -------------- route roles ------------------------ */
/* ------------------------------------------------------ */
const authController = require("../controllers/dashboard/authController");

/* -------------- not auth pages ------------------- */
dashboardRouter.get('/signup', (req, res) => {
    authController.signup(req, res);
});

dashboardRouter.post('/storeUser', (req, res) => {
    authController.storeUser(req, res);
});

dashboardRouter.get('/signin', (req, res) => {
    authController.signin(req, res);
});

dashboardRouter.post('/verifySignin', (req, res) => {
    authController.verifySignin(req, res);
});

dashboardRouter.get('/logout', (req, res) => {
    authController.logout(req, res);
});

/* ------- auth --------- */
dashboardRouter.use(authController.isAthu);

/* ********** dashboard ************* */
dashboardRouter.get('/dashboard', (req, res) => {
    res.render("../views/dashboard/pages/index.ejs");
});

dashboardRouter.get('/dashboard/banner', (req, res) => {
    bannerController.index(req, res);
});
dashboardRouter.get('/dashboard/banner/show/:id', (req, res) => {
    bannerController.show(req, res);
});
dashboardRouter.get('/dashboard/banner/destroy/:id', (req, res) => {
    bannerController.destroy(req, res);
});
dashboardRouter.get('/dashboard/banner/createForm', (req, res) => {
    bannerController.createForm(req, res);
});
dashboardRouter.post('/dashboard/banner/store', upload.single("photo"), (req, res) => {
    bannerController.store(req, res);
});
dashboardRouter.get('/dashboard/banner/updateForm/:id', (req, res) => {
    bannerController.updateForm(req, res);
});
dashboardRouter.post('/dashboard/banner/update', upload.single("photo"), (req, res) => {
    bannerController.update(req, res);
});

/* ------------------------------- */

dashboardRouter.get('/dashboard/contactform', (req, res) => {
    contactformController.index(req, res);
});
dashboardRouter.get('/dashboard/contactform/show/:id', (req, res) => {
    contactformController.show(req, res);
});
dashboardRouter.get('/dashboard/contactform/destroy/:id', (req, res) => {
    contactformController.destroy(req, res);
});


/* ------------------------------- */

dashboardRouter.get('/dashboard/projects', (req, res) => {
    projectController.index(req, res);
});
dashboardRouter.get('/dashboard/projects/show/:id', (req, res) => {
    projectController.show(req, res);
});
dashboardRouter.get('/dashboard/projects/destroy/:id', (req, res) => {
    projectController.destroy(req, res);
});
dashboardRouter.get('/dashboard/projects/createForm', (req, res) => {
    projectController.createForm(req, res);
});
dashboardRouter.post('/dashboard/projects/store', upload.single("photo"), (req, res) => {
    projectController.store(req, res);
});
dashboardRouter.get('/dashboard/projects/updateForm/:id', (req, res) => {
    projectController.updateForm(req, res);
});
dashboardRouter.post('/dashboard/projects/update', upload.single("photo"), (req, res) => {
    projectController.update(req, res);
});

/* ------------------------------- */

dashboardRouter.get('/dashboard/categories', (req, res) => {
    categoryController.index(req, res);
});
dashboardRouter.get('/dashboard/categories/show/:id', (req, res) => {
    categoryController.show(req, res);
});
dashboardRouter.get('/dashboard/categories/destroy/:id', (req, res) => {
    categoryController.destroy(req, res);
});
dashboardRouter.get('/dashboard/categories/createForm', (req, res) => {
    categoryController.createForm(req, res);
});
dashboardRouter.post('/dashboard/categories/store', (req, res) => {
    categoryController.store(req, res);
});
dashboardRouter.get('/dashboard/categories/updateForm/:id', (req, res) => {
    categoryController.updateForm(req, res);
});
dashboardRouter.post('/dashboard/categories/update', (req, res) => {
    categoryController.update(req, res);
});

/* ------------------------------- */

dashboardRouter.get('/dashboard/catprj', (req, res) => {
    catprjController.index(req, res);
});
dashboardRouter.get('/dashboard/catprj/show/:categoryId/:projectId', (req, res) => {
    catprjController.show(req, res);
});
dashboardRouter.get('/dashboard/catprj/destroy/:categoryId/:projectId', (req, res) => {
    catprjController.destroy(req, res);
});
dashboardRouter.get('/dashboard/catprj/createForm', (req, res) => {
    catprjController.createForm(req, res);
});
dashboardRouter.post('/dashboard/catprj/store', (req, res) => {
    catprjController.store(req, res);
});
dashboardRouter.get('/dashboard/catprj/updateForm/:categoryId/:projectId', (req, res) => {
    catprjController.updateForm(req, res);
});
dashboardRouter.post('/dashboard/catprj/update', (req, res) => {
    catprjController.update(req, res);
});


module.exports = dashboardRouter;