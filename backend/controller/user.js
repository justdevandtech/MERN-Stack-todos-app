import usersModel from "../model/user.js";

export const getUsers = async (req, res) => {
    const { name, email, password } = req.body;
    const users = await usersModel.findOne({ email });
    if(users){
        return res.status(400).json({
            message: "User already exists"
        })
    }
    try {
        const newUser = new usersModel({
          name,
          email,
          password,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    };

    //auth user
    export const authUser = async (req, res) => {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email });
        if(!user){
            return res.status(400).json({
                message: "User does not exist"
            })
        }
        try {
            const isMatch = await user.comparePassword(password);
            if(isMatch){
                const token = user.generateToken();
                res.status(200).json({
                    message: "User authenticated successfully",
                    token
                })
            }else{
                res.status(400).json({
                    message: "Invalid credentials"
                })
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };



