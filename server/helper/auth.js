import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const { verify } = jwt
const authorizationRequired = 'Authorization required!'
const invalidCredentials = "Incalid credentials!"

const auth = (req, res, next) => {
    if(!req.headers.authorization){
        res.statusMessage = authorizationRequired
        res.status(401).json({message: authorizationRequired})
    }else{
        try {
            const token = req.headers.authorization
            verify(token, process.env.JWT_SECRET_KEY)
            next()
        } catch (error) {
            res.statusMessage = invalidCredentials
            res.status(403).json({message: invalidCredentials})
        }
    }
}

export {auth}