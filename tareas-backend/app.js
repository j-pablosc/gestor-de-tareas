require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

const { PORT, HOST, MONGO_URI } = process.env;
console.log(PORT, HOST, MONGO_URI);

// Conectar a la base de datos MongoDB

mongoose
    .connect(MONGO_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log(`Conexión exitosa a la base de datos: ${HOST}:${PORT}`);
    })
    .catch((error) => {
      console.log("Error al conectar a la base de datos: " + error);
    });



// Crear el modelo de tarea
const Tarea = mongoose.model("Tarea", {
  titulo: String,
  descripcion: String,
  completada: Boolean,
});


// Configurar body-parser para analizar los datos POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definir las rutas
app.get("/tasks", async (req, res) => {
  try{
  // Obtener todas las tareas de la base de datos
  const tareas = await Tarea.find();
  res.send(tareas);
  }catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  try{
  // Crear una nueva tarea en la base de datos
  const tarea = new Tarea({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    completada: false,
  });
  await tarea.save();
  res.send(tarea);
}catch (error) {
  res.status(400).json({ ok: false, message: error.message });
}
});

app.put("/tasks/:id", async (req, res) => {
  try{
  // Actualizar una tarea existente en la base de datos
  const tarea = await Tarea.findById(req.params.id);
  tarea.titulo = req.body.titulo;
  tarea.descripcion = req.body.descripcion;
  tarea.completada = req.body.completada;
  await tarea.save();
  res.send(tarea);
}catch (error) {
  res.status(400).json({ ok: false, message: error.message });
}
});

app.delete("/tasks/:id", async (req, res) => {
  try{
  // Eliminar una tarea existente de la base de datos
  await Tarea.findByIdAndDelete(req.params.id);
  res.send("Tarea eliminada");
}catch (error) {
  res.status(400).json({ ok: false, message: error.message });
}
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log(`Base de datos funcionando: ${HOST}:${PORT}`);
});
