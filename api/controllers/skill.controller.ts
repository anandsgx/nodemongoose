import Errors from '../errors.enum';
import skillModel from '../models/skill.model';

const skillController = {
    // getUser: async (req, res) => {
    //     const skills = await skillModel.find({});
    //     await res.status(200).send(skills);
    // },

    saveSkills: async (req: any, res: any, skills: any[]) => {
        try {
            const skillsCreated = await skillModel.insertMany(skills);
            return skillsCreated;
        } catch (error) {
            res.status(500).send({ msg: Errors.NOT_CREATED + 'skills' });
        }
        
        // await res.status(200).send({data: skillsCreated });
    },

    // updateUser: async (req, res) => {
    //     console.log(req.body);
    //     const userModified = await userModel.findOneAndUpdate({"_id": "64c685cc1772b267dd25d362"}, req.body, {new: true});
    //     await res.status(200).send({data: userModified });
    // },

}

export default skillController;