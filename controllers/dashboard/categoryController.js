const categoryModel = require("../../models/dashboard/categoryModel");
const path = require("path");
const { unlink } = require("fs");

const index = (req, res) => {
  categoryModel.index().then((categories) => {
    res.render("dashboard/pages/categories/index", { categories });
  });
};

const show = (req, res) => {
  const id = req.params["id"];
  categoryModel.show(id).then((oneCategory) => {
    res.render("dashboard/pages/categories/show", { oneCategory });
  });
};

const createForm = (req, res) => {
  res.render("dashboard/pages/categories/createForm");
};

const store = (req, res) => {
  // validation
  if (req.file != undefined) {
    req.body.photo = req.file.filename;
  } else {
    req.body.photo = "";
  }

  //////////////////
  categoryModel.store(req.body).then((error) => {
    //
  });
  res.redirect("/dashboard/categories");
};

const updateForm = (req, res) => {
  const id = req.params["id"];
  categoryModel.updateForm(id).then((oneCategory) => {
    res.render("dashboard/pages/categories/updateForm", { oneCategory });
  });
};

const update = (req, res) => {
  // validation

  const id = req.body.id;
  categoryModel.updateForm(id).then((oneCategory) => {
    if (oneCategory.length != 0) {
      categoryModel.update(req.body).then((error) => {
        //
      });
      res.redirect("/dashboard/categories");
    }
  });
};

const destroy = (req, res) => {
  const id = req.params["id"];
  categoryModel.updateForm(id).then((oneCategory) => {
    if (oneCategory.length != 0) {
      categoryModel.destroy(id).then((error) => {
        //
      });
      res.redirect("/dashboard/categories");
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
