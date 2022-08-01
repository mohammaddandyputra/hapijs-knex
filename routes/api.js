const {
    getAllDataBarang,
    postBarang,
    updateBarang,
    getBarangById,
    deleteBarang
} = require("../src/controllers/barang")

const {
    login,
    register,
    updateRole,
    profileUser
} = require("../src/controllers/auth");

const {
    registerSchema,
    loginSchema,
    updateRoleSchema,
    createBarangSchema,
    updateBarangSchema
} = require('../helpers/validation_schema');

const routes = [
    
    {
        method: "POST",
        path: "/api/v1/login",
        handler: login,
        options: {
            auth: false,
            plugins: {
                hapiAclAuth: {
                    secure: false
                }
            },
            validate: {
                payload: loginSchema
            }
        },
    },
    {
        method: "POST",
        path: "/api/v1/register",
        handler: register,
        options: {
            auth: false,
            plugins: {
                hapiAclAuth: {
                    secure: false
                }
            },
            validate: {
                payload: registerSchema
            }
        }
    },
    {
        method: "POST",
        path: "/api/v1/update-role",
        handler: updateRole,
        options: {
            plugins: {
                hapiAclAuth: {
                    roles: ["ADMIN"]
                }
            },
            validate: {
                payload: updateRoleSchema
            }
        }
    },
    {
        method: "GET",
        path: "/api/v1/profile",
        handler: profileUser,
        options: {
            plugins: {
                hapiAclAuth: {
                    secure: false
                }
            },
        }
    },
    {
        method: "GET",
        path: "/api/v1/barang",
        handler: getAllDataBarang,
        options: {
            plugins: {
                hapiAclAuth: {
                    secure: false
                }
            }
        }
    },
    {
        method: "GET",
        path: "/api/v1/barang/{kode_barang}",
        handler: getBarangById,
        options: {
            plugins: {
                hapiAclAuth: {
                    secure: false
                }
            }
        }
    },
    {
        method: "POST",
        path: "/api/v1/barang",
        handler: postBarang,
        options: {
            plugins: {
                hapiAclAuth: {
                    roles: ['ADMIN']
                }
            },
            validate: {
                payload: createBarangSchema
            }
        }
    },
    {
        method: "PUT",
        path: "/api/v1/barang/{kode_barang}",
        handler: updateBarang,
        options: {
            plugins: {
                hapiAclAuth: {
                    roles: ['ADMIN']
                }
            },
            validate: {
                payload: updateBarangSchema
            }
        }
    },
    {
        method: "DELETE",
        path: "/api/v1/barang/{kode_barang}",
        handler: deleteBarang,
        options: {
            plugins: {
                hapiAclAuth: {
                    roles: ['ADMIN']
                }
            }
        }
    },
];

module.exports = { routes };