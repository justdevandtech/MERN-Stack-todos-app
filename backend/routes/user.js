import express  from "express";
const router = express.Router();

import { getUsers } from "../controller/user.js";

router.post("/", getUsers);

export default router;