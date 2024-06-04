const database = require("../database");

exports.registerUserBarber = (req, res) => {
  const { nama, nomor_hp, gmail, password_barber, konfirmasi_password } =
    req.body;

  if (password_barber !== konfirmasi_password) {
    return res.status(400).json({ message: "password tidak cocok" });
  }

  const insertRegisterUserBarber = `INSERT INTO userbarber (nama, nomor_hp, gmail, password_barber, konfirmasi_password) VALUES (?, ?, ?, ?, ?)`;
  database.query(
    insertRegisterUserBarber,
    [nama, nomor_hp, gmail, password_barber, konfirmasi_password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error register", error: err });
      }

      const id_barber = result.insertId;

      const loginPost = `INSERT INTO loginbarber (id_barber, nama_pengguna, password) VALUES (?, ?, ?)`;
      database.query(loginPost, [id_barber, nama, password_barber], err => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Error creating login", error: err });
        }
        res.status(200).json({ message: "User Register berhasil" });
      });
    }
  );
};

exports.login = (req, res) => {
  const { nama_pengguna, password } = req.body;

  const selectLogin = `SELECT * FROM loginbarber WHERE nama_pengguna = ? AND password = ?`;
  database.query(selectLogin, [nama_pengguna, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error login", error: err });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: "Nama atau password salah" });
    }

    const id_barber = results.id_barber;

    const selectRegister = `SELECT * FROM userbarber WHERE id_barber = ?`;
    database.query(selectRegister, [id_barber], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error retrieving user data", error: err });
      }

      const user = results[0];
      res.status(200).json({
        message: "Login berhasil",
        user: user,
        nama_pengguna: nama_pengguna,
        password: password,
      });
    });
  });
};
