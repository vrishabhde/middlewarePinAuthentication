import Users from "../models/register.js"
import encrypt from 'encryptjs';

export const pin_Authentication = async (req, res, next) => {
    try {
        const { id, pin } = req.body;
        if (!id) return res.send("id is require");
        if (!pin) return res.send("pin is require");

        const response = await Users.find({ _id: id }).exec();

        // console.log(response);
        if (!response.length) return res.send("user not found");

        let secretkey = 'vrushabh';

        const decipherForPin = encrypt.decrypt(response[0].pin, secretkey, 256);
        // console.log(decipherForPin);
        if(decipherForPin != pin) return res.send("incorrect pin");

        next();
    } catch (error) {
        res.send(error);
    }
}