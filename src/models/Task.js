import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "La tarea necesita un titulo"],
        },
        description: {
            type: String,
            required: [true, "La tarea necesita una descripcion"],
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, //agrega fecha de creacion y edicion automaticamente
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;