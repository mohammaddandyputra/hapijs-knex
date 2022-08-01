/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const barang = [
    {
      kode_barang: 1,
      nama_barang: 'Rinso',
      stok: 10
    },
    {
      kode_barang: 2,
      nama_barang: 'Daia',
      stok: 5
    },
    {
      kode_barang: 3,
      nama_barang: 'Jazz 1',
      stok: 8
    },
  ]

  await knex('barang').insert(barang);
};
