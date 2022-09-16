import jwt from "../utils/jwt.js";

const tokenCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) {
      return next(new Error("required token!"));
    }
    let { userId } = jwt.verify(token);
    req.userId = userId
    return next();
  } catch (error) {
    return next(new Error(error.message))
  }
};
export default tokenCheck;