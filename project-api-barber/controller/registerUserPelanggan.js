const database = require("../database");
//const { use } = require("../router/routerRegisterLogin");

exports.registerUserPelanggan = (req, res) => {
  const { nama, nomor_hp, email, password_baru, konfirmasi_password } =
    req.body;

  if (password_baru !== konfirmasi_password) {
    console.log(res);
    return res.status(400).json({ message: "Password tidak cocok" });
  }

  const register = `INSERT INTO userpelangan (nama, nomor_hp, email, password_baru, konfirmasi_password) VALUES (?, ?, ?, ?, ?)`;
  database.query(
    register,
    [nama, nomor_hp, email, password_baru, konfirmasi_password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "insert register error" });
      }

      const id_pelanggan = result.insertId;

      const insertLogin = `INSERT INTO loginpelanggan (id_pelangan, nama_pengguna, password) VALUES (?, ?, ?)`;
      database.query(
        insertLogin,
        [id_pelanggan, nama, password_baru],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: "insert login error" });
          }
          res.status(200).json({ message: "Register Login berhasil" });
        }
      );
    }
  );
};

exports.loginPelanggan = (req, res) => {
  const { nama_pengguna, password } = req.body;

  const selectLogin = `SELECT * FROM loginpelanggan WHERE nama_pengguna = ? AND password = ?`;
  database.query(selectLogin, [nama_pengguna, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "error login", error: err });
    }
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: "Nama pengguna atau password salah" });
    }

    const id_pelangan = result.id_pelangan;

    const selectRegister = `SELECT * FROM userpelangan WHERE id_pelangan = ?`;
    database.query(selectRegister, [id_pelangan], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: " Error select register pelanggan" });
      }

      const user = result[0];
      res.status(200).json({
        message: "Login Berhasil",
        user: user,
        nama_pengguna: nama_pengguna,
        password: password,
      });
    });
  });
};
