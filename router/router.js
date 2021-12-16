const {Router} = require ("express");
const router = new Router();
const mysql = require('mysql');

//Conexion base de datos
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'pare_gabriela'
})

conn.connect((err)=> {

    if(err) throw err;
    console.log('CONEXION ESTABLECIDA');
})

router.get("/principal", (req, res)=>{
    res.render('principal')
})



//Rutas
router.get('/vinos', (req, res)=>{
    let sql = "SELECT * FROM vinos";
    let query = conn.query(sql, (err, results)=>{
        if(err) throw err;
        res.render('vinos',{
        results:results   
        })
    })
    
})

router.get('/getVinos', (req, res)=>{
    let sql = "SELECT * FROM vinos";
    let query = conn.query(sql, (err, results)=>{
        if(err) throw err;
        res.send(results);
    })
    
})

//INSERT
router.post('/save', (req, res)=> {
    let data = {nombre: req.body.nombre, precio: req.body.precio, anio: req.body.anio, variedad: req.body.variedad};
    let sql = "INSERT INTO vinos SET ?";
    let query = conn.query(sql, data,(err, results)=>{
        if(err) throw err;
        res.redirect('vinos');
    });
});

//UPDATE
router.post('/update', (req, res)=> {
    let sql = "UPDATE vinos SET nombre='"+req.body.nombre+"', precio='"+req.body.precio+"', anio='"+req.body.anio+"', variedad='"+req.body.variedad+"' WHERE vino_id="+req.body.id;
    let query = conn.query(sql,(err, results)=>{
        if(err) throw err;
        res.redirect('vinos');
    });   
});

//DELETE
router.post('/delete', (req, res)=> {
    let sql = "DELETE FROM vinos WHERE vino_id="+req.body.id;
    let query = conn.query(sql,(err, results)=>{
        if(err) throw err;
        res.redirect('vinos');
    });   
});

module.exports = router;