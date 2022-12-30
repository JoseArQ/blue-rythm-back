import User from "../models/User.js";

const userDeleteController = async (req, res) => {

    const result = await User.deleteOne({ _id: req.user._id });

    res.json({
        message: `${result.deletedCount} user removed successfully`,
        success: true
    });
}

export default userDeleteController;