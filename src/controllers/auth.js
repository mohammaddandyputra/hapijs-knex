require('dotenv').config()
const knex = require("../../config/knex");
const JWT = require("jsonwebtoken")
const {compare, hashSync} = require('bcrypt');

const login = async (request, h) => {
    const {username, password} = request.payload;
    
    const getUser = await knex("users").where({ username }).then( async(res) => {
        const user = res.find(({ username }) => username === username)
        
        if(!user){
            const response = h.response({
                status: "error",
                message: "Username not found",
            }).code(401);

            return response
        }
        else{
            const passwordHash = res[0].password
            const comparePassword = await compare(password, passwordHash)
            
            if(!comparePassword){
                const response = h.response({
                    status: "error",
                    message: "Password incorrect",
                }).code(401);
                
                return response;
            }
            else{
                const token = JWT.sign({ 
                                id: user.id,
                                username: user.username,
                                role: user.role
                            }, process.env.SECRET_KEY, { expiresIn: '1h' });

                const response = h.response({
                    status: "success",
                    message: "Login successfully",
                    data: {
                        user,
                        token
                    }
                }).code(200).header("Authorization", `Bearer ${token}`)
                
                return response;
            } 
        }
    });

    return getUser;
}

const register = async (request, h) => {
    const username = request.payload.username
    const password = request.payload.password

    const findUsername = await knex("users").where({ username: username }).then(async(res) => {
        const checkUsername = res.find(({ username }) => username === username)

        if(checkUsername){
            const response = h.response({
                                        status: "error",
                                        message: "Username already exists"
                                    }).code(409);

            return response
        }
        
        const result = await knex.insert([{
                            username: username,
                            password: hashSync(password, 10),
                            role: "USER"
                }]).into('users')
                .returning("*")
                .then((res) => {
                    const response = h.response({
                        status: "success",
                        data: res,
                        message: "Insert successfully"
                    }).code(201)
                    return response
                })
                
        return result
        
    })

    return findUsername
}

const updateRole = async(request, h) => {
    const username = request.payload.username
    const role = request.payload.role

    const result = await knex('users')
                        .where({ username: username })
                        .update({role: role})
                        .returning("*")
                        .then((res) => {
                            const response = h.response({
                                status: "success",
                                data: res,
                                message: "Updated successfully"
                            }).code(200)

                            return response
                        })

    return result
}

const profileUser = async(request, h) => {
    const token = request.headers.authorization.split(' ');

    const result = JWT.decode(token[1]);
    
    const response = h.response({
        status: "success",
        data : result
    }).code(200)

    return response
}

module.exports = {
    login,
    register,
    updateRole,
    profileUser
}
