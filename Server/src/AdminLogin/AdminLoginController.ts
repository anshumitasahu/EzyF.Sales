import type { Request, Response } from "express";

const AdminLogin = async (req: Request, res: Response) => {
    try {
        const admin_email = "admin@email.com";
        const admin_password = "admin12?";

        const { email, password } = req.body;

        if (admin_email != email || admin_password != password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password or email",
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            message: "login successful"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server side error"
        })
    }
}

export { AdminLogin };