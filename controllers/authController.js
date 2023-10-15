import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";


const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields required!' });
    }
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser || !foundUser.active) {
        return res.status(402).json({ message: 'Unauthorized' });
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ message: 'Unauthorized' });

    const userData = await User.findOne({ username }).select('-password').exec();

    // const accessToken = jwt.sign(
    //     {
    //         "UserInfo": {
    //             "username": foundUser.username,
    //             "roles": foundUser.roles
    //         }
    //     },
    //     process.env.ACCESS_TOKEN_SECRET,
    //     { expiresIn: '1d' }
    // )
    const refreshToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // access only from web browser
        // secure: true, //https
        sameSite: 'None', //cross site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry to match rT
    })

    res.json({ refreshToken, userData });

});

// access token expired
const refresh = (req, res) => {
    const cookies = req.cookies;
    
    if (!cookies.jwt) return res.status(401).json({ message: 'Unauthorized' });
    const refreshToken = cookies.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden',err })
            
            const userData = await User.findOne({ username: decoded.UserInfo.username }).select('-password').exec();

            if (!userData) return res.status(401).json({ message: 'no user found' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": userData.username,
                        "roles": userData.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            res.json({ accessToken, userData })
        })
    )
}

const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

export default { login, refresh, logout }