import express from 'express';
import userController from '../controllers/user.controller';
const router = express.Router();

const userRoutes = (() => {

    router.get("/users", userController.getUser);

    router.post("/saveUser", userController.saveUser);

    router.post("/updateUser", userController.updateUser);

    return router;
})();

export default userRoutes;