const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'okos_kozosseg'
        })

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


