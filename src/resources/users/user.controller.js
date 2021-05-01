import { crudControllers } from "../../utils/crud";
import { Logger } from "../../utils/logger";
import { F, s } from "../../utils/response";
import { User } from "./user.model";
import {Contact} from '../contacts/contacts.model'


export const controller = {

    async patchLocation(req, res) {
        try {
            const { latitude, longitude } = req.body;
            const details = await User.findOneAndUpdate({ _id: req.user._id }, { latitude, longitude }, { new: true });
            s(res, 200, true, null, "successfully updated Location");
        } catch (error) {
            Logger.error(error)
            F.serverError(res)
        }
    },

    async getUSerDetails(req, res) {
        const user = req.user;
        const contacts = await Contact.find({userId: req.user._id})
        delete user.password;
        delete user.token 
        console.log(contacts)
        user.contacts = contacts
       return s(res, 200, true, user, 'success')
    }

}


