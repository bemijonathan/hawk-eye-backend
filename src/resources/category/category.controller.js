import { crudControllers } from "../../utils/crud";
import { Logger } from "../../utils/logger";
import { F, s } from "../../utils/response";
import { Category } from "./category.model";

export const controller = {
    async getAll(req, res) {
        try {
            const categories = await Category.find({}).lean();
            return s(res, 200, true, categories, "success")
        } catch (error) {
            Logger.error(error)
            return F.serverError(res)
        }

    },

    async create(req, res) {
        try {
            const categories = await Category.find();
            const existingCategory = categories.find(e => e.title === req.body.title)
            if(existingCategory) return F.alreadyExists(res);
            const category = await Category.create({ ...req.body, slug: req.body.title.replace(/ /g, '_') });
            return s(res, 200, true, category, "success")
        } catch (error) {
            Logger.error(error)
            return F.serverError(res)
        }
    }
}

export default crudControllers(Category)