import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by decoded ID and attach to request object
      req.user = await User.findById(decoded.id).select("-password"); // exclude password

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found." });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("❌ Auth error:", error);
      res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided." });
  }
};
