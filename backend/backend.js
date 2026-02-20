const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek",express.static("kepek"))
app.use("/kepekFelhasznalo",express.static("kepekFelhasznalo"))
app.use("/bejegyzesKepek",express.static("bejegyzesKepek"))

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'okos_kozosseg'
        })

// biztosítsuk, hogy létezzen a mappa
const UPLOAD_DIR = path.join(__dirname, "kepek");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// multer beállítás: kepek almappába ment, egyedi fájlnév
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^\w\-]+/g, "_")
      .slice(0, 50);

    const unique = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}_${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ok = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
    file.mimetype
  );
  cb(ok ? null : new Error("Csak képfájl tölthető fel!"), ok);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
// const formatDate = (mysqlDate) => {
//   return mysqlDate.split("T")[0]; // "2025-11-17"
// }; {formatDate(elem.letrehozva)} 
const login = require('./login');
app.use('/login', login);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Bence végpontjai---------------------------------------------------------------------



//Bence végpontjai
app.get('/felhasznaloim', (req, res) => {
        const sql=`SELECT * from felhasznalok`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})

app.post('/bejegyzesekKeresId', (req, res) => {
        const {bejegyzesek_id} =req.body
        const sql=`
                select *
                from bejegyzesek
                inner join felhasznalok
                on felhasznalo_id=felhasznalok_id
                where bejegyzesek_id=?
                `
        pool.query(sql,[bejegyzesek_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
app.get('/bejegyEsFelh', (req, res) => {
        const sql=`SELECT 
        *
        from bejegyzesek 
        inner JOIN felhasznalok 
        on bejegyzesek.felhasznalo_id = felhasznalok.felhasznalok_id
        INNER JOIN bejegyzesek_kategoria
        ON bejegyzesek_kategoria.kategoria_id = bejegyzesek.kategoria
        INNER JOIN telepules
        ON telepules.telepules_id = bejegyzesek.helyszin
        
        Where bejegyzesek.csoport_id = 1;
`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
app.post('/bejegyEsFelhKategoria', (req, res) => {
        const {kategoria_id} =req.body
        const sql=`
                SELECT 
        *
        from bejegyzesek 
        inner JOIN felhasznalok 
        on bejegyzesek.felhasznalo_id = felhasznalok.felhasznalok_id
        INNER JOIN bejegyzesek_kategoria
        ON bejegyzesek_kategoria.kategoria_id = bejegyzesek.kategoria
        INNER JOIN telepules
        ON telepules.telepules_id = bejegyzesek.helyszin
        
        Where bejegyzesek.csoport_id = 1 and kategoria_id = ?;
                `
        pool.query(sql,[kategoria_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        

        return res.status(200).json(result)
        })
})
//Komment Keres Bejegyzes Id Alapjan
app.post('/kommentKeresBejegyId', (req, res) => {
        const {bejegyzesek_id} =req.body
        const sql=`
                select *
from felhasznalok
INNER JOIN hozzaszolasok
ON hozzaszolasok.felhasznalo_id =felhasznalok.felhasznalok_id
where hozzaszolasok.bejegyzes_id=?
Order by hozzaszolasok_id;
                `
        pool.query(sql,[bejegyzesek_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
//Poszt felvitele
app.post('/posztFelvitel', (req, res) => {
        const {cim,tartalom,kep_url_helyszin,letrehozva} =req.body
        const sql=`insert into bejegyzesek values (null,?,?,?,?,?)`
        pool.query(sql,[cim,tartalom,kep_url_helyszin,letrehozva], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        
        return res.status(200).json({message:"Sikeres felvitel"})
        })
})

//hozzaszolas felvitele 
app.post('/hozzaszolasFelv', (req, res) => {
        const {bejegyzes_id,felhasznalo_id,hozzaszolas_szoveg,letrehozva} =req.body
        const sql=`insert into hozzaszolasok values (null,?,?,?,?)`
        pool.query(sql,[bejegyzes_id,felhasznalo_id,hozzaszolas_szoveg,letrehozva], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
            return res.status(200).json({message:"Sikeres felvitel"})
        })
})
//Csoport megjenítése user_id alapján
app.get('/csoportjaim/:user_id', (req, res) => {
        const {user_id} =req.params //felhasznalo user_id
        
        const sql=`
            SELECT * 
            FROM belepes
            INNER JOIN felhasznalok
            on felhasznalok.idegen_felhasznalo_id = belepes.felhasznalo_id
            INNER JOIN felhasznalo_csoportok
            ON felhasznalo_csoportok.felhasznalok_id = felhasznalok.felhasznalok_id
            INNER JOIN csoportok
            ON csoportok.csoport_id = felhasznalo_csoportok.csoport_id
            Where ? = belepes.felhasznalo_id
            ORDER BY felhasznalo_csoportok.csatlakozva;
                `
        pool.query(sql,[user_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
//Azok a csoportok lekérdezése amelyekben a felhasználó nincs bejelenkezve.
app.get('/csoportjaimNem/:user_id', (req, res) => {
        const {user_id} =req.params //belep user_id
        
        const sql=`
            SELECT * FROM csoportok WHERE csoportok.csoport_id not IN (SELECT csoportok.csoport_id
            FROM belepes
            INNER JOIN felhasznalok
            on felhasznalok.idegen_felhasznalo_id = belepes.felhasznalo_id
            INNER JOIN felhasznalo_csoportok
            ON felhasznalo_csoportok.felhasznalok_id = felhasznalok.felhasznalok_id
            INNER JOIN csoportok
            ON csoportok.csoport_id = felhasznalo_csoportok.csoport_id
            Where ? = belepes.felhasznalo_id
            ORDER BY felhasznalo_csoportok.csatlakozva);
                `
        pool.query(sql,[user_id], (err, result) => {
        
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        return res.status(200).json(result)
        })
})
//Csoport Bejegyzés megjenítése
app.post('/bejegyKeresCs_id', (req, res) => {
        const {csoport_id} =req.body
        const sql=`
                SELECT * FROM bejegyzesek
                WHERE csoport_id = ?;
                `
        pool.query(sql,[csoport_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
}) 
//User saját csoportjai bejegy
app.post('/bejegyKeresCs/:user_id', (req, res) => {
        const {user_id} =req.params
        const {kivalasztott} =req.body

        const sql=`
                SELECT *
                FROM felhasznalok AS belepett
                INNER JOIN belepes
                    ON belepett.idegen_felhasznalo_id = belepes.felhasznalo_id
                INNER JOIN felhasznalo_csoportok
                    ON felhasznalo_csoportok.felhasznalok_id = belepett.felhasznalok_id
                INNER JOIN csoportok
                    ON csoportok.csoport_id = felhasznalo_csoportok.csoport_id
                INNER JOIN bejegyzesek
                    ON bejegyzesek.csoport_id = csoportok.csoport_id
                INNER JOIN felhasznalok AS iro
                    ON bejegyzesek.felhasznalo_id = iro.felhasznalok_id
                WHERE belepes.felhasznalo_id = ? and bejegyzesek.csoport_id = ?;
                `
        pool.query(sql,[user_id,kivalasztott], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
//Felhasználó a saját csoportjai összes bejegyzését látja
app.get('/csoportjaimBejegyzesei/:user_id', (req, res) => {
        const {user_id} =req.params
        
        const sql=`
            SELECT 
        *
        from bejegyzesek 
        inner JOIN felhasznalok 
        on bejegyzesek.felhasznalo_id = felhasznalok.felhasznalok_id
        INNER JOIN bejegyzesek_kategoria
        ON bejegyzesek_kategoria.kategoria_id = bejegyzesek.kategoria
        INNER JOIN telepules
        ON telepules.telepules_id = bejegyzesek.helyszin
        INNER JOIN csoportok
        ON csoportok.csoport_id = bejegyzesek.csoport_id
WHERE csoportok.csoport_id IN (
    SELECT felhasznalo_csoportok.csoport_id
    FROM felhasznalo_csoportok
    WHERE felhasznalok_id = ?
)
ORDER BY letrehozva DESC;
                `
        pool.query(sql,[user_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})

//Felhasználó a saját csoportjai bejegyzését látja Kategória szerint
// app.post('/csoportjaimBejegyzeseiKat/:user_id', (req, res) => {
//     const { user_id } = req.params
//     const { kategoria_id } = req.body

//     const sql = `
//         SELECT *
//         FROM bejegyzesek
//         WHERE csoport_id IN (
//             SELECT csoport_id
//             FROM felhasznalo_csoportok
//             WHERE felhasznalok_id = ?
//         )
//         AND kategoria_id = ?
//         ORDER BY letrehozva DESC
//     `

//     pool.query(sql, [user_id, kategoria_id], (err, result) => {
//         if (err) {
//             console.error(err)
//             return res.status(500).json({ error: "Adatbázis hiba" })
//         }

//         return res.status(200).json(result)
//     })
// })
app.post('/csoportjaimBejegyzeseiKat/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { kategoria_id } = req.body;

  let sql = `
    SELECT *
    FROM bejegyzesek
    WHERE csoport_id IN (
      SELECT csoport_id
      FROM felhasznalo_csoportok
      WHERE felhasznalok_id = ?
    )
  `;

  let params = [user_id];

  // HA NEM ÖSSZES
  if (kategoria_id != 0) {
    sql += ` AND bejegyzesek.kategoria = ?`;
    params.push(kategoria_id);
  }

  sql += ` ORDER BY letrehozva DESC`;

  pool.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Hiba" });
    }

    return res.status(200).json(result);
  });
});



//Csoport-ból kilépés
app.delete('/csoportKilepes/:id', (req, res) => {
        const {id} =req.params
        const sql=`DELETE from felhasznalo_csoportok where felhasznalo_csoportok.id=?`
        pool.query(sql,[id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
});
//Helyszin
app.get('/helyszin', (req, res) => {
        const sql=`SELECT * from telepules;
  ;
`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
//Kategoria
app.get('/kategoria', (req, res) => {
        const sql=`SELECT * from bejegyzesek_kategoria
  ;
`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})

//Új bejegyzés
app.post("/bejegyzesFelv", (req, res) => {
  const { felhasznalo_id, cim, tartalom, kategoria, helyszin, csoport_id } = req.body;

//   if (!cim || !tartalom || !kategoria || !csoport_id) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const felhasznalo_id = 2; // TEMP


  const sql = `
    INSERT INTO bejegyzesek
    (felhasznalo_id, cim, tartalom, helyszin, kategoria, letrehozva, csoport_id)
    VALUES (?, ?, ?, ?, ?, NOW(), ?)
  `;

  pool.query(sql,[felhasznalo_id,cim,tartalom,helyszin,kategoria,csoport_id],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Post created successfully", id: result.insertId });
    }
  );
});


// Multipart/form-data endpoint: mezők + 1 kép
// frontend: FormData { film_cim, film_ev, kep }  (a fájl mező neve: "kep")
app.post("/fajlFelvitel", upload.single("kep"), (req, res) => {
  const {felhasznalo_id,cim,tartalom,helyszin,kategoria,csoport_id} = req.body;

  if (!cim || !tartalom) {
    if (req.file) fs.unlink(req.file.path, () => {});
    return res.status(400).json({ error: "film_cim és film_ev kötelező" });
  }

  // DB-be a fájlnév (vagy teheted: `/kepek/${req.file.filename}`)
  const kep_url = req.file ? req.file.filename : null;

  const sql = `INSERT INTO bejegyzesek
    VALUES (NULL,?, ?, ?, ?, ?, ?, NOW(), ?)`;
  pool.query(sql, [felhasznalo_id,cim,tartalom,kep_url,helyszin,kategoria,csoport_id], (err) => {
    if (err) {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(500).json({ error: "Hiba" });
    }
    return res.status(200).json({
      message: "Sikeres felvitel",
      kep_url,
      url: kep_url ? `/kepek/${kep_url}` : null,
    });
  });
});
//Csoport létrehozás
app.post("/ujCsoportFelvitel", upload.single("kep"), (req, res) => {
  const {felhasznalo_id,cim,tartalom,helyszin,kategoria,csoport_id} = req.body;

  if (!cim || !tartalom) {
    if (req.file) fs.unlink(req.file.path, () => {});
    return res.status(400).json({ error: "film_cim és film_ev kötelező" });
  }

  // DB-be a fájlnév (vagy teheted: `/kepek/${req.file.filename}`)
  const kep_url = req.file ? req.file.filename : null;

  const sql = `INSERT INTO csoportok
    VALUES (NULL,?, ?, ?, ?, ?, ?, NOW(), ?)`;
  pool.query(sql, [felhasznalo_id,cim,tartalom,kep_url,helyszin,kategoria,csoport_id], (err) => {
    if (err) {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(500).json({ error: "Hiba" });
    }
    return res.status(200).json({
      message: "Sikeres felvitel",
      kep_url,
      url: kep_url ? `/kepek/${kep_url}` : null,
    });
  });
});
//Egy Bizonyos Csoport Bejegyzései!

app.post('/egyCsopBej', (req, res) => {
    
    const { csoportId } = req.body

    const sql = `
       SELECT 
        *
        from bejegyzesek 
        inner JOIN felhasznalok 
        on bejegyzesek.felhasznalo_id = felhasznalok.felhasznalok_id
        INNER JOIN bejegyzesek_kategoria
        ON bejegyzesek_kategoria.kategoria_id = bejegyzesek.kategoria
        INNER JOIN telepules
        ON telepules.telepules_id = bejegyzesek.helyszin
        
        Where bejegyzesek.csoport_id = ?;
    `

    pool.query(sql, [csoportId], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: "Adatbázis hiba" })
        }

        return res.status(200).json(result)
    })
})

//Egy bizonyos csoport lekérdezése

app.post('/csoportKeres', (req, res) => {
        const {csoport_id} =req.body
        const sql=`
                SELECT * FROM csoportok WHERE csoportok.csoport_id = ?;
                `
        pool.query(sql,[csoport_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        

        return res.status(200).json(result)
        })
})
//Csoport-hoz csatlakozás 
app.post("/csoportCsat", (req, res) => {
  const { felhasznalok_id,csoport_id,csatlakozva} = req.body;

  const sql = `
   INSERT INTO felhasznalo_csoportok
    (felhasznalok_id, csoport_id, csatlakozva)
    VALUES (?, ?, NOW())
  `;

  pool.query(sql,[felhasznalok_id,csoport_id,csatlakozva],
    (err, result) => {
        if (err?.code === "ER_DUP_ENTRY") {
  return res.status(409).json({ error: "Már csatlakoztál ehhez a csoporthoz" });
            }
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Post created successfully", id: result.insertId });
    }
  );
});
//Egy bizonyos csoport lekérdezése  SELECT * FROM csoportok WHERE csoport_id= 1;
//Sanyi végpontjai---------------------------------------------------------------------


app.post('/uzenetFelvitel', (req, res) => {
        const {uzenet_iro,uzenet_kinek,uzenet_datum,uzenet_szoveg}=req.body
        const sql=`insert into uzenet 
                    values (null,?,?,?,?)
                    `
        pool.query(sql,[uzenet_iro,uzenet_kinek,uzenet_datum,uzenet_szoveg], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres felvitel"})
        })
})



// felhasznalok tábla módosítása, a parameterben az idegen, email,bio, felhasznalónév
app.put('/profilModosit/:userid', (req, res) => {
        const {userid} =req.params
        const {email,bio,felhasznalonev}=req.body
        const sql=`update felhasznalok
                    set email=?, bio=?, felhasznalonev=?
                    where idegen_felhasznalo_id=?
                    `
        pool.query(sql,[email,bio,felhasznalonev,userid], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres módosítás"})
        })
})


//egy post-os végpont lekérdezi az idegen felhasználó id-ét
app.post('/idegenKeres', (req, res) => {
        const {idegen_felhasznalo_id} =req.body
        const sql=`
                    select *
                    from felhasznalok
                    where idegen_felhasznalo_id=?
                `
        pool.query(sql,[idegen_felhasznalo_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})


app.get('/bejegyzesek', (req, res) => {
        const sql=`SELECT *
                   from bejegyzesek
                   INNER JOIN felhasznalok
                   on bejegyzesek.felhasznalo_id = felhasznalok.felhasznalok_id;`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})


//Bejegyzés törlése
app.delete('/BejegyzesekTorlese/:bejegyzesek_id', (req, res) => {
        const {bejegyzesek_id} =req.params
        const sql=`delete from bejegyzesek where bejegyzesek_id=?`
        pool.query(sql,[bejegyzesek_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
})


app.get('/datumJelenit', (req, res) => {
        const sql=`SELECT letrehozva FROM bejegyzesek;`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})


//Felhasznalonev 
app.get('/felhasznaloNevJelenit', (req, res) => {
        const sql=`SELECT felhasznalok.felhasznalonev FROM felhasznalok;`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })

})



app.get('/kommentek', (req, res) => {
        const sql=`SELECT hozzaszolasok.bejegyzes_id, hozzaszolasok.hozzaszolas_szoveg from hozzaszolasok;`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })

});


//Felhasznalonev 
app.get('/Bejelentkezesek', (req, res) => {
        const sql=
        `
        SELECT felhasznalok.felhasznalok_id, felhasznalok.felhasznalonev, felhasznalok.email, felhasznalok.profil_kep, felhasznalok.bio, felhasznalok.neme, felhasznalok.regisztralt 
        FROM felhasznalok
        `
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
});


//HozzaszolasTorles 
app.delete('/HozzaszolasTorlese/:hozzaszolasok_id', (req, res) => {
        const {hozzaszolasok_id} =req.params
        const sql=`DELETE from hozzaszolasok where hozzaszolasok_id=?`
        pool.query(sql,[hozzaszolasok_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
});


//Hozzászólások
app.get('/Hozzaszolasok', (req, res) => {
        const sql=`SELECT *
                   from Hozzaszolasok
                   INNER JOIN felhasznalok
                   on hozzaszolasok.felhasznalo_id = felhasznalok.felhasznalok_id;
                   `
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
});


//Felhasznalók
app.get('/Felhasznalok', (req, res) => {
        const sql=`SELECT * 
                   from felhasznalok
                   `
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
});


//Felhasznalok törlése
app.delete('/FelhasznalokTorlese/:felhasznalok_id', (req, res) => {
        const {felhasznalok_id} =req.params
        const sql=`DELETE from felhasznalok where felhasznalok_id=?`
        pool.query(sql,[felhasznalok_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
});


//Felhasználók törlése part 2
app.delete("/felhasznalokTorlese/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = felhasznalok.findIndex((f) => f.felhasznalok_id === id);

  if (index !== -1) {
    const toroltFelhasznalo = felhasznalok.splice(index, 1);
    res.json({ message: `A(z) ${toroltFelhasznalo[0].felhasznalonev} felhasználó törölve.` });
  } else {
    res.status(404).json({ error: "Felhasználó nem található." });
  }
});


//Felhasználók megjelenítése
app.get("/felhasznalokMegjelen", (req, res) => {
  db.query("SELECT * FROM felhasznalok", (err, rows) => {
    if (err) res.status(500).json(err);
    else res.json(rows);
  });
});


//Felhasználók lekérése part 2
app.get("/felhasznalok", (req, res) => {
  res.json(felhasznalok);
});


//Üzenet megjelenít
app.get('/UzenetJelenit/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const sql=`SELECT * FROM uzenet
                   INNER JOIN belepes
                   ON belepes.felhasznalo_id = uzenet.uzenet_iro 
                   INNER JOIN felhasznalok
                   ON felhasznalok.felhasznalok_id = uzenet.uzenet_kinek
                   WHERE uzenet_kinek = ?;`
        pool.query(sql,[id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
















// multer/egyéb hibák kezelése
app.use((err, req, res, next) => {
  if (err) return res.status(400).json({ error: err.message || "Hiba" });
  next();
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


