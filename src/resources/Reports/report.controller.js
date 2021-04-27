import { crudControllers } from "../../utils/crud";
import { Report } from "./report.model";


export const controller = {
    async createReport(req, res) {
        try {
            const { image, video, sound, body, police, ngo } = req.body;
            Notification.sendEmails(ngo, { video, image, sound }, body, title).then();
            Notification.sendSMS(police, { video, image, sound }, body, title).then();
            const report = await Report.create({ police, ngo, video, image, sound, userId: req.user.id, title })
            return s(res, 201, true, report, "success");
        } catch (err) {
            Logger.error(err)
            return F.serverError(res);
        }
    }
}


export default crudControllers(Post)