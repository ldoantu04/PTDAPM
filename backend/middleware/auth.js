import jwt from "jsonwebtoken";
const autthUser = async (req, res, next) => {
    const {token} = req.headers;
    if (!token)

}
export default autthUser;