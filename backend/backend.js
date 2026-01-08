const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
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
        const sql=`SELECT * from bejegyzesek 
        inner JOIN felhasznalok 
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
        const {user_id} =req.params
        
        const sql=`
            SELECT * 
            FROM belepes
            INNER JOIN felhasznalok
            on felhasznalok.idegen_felhasznalo_id = belepes.felhasznalo_id
            INNER JOIN felhasznalo_csoportok
            ON felhasznalo_csoportok.felhasznalok_id = felhasznalok.felhasznalok_id
            INNER JOIN csoportok
            ON csoportok.csoport_id = felhasznalo_csoportok.csoport_id
            Where 8 = belepes.felhasznalo_id
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

//Sanyi végpontjai---------------------------------------------------------------------


//Sanyi végpontjai
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




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


