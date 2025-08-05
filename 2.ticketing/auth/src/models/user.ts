import mongoose from "mongoose";

interface IUser {
    email: string;
    password: string;
}

interface IUserDoc extends mongoose.Document {
    email: string;
    password: string;
}

interface IUserSchema extends mongoose.Model<IUserDoc> {
    build(data: IUser): IUserDoc;
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.statics.build = (data: IUser) => {
    return new User(data);
};

const User = mongoose.model<IUserDoc, IUserSchema>("User", userSchema);

export { User };
