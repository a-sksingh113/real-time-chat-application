import jwt from 'jsonwebtoken';
const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"user not authenticated"});
    }
    const decode =  jwt.verify(token,process.env.SECRET_KEY);
    console.log(decode);
    if(!decode){
        return res.status(401).json({message:"invalid token"});
    }
    req.id=decode.userId;
    next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;