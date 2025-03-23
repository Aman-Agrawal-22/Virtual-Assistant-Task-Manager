import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        summary: {
            type: String,
            trim: true, 
        },
        tasks: [
            {
                task: {
                    type: String,
                    required: [true, " Please give task description!"],
                    trim: true,
                },
                status: {
                    type: String,
                    enum: ["pending", "in-progress", "completed"],
                    lowercase: true,
                    default: "pending",
                },
                deadline: {
                    type: Date,
                },
            },
        ],
    },
    { timestamps: true } 
);

const Todo = mongoose.model("Todo", TodoSchema);  
export default Todo;
