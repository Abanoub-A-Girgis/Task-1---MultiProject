const projectModel = require("../../models/dashboard/projectModel");
const path = require("path");
const {unlink} = require("fs");

const index = (req, res) => {
    projectModel.index()
        .then(projects => {
            res.render("dashboard/pages/projects/index", { projects });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    projectModel.show(id)
        .then(oneProject => {
            res.render("dashboard/pages/projects/show", { oneProject });
        });
}

const createForm = (req, res) => {
    res.render("dashboard/pages/projects/createForm");
}

const store = (req, res) => {
   // validation
    if(req.file != undefined) {
        req.body.photo = req.file.filename;
    }
    else {
        req.body.photo = "";
    }

   //////////////////
   projectModel.store(req.body)
        .then(error => {
            //
        });
    res.redirect("/dashboard/projects");
}

const updateForm = (req, res) => {
    const id = req.params['id'];
    projectModel.updateForm(id)
        .then(oneProject => {
            res.render("dashboard/pages/projects/updateForm", { oneProject });
        });
}

const update = (req, res) => {
    // validation

    const id = req.body.id;
    projectModel.updateForm(id)
        .then(oneProject => {
            if(oneProject.length != 0){
                if(req.file != undefined){
                    if(oneProject[0].photo != "") {
                        const publicPath = path.resolve("./", "public/img/uploads");
                        unlink(path.join(publicPath, oneProject[0].photo), (err) => {
                            if(err) {
                                throw err;
                            }
                        });
                    }
                    req.body.photo = req.file.filename;
                    projectModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/dashboard/projects");                    
                }
                else {
                    req.body.photo = "";
                    projectModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/dashboard/projects");
                }
            }
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    projectModel.updateForm(id)
        .then(oneProject => {
            if(oneProject.length != 0){                
                if(oneProject[0].photo != "") {
                    const publicPath = path.resolve("./", "public/uploads");
                    unlink(path.join(publicPath, oneProject[0].photo), (err) => {
                        if(err) {
                            throw err;
                        }
                    });
                }                    
                projectModel.destroy(id)
                    .then(error => {
                        //
                    });
                res.redirect("/dashboard/projects");
            }
        });    
}

module.exports = {
    index,
    show,
    createForm,
    store,
    updateForm,
    update,
    destroy
}