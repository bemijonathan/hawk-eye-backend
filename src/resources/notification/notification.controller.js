import { Notification } from "../../services/notifications.service";
import { crudControllers } from "../../utils/crud";
import { messages } from "../../utils/data/messages";
import { Logger } from "../../utils/logger";
import { F, s } from "../../utils/response";
import { Category } from "../category/category.model";
import { Contact } from "../contacts/contacts.model";


export const controller = {
    async alertMany(req, res) {
        // only for family members 
        try {
            let contacts = await Contact.find({ userId: req.user._id });
            let category = await Category.findOne({ _id: req.params.id })

            const contactEmails = contacts.map(e => e.email)
            const contactPhones = contacts.map(e => e.phone)
            console.log('here')
            let text;

            if (contacts.length === 0) {
                Logger('no contact added')
                return F.notfound(res, 'No contact found')
            }
            if (!category) {
                console.log(req.user)
                text = messages.defaultSos(req.user, req.user.name, 'SOS')

                Notification.sendEmails('help', contactEmails, { ...req.user, category: category.title }).then()
                Notification.sendSMS(text, contactPhones, { ...req.user, category: category.title }).then();
                return s(res, 200, true, {}, 'Help is on the way')
            }
            Notification.sendEmails('help', contactEmails, { ...req.user, category: category.title }).then()
            Notification.sendSMS('help', contactPhones, { ...req.user, category: category.title }).then()
            return s(res, 200, true, {}, 'Help is on the way')
        } catch (err) {
            Logger.error(err)
            return F.serverError(res);
        }
    },
}


