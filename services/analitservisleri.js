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







exports.analitListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblanalitler";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./analitler.html', { result: dbrows, partials: getPartials() })
                
            }

        });
        db.con.end;
    });
}
exports.analitEkle =(req,res,next) =>{
    db.con.connect((err)=>{
        const analitkod = crypto.randomBytes(16).toString("hex")
        var sql="INSERT INTO tblanalitler(analitkod,analitmarka,kayittarihi) VALUES('"+analitkod+"','"+req.body.analitmarka+"',now())";
        
        var postedFields=[analitkod,req.body.analitmarka];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                console.log("Analyte Code : "+analitkod+" - Analyte name :"+req.body.analitmarka)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./analitler.html', { result: dbrows, partials: partials })
                console.log("Noluyor");
            }
        });
    });
    db.con.end;
}

exports.analitSil = (req,res,next)=>{
    db.con.connect((err)=>{

        var idAnalit = [];
        idAnalit.push(String(req.params.kodanalit));
        var sql="Delete from tblanalitler where analitkod=?";

        db.con.query(sql,idAnalit,(err,dbrows,fields)=>{
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




/////// Analit Birim Ekleme

exports.birimAdiYukleme = (req, res, next) => {

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {

        var sql = "SELECT birimkod,birimadi FROM tblbirimler";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./partials/modeller/analiteBirimAdiYukle.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}




exports.analiteBirimEkleme = (req, res, next) => {


    db.con.connect((err) => {
    const analitbirimkod = crypto.randomBytes(16).toString("hex");
    const analitkodu=req.body.analitkodu;

    const birimkod=req.body.birimkod;
    console.log("analitkodu:" + analitkodu +"birimkod:" + birimkod);
    var sql= "INSERT INTO tblanalitbirimleri(analitbirimkod,analitkod,birimkod,kayittarihi)";
    sql = sql+ "VALUES('"+analitbirimkod+"','"+analitkodu+"','"+birimkod+"',"+"now())" ;
        
  
        db.con.query(sql, (err, dbrows, fields) => {
            console.log("programkodu:"+analitkodu);
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



    exports.analitBirimleriListele = (req, res, next) => {

        var idAnalitBirimleri = [];
        db.con.connect((err) => {
            const analitkod=req.params.analitbirimkod;
            idAnalitBirimleri.push(String(req.params.analitbirimkod));
            console.log(String(req.params.analitbirimkod));
            var sql = "Select tab.analitbirimkod,ta.analitmarka,tab.analitkod,tb.birimadi,tb.birimkod,ta.analitkod from tblanalitbirimleri tab left join tblanalitler ta on tab.analitkod = ta.analitkod left join tblbirimler tb on tab.birimkod=tb.birimkod where tab.analitkod='"+analitkod+"' order by tab.kayittarihi desc";
        
            db.con.query(sql, idAnalitBirimleri, (err, dbrows, fields) => {
                if (err) {
                    console.log('Hata:' + err.toString());
        
                    //res.render('./error.html',{result:'',partials:partials});
                }
                else {
                    idAnalitBirimleri = dbrows;
                    console.log(dbrows+" fatih edildi");
                 
                    res.render('./partials/modeller/analitbirimlerimodal.html', { analitBirimleriListesi: dbrows })
                }
            });
        });
        db.con.end;
        return idAnalitBirimleri;
        }



        exports.analitBirimSilme = (req, res, next) => {
            db.con.connect((err) => {
            
                var idAnalitBirimleri = [];
                idAnalitBirimleri.push(String(req.params.analitbirimleriid));
                var sql = "Delete from tblanalitbirimleri where analitbirimkod=?";
            
                db.con.query(sql, idAnalitBirimleri, (err, dbrows, fields) => {
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
            

     ////////////////////// ANalite KİT ekleme
     
     

     
exports.analiteKitMarkasiEkle = (req, res, next) => {

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {

        var sql = "SELECT kitkod,kitmarkasi FROM tblkitler";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: getPartials()  });
            }
            else {
                res.render('./partials/modeller/analiteKitMarkasıYukle.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}





exports.analiteKitKataloguEkle = (req, res, next) => {

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {

        var sql = "SELECT kitkatalogkod,kitkatalognumarasi FROM tblkitkataloglari";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: getPartials()  });
   
            }
            else {
                res.render('./partials/modeller/analitlereKitKatologEkle.html', { result: dbrows })
               
            }

        });
        db.con.end;
    });
}




exports.analiteKitEkleme =(req,res,next) =>{
    db.con.connect((err)=>{

        const analitkitkod = crypto.randomBytes(16).toString("hex");
        const analitkodu=req.body.analitkodu;
        const kitkodu =req.body.kitkodu;
        const kitkatalogkodu=req.body.kitkatalogkodu;
         
        console.log("analitkodu : "+analitkodu+" kitkodu : "+ kitkodu+ "kitkatalogkodu: " + kitkatalogkodu);
        var sql="INSERT INTO tblanalitkitleri (analitkitkod, analitkod, kitkod, kitkatalogkod,kayittarihi)";
        sql=sql+" VALUES('"+analitkitkod+"','"+analitkodu+"','"+kitkodu+"', '"+kitkatalogkodu+"',"+"now())";
        
        
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                //console.log("Corporation Code : "+kurumkod+" - corporation name :"+req.body.kurumadi+" - corporation address :"+req.body.kurumsevkadresi+" - corporation invoiceaddress :"+req.body.kurumsevkadresi+" - corporation isactive :"+req.body.isactive)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./kurumlar.html', { result: dbrows, partials: partials })
                console.log("Kit  eklendi");
            }
        });
    });
    db.con.end;
}




exports.analitKitleriListele = (req, res, next) => {

    var idAnalitKitleri = [];
    db.con.connect((err) => {
        const analitkod=req.params.analitkitlerikod;
        idAnalitKitleri.push(String(req.params.analitkitlerikod));
        console.log(String(req.params.analitkitlerikod));
        var sql = "Select tak.analitkitkod,ta.analitmarka,tak.analitkod,tk.kitmarkasi,tk.kitkod,tkk.kitkatalognumarasi,tkk.kitkatalogkod from tblanalitkitleri tak left join tblanalitler ta on tak.analitkod = ta.analitkod  left join tblkitler tk on tak.kitkod=tk.kitkod left join tblkitkataloglari tkk on tak.kitkatalogkod=tkk.kitkatalogkod where tak.analitkod='"+analitkod+"' order by tak.kayittarihi desc";
    
        db.con.query(sql, idAnalitKitleri, (err, dbrows, fields) => {
            if (err) {
                console.log('Hata:' + err.toString());
    
                //res.render('./error.html',{result:'',partials:partials});
            }
            else {
                idAnalitKitleri = dbrows;
                console.log(dbrows+" fatih edildi");
                
                res.render('./partials/modeller/analitkitlerimodal.html', { analitkitlerilistesi: dbrows })
            }
        });
    });
    db.con.end;
    return idAnalitKitleri;
    }


    
    exports.analitKitSilme = (req, res, next) => {
        db.con.connect((err) => {
        
            var idAnalitKitleri = [];
            idAnalitKitleri.push(String(req.params.analitkitkodid));
            var sql = "Delete from tblanalitkitleri where analitkitkod=?";
        
            db.con.query(sql, idAnalitKitleri, (err, dbrows, fields) => {
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