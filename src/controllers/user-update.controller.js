import User from "../models/User.js";

const userUpdateController = async (req, res) => {

    if(req.body.password || req.body._id || req.body.email){
        return res
            .status(400)
            .json({
                code: 103,
                message: "Parameter password, _id, and email can't update",
                success: false
            })
    }

    const result = await User.updateOne(
        { _id: req.user._id },
        req.body
    )

    res.json({
        message: `${result.modifiedCount} user modified successfully`,
        success: true
    });
}

export default userUpdateController;