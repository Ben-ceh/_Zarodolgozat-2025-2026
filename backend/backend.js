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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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
//Sanyi végpontjai
app.get('/bejegyzesek', (req, res) => {
        const sql=`SELECT * from bejegyzesek`
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


