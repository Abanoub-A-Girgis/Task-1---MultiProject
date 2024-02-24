const mysql = require("mysql2");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

async function index() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM banner ORDER BY id DESC", [], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function show(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM banner WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function store(createFormData) {
    const title = createFormData.title;
    const details = createFormData.details;
    const photo = createFormData.photo;

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO banner (title, details, photo) VALUES (?,?,?)", [title, details, photo], (error, result) => {
            if(error) {
                return resolve({ err: error});
            }
        })
    });
}


async function updateForm(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM banner WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function update(updateFormData) {
    const id = updateFormData.id;
    const title = updateFormData.title;
    const details = updateFormData.details;
    const photo = updateFormData.photo;

    if(photo != "") {
        var updateSQL = "UPDATE banner SET title=?, details=?, photo=? WHERE id=?";
        var updatedFields = [title, details, photo, id];
    }
    else {
        var updateSQL = "UPDATE banner SET title=?, details=? WHERE id=?";
        var updatedFields = [title, details, id];
    }

    return new Promise((resolve, reject) => {
        connection.query(updateSQL, updatedFields, (error, result) => {
            if(error) {
                return resolve({ err: error});
            }
        })
    });
}

async function destroy(id) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM banner WHERE id=?", [id], (error, result) => {
            if(error) {
                return resolve({ err: error});
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