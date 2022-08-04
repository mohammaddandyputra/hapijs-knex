const knex = require("../../../config/knex");

const getAllDataBarang = async(request, h) => {

    const result = await knex.select('*').from('barang').then((res) => {
        return res
    })

    const response = h.response({
        status: "success",
        data: result
    }).code(201)

    return response
}

const getBarangById = async(request, h) => {

    const {kode_barang} = request.params
    
    const result = await knex('barang')
                        .where({ kode_barang: Number(kode_barang) })
                        .returning("*")
                        .then((res) => {
                            const response = h.response({
                                status: "success",
                                data: res
                            }).code(201)

                            return response
                        })

    return result

}

const postBarang = async(request, h) => {

    const nama_barang = request.payload.nama_barang
    const stok = request.payload.stok

    const result = await knex.insert({
                                nama_barang: nama_barang,
                                stok: stok
                            }).into('barang').returning("*")
                            .then((res) => {
                                const response = h.response({
                                    status: "success",
                                    data: res,
                                    message: "Insert successfully"
                                }).code(201)

                                return response
                            })

    return result
}

const updateBarang = (request, h) => {
    const {kode_barang} = request.params

    const nama_barang = request.payload.nama_barang
    const stok = request.payload.stok

    const result = knex('barang')
                        .where({ kode_barang: Number(kode_barang) })
                        .update({
                            nama_barang: nama_barang,
                            stok: stok
                        })
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

const deleteBarang = async(request, h) => {
    const {kode_barang} = request.params

    const result = await knex('barang')
                        .where({kode_barang})
                        .del()
                        .then((res) => {
                            const response = h.response({
                                status: "success",
                                message: "Delete successfully"
                            }).code(200)

                            return response
                        })
    
    return result
}

module.exports = {
    getAllDataBarang,
    postBarang,
    updateBarang,
    getBarangById,
    deleteBarang
}