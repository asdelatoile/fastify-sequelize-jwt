module.exports = function (fastify, opts, done) {

    fastify.route({
        method: 'GET',
        url: '/',
        handler: async function (request, reply) {
            reply.code(200).send({ "hello": "Yes" })
        }
    })
    fastify.route({
        method: 'GET',
        url: '/me',
        preValidation: [fastify.retrieveToken, fastify.retrieveUser],
        handler: function (request, reply) {
            reply.code(200).send({ "user": request.user })
        }
    })

    fastify.post('/login', async (request, reply) => {
        const { email, password } = request.body;
        const { User } = fastify.sequelize;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return reply.status(401).send({ error: 'User not found.' });
        }
        if (!(await user.checkPassword(password))) {
            return reply.status(401).send({ error: 'Password does not match.' });
        }
        const { id, name } = user;
        const token = await fastify.generateToken({ id });
        return reply.send({
            user: {
                id,
                name,
                email,
            },
            token
        });
    })

    fastify.route({
        method: 'POST',
        url: '/register',
        handler: async function (request, reply) {
            const { User } = fastify.sequelize;
            const { body } = request;
            const userExists = await User.findOne({ where: { email: body.email } });
            if (userExists) {
                reply.code(400).send({ error: 'User alredy exists' })
            }
            const user = await User.create(body);
            reply.code(201).send(user)
        },
        schema: {
            body: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    email: { type: 'string' },
                    name: { type: 'string' },
                    password: { type: 'string' }
                }
            }
        },
    })
    done()
}