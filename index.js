const express = require('express');
const app = express();
const port = 3000;
const { nuevoCurso, getCursos, editCurso, deleteCurso } = require('./data/consultas')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


app.post("/curso", async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion);
    console.log('Curso creado:', respuesta);
    res.status(201).send(respuesta);
});


app.get("/cursos", async (req, res) => {
    const respuesta = await getCursos();
    res.status(200).send(respuesta);
});

app.put("/curso", async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    console.log(id, nombre, nivelTecnico, fechaInicio, duracion);
    const respuesta = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion);
    res.status(201).send(respuesta);
});

app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params;
    const respuesta = await deleteCurso(id);
    respuesta > 0
        ? res.send(`El curso de id ${id} fue eliminado con éxito`)
        : res.send("No existe un curso registrado con ese id");
});


app.listen(port, () => console.log('Iniciando en puerto: ' + port));


