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




exports.birimListeleme = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblbirimler";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./birimtanimlama.html', { result: dbrows, partials: getPartials() })
                
            }

        });
        db.con.end;
    });
}
exports.birimKaydetme =(req,res,next) =>{
    db.con.connect((err)=>{
        const birimkod = crypto.randomBytes(16).toString("hex")
        var sql="INSERT INTO tblbirimler(birimkod,birimadi,birimkatsayi,birimsembol) VALUES('"+birimkod+"','"+req.body.unitname+"','"+req.body.unitcoefficient+"','"+req.body.unitsymbol+"')";
        
        var postedFields=[birimkod,req.body.unitname,req.body.unitcoefficient,req.body.unitsymbol];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                console.log("Unit Code : "+birimkod+" - Unit name :"+req.body.unitname+" - Unit name :"+req.body.unitcoefficient+" - Unit symbol :"+req.body.unitsymbol)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./birimtanimlama.html', { result: dbrows, partials: partials })
                
            }
        });
    });
    db.con.end;
}

exports.birimSilme = (req,res,next)=>{
    db.con.connect((err)=>{

        var İDbİRİM = [];
        İDbİRİM.push(String(req.params.codebirim));
        var sql="Delete from tblbirimler where birimkod=?";

        db.con.query(sql,İDbİRİM,(err,dbrows,fields)=>{
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

