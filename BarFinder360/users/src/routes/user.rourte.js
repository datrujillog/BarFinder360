import express from "express";

import UserService from "../services/users.js";

const router = express.Router();

// INSTANCIAMOS LA CLASE UserService
const userServ = new UserService();

router.get("/ejemplo", async (req, res, next) => {
    res.status(200).json({ message: "Hola mundo" });
    
});

router.post("/create", async (req, res, next) => {
    const body = req.body;
    const response = await userServ.createUser(body);
    response.success
        ? authResponse(res, 201, true, "User created", {
            payload: response,
            token: response.token,
        })
        : errorResponse(res, response.error);
});

router.post("/createRole", async (req, res, next) => {
    const body = req.body;
    const response = await userServ.createRole(body);
    response.success
        ? authResponse(res, 201, true, "Role created", {
            payload: response,
            token: response.token,
        })
        : errorResponse(res, response.error);
});

router.get("/",  async (req, res, next) => {
    const body = req.body;
    const results = await userServ.getAllUsers(body);
    if (!results.success) return res.status(404).json({ error: results.error });
    return res.status(200).json({ results});
});



router.get("/:id", async (req, res, next) => {
    const userId = req.params.id;
    const response = await userServ.getUserById(userId);
    const token = req.headers.authorization.split(" ")[1];

    response.success
        ? authResponse(res, 200, true, "user found", {
            payload: response,
            token: token,
        })
        : errorResponse(res, response.error);
});

router.put("/:id", async (req, res, next) => {
    const userId = req.params.id;
    const body = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const response = await userServ.updateUser(userId, body, token);
    response.success
        ? authResponse(res, 200, true, "User ", {
            payload: response,
            token: token,
        })
        : errorResponse(res, response.error);
});

router.delete("/:id", async (req, res, next) => {
    const userId = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const response = await userServ.deleteUser(userId, token);
    response.success
        ? authResponse(res, 201, true, "User deleted", {
            payload: response,
            token: token,
        })
        : errorResponse(res, response.error);
});

export default router;
