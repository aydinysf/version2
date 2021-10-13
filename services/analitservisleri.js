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
        var sql="INSERT INTO tblanalitler(analitkod,analitmarka,kayittarihi) VALUES('"+analitkod+"','"+req.body.analitadi+",now()')";
        
        var postedFields=[analitkod,req.body.analitadi];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                console.log("Analyte Code : "+analitkod+" - Analyte name :"+req.body.analitadi)
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

exports.getAnaliteBirimEkleme = (req, res, next) => {

    var analyteunitscode = String(req.params.codeanalteunits);
    db.con.connect((err) => {
    
      
        var sql = "select corp.corporationcode,corp.corporationname,prg.programcode,prg.programname,cprg.corporationprogramscode,case when cprg.ro=1 then 'var' else 'yok' end as ro ,cprg.programcount from tblcorporationprograms cprg " +
        " left join tblcorporations corp on cprg.corporationcode=corp.corporationcode " +
        "left join tblprograms prg on prg.programcode=cprg.programcode where cprg.corporationcode='" + corporationcode + "'";
    
        db.con.query(sql, idDevice, (err, dbrows, fields) => {
            if (err) {
                console.log('Hata:' + err.toString());
    
                //res.render('./error.html',{result:'',partials:partials});
            }
            else {
                idDevice = dbrows;
                console.log(dbrows+" fatih edildi");
             
                res.render('./partials/model-modal.html', { deviceModelList: dbrows })
            }
        });
    });
    db.con.end;
    return idDevice;
    }
    exports.setDeviceModel = (req, res, next) => {
    
    console.log("Kaydet metoduna girdi");
    const modelcode = crypto.randomBytes(16).toString("hex");
    db.con.connect((err) => {
        var sql = "INSERT INTO tbldevicemodels(devicemodelcode,modelname,devicecode) VALUES('" + modelcode + "','" + req.body.modelname + "','" + req.body.devicecode + "')";
        // var postedFields=[modelcode,req.body.modelname,req.body.devicecode];
        console.log(req.body);
        console.log(sql);
        // db.con.query(sql,postedFields,(err,dbrows,fields)=>{
        db.con.query(sql, (err, dbrows, fields) => {
    
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
    exports.deleteModel = (req, res, next) => {
    db.con.connect((err) => {
    
        var idDevice = [];
        idDevice.push(String(req.params.modelid));
        var sql = "Delete from tbldevicemodels where devicemodelcode=?";
    
        db.con.query(sql, idDevice, (err, dbrows, fields) => {
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