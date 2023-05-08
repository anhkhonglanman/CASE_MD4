import jwt from 'jsonwebtoken'
export const SECRET = '123456'
export const auth = (req, res, next) => {
    let authorziation = req.headers.authorization
    if (authorziation) {
        let accessToken = req.headers.authorization.split(" ")[1];
        if (accessToken) {
            jwt.verify(accessToken, SECRET, (err, payload) => {
                if (err) {
                    res.status(401).json({
                        error: err.message,
                        message: "ban chua dang nhap"
                    })
                } else {
                    req.decode = payload;
                    return next();

                }
            })
        } else {
            res.status(401).json({
                message: "ban chua dang nhap"
            })
        }
    } else {
        res.status(401).json({
            message: "ban chua dang nhap"
        })
    }

}