import mongoose, { Mongoose, Schema } from 'mongoose';
import Errors from '../errors.enum';
import skillModel from '../models/skill.model';
import userModel from '../models/user.model';
import skillController from './skill.controller';

const userController = {
    getUser: async (req, res) => {
        const users = await userModel.find({});
        await res.status(200).send(users);
    },

    saveUser: async (req, res) => {
        try {
            const skills = [...req.body.skills];
            delete req.body.skills;
            const userCreated = await new userModel(req.body).save();
            console.log('user created: ', userCreated);

            skills.map(skill => skill.userId = userCreated._id);
            const skillsCreated = await skillController.saveSkills(req, res, skills);
            let ids = skillsCreated.map(e => e._id)

            await userModel.findByIdAndUpdate(userCreated._id, {
                $push: { skills: { $each: ids } }
            }, { new: true, useFindAndModify: false });

            const userWithSkills =  (await userModel.find({}).select('-_id').populate([{ path: 'skills', strictPopulate: false, select: '-userId'}]));
            res.status(200).send(userWithSkills);
        } catch (error) {
            res.status(500).send({ msg: Errors.NOT_CREATED + ` ${error}` });
        }
    },

    updateUser: async (req, res) => {
        const userModified = await userModel.findOneAndUpdate({ _id: req.body._id }, {name: req.body.name}, { new: true });
        await res.status(200).send({ data: userModified });
    },
    
    upsertUser: async (req, res) => {
        const userUpserted = await userModel.findOneAndUpdate({ name: req.body.name }, {age: req.body.age}, { upsert: true, new: true });
        await res.status(200).send({ data: userUpserted });
    },

}

export default userController;