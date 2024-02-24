const mysql = require("mysql2");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

async function index() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workproj ORDER BY id DESC", [], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function show(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workproj WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function store(createFormData) {
    const title = createFormData.title;
    const description = createFormData.description;
    const photo = createFormData.photo;

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO workproj (title, description, photo) VALUES (?,?,?)", [title, description, photo], (error, result) => {
            if(error) {
                resolve(error);
            }
        })
    });
}


async function updateForm(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workproj WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function update(updateFormData) {
    const id = updateFormData.id;
    const title = updateFormData.title;
    const description = updateFormData.description;
    const photo = updateFormData.photo;

    if(photo != "") {
        var updateSQL = "UPDATE workproj SET title=?, description=?, photo=? WHERE id=?";
        var updatedFields = [title, description, photo, id];
    }
    else {
        var updateSQL = "UPDATE workproj SET title=?, description=? WHERE id=?";
        var updatedFields = [title, description, id];
    }

    return new Promise((resolve, reject) => {
        connection.query(updateSQL, updatedFields, (error, result) => {
            if(error) {
                resolve(error);
            }
        })
    });
}

async function destroy(id) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM workproj WHERE id=?", [id], (error, result) => {
            if(error) {
                return res.json({ err: error});
            }
        })
    });
}

module.exports = {
    index,
    show,
    store,
    updateForm,
    update,
    destroy
}