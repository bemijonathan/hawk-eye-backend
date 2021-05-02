import { crudControllers } from "../../utils/crud";
import { Report } from "./report.model";
import { Alert } from '../alerts/alert.model'
import { Logger } from "../../utils/logger";
import { F, s } from "../../utils/response";


export const controller = {
    async createReport(req, res) {
        try {
            const report = await Report.create({ ...req.body, userId: req.user._id })
            return s(res, 201, true, report, "success");
        } catch (err) {
            Logger.error(err)
            return F.serverError(res);
        }
    },

    async getReportStats(req, res) {
        try {
            const user = req.user
            const allreport = await Report.count({});
            const myreport = await Report.count({ userId: user._id })
            const myAlert = await Alert.count({ userId: user._id })

            return s(res, 200, true, { allreport, myreport, myAlert }, 'success')
        } catch (error) {
            Logger.error(error)
            return F.serverError(res);
        }
    },

    async getReports(req, res) {
        try {
            const user = req.user
            const myreport = await Report.find({ userId: user._id })
            return s(res, 200, true, { reports: myreport}, 'success')
        } catch (error) {
            Logger.error(error)
            return F.serverError(res);
        }
    }
}


export default crudControllers(Report)