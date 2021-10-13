const db = require('../database_method');
const crypto = require("crypto");
const bodyParser = require('body-parser');

function getPartials() {
    var partials = {
        menu: './partials/menu',
        foot: './partials/foot',
        metas: './partials/metas'
    };

    return partials;
}









exports.kullanicilariListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblkullanicilar";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: getPartials() });
            }
            else {
                res.render('./kullanicilar.html', { result: dbrows, partials: getPartials() })
                
            }

        });
        db.con.end;
    });
}
exports.kullaniciEkle =(req,res,next) =>{
    db.con.connect((err)=>{
        const kullanicikod = crypto.randomBytes(16).toString("hex")
        var sql="INSERT INTO tblkullanicilar(kullanicikod,kullaniciadi,parola,kullanicitipi,aktiflik) VALUES('"+kullanicikod+"','"+req.body.kullanicimail+"','"+req.body.kullanicipassword+"','"+req.body.kullanicitipi+"','"+req.body.aktiflik+"')";
        
        var postedFields=[kullanicikod,req.body.kullanicimail,req.body.kullanicipassword,req.body.kullanicitipi,req.body.aktiflik];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                console.log("User Code : "+kullanicikod+" - user mail :"+req.body.kullanicimail+" - user mail :"+req.body.kullanicipassword+" - user mail :"+req.body.kullanicitipi+" - user mail :"+req.body.aktiflik)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./users.html', { result: dbrows, partials: partials })
                
            }
        });
    });
    db.con.end;
}

exports.kullaniciSil = (req,res,next)=>{
    db.con.connect((err)=>{

        var idKullanici = [];
        idKullanici.push(String(req.params.kodkullanici));
        var sql="Delete from tblkullanicilar where kullanicikod=?";

        db.con.query(sql,idKullanici,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./devices.html', { result: dbrows, partials: partials })
               
            }
        });
    });
    db.con.end;
}


exports.kullaniciTipiYukle = (req, res, next) => {

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {

        var sql = "SELECT tipkodu,tipi FROM tblkullanicitipi";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./partials/modeller/kullaniciTipiYukle.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}






