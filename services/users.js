const fp = require("fastify-plugin")

module.exports = fp(async function (fastify, opts) {

    const getUserByEmail = async function (email) {
        const { User } = fastify.sequelize;
        return await User.findOne({
            where: { email }
        })
    }
    const getUserByEmailWithRoles = async function (email) {
        const { User } = fastify.sequelize;
        return await User.findOne({
            where: { email },
            include: [
                {
                    association: 'roles',
                    attributes: ['name'],
                    required: false,
                    through: {
                        attributes: []
                    }
                }
            ]
        });
    }
    const createUser = async function (payload) {
        const { User } = fastify.sequelize;
        return await User.create(payload);
    }
    const checkPassword = async function (user, password) {
        return await user.checkPassword(password)
    }


    fastify.decorate("userService", {
        getUserByEmail,
        getUserByEmailWithRoles,
        checkPassword,
        createUser
    })



})