const mysql = require("mysql2");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

async function index() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcatproj ORDER BY catid DESC", [], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function show(categoryId, projectId) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcatproj WHERE catId=? AND projId=?", [categoryId, projectId], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function store(createFormData) {
    const catId = createFormData.catId;
    const projId = createFormData.projId;

    const existingRecord = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcatproj WHERE catId = ? AND projId = ?", [catId, projId], (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });

    // If a record already exists, return without creating a new one
    if (existingRecord.length > 0) {
        return { message: 'Duplicate entry exists' };
    }

    return await new Promise((resolve, reject) => {
        connection.query("INSERT INTO workcatproj (catId, projId) VALUES (?, ?)", [catId, projId], (error, result) => {
            if(error) {
                reject(error);
            }
        })
    });
}


async function updateForm(categoryId, projectId) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcatproj WHERE catId=? AND projId=?", [categoryId, projectId], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function update(updateFormData) {
    const oldcategoryId = updateFormData.OldcategoryId;
    const oldprojectId = updateFormData.OldprojectId;
    const newCategoryId = updateFormData.catId;
    const newprojectId = updateFormData.projId;
    
    const existingRecord = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcatproj WHERE catId = ? AND projId = ?", [newCategoryId, newprojectId], (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
    
    // If a record already exists, return without creating a new one
    if (existingRecord.length > 0) {
        return { message: 'Duplicate entry exists' };
    }
    
    var updateSQL = "UPDATE workcatproj SET catId=?, projId=? WHERE catId=? AND projId=?";
    var updatedFields = [newCategoryId, newprojectId, oldcategoryId, oldprojectId ];
    return new Promise((resolve, reject) => {
        connection.query(updateSQL, updatedFields, (error, result) => {
            if(error) {
                reject(error);
            }
        })
    });
}

async function destroy(categoryId, projectId) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM workcatproj WHERE catId=? AND projId=?", [categoryId, projectId], (error, result) => {
            if(error) {
                return reject({ err: error});
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