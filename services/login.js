const db = require('../database_method');
const crypto = require("crypto");
const bodyParser = require('body-parser');
const cons = require('consolidate');


exports.login = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    console.log(req.body.user+" -" +req.body.password );
    var email=req.body.user;
    var pas=req.body.password;
    console.log("Servise girildi");
    db.con.connect((err) => {
        var sql = "Select * from tblkullanicilar where kullaniciadi='"+email+"' and parola='"+pas+"' and aktiflik=1";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render("Bağlantı Sırasında Hata Oluştu : "+err.message);
            }
            else {
                if(dbrows.length>0)
                {
                    console.log(dbrows);
                    res.send("1");
                }
                else{
                    res.send("0");
                }
                
            }

        });
        db.con.end;
    });
}
