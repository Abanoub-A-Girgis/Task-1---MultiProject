const catprjModel = require("../../models/dashboard/catprjModel");
const categoryModel = require("../../models/dashboard/categoryModel");
const projectModel = require("../../models/dashboard/projectModel");
const path = require("path");
const { unlink } = require("fs");

const index = (req, res) => {
  Promise.all([
    catprjModel.index(),
    categoryModel.index(),
    projectModel.index(),
  ]).then(([catprjs, categories, projects]) => {
    res.render("dashboard/pages/catprj/index", {
      catprjs,
      categories,
      projects,
    });
  });
};

const show = (req, res) => {
  const categoryId = req.params["categoryId"];
  const projectId = req.params["projectId"];
  Promise.all([
    categoryModel.show(categoryId),
    projectModel.show(projectId),
  ]).then(([category, project]) => {
    catprjModel.show(categoryId, projectId).then((onecatprj) => {
      res.render("dashboard/pages/catprj/show", {
        onecatprj,
        category,
        project,
      });
    });
  });
};

const createForm = (req, res) => {
  Promise.all([categoryModel.index(), projectModel.index()]).then(
    ([categories, projects]) => {
      res.render("dashboard/pages/catprj/createForm", { categories, projects });
    }
  );
};

const store = (req, res) => {
  //////////////////
  catprjModel.store(req.body).then((error) => {
    //
  });
  res.redirect("/dashboard/catprj");
};

const updateForm = (req, res) => {
  const catId = req.params["categoryId"];
  const projId = req.params["projectId"];
  Promise.all([categoryModel.index(), projectModel.index()]).then(
    ([categories, projects]) => {
      catprjModel.updateForm(catId, projId).then((onecatprj) => {
        res.render("dashboard/pages/catprj/updateForm", { onecatprj, categories, projects });
      });
    }
  );
};

const update = (req, res) => {
  // validation

  const categoryId = req.body.OldcategoryId;
  const projectId = req.body.OldprojectId;
  catprjModel.updateForm(categoryId, projectId).then((onecatprj) => {
    if (onecatprj.length != 0) {
      catprjModel.update(req.body).then((error) => {
        //
      });
      res.redirect("/dashboard/catprj");
    }
  });
};

const destroy = (req, res) => {
  const categoryId = req.params["categoryId"];
  const projectId = req.params["projectId"];
  catprjModel.updateForm(categoryId, projectId).then((onecatprj) => {
    if (onecatprj.length != 0) {
      catprjModel.destroy(categoryId, projectId).then((error) => {
        //
      });
      res.redirect("/dashboard/catprj");
    }
  });
};

module.exports = {
  index,
  show,
  createForm,
  store,
  updateForm,
  update,
  destroy,
};
