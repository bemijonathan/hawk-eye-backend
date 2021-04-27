import { User } from "../resources/users/user.model";

class Location {

    static async getLocation() {

    }


    static async findUsersAround(latitude, longitude) {
        let users = await User.find().where('latitude').gte(latitude + 2).lte(latitude - 1)
        users.concat(await User.find().where('longitude').gte(longitude + 2).lte(longitude - 1))
        return users
    }


}