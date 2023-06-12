import  express from "express";
import { NewRegistration, updateAddress, updateNumber, updatePancard } from "../controllers/registerControllers.js";
import { pin_Authentication } from "../middlewares/pinAuthentication.js";



const router = express.Router();

router.post("/NewRegistration", NewRegistration);
router.post("/updateNumber",pin_Authentication, updateNumber);
router.post("/updateAddress",pin_Authentication, updateAddress);
router.post("/pin_Authentication", pin_Authentication);
router.post("/updatePancard",pin_Authentication, updatePancard);


export default router;