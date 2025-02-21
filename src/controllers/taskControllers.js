import Task from "../models/Task.js"

//Obtener todas las tareas

export const getTasks = async (req, res) =>{
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch(error){
        res.status(500).json({error: "Error al obtener las tareas"});
    }
};


// Crear una nueva tarea
export const createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      const newTask = new Task({ title, description });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ error: "No se pudo crear la tarea" });
    }
  };

  // Actualizar una tarea
export const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar la tarea" });
    }
  };

  // Eliminar una tarea 
  export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);
        if(!deleteTask){
            return res.status(404).json({error: "Tarea no encontrada"})
        }
        res.json({message: "Tarea eliminada con exito"})
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar la tarea" });
    }
  }