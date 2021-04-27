import { crudControllers } from "../../utils/crud";
import { Logger } from "../../utils/logger";
import { F, s } from "../../utils/response";
import { Contact } from "./contacts.model";


export const controller = {
    async createMany(req, res) {
        try {
            let contacts = await Contact.find({ userId: req.user._id })
            if (contacts.length === 0) {
                let data = req.body
                data = data.map(element => {
                    element.userId = req.user._id
                    return element
                });
                contacts = Contact.insertMany(data)
                return s(res, 201, true, data, "created")
            }
            return F.clientError(res, "failed to add contacts")
        } catch (err) {
            Logger.error(err)
            return F.serverError(res);
        }
    },

    async createOne(req, res) {
        try {
            const { email, phone, name } = req.body;
            let contacts = await Contact.find({ userId: req.user._id })
            
            const existingContacts = contacts.find(e => {
                if (e.phone === phone) {
                    return e
                }else if (e.email === email) {
                    return e
                }
            });
            console.log(existingContacts)
            if (existingContacts) {
                return F.alreadyExists(res);
            }
            const contact = await Contact.create({ ...req.body, userId: req.user._id });
            return s(res, 201, true, contact, "success");
        } catch (err) {
            Logger.error(err)
            return F.serverError(res);
        }
    }
}


export default crudControllers(Contact)


