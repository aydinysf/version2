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






exports.programListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblprogramlar";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./programlar.html', { result: dbrows, partials: getPartials() })
                // res.render('./partials/programdropdown.html', { result: dbrows })

            }

        });
        db.con.end;
    });
}

exports.programEkle = (req, res, next) => {
    db.con.connect((err) => {
        const programkodu = crypto.randomBytes(16).toString("hex")
        var sql = "INSERT INTO tblprogramlar(programkod,programadi,programkodu) VALUES('" + programkodu + "','" + req.body.programadi + "','" + req.body.programkodu + "')";

        var postedFields = [programkodu, req.body.programadi, req.body.programkodu];
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                console.log(err.toString());


                //res.render('./error.html',{result:'',partials:partials});
            }
            else {
                //res.render('./programlar.html', { result: dbrows, partials: partials })

            }
        });
    });
    db.con.end;
}



exports.programSil = (req, res, next) => {
    db.con.connect((err) => {

        var idProgram = [];
        idProgram.push(String(req.params.kodprogram));
        var sql = "Delete from tblprogramlar where programkod=?";

        db.con.query(sql, idProgram, (err, dbrows, fields) => {
            if (err) {
                console.log(err.toString());

                //res.render('./error.html',{result:'',partials:partials});
            }
            else {
                //res.render('./devices.html', { result: dbrows, partials: partials })

            }
        });
    });
    db.con.end;
}



///// Program Analitleri


exports.analitYukle = (req, res, next) => {

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {

        var sql = "SELECT analitkod,analitmarka FROM tblanalitler";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./partials/modeller/analitMarkasiYukle.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}






exports.programaAnalitEkleme = (req, res, next) => {


    db.con.connect((err) => {
    const programanalitlerikod = crypto.randomBytes(16).toString("hex");
    const programkodu=req.body.programkodu;

    const analitkod=req.body.analitkod;
    console.log("programkodu:" + programkodu +"analitkod:" + analitkod);
    var sql= "INSERT INTO tblprogramanalitleri(programanalitlerikod,programkod,analitkod)";
    sql = sql+ "VALUES('"+programanalitlerikod+"','"+programkodu+"','"+analitkod+"')" ;
        
  
        db.con.query(sql, (err, dbrows, fields) => {
            console.log("programkodu:"+programkodu);
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



    exports.programAnalitleriListele = (req, res, next) => {

        var idProgramAnalitleri = [];
        db.con.connect((err) => {
            const programkod=req.params.programanalitkod;
            idProgramAnalitleri.push(String(req.params.programanalitkod));
            console.log(String(req.params.programanalitkod));
            var sql = "Select tpa.programanalitlerikod,tp.programadi,tpa.programkod,ta.analitmarka,ta.analitkod from tblprogramanalitleri tpa left join tblprogramlar tp on tpa.programkod = tp.programkod left join tblanalitler ta on tpa.analitkod=ta.analitkod where tpa.programkod='"+programkod+"' order by tpa.kayittarihi desc";
        
            db.con.query(sql, idProgramAnalitleri, (err, dbrows, fields) => {
                if (err) {
                    console.log('Hata:' + err.toString());
        
                    //res.render('./error.html',{result:'',partials:partials});
                }
                else {
                    idProgramAnalitleri = dbrows;
                    console.log(dbrows+" fatih edildi");
                 
                    res.render('./partials/modeller/programanalitlerimodal.html', { programAnalitleriListesi: dbrows })
                }
            });
        });
        db.con.end;
        return idProgramAnalitleri;
        }



        exports.programAnalitiSilme = (req, res, next) => {
            db.con.connect((err) => {
            
                var idProgramAnalitleri = [];
                idProgramAnalitleri.push(String(req.params.programanalitleriid));
                var sql = "Delete from tblprogramanalitleri where programanalitlerikod=?";
            
                db.con.query(sql, idProgramAnalitleri, (err, dbrows, fields) => {
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
            
    
    