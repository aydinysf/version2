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

   
exports.kitMetodListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblkitmetod";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                //res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./kitmetodlari.html', { result: dbrows, partials: getPartials() })
                
            }

        });
        db.con.end;
    });
}
exports.kitMetodKaydet =(req,res,next) =>{
    db.con.connect((err)=>{
        const kitmetodkod = crypto.randomBytes(16).toString("hex")
        var sql="INSERT INTO tblkitmetod(kitmetodkod,kitmetodadi,kayittarihi) VALUES('"+kitmetodkod+"','"+req.body.kitmetodadi+"',now())";
        
        var postedFields=[kitmetodkod,req.body.kitmetodadi];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                console.log("Method Code : "+kitmetodkod+" - Method name :"+req.body.kitmetodadi)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./kitmetodlari.html', { result: dbrows, partials: partials })
                
            }
        });
    });
    db.con.end;
}

exports.kitMetodSil = (req,res,next)=>{
    db.con.connect((err)=>{

        var idKitMethod = [];
        idKitMethod.push(String(req.params.kodkitmetod));
        var sql="Delete from tblkitmetod where kitmetodkod=?";

        db.con.query(sql,idKitMethod,(err,dbrows,fields)=>{
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

