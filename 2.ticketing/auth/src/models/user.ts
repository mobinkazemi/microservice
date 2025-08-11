import mongoose from "mongoose";
import { Password } from "../services/password";

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
}, {
    toJSON: {
        transform(doc, ret: any) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v

        }
    }
});

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
        done()
    }
});
userSchema.statics.build = (data: IUser) => {
    return new User(data);
};

const User = mongoose.model<IUserDoc, IUserSchema>("User", userSchema);

export { User };
