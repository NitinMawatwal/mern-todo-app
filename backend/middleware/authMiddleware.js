import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.id;
        next();

    } catch (e) {
        return res.json({ success: false, message: "invalid or expired token" });
    }
};

export default authMiddleware;