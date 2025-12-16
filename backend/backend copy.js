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
app.post('/kommentKeresBejegyId', (req, res) => {
        const {bejegyzesek_id} =req.body
        const sql=`
                select *
                from bejegyzesek
                inner join felhasznalok
                on felhasznalo_id=felhasznalok_id
                INNER JOIN hozzaszolasok
                ON bejegyzesek.bejegyzesek_id =hozzaszolasok.bejegyzes_id
                where bejegyzesek_id=?;
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
//hozzaszolasok_id alapaján keres
app.post('/mindenKerHozzId', (req, res) => {
    const { bejegyzesek_id } = req.body;

    const sql = `
        SELECT * 
        FROM bejegyzesek
        INNER JOIN felhasznalok 
            ON bejegyzesek.felhasznalo_id = felhasznalok.felhasznalok_id 
        INNER JOIN hozzaszolasok
            ON bejegyzesek.bejegyzesek_id = hozzaszolasok.bejegyzes_id 
        LEFT JOIN megosztasok 
            ON megosztasok.bejegyzes_id = bejegyzesek.bejegyzesek_id 
        LEFT JOIN reakciok 
            ON reakciok.bejegyzes_id = bejegyzesek.bejegyzesek_id 
        WHERE bejegyzesek.bejegyzesek_id = ?;
    `;

    pool.query(sql, [bejegyzesek_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hiba" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Nincs adat" });
        }

        return res.status(200).json(result);
    });
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

//Trágár szavak jelölése
app.get('/tragarszoSzures', (req, res) => {
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

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


