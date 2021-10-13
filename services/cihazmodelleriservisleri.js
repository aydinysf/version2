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


exports.cihazModelListele = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    var code = req.params.code;
    db.con.connect((err) => {

        var sql = "Select tcm.cihazmodeladi,tc.cihazmarkasi,tcm.cihazmodelkod,tc.cihazkod from tblcihazmodelleri tcm left join tblcihazlar tc on tcm.cihazkod=tc.cihazkod where tcm.cihazkod='" + code + "' order by tcm.kayittarihi desc";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                // res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./cihazmodeli.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}

exports.cihazmodelkaydet = (req, res, next) => {
    db.con.connect((err) => {
        const cihazmodelkodu = crypto.randomBytes(16).toString("hex");
        const cihazkodu = req.params.cihazkod;
        const cihazadi = req.params.modelname;
        var sql = "INSERT INTO tblcihazmodelleri(cihazmodelkod,cihazkod,cihazmodeladi,kayittarihi) VALUES('" + cihazmodelkodu + "','" + cihazkodu + "','" + cihazadi + "',now())";
        console.log("cihazkodu :" + cihazkodu);
        console.log("cihazadı :" + cihazadi);
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                console.log(err.toString());
                //res.render('./error.html',{result:'',partials:partials});
            }
            else {
                // res.render('./devices.html', { result: dbrows, partials: partials })

                console.log("Basarili");
            }
        });
    });
    db.con.end;
}
exports.cihazlariSil = (req, res, next) => {
    db.con.connect((err) => {
        var idCihaz = [];
        idCihaz.push(String(req.params.kodcihaz));
        var sql = "Delete from tblcihazlar where cihazkod=?";

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



// exports.cihazlaraModelYukle = (req, res, next) => {
//     res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
//     var code=req.params.code;
//     db.con.connect((err) => {
//         var sql = "Select tcm.cihazmodeladi,tc.cihazmarkasi,tcm.cihazmodelkod,tc.cihazkod from tblcihazmodelleri tcm left join tblcihazlar tc on tcm.cihazkod=tc.cihazkod where tcm.cihazkod='"+code+"' order by tcm.kayittarihi desc";
//         db.con.query(sql, (err, dbrows, fields) => {
//             if (err) {
//                // res.render('./error.html', { result: '', partials: partials });
//             }
//             else {
//                 res.render('./cihazmodeli.html', { result: dbrows, partials: getPartials()});
//             }

//         });
//         db.con.end;
//     });

// }
exports.cihazlaraModelYukle = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    var code = req.params.code;
    db.con.connect((err) => {

        var sql = "Select tcm.cihazmodeladi,tc.cihazmarkasi,tcm.cihazmodelkod,tc.cihazkod from tblcihazmodelleri tcm left join tblcihazlar tc on tcm.cihazkod=tc.cihazkod where tcm.cihazkod='" + code + "' order by tcm.kayittarihi desc";
        db.con.query(sql, (err, dbrows, fields) => {
            if (err) {
                // res.render('./error.html', { result: '', partials: partials });
            }
            else {
                res.render('./cihazmodeli.html', { result: dbrows })
            }

        });
        db.con.end;
    });
}