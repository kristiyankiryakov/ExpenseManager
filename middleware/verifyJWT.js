import jwt from "jsonwebtoken"

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const cookieToken = req.cookies.jwt;

    if (!authHeader?.startsWith('Bearer ') && !cookieToken) {
        return res.status(401).json({ message: req.headers })
    }

    const token = (authHeader && authHeader.split(' ')[1]) || cookieToken;

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' })
        req.user = decoded.UserInfo.username
        req.roles = decoded.UserInfo.roles
        next()
    }
    )
}

export default verifyJWT 