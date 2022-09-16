import { read } from "../utils/model.js";
import sha256 from "sha256";
import jwt from "../utils/jwt.js";

const userController = {
    LOGIN: (req, res) => {
        try {
          let { userName, password } = req.body;
          let users = read("users");
          let user = users.find( user => user.userName == userName && user.password == sha256(password) );
          
          if(!user){
            return res.status(401).send({
                status: 401,
                message: "password or login is incorrect",
              });
          }
          delete user.password
          return res.status(200).send({
            status: 200,
            message: "ok",
            data: user,
            token: jwt.sign({userId: user.userId})
          });
      
        } catch (error) {
          return new Error(error.message)
        }
      }
}

export default userController;
