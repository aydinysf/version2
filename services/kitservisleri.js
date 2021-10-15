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







exports.kitListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblkitler";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./kitler.html', { result: dbrows, partials: getPartials() });
                
            }

        });
        db.con.end;
    });
}
exports.kitEkle =(req,res,next) =>{
    db.con.connect((err)=>{
        const kitkodu = crypto.randomBytes(16).toString("hex")
      
        var sql="INSERT INTO tblkitler(kitkod,kitmarkasi,kayittarihi) VALUES('"+kitkodu+"','"+req.body.kitmarkasi+"',now())";
        
        var postedFields=[kitkodu,req.body.kitmarkasi];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                console.log("Kit Code : "+kitkodu+" - kit name :"+req.body.kitmarkasi)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./kitler.html', { result: dbrows, partials: partials })
                
            }
        });
    });
    db.con.end;
}

exports.kitSil = (req,res,next)=>{
    db.con.connect((err)=>{

        var idKit = [];
        idKit.push(String(req.params.kodkit));
        var sql="Delete from tblkitler where kitkod=?";

        db.con.query(sql,idKit,(err,dbrows,fields)=>{
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



//// Kit Katalog Ekle


exports.kitlereKatalogEkle = (req, res, next) => {


    db.con.connect((err) => {
    const kitkatologkodu = crypto.randomBytes(16).toString("hex");
    const kitkodu=req.body.kitkodu;
    const kitkatolognumarasi=req.body.kitkatolognumarasi;
    const kitmetodkodu=crypto.randomBytes(16).toString("hex");
    console.log("kitkod:" + kitkodu +"kitkatolognumarasi:" + kitkatolognumarasi);
    var sql= "INSERT INTO tblkitkataloglari(kitkatalogkod,kitkod,kitkatalognumarasi,kitmetodkod,kayittarihi)";
    sql = sql+ "VALUES('"+kitkatologkodu+"','"+kitkodu+"','"+kitkatolognumarasi+"','"+kitmetodkodu+"',"+"now())" ;
        
  
        db.con.query(sql, (err, dbrows, fields) => {
            console.log("kitkodu:"+kitkodu);
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


    exports.kitKatologlariListele = (req, res, next) => {

        var idKitKatolog = [];
        db.con.connect((err) => {
            const kitkod=req.params.kitkatologkod;
            idKitKatolog.push(String(req.params.kitkatologkod));
            console.log(String(req.params.kitkatologkod));
            var sql = "SELECT kt.kitmarkasi,kk.kitkatalogkod,kk.kitkod,kk.kitkatalognumarasi FROM tblkitkataloglari kk left join tblkitler kt  on kk.kitkod=kt.kitkod where kk.kitkod='"+kitkod+"' order by kk.kayittarihi desc";
        
            db.con.query(sql, idKitKatolog, (err, dbrows, fields) => {
                if (err) {
                    console.log('Hata:' + err.toString());
        
                    //res.render('./error.html',{result:'',partials:partials});
                }
                else {
                    idKitKatolog = dbrows;
                    console.log(dbrows+" fatih edildi");
                 
                    res.render('./partials/modeller/kitkataloglarimodal.html', { kitKatologListesi: dbrows })
                }
            });
        });
        db.con.end;
        return idKitKatolog;
        }


        exports.KitKatologSilme = (req, res, next) => {
            db.con.connect((err) => {
            
                var idKitKatalog = [];
                idKitKatalog.push(String(req.params.kitkatologid));
                var sql = "Delete from tblkitkataloglari where kitkatalogkod=?";
            
                db.con.query(sql, idKitKatalog, (err, dbrows, fields) => {
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
            

