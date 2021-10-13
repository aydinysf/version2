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



    
exports.cihazmodelleriGrubuListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblcihazmodelgruplari";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./cihazmodellerigrubu.html', { result: dbrows, partials: getPartials() })
                
            }

        });
        db.con.end;
    });
}
exports.cihazModelleriGrubuKaydet =(req,res,next) =>{
    db.con.connect((err)=>{
        const cihazmodelgrupkod = crypto.randomBytes(16).toString("hex")
        var sql="INSERT INTO tblcihazmodelgruplari(cihazmodelgrupkod,cihazkod,cihazmodelkod,cihazmodelgrupadi) VALUES('"+cihazmodelgrupkod+"','"+req.body.devicemodelbrand+"','"+req.body.devicemodels+"','"+req.body.groupname+"')";
        
        var postedFields=[cihazmodelgrupkod,req.body.devicemodelbrand,req.body.devicemodels,req.body.groupname,];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
        
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./cihazmodellerigrubu.html', { result: dbrows, partials: partials })
                
            }
        });
    });
    db.con.end;
}

exports.CihazModelleriSilme = (req,res,next)=>{
    db.con.connect((err)=>{

        var idCihazModelGrup = [];
        idCihazModelGrup.push(String(req.params.kodcihazmodelgrup));
        var sql="Delete from tblcihazmodelgruplari where cihazmodelgrupkod=?";

        db.con.query(sql,idCihazModelGrup,(err,dbrows,fields)=>{
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


