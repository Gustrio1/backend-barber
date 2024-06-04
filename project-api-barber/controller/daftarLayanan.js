const database = require("../database");

exports.daftarLayanan = (req, res) => {
  const { nama_layanan, harga, gambar, keterangan } = req.body;

  const insertDaftarLayanan = `INSERT INTO daftar_layanan (nama_layanan, harga, gambar, keterangan) VALUES (?,?,?,?)`;
  database.query(
    insertDaftarLayanan,
    [nama_layanan, harga, gambar, keterangan],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Insert Daftar layanan ERROR" });
      }
      res.status(200).json({ message: "Insert Daftar Layanan berhasil" });
    }
  );
};
