import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    const token = authHeader.split(" ")[1]; // extract token after "Bearer "

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // inject userId into req.body
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;
