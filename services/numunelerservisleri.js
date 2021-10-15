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



exports.numuneListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblnumuneler";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./numuneler.html', { result: dbrows, partials: getPartials() })
                
            }

        });
        db.con.end;
    });
}
exports.numuneEkleme =(req,res,next) =>{
    db.con.connect((err)=>{
        const numunekod = crypto.randomBytes(16).toString("hex")
        var sql="INSERT INTO tblnumuneler(numunekod,numunead,numunealias,numuneadeti,kayittarihi) VALUES('"+numunekod+"','"+req.body.numunemarka+"','"+req.body.numunekod+"','"+req.body.numuneadeti+"',now())";
        
        var postedFields=[numunekod,req.body.numunemarka,req.body.numunekod,req.body.numuneadeti];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                console.log("Sample Code : "+numunekod+" - Sample name :"+req.body.numunemarka+" - Sample name :" +req.body.numunekod +" - Sample supplier :"+req.body.samplesupplier+" - Sample quantity :"+req.body.numuneadeti)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./numuneler.html', { result: dbrows, partials: partials })
                
            }
        });
    });
    db.con.end;
}

exports.numuneSilme = (req,res,next)=>{
    db.con.connect((err)=>{

        var idNumune = [];
        idNumune.push(String(req.params.kodnumune));
        var sql="Delete from tblnumuneler where numunekod=?";

        db.con.query(sql,idNumune,(err,dbrows,fields)=>{
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


