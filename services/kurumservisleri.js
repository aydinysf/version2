const db = require('../database_method');
const crypto = require("crypto");
const bodyParser = require('body-parser');
const cons = require('consolidate');

function getPartials() {
    var partials = {
        menu: './partials/menu',
        foot: './partials/foot',
        metas: './partials/metas'
    };

    return partials;
}






exports.kurumlariListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {
        var sql = "Select * from tblkurumlar";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
               //res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./kurumlar.html', { result: dbrows, partials: getPartials() })
                
            }

        });
        db.con.end;
    });
}

exports.kurumEkle =(req,res,next) =>{
    db.con.connect((err)=>{
        const kurumkod = crypto.randomBytes(16).toString("hex")
        var sql="INSERT INTO tblkurumlar(kurumkod,kurumadi,kurumadresi, kurumsevkadresi, kurumaktiflik) VALUES('"+kurumkod+"','"+req.body.kurumadi+"','"+req.body.kurumadresi+"','"+req.body.kurumsevkadresi+"','"+req.body.kurumaktiflik+"')";
        
        var postedFields=[kurumkod,req.body.kurumadi,req.body.kurumadresi,req.body.kurumsevkadresi,req.body.isactive];
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                //console.log("Corporation Code : "+kurumkod+" - corporation name :"+req.body.kurumadi+" - corporation address :"+req.body.kurumsevkadresi+" - corporation invoiceaddress :"+req.body.kurumsevkadresi+" - corporation isactive :"+req.body.isactive)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./kurumlar.html', { result: dbrows, partials: partials })
                
            }
        });
    });
    db.con.end;
}

exports.kurumlariSil = (req,res,next)=>{
    db.con.connect((err)=>{

        var idKurum = [];
        idKurum.push(String(req.params.kodkurum));
        var sql="Delete from tblkurumlar where kurumkod=?";

        db.con.query(sql,idKurum,(err,dbrows,fields)=>{
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




exports.programYukle = (req, res, next) => {

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {

        var sql = "SELECT programkod,programadi FROM tblprogramlar";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./partials/modeller/programAdiYukle.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}




/////////// Kuruma Program Eklemee
exports.kurumaProgramEkle =(req,res,next) =>{
    db.con.connect((err)=>{

        const kurumprogramkodu = crypto.randomBytes(16).toString("hex");
        const kurumkodu=req.body.kurumkodu;
        const programkodu =req.body.programkod;
        const programadeti =req.body.programadeti;
        const ro=req.body.ro;
        console.log("kurumkod : "+kurumkodu+" programkodu : "+ programkodu+" programadeti :"+programadeti +" ro :"+ro);
        var sql="INSERT INTO tblkurumprogramlari (kurumprogramlarikod, kurumkod, programkod, kayittarihi, programadeti,ro)";
        sql=sql+" VALUES('"+kurumprogramkodu+"','"+kurumkodu+"','"+programkodu+"',"+"now(),"+programadeti+","+ro+")";
        
        
        db.con.query(sql,(err,dbrows,fields)=>{
            if(err){
                console.log(err.toString());
                
                //console.log("Corporation Code : "+kurumkod+" - corporation name :"+req.body.kurumadi+" - corporation address :"+req.body.kurumsevkadresi+" - corporation invoiceaddress :"+req.body.kurumsevkadresi+" - corporation isactive :"+req.body.isactive)
                //res.render('./error.html',{result:'',partials:partials});
            }
            else{
                //res.render('./kurumlar.html', { result: dbrows, partials: partials })
                console.log("Kurum eklendi");
            }
        });
    });
    db.con.end;
}




    
/*
exports.kurumProgramiListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    const kurumkod=req.params.kurumkod;
    const sq="select tkp.kurumprogramlarikod,tk.kurumadi,tkp.kurumkod,tp.programadi,tp.programkod,tkp.programadeti,tkp.ro from tblkurumprogramlari tkp left join tblkurumlar tk on tkp.kurumkod = tk.kurumkod left join tblprogramlar tp on tkp.programkod=tp.programkod where tkp.kurumkod='"+kurumkod+"' order by tkp.kayittarihi desc";
    db.con.connect((err) => {
        var sql = "Select * from tblkurumlar";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
               //res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./partials/modeller/kurumprogramlarimodal.html', { result: dbrows})
                
            }

        });
        db.con.end;
    });
} 
*/

exports.kurumProgramiListele = (req, res, next) => {

    var idKurumPrograms = [];
    db.con.connect((err) => {
        const kurumkod=req.params.kurumprogramkod;
        idKurumPrograms.push(String(req.params.kurumprogramkod));
        console.log(String(req.params.kurumprogramkod));
        var sql = "Select tkp.kurumprogramlarikod,tk.kurumadi,tkp.kurumkod,tp.programadi,tp.programkod,tkp.programadeti,tkp.ro from tblkurumprogramlari tkp left join tblkurumlar tk on tkp.kurumkod = tk.kurumkod left join tblprogramlar tp on tkp.programkod=tp.programkod where tkp.kurumkod='"+kurumkod+"' order by tkp.kayittarihi desc";
    
        db.con.query(sql, idKurumPrograms, (err, dbrows, fields) => {
            if (err) {
                console.log('Hata:' + err.toString());
    
                //res.render('./error.html',{result:'',partials:partials});
            }
            else {
                idKurumPrograms = dbrows;
                console.log(dbrows+" fatih edildi");
             
                res.render('./partials/modeller/kurumprogramlarimodal.html', { kurumProgramlariListesi: dbrows })
            }
        });
    });
    db.con.end;
    return idKurumPrograms;
    }


    exports.kurumProgramıSilme = (req, res, next) => {
        db.con.connect((err) => {
        
            var idKurumProgramlari = [];
            idKurumProgramlari.push(String(req.params.kurumprogramlariid));
            var sql = "Delete from tblkurumprogramlari where kurumprogramlarikod=?";
        
            db.con.query(sql, idKurumProgramlari, (err, dbrows, fields) => {
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
        




        //////////////////Kurumlara Kisi Ekleme

        exports.kurumaKisiEkle =(req,res,next) =>{
            db.con.connect((err)=>{
        
                const kurumkullanicikodu = crypto.randomBytes(16).toString("hex");
                const kurumkodu=req.body.kurumkodu;
                const kullanicikodu =req.body.kullanicikodu;
          
                console.log("kurumkod : "+kurumkodu+" kullanicikodu : "+ kullanicikodu);
                var sql="INSERT INTO tblkurumkullanicilari (kurumkullanicilarikod, kurumkod, kullanicikod, kayittarihi)";
                sql=sql+" VALUES('"+kurumkullanicikodu+"','"+kurumkodu+"','"+kullanicikodu+"',"+"now())";
                
                
                db.con.query(sql,(err,dbrows,fields)=>{
                    if(err){
                        console.log(err.toString());
                        
                        //console.log("Corporation Code : "+kurumkod+" - corporation name :"+req.body.kurumadi+" - corporation address :"+req.body.kurumsevkadresi+" - corporation invoiceaddress :"+req.body.kurumsevkadresi+" - corporation isactive :"+req.body.isactive)
                        //res.render('./error.html',{result:'',partials:partials});
                    }
                    else{
                        //res.render('./kurumlar.html', { result: dbrows, partials: partials })
                        console.log("Kisi eklendi");
                    }
                });
            });
            db.con.end;
        }


        exports.kullaniciYukle = (req, res, next) => {

            res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
            db.con.connect((err) => {
        
                var sql = "SELECT kullanicikod,kullaniciadi FROM tblkullanicilar";
                db.con.query(sql, (err, dbrows, fields) => {
                    if (err) {
                        res.render('./error.html', { result: '', partials: partials });
                    }
                    else {
                        res.render('./partials/modeller/kullaniciYukleme.html', { result: dbrows })
                    }
        
                });
                db.con.end;
            });
        }
        
        
        
        
        exports.kurumKisileriListele = (req, res, next) => {

            var idKurumKisileri = [];
            db.con.connect((err) => {
                const kurumkod=req.params.kurumkullanicilarikod;
                idKurumKisileri.push(String(req.params.kurumkullanicilarikod));
                console.log(String(req.params.kurumkullanicilarikod));
                var sql = "Select tkk.kurumkullanicilarikod,tk.kurumadi,tkk.kurumkod,tki.kullaniciadi,tki.kullanicikod from tblkurumkullanicilari tkk left join tblkurumlar tk on tkk.kurumkod = tk.kurumkod left join tblkullanicilar tki on tkk.kullanicikod=tki.kullanicikod where tkk.kurumkod='"+kurumkod+"' order by tkk.kayittarihi desc";
            
                db.con.query(sql, idKurumKisileri, (err, dbrows, fields) => {
                    if (err) {
                        console.log('Hata:' + err.toString());
            
                        //res.render('./error.html',{result:'',partials:partials});
                    }
                    else {
                        idKurumKisileri = dbrows;
                        console.log(dbrows+" fatih edildi");
                        
                        res.render('./partials/modeller/kurumkullanicilarimodal.html', { kurumKisileriListesi: dbrows })
                    }
                });
            });
            db.con.end;
            return idKurumKisileri;
            }

                    
  
            exports.kurumKisileriSilme = (req, res, next) => {
                db.con.connect((err) => {
                
                    var idKurumKisileri = [];
                    idKurumKisileri.push(String(req.params.kurumkullanicilariid));
                    var sql = "Delete from tblkurumkullanicilari where kurumkullanicilarikod=?";
                
                    db.con.query(sql, idKurumKisileri, (err, dbrows, fields) => {
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



///////////////////////////////////////////// Kurum Cihazlari



exports.kurumaCihazMarkasiYukle = (req, res, next) => {

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {

        var sql = "SELECT cihazkod,cihazmarkasi FROM tblcihazlar";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./partials/modeller/kurumlaraCihazMarkasiYukleme.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}





exports.kurumaCihazModeliYukle = (req, res, next) => {

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.con.connect((err) => {

        var sql = "SELECT cihazmodelkod,cihazmodeladi FROM tblcihazmodelleri";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./partials/modeller/kurumlaraCihazModeliYukleme.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}





exports.kurumaCihazEkle =(req,res,next) =>{
    db.con.connect((err)=>{

        const kurumkullanicikodu = crypto.randomBytes(16).toString("hex");
        const kurumkodu=req.body.kurumkodu;
        const cihazkodu =req.body.cihazkodu;
        const cihazmodelkodu=req.body.cihazmodelkodu;
         console.log("dsasdadsasd");
        console.log("kurumkod : "+kurumkodu+" kullanicikodu : "+ cihazkodu+ "cihazmodelkodu: " + cihazmodelkodu);
        var sql="INSERT INTO tblkurumcihazlari (kurumcihazkod, kurumkod, cihazkod, cihazmodelkod,kayittarihi)";
        sql=sql+" VALUES('"+kurumkullanicikodu+"','"+kurumkodu+"','"+cihazkodu+"', '"+cihazmodelkodu+"',"+"now())";
        
        
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




exports.kurumCihazlariListele = (req, res, next) => {

    var idKurumCihazlari = [];
    db.con.connect((err) => {
        const kurumkod=req.params.kurumcihazlarikod;
        idKurumCihazlari.push(String(req.params.kurumcihazlarikod));
        console.log(String(req.params.kurumcihazlarikod));
        var sql = "Select tkc.kurumcihazkod,tk.kurumadi,tkc.kurumkod,tc.cihazmarkasi,tc.cihazkod,tcm.cihazmodeladi,tcm.cihazmodelkod from tblkurumcihazlari tkc left join tblkurumlar tk on tkc.kurumkod = tk.kurumkod  left join tblcihazlar tc on tkc.cihazkod=tc.cihazkod left join tblcihazmodelleri tcm on tkc.cihazmodelkod=tcm.cihazmodelkod where tkc.kurumkod='"+kurumkod+"' order by tkc.kayittarihi desc";
    
        db.con.query(sql, idKurumCihazlari, (err, dbrows, fields) => {
            if (err) {
                console.log('Hata:' + err.toString());
    
                //res.render('./error.html',{result:'',partials:partials});
            }
            else {
                idKurumCihazlari = dbrows;
                console.log(dbrows+" fatih edildi");
                
                res.render('./partials/modeller/kurumcihazlarimodal.html', { kurumCihazlariListesi: dbrows })
            }
        });
    });
    db.con.end;
    return idKurumCihazlari;
    }


    exports.kurumCihazlariSilme = (req, res, next) => {
        db.con.connect((err) => {
        
            var idKurumCihazlari = [];
            idKurumCihazlari.push(String(req.params.kurumcihazlariid));
            var sql = "Delete from tblkurumcihazlari where kurumcihazkod=?";
        
            db.con.query(sql, idKurumCihazlari, (err, dbrows, fields) => {
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