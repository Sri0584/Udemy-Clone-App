import jwt from "jsonwebtoken";
const normalizeRole = (user) => {
    if (user.isAdmin || user.role === "admin") {
        return "admin";
    }
    if (user.role === "manager") {
        return "manager";
    }
    return "support";
};
const resolveUserRole = (user) => {
    if (user?.role) {
        return user.role;
    }
    return user?.isAdmin ? "admin" : "support";
};
export const sanitizeUser = (user) => {
    const role = resolveUserRole(user);
    const { password, refreshToken, ...safeUser } = user;
    return {
        ...safeUser,
        role,
        isAdmin: role === "admin",
    };
};
export const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
