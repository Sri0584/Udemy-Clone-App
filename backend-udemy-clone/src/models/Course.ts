import mongoose, { Schema } from "mongoose";

interface Topic {
	title: string;
	videoUrl: string;
}

interface Section {
	title: string;
	topics: Topic[];
}

export interface ICourse extends Document {
	title: string;
	description: string;
	price: number;
	instructor: string;
	sections: Section[];
}

const CourseSchema = new Schema<ICourse>({
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
					title: {
						type: String,
						required: true,
					},
					videoUrl: {
						type: String,
						required: true,
					},
				},
			],
		},
	],
});
export default mongoose.model<ICourse>("Course", CourseSchema);
