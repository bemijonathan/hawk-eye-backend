import { F, s } from "./response"

export const getOne = model => async (req, res) => {
    try {
        const doc = await model
            .findOne({ userId: req.user._id, _id: req.params.id })
            .lean()
            .exec()

        if (!doc) {
            return F.notfound(res);
        }

       return s(res, 200, true, { ...doc }, "success")
    } catch (e) {
        console.error(e)
        return F.serverError(res);
    }
}

export const getMany = model => async (req, res) => {
    try {
        const docs = await model
            .find({ userId: req.user._id })
            .lean()
            .exec()

       return s(res, 200, true, [ ...docs ], "success")
    } catch (e) {
        console.error(e)
        return F.serverError(res);
    }
}

export const createOne = model => async (req, res) => {
    const userId = req.user._id
    try {
        const doc = await model.create({ ...req.body, userId })
        res.status(201).json({ ...doc })
    } catch (e) {
        console.error(e)
        return F.serverError(res);
    }
}

export const updateOne = model => async (req, res) => {
    try {
        const updatedDoc = await model
            .findOneAndUpdate(
                {
                    userId: req.user._id,
                    _id: req.params.id
                },
                req.body,
                { new: true }
            ).lean()
            .exec()
        if (!updatedDoc) {
            return F.notfound(res);
        }
       return s(res, 200, true, { ...updatedDoc }, "success")
    } catch (e) {
        console.error(e)
        return F.serverError(res);
    }
}

export const removeOne = model => async (req, res) => {
    try {
        const removed = await model.findOneAndRemove({
            userId: req.user._id,
            _id: req.params.id
        })

        if (!removed) {
            return F.notfound(res);
        }

        return s(res, 200, true, { ...removed }, "success")
    } catch (e) {
        console.error(e)
        return F.serverError(res);
    }
}

export const crudControllers = model => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model)
})