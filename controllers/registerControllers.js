import Users from "../models/register.js"
import encrypt from 'encryptjs';

export const NewRegistration = async (req, res) => {
    try {
        const { email, password, confirmpassword, pin, number, address, pancard } = req.body;
        if (!email) return res.send("email is require");
        if (!password) return res.send("password is require");
        if (!confirmpassword) return res.send("confirmpassword is require");
        if (!pin) return res.send("pin is require");
        if (!number) return res.send("number is require");
        if (!address) return res.send("address is require");
        if (!pancard) return res.send("pancard is require");

        if (password != confirmpassword) return res.send("password not matched");

        const response = await Users.find({ email }).exec();
        if (response.length) return res.send("user alraedy register");

        let secretkey = 'vrushabh';
        let plaintextForPassword = password;
        let plaintextForPin = pin;

        const ciphertextForPassword = encrypt.encrypt(plaintextForPassword, secretkey, 256);

        const ciphertextForPin = encrypt.encrypt(plaintextForPin, secretkey, 256);


        const user = new Users({
            number: number,
            email: email,
            pin: ciphertextForPin,
            password: ciphertextForPassword,
            confirmpassword: confirmpassword,
            address: address,
            pancard: pancard
        });
        await user.save();
        return res.send("registration success");

    } catch (err) {
        return res.send(err);
    }
}

export const updateNumber = async (req, res) => {
    try {
        const { id, number } = req.body;

        const response = await Users.findOneAndUpdate({ _id: id }, { number: number }).exec();

         return res.send("number updated successfully");
    } catch (err) {
        return res.send(err);
    }
}

export const updateAddress = async (req, res) => {
    try {
        const { id, address } = req.body;

        const response = await Users.findOneAndUpdate({ _id: id }, { address: address }).exec();

         return res.send("address updated successfully");
    } catch (err) {
        return res.send(err);
    }
}

export const updatePancard = async (req, res) => {
    try{
        const  { id, pancard} = req.body;

        const response = await Users.findOneAndUpdate({_id:id}, {pancard:pancard}).exec();
         
        return res.send( "pancard update successfull" );
        
    }catch(err){
        return res.send(err);
    }
}