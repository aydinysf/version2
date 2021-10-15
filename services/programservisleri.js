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
        var sql = "INSERT INTO tblprogramlar(programkod,programadi,programkodu,kayittarihi) VALUES('" + programkodu + "','" + req.body.programadi + "','" + req.body.programkodu + "',now())";

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
    var sql= "INSERT INTO tblprogramanalitleri(programanalitlerikod,programkod,analitkod,kayittarihi)";
    sql = sql+ "VALUES('"+programanalitlerikod+"','"+programkodu+"','"+analitkod+"',"+"now())" ;
        
  
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
            
    
    //////////////////// Program Test Donemi Ekleme


    exports.numuneMarkasiYukle = (req, res, next) => {

        res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        db.con.connect((err) => {
    
            var sql = "SELECT numunekod,numunead FROM tblnumuneler";
            db.con.query(sql, (err, dbrows, fields) => {
                if (err) {
                    res.render('./error.html', { result: '', partials: partials });
                }
                else {
                    res.render('./partials/modeller/numuneMarkasiYukle.html', { result: dbrows })
                }
    
            });
            db.con.end;
        });
    }
    


    exports.programaTestDonemiEkleme = (req, res, next) => {


        db.con.connect((err) => {
        const programtestdonemkod = crypto.randomBytes(16).toString("hex");
        const programkodu=req.body.programkodu;
        const testdonemkod=req.body.testdonemkod;
        const numunekod=req.body.numunekod;
        const numuneadet=req.body.numuneadet;
        console.log("programkodu:" + programkodu +"testdonemkod:" + testdonemkod + "numunekod" +numunekod +"numuneadet" +numuneadet);
        var sql= "INSERT INTO tblprogramtestdonemleri(programtestdonemkod,programkod,testdonemkod,numunekod,numuneadet,kayittarihi)";
        sql = sql+ "VALUES('"+programtestdonemkod+"','"+programkodu+"','"+testdonemkod+"','"+numunekod+"','"+numuneadet+"',  "+"now())" ;
            
      
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



        exports.programTestDonemiListele = (req, res, next) => {

            var idProgramTestDonemleri = [];
            db.con.connect((err) => {
                const programkod=req.params.programtestdonemikod;
                idProgramTestDonemleri.push(String(req.params.programtestdonemikod));
                console.log(String(req.params.programtestdonemikod));
                var sql = "Select tptd.programtestdonemkod,tp.programadi,tptd.programkod,tptd.testdonemkod,tptd.numuneadet,tn.numunead,tn.numunekod from tblprogramtestdonemleri tptd left join tblprogramlar tp on tptd.programkod = tp.programkod left join tblnumuneler tn on tptd.numunekod=tn.numunekod where tptd.programkod='"+programkod+"' order by tptd.kayittarihi desc";
            
                db.con.query(sql, idProgramTestDonemleri, (err, dbrows, fields) => {
                    if (err) {
                        console.log('Hata:' + err.toString());
            
                        //res.render('./error.html',{result:'',partials:partials});
                    }
                    else {
                        idProgramTestDonemleri = dbrows;
                        console.log(dbrows+" fatih edildi");
                     
                        res.render('./partials/modeller/programtestdonemlerimodal.html', { programTestDonemleriListesi: dbrows })
                    }
                });
            });
            db.con.end;
            return idProgramTestDonemleri;
            }


            
        exports.programTestDonemiSilme = (req, res, next) => {
            db.con.connect((err) => {
            
                var idProgramTestDonemleri = [];
                idProgramTestDonemleri.push(String(req.params.programtestdonemleriid));
                var sql = "Delete from tblprogramtestdonemleri where programtestdonemkod=?";
            
                db.con.query(sql, idProgramTestDonemleri, (err, dbrows, fields) => {
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





          /// Programa Cihaz Atama
          
          

          

          exports.programaCihazMarkasiYukle = (req, res, next) => {

            res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
            db.con.connect((err) => {
        
                var sql = "SELECT cihazkod,cihazmarkasi FROM tblcihazlar";
                db.con.query(sql, (err, dbrows, fields) => {
                    if (err) {
                        res.render('./error.html', { result: '', partials: partials });
                    }
                    else {
                        res.render('./partials/modeller/programaCihazMarkasiYukleme.html', { result: dbrows })
                    }
        
                });
                db.con.end;
            });
        }
        
        



exports.programaCihazModeliYukle = (req, res, next) => {

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {

        var sql = "SELECT cihazmodelkod,cihazmodeladi FROM tblcihazmodelleri";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./partials/modeller/programaCihazModeliYukleme.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}




exports.programaCihazEkleme =(req,res,next) =>{
    db.con.connect((err)=>{

        const programcihazkod = crypto.randomBytes(16).toString("hex");
        const programkodu=req.body.programkodu;
        const cihazkodu =req.body.cihazkodu;
        const cihazmodelkodu=req.body.cihazmodelkodu;
        
        console.log("programkodu : "+programkodu+" cihazkodu : "+ cihazkodu+ "cihazmodelkodu: " + cihazmodelkodu);
        var sql="INSERT INTO tblprogramcihazlari (programcihazkod, programkod, cihazkod, cihazmodelkod,kayittarihi)";
        sql=sql+" VALUES('"+programcihazkod+"','"+programkodu+"','"+cihazkodu+"', '"+cihazmodelkodu+"',"+"now())";
        
        
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
         
                //console.log("Corporation Code : "+kurumkod+" - corporation name :"+req.body.kurumadi+" - corporation address :"+req.body.kurumsevkadresi+" - corporation invoiceaddress :"+req.body.kurumsevkadresi+" - corporation isactive :"+req.body.isactive)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./kurumlar.html', { result: dbrows, partials: partials })
                console.log("Cihaz  eklendi");
            }
        });
    });
    db.con.end;
}





exports.programCihazlariListele = (req, res, next) => {

    var idProgramCihazlari = [];
    db.con.connect((err) => {
        const programkod=req.params.programcihazlarikod;
        idProgramCihazlari.push(String(req.params.programcihazlarikod));
        console.log(String(req.params.programcihazlarikod));
        var sql = "Select tpc.programcihazkod,tp.programadi,tpc.programkod,tc.cihazmarkasi,tc.cihazkod,tcm.cihazmodeladi,tcm.cihazmodelkod from tblprogramcihazlari tpc left join tblprogramlar tp on tpc.programkod = tp.programkod  left join tblcihazlar tc on tpc.cihazkod=tc.cihazkod left join tblcihazmodelleri tcm on tpc.cihazmodelkod=tcm.cihazmodelkod where tpc.programkod='"+programkod+"' order by tpc.kayittarihi desc";
    
        db.con.query(sql, idProgramCihazlari, (err, dbrows, fields) => {
            if (err) {
                console.log('Hata:' + err.toString());
    
                //res.render('./error.html',{result:'',partials:partials});
            }
            else {
                idProgramCihazlari = dbrows;
                console.log(dbrows+" Program Cihazi  kAYDEDİLDİ");
                
                res.render('./partials/modeller/programcihazlarimodal.html', { programCihazlariListesi: dbrows })
            }
        });
    });
    db.con.end;
    return idProgramCihazlari;
    }


    
            
    exports.programCihaziSilme = (req, res, next) => {
        db.con.connect((err) => {
        
            var idProgramCihazlari = [];
            idProgramCihazlari.push(String(req.params.programcihazlariid));
            var sql = "Delete from tblprogramcihazlari where programcihazkod=?";
        
            db.con.query(sql, idProgramCihazlari, (err, dbrows, fields) => {
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

