import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tasks: {
        type: [{
            title: {
                type: String,
                require: true
            },
            description: {
                type: String,
                require: true
            },
            startTime: {
                type: Date,
                require: true
            },
            endTime: {
                type: Date,
                require: true
            },
            completed: {
                type: Boolean,
                default: false
              }
        }],
        default: []
    }
});

export default projectSchema;