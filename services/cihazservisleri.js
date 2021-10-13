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



     // Cihazlar 
   exports.cihazlariListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

    db.con.connect((err) => {
        
        // var sql = "select * FROM tblcihazlar";
        var sql = "Select * from tblcihazlar";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
               // res.render('./error.html', { result: '', partials: partials });
            }
            else {
            
                res.render('./cihazlar.html', { result: dbrows, partials: getPartials()})
            }

        });
        db.con.end;
    });
}

exports.cihazlariKaydet =(req,res,next) =>{
    db.con.connect((err)=>{
        const cihazkodu = crypto.randomBytes(16).toString("hex");
        var sql="INSERT INTO tblcihazlar(cihazkod,cihazmarkasi,kayittarihi) VALUES('"+cihazkodu+"','"+req.body.cihazmarkasi+"',now())";
        
        var postedFields=[cihazkodu,req.body.cihazmarkasi];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
               // res.render('./devices.html', { result: dbrows, partials: partials })
                console.log("Basarili");
            }
        });
    });
    db.con.end;
}
exports.cihazlariSil = (req,res,next)=>{
    db.con.connect((err)=>{
        var idCihaz = [];
        idCihaz.push(String(req.params.kodcihaz));
        var sql="Delete from tblcihazlar where cihazkod=?";

        db.con.query(sql,idCihaz,(err,dbrows,fields)=>{
            if(err){
                console.log('Hata:'+err.toString());
                
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{

                //res.render('./devices.html', { result: dbrows, partials: partials })
            }
        });
    });
    db.con.end;
}









exports.cihazaModelEkle = (req, res, next) => {


    db.con.connect((err) => {
    const modelkod = crypto.randomBytes(16).toString("hex");
    const cihazkodu=req.body.cihazkodu;

    const modeladi=req.body.modeladi;
    console.log("cihazkod:" + cihazkodu +"modeladi:" + modeladi);
    var sql= "INSERT INTO tblcihazmodelleri(cihazmodelkod,cihazkod,cihazmodeladi)";
    sql = sql+ "VALUES('"+modelkod+"','"+cihazkodu+"','"+modeladi+"')" ;
        
  
        db.con.query(sql, (err, dbrows, fields) => {
            console.log("cihazkod:"+cihazkodu);
            if (err) {
                console.log("Kaydet Servisi Hata :" + err.toString());
    
                //res.render('./error.html',{result:'',partials:partials});
            }
            else {
                console.log("Kaydet Servisi Yapıldı");
                // res.render('./devices.html', { result: dbrows, partials: partials })
    
            }
        });
    });
    db.con.end;
    }



    exports.cihazaModelListele = (req, res, next) => {

        var idCihazlar = [];
        db.con.connect((err) => {
        
            idCihazlar.push(String(req.params.cihazkod));
            console.log(String(req.params.cihazkod));
            var sql = "SELECT chz.cihazmarkasi,mdl.cihazmodeladi,mdl.cihazkod,mdl.cihazmodelkod FROM tblcihazmodelleri mdl left join tblcihazlar chz on mdl.cihazkod=chz.cihazkod where chz.cihazkod=? ";
        
            db.con.query(sql, idCihazlar, (err, dbrows, fields) => {
                if (err) {
                    console.log('Hata:' + err.toString());
        
                    //res.render('./error.html',{result:'',partials:partials});
                }
                else {
                    idCihazlar = dbrows;
                    console.log(dbrows+" fatih edildi");
                 
                    res.render('./partials/modeller/cihazmodellerimodal.html', { cihazModelleriListesi: dbrows })
                }
            });
        });
        db.con.end;
        return idCihazlar;
        }



        exports.ModelSilme = (req, res, next) => {
            db.con.connect((err) => {
            
                var idCihaz = [];
                idCihaz.push(String(req.params.cihazmodelid));
                var sql = "Delete from tblcihazmodelleri where cihazmodelkod=?";
            
                db.con.query(sql, idCihaz, (err, dbrows, fields) => {
                    if (err) {
                        console.log('Hata:' + err.toString());
            
                        //res.render('./error.html',{result:'',partials:partials});
                    }
                    else {
                        //res.render('./devices.html', { result: dbrows, partials: partials })
                    }
                });
            });
            db.con.end;
            }
            

