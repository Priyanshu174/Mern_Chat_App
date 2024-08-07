import jwt from "jsonwebtoken";

export const verifyToken = async (req,res,next) => {
    const token = req.cookies.jwt;  
    console.log('Token from cookies:', token);
    if (!token) {
        return res.status(401).send("You are not authenticated")
    }
    jwt.verify(token, "secretchatjwtkey", async (err,payload)=> {
        if(err) {
            return res.status(403).send("Token is not valid, please login again!")
        }
        req.userId = payload.userId;
        next();
    })
}