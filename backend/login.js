const express = require('express')
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const router = express.Router();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'okos_kozosseg'
})

const SECRET_KEY = 'your_secret_key';

// ---------------- LOGIN ----------------
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `
    SELECT 
    felhasznalo_nev, 
    felhasznalo_jelszo,
    rang_nev AS role,
    felhasznalo_id,
    felhasznalok_id,
    felhasznalok.profil_kesz
    FROM belepes
    inner join rang
    on felhasznalo_rang=rang_id
    INNER JOIN felhasznalok
    ON belepes.felhasznalo_id = felhasznalok.idegen_felhasznalo_id
    WHERE felhasznalo_nev = ?;
  `;

  pool.query(query, [username], (err, rows) => {
    if (err) {
      console.error('Adatbázis hiba:', err);
      return res.status(500).json({ message: 'Szerverhiba' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Felhasználó nem található' });
    }

    const hashedPassword = rows[0].felhasznalo_jelszo;

    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Hiba a jelszó ellenőrzésekor:', err);
        return res.status(500).json({ message: 'Szerverhiba' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Hibás jelszó' });
      }

      // TOKEN + ROLE
      const token = jwt.sign(
        {
          userid: rows[0].felhasznalo_id,
          belepUserid: rows[0].felhasznalok_id,
          username: rows[0].felhasznalo_nev,
          role: rows[0].role
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.json({
         token: token,
        role: rows[0].role,
        userid: rows[0].felhasznalo_id,
        belepUserid: rows[0].felhasznalok_id,
        username: rows[0].felhasznalo_nev,
        profil_kesz: rows[0].profil_kesz, 
      });
    });
  });
});

// ---------------- REGISTER ----------------
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Hiányzó felhasználónév vagy jelszó' });
  }

  pool.query(
    'SELECT * FROM belepes WHERE felhasznalo_nev = ?',
    [username],
    (err, rows) => {

      if (err) return res.status(500).json({ message: 'Szerverhiba' });

      if (rows.length > 0) {
        return res.status(409).json({ message: 'A felhasználónév már foglalt' });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {

        if (err) return res.status(500).json({ message: 'Hash hiba' });

        // 1️⃣ INSERT belepes
        const insertLogin =
          'INSERT INTO belepes (felhasznalo_nev, felhasznalo_jelszo, felhasznalo_rang) VALUES (?, ?, ?)';

        pool.query(insertLogin, [username, hashedPassword, 1], (err, result) => {

          if (err) {
            return res.status(500).json({ message: 'DB hiba' });
          }

          const ujFelhasznaloId = result.insertId;

          const insertUser =
            'INSERT INTO felhasznalok (felhasznalonev, idegen_felhasznalo_id, profil_kesz) VALUES (?, ?, 0)';

          pool.query(insertUser, [username, ujFelhasznaloId], (err2, result2) => {

            if (err2) {

              console.error(err2);

              // ⭐ rollback
              pool.query(
                'DELETE FROM belepes WHERE felhasznalo_id = ?',
                [ujFelhasznaloId]
              );

              return res.status(500).json({ message: 'Felhasználó mentési hiba' });
            }

            const ujUserId = result2.insertId;

          pool.query(
            'INSERT INTO felhasznalo_csoportok (felhasznalok_id, csoport_id, csatlakozva) VALUES (?, ?, CURRENT_TIMESTAMP)',
            [ujUserId, 1],
            (err3) => {
              if (err3) {
                console.error("Csoport csatlakozás hiba:", err3);
              }
            }
          );

           return res.status(201).json({
            message: "Sikeres regisztráció",
            user_id: ujUserId
          });
          });
        });
      });
    }
  );
});

module.exports = router;
