import mongoose, { Schema } from "mongoose";
const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    sections: [
        {
            title: {
                type: String,
                required: true,
            },
            topics: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
});
export default mongoose.model("Course", CourseSchema);
