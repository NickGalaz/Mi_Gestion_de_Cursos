const PoolSingleton = require('./pool')

const pool = PoolSingleton.getConnection();


const nuevoCurso = async (nombre, nivel, fecha, duracion) => {
    try {
        const insert = "INSERT INTO curso (nombre, nivel, fecha, duracion) VALUES ($1, $2, $3, $4) RETURNING *";
        const params = [nombre, nivel, fecha, duracion];
        const consulta = {
            text: insert,
            values: params
        };
        const res = await pool.query(consulta);
        return res.rows
    } catch (e) {
        return e;
    }
}

const getCursos = async () => {
    try {
        const insert = "SELECT id, nombre, nivel, to_char(fecha,'DD/MM/YYYY') AS fecha, duracion FROM curso ORDER BY id ASC";
        const consulta = {
            text: insert,
        };
        const res = await pool.query(consulta);
        return res.rows
    } catch (e) {
        return e;
    }
}

const editCurso = async (id, nuevoNombre, nuevoNivel, nuevaFecha, nuevaDuracion) => {
    try {
        const insert = "UPDATE curso SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *";
        const params = [id, nuevoNombre, nuevoNivel, nuevaFecha, nuevaDuracion];
        const consulta = {
            text: insert,
            values: params
        };
        const res = await pool.query(consulta);
        return res.rows
    } catch (e) {
        console.log(e);
    }
}


async function deleteCurso(id) {
    try {
        const insert = 'DELETE FROM curso WHERE id = $1';
        const params = [id];
        const consulta = {
            text: insert,
            values: params
        };
        const res = await pool.query(consulta);
        return res.rowCount;
    } catch (e) {
        return e;
    }
}


module.exports = { nuevoCurso, getCursos, editCurso, deleteCurso }