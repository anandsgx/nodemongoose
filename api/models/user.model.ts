import mongoose, { Schema } from "mongoose";
import skillModel from './skill.model';

interface User {
    name: string,
    age: number,
    dob: Date,
    gender: string,
    email: string,
    profileImgUrl: string,
    skills: any[],
}

const userSchema = new Schema<User>({
    name: { type: String, required: false },
    age: { type: Number, required: false },
    dob: { type: Date, required: false },
    gender: { type: String, required: false },
    email: { type: String, required: false },
    profileImgUrl: { type: String, required: false },
    skills: [
        { type: Schema.Types.ObjectId, ref: 'skills', required: false },
    ]
}, { timestamps: true });

userSchema.pre('find', function(next) {
    if (true) {
      console.log('calling next!');
       next(); 
    //   will make sure the rest of this function doesn't run
    //   /* return */ next();
    }
    // Unless you comment out the `return` above, 'after next' will print
    console.log('after next');
});

const userModel = mongoose.model('users', userSchema, 'users');

export default userModel;