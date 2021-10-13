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






exports.kullaniciTipiListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblkullanicitipi";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./kullanicitipleri.html', { result: dbrows, partials: getPartials() })
                
            }

        });
        db.con.end;
    });
}
exports.kullaniciTipiKaydet =(req,res,next) =>{
    db.con.connect((err)=>{
        const tipkodu = crypto.randomBytes(16).toString("hex")
        var sql="INSERT INTO tblkullanicitipi(tipkodu,tipi) VALUES('"+tipkodu+"','"+req.body.kullanicitipi+"')";
        
        var postedFields=[tipkodu,req.body.kullanicitipi];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                console.log("Type Code : "+tipkodu+" - type name :"+req.body.kullanicitipi)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./kullaniciTipi.html', { result: dbrows, partials: partials })
                
            }
        });
    });
    db.con.end;
}

exports.kullaniciTipiSil = (req,res,next)=>{
    db.con.connect((err)=>{

        var idKullaniciTipi = [];
        idKullaniciTipi.push(String(req.params.kodkullanicitipi));
        var sql="Delete from tblkullanicitipi where tipkodu=?";

        db.con.query(sql,idKullaniciTipi,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                //res.render('./error.html',{result:'',partials:getPartials()});
            }
            else{
               
               
            }
        });
    });
    db.con.end;
}
