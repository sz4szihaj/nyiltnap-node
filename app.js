import express from "express";
import cors from "cors";
import db from "./data/db.js";

const PORT=3321
const app=express()
app.use(cors());
app.use(express.json())

//2
app.get('/nyiltnap/api/v1/telepules',(req,res)=>{
    const telepules=req.query.nev
    // if(!telepules){
    //     return res.status(400).json({message:"Hiányzik a település neve"})
    // }
    const diakok=db.prepare("SELECT nev FROM diakok WHERE telepules=? ORDER BY nev ASC").all(telepules)

    res.status(200).json(diakok)
})
//3
app.get('/nyiltnap/api/v1/tanora',(req,res)=>{
    const tanora=req.query.targy
    // if(!tanora){
    //     return res.status(400).json({message: "Hiányzik a tanora neve"})
    // }
    const lista=db.prepare("SELECT datum, terem, orasorszam FROM orak WHERE targy=? ORDER BY datum ASC, orasorszam ASC").all(tanora)
    res.status(200).json(lista)
})
//4
app.get('/nyiltnap/api/v1/9-matematika-fizika',(req,res)=>{
    const orak=db.prepare("SELECT csoport, targy, datum FROM orak WHERE csoport LIKE '9%' and (targy='matematika' or targy='fizika') ORDER BY targy ASC").all()
    res.status(200).json(orak)
})
//5
app.get('/nyiltnap/api/v1/telepulesfo',(req,res)=>{
    const telepfo=db.prepare("SELECT telepules, COUNT(nev) FROM diakok GROUP BY telepules ORDER BY COUNT(nev) DESC").all()

    res.status(200).json(telepfo)
})
//6
app.get('/nyiltnap/api/v1/tantargyak',(req,res)=>{
    const orak=db.prepare("SELECT DISTINCT(targy) FROM orak ORDER BY targy ASC").all()
    res.status(200).json(orak)
})

//7
app.get('/nyiltnap/api/v1/tanar',(req,res)=>{
    const { nev, datum } = req.query;
    // if (!nev || !datum) {
    //     return res.status(400).json({ message: "Hiányzik a tanár neve vagy a dátum" });
    // }
    const diakok=db.prepare("SELECT diak.nev, diak.email, diak.telefon FROM diakok diak JOIN kapcsolo kapcs ON diak.id = kapcs.diakid JOIN orak ora ON kapcs.oraid = ora.id WHERE ora.tanar = ? AND ora.datum = ?").all(nev,datum)

    res.status(200).json(diakok)

})
//8
app.get('/nyiltnap/api/v1/telepulesrol',(req,res)=>{
    const nev=req.query.nev
    const telepules=db.prepare("SELECT telepules FROM diakok WHERE nev=?").get(nev)
    const diakok=db.prepare("SELECT nev FROM diakok WHERE telepules=? and nev!=?").all(telepules.telepules,nev)
    res.status(200).json(diakok)
})

//9
app.get('/nyiltnap/api/v1/szabad',(req,res)=>{
    const szabad=db.prepare(`
        SELECT ora.datum,ora.orasorszam,ora.targy,ora.tanar, ora.ferohely-COUNT(kapcs.id) AS szabad 
        FROM orak ora 
        LEFT JOIN kapcsolo kapcs on ora.id=kapcs.oraid 
        GROUP BY ora.id HAVING szabad>0 
        ORDER BY szabad DESC`).all()

    res.status(200).json(szabad)    
})

app.listen(PORT,()=>{
    console.log(`server runs on PORT: ${PORT}`)
})
