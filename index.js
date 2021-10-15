const express = require('express');
const engines = require('consolidate');
const cors = require('cors')({ origin: true });
const mysql = require("mysql");
const path = require('path');


const app = express();


const cihazservisleri = require("./services/cihazservisleri");
const cihazmodellerigrubuservisleri = require("./services/cihazmodellerigrubuservisleri");
const cihazmodelleriservisleri = require("./services/cihazmodelleriservisleri");
const kurumservisleri = require("./services/kurumservisleri");
const kitservisleri = require("./services/kitservisleri");
const programservisleri = require("./services/programservisleri");
const analitservisleri = require("./services/analitservisleri");
const kullaniciservisleri = require("./services/kullanicilarservisleri");
const kullaniciTipleriservisleri = require("./services/kullanicitipleriservisleri");
const numunelerservisleri = require("./services/numunelerservisleri");
const birimtanimlamaservices = require("./services/birimtanimlamservices");
const kitmetodlariservisleri = require("./services/kitmetodservisleri");
const loginservisler = require("./services/login");
app.engine('html', engines.handlebars);

app.set('views', './views');

app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

function getPartials() {
  var partials = {
    menu: './partials/menu',
    foot: './partials/foot',
    metas: './partials/metas'
  };

  return partials;
}



app.post('/login', (req, res,next) => {
  //res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  //res.render('mainpage', null);
  loginservisler.login(req, res, next);
});

app.get('/kurumlar/:kodkurum', (req, res, next) => {
  kurumservisleri.kurumlariSil(req, res, next);
  kurumservisleri.kurumlariListele(req, res, next);
});

app.get('/kurumlar', (req, res, next) => {
  kurumservisleri.kurumlariListele(req, res, next);
});
app.post('/kurumlar', (req, res, next) => {
  kurumservisleri.kurumEkle(req, res, next);
  kurumservisleri.kurumlariListele(req, res, next);
});



/// Kurum Programlari
app.get('/kurumprogramlari/:kurumprogramkod', (req, res, next) => {
  kurumservisleri.kurumProgramiListele(req, res, next);
});


app.post('/kurumprogramlari', (req, res, next) => {
  kurumservisleri.kurumaProgramEkle(req, res, next);
  kurumservisleri.kurumProgramiListele(req, res, next);
});

app.get('/kurumprogramlarisilme/:kurumprogramlariid', (req, res, next) => {
  kurumservisleri.kurumProgramıSilme(req, res, next);
  kurumservisleri.kurumProgramiListele(req, res, next);
});



app.get('/programAdiYukle', (req, res, next) => {
  kurumservisleri.programYukle(req, res, next);

});


/// Kurum Kisileri

app.get('/kurumkullanicilari/:kurumkullanicilarikod', (req, res, next) => {
  kurumservisleri.kurumKisileriListele(req, res, next);
});

app.post('/kurumkullanicilari', (req, res, next) => {
  kurumservisleri.kurumaKisiEkle(req, res, next);
  kurumservisleri.kurumKisileriListele(req, res, next);
});
app.get('/kurumkullanicilarisilme/:kurumkullanicilariid', (req, res, next) => {
  kurumservisleri.kurumKisileriSilme(req, res, next);
  kurumservisleri.kurumKisileriListele(req, res, next);
});


app.get('/kullaniciYukleme', (req, res, next) => {
  kurumservisleri.kullaniciYukle(req, res, next);
});


// Kurum Cihazlari


app.get('/kurumlaraCihazMarkasiYukleme', (req, res, next) => {
  kurumservisleri.kurumaCihazMarkasiYukle(req, res, next);
});

app.get('/cihazModeliYukleme', (req, res, next) => {
  kurumservisleri.kurumaCihazModeliYukle(req, res, next);
});


app.post('/kurumcihazlari', (req, res, next) => {
  kurumservisleri.kurumaCihazEkle(req, res, next);
  kurumservisleri.kurumCihazlariListele(req, res, next);

});


app.get('/kurumcihazlari/:kurumcihazlarikod', (req, res, next) => {
  kurumservisleri.kurumCihazlariListele(req, res, next);
});

app.get('/kurumcihazlarisilme/:kurumcihazlariid', (req, res, next) => {
  kurumservisleri.kurumCihazlariSilme(req, res, next);
  kurumservisleri.kurumCihazlariListele(req, res, next);
});



// Cihazlar
app.get('/cihazlar/:kodcihaz', (req, res, next) => {
  cihazservisleri.cihazlariSil(req, res, next);
  cihazservisleri.cihazlariListele(req, res, next);
});
app.get('/cihazlar', (req, res, next) => {
  cihazservisleri.cihazlariListele(req, res, next);
});

app.post('/cihazlar', (req, res, next) => {
  cihazservisleri.cihazlariKaydet(req, res, next);
  cihazservisleri.cihazlariListele(req, res, next);
});



// Cihaz Model Atama

app.get('/cihazmodel/:cihazkod', (req, res, next) => {
  cihazservisleri.cihazaModelListele(req, res, next);
});

app.post('/cihazmodel', (req, res, next) => {
  cihazservisleri.cihazaModelEkle(req, res, next);
  cihazservisleri.cihazaModelListele(req, res, next);
});

app.get('/cihazmodelsilme/:cihazmodelid', (req, res, next) => {
  cihazservisleri.ModelSilme(req, res, next);
  cihazservisleri.cihazaModelListele(req, res, next);
});









app.get('/cihazmodellerigrubu/:kodcihazmodelgrup', (req, res, next) => {
  cihazmodellerigrubuservisleri.CihazModelleriSilme(req, res, next);
  cihazmodellerigrubuservisleri.cihazmodelleriGrubuListele(req, res, next);
});
app.get('/cihazmodellerigrubu', (req, res, next) => {
  cihazmodellerigrubuservisleri.cihazmodelleriGrubuListele(req, res, next);
});

app.post('/cihazmodellerigrubu', (req, res, next) => {
  cihazmodellerigrubuservisleri.cihazModelleriGrubuKaydet(req, res, next);
  cihazmodellerigrubuservisleri.cihazmodelleriGrubuListele(req, res, next);
});





// Kitler

app.get('/kitler/:kodkit', (req, res, next) => {
  kitservisleri.kitSil(req, res, next);
  kitservisleri.kitListele(req, res, next);
});
app.get('/kitler', (req, res, next) => {
  kitservisleri.kitListele(req, res, next);
});

app.post('/kitler', (req, res, next) => {
  kitservisleri.kitEkle(req, res, next);
  kitservisleri.kitListele(req, res, next);
});

// Kitlere Katolog Ekle

app.post('/kitkatologlari', (req, res, next) => {
  kitservisleri.kitlereKatalogEkle(req, res, next);
  kitservisleri.kitKatologlariListele(req, res, next);

});

app.get('/kitkatologlari/:kitkatologkod', (req, res, next) => {
  kitservisleri.kitKatologlariListele(req, res, next);
});


app.get('/kitkatologlarisilme/:kitkatologid', (req, res, next) => {
  kitservisleri.KitKatologSilme(req, res, next);
  kitservisleri.kitKatologlariListele(req, res, next);
});


// Programlar
app.get('/programlar/:kodprogram', (req, res, next) => {
  programservisleri.programSil(req, res, next);
  programservisleri.programListele(req, res, next);
});
app.get('/programlar', (req, res, next) => {
  programservisleri.programListele(req, res, next);
});

app.post('/programlar', (req, res, next) => {
  programservisleri.programEkle(req, res, next);
  programservisleri.programListele(req, res, next);
});

// Programa Analit Yukleme

app.get('/analitMarkasiYukle', (req, res, next) => {
  programservisleri.analitYukle(req, res, next);

});

app.post('/programanalitleri', (req, res, next) => {
  programservisleri.programaAnalitEkleme(req, res, next);
  programservisleri.programAnalitleriListele(req, res, next);

});


app.get('/programanalitleri/:programanalitkod', (req, res, next) => {
  programservisleri.programAnalitleriListele(req, res, next);
});

app.get('/programanalitlerisilme/:programanalitleriid', (req, res, next) => {
  programservisleri.programAnalitiSilme(req, res, next);
  programservisleri.programAnalitleriListele(req, res, next);
});


// ANalitler
app.get('/analitler/:kodanalit', (req, res, next) => {
  analitservisleri.analitSil(req, res, next);
  analitservisleri.analitListele(req, res, next);
});
app.get('/analitler', (req, res, next) => {
  analitservisleri.analitListele(req, res, next);
});

app.post('/analitler', (req, res, next) => {
  analitservisleri.analitEkle(req, res, next);
  analitservisleri.analitListele(req, res, next);
});


app.get('/kullanicilar/:kodkullanici', (req, res, next) => {
  kullaniciservisleri.kullaniciSil(req, res, next);
  kullaniciservisleri.kullanicilariListele(req, res, next);
});
app.get('/kullanicilar', (req, res, next) => {
  kullaniciservisleri.kullanicilariListele(req, res, next);
});

app.post('/kullanicilar', (req, res, next) => {
  kullaniciservisleri.kullaniciEkle(req, res, next);
  kullaniciservisleri.kullanicilariListele(req, res, next);
});

app.get('/kullaniciTipiYukle', (req, res, next) => {
  kullaniciservisleri.kullaniciTipiYukle(req, res, next);


});


app.get('/kullanicitipleri/:kodkullanicitipi', (req, res, next) => {
  kullaniciTipleriservisleri.kullaniciTipiSil(req, res, next);
  kullaniciTipleriservisleri.kullaniciTipiListele(req, res, next);
});
app.get('/kullanicitipleri', (req, res, next) => {
  kullaniciTipleriservisleri.kullaniciTipiListele(req, res, next);
});

app.post('/kullanicitipleri', (req, res, next) => {
  kullaniciTipleriservisleri.kullaniciTipiKaydet(req, res, next);
  kullaniciTipleriservisleri.kullaniciTipiListele(req, res, next);
});


app.get('/kitmetodlari/:kodkitmetod', (req, res, next) => {
  kitmetodlariservisleri.kitMetodSil(req, res, next);
  kitmetodlariservisleri.kitMetodListele(req, res, next);
});
app.get('/kitmetodlari', (req, res, next) => {
  kitmetodlariservisleri.kitMetodListele(req, res, next);
});

app.post('/kitmetodlari', (req, res, next) => {
  kitmetodlariservisleri.kitMetodKaydet(req, res, next);
  kitmetodlariservisleri.kitMetodListele(req, res, next);
});




app.get('/numuneler/:kodnumune', (req, res, next) => {
  numunelerservisleri.numuneSilme(req, res, next);
  numunelerservisleri.numuneListele(req, res, next);
});
app.get('/numuneler', (req, res, next) => {
  numunelerservisleri.numuneListele(req, res, next);
});

app.post('/numuneler', (req, res, next) => {
  numunelerservisleri.numuneEkleme(req, res, next);
  numunelerservisleri.numuneListele(req, res, next);
});



app.get('/birimtanimlama/:codebirim', (req, res, next) => {
  birimtanimlamaservices.birimSilme(req, res, next);
  birimtanimlamaservices.birimListeleme(req, res, next);
});
app.get('/birimtanimlama', (req, res, next) => {
  birimtanimlamaservices.birimListeleme(req, res, next);
});

app.post('/birimtanimlama', (req, res, next) => {
  birimtanimlamaservices.birimKaydetme(req, res, next);
  birimtanimlamaservices.birimListeleme(req, res, next);
});










app.get('/', (req, res) => {
  //res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  //res.render('mainpage', null);
  res.render('loginpage', { partials: getPartials() });
});


app.get('/yonetim-paneli', (req, res) => {
  //res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  //res.render('mainpage', null);
  res.render('mainpage', { partials: getPartials() });
});


app.get('/kurumlar', (req, res) => {
  //res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  //res.render('mainpage', null);
  res.render('kurumlar', { partials: getPartials() });
});

app.get('/cihazlar', (req, res) => {
  res.render('cihazlar', { partials: getPartials() });
});

app.get('/kitler', (req, res) => {
  res.render('kitler', { partials: getPartials() });
});

app.get('/programlar', (req, res) => {
  res.render('programlar', { partials: getPartials() });
});
app.get('/analitler', (req, res) => {
  res.render('analitler', { partials: getPartials() });
});

app.get('/kullanicilar', (req, res) => {
  res.render('kullanicilar', { partials: getPartials() });
});

app.get('/kullanicitipleri', (req, res) => {
  res.render('kullanicitipleri', { partials: getPartials() });
});

app.get('/kitmetodlari', (req, res) => {
  res.render('kitmetodlari', { partials: getPartials() });
});

app.get('/numuneler', (req, res) => {
  res.render('numuneler', { partials: getPartials() });
});

app.get('/cihazmodellerigrubu', (req, res) => {
  res.render('cihazmodellerigrubu', { partials: getPartials() });
});

app.get('/birimtanimlama', (req, res) => {
  res.render('birimtanimlama', { partials: getPartials() });
});





app.get('/kurumlarkisiata', (req, res) => {
  res.render("kurumlarakisiata", { partials: getPartials() });
});


app.get('/kurumlaraprogramata', (req, res) => {
  res.render("kurumlaraprogramatama", { partials: getPartials() });
});

app.get('/kurumlaracihazata', (req, res) => {
  res.render("kurumlaracihazatama", { partials: getPartials() });
});


app.get('/cihazamodelatama', (req, res) => {
  res.render("cihazamodelatama", { partials: getPartials() });
});

app.get('/kitlerekatologekleme', (req, res) => {
  res.render("kitlerekatologekleme", { partials: getPartials() });
});

app.get('/programlaracihazekleme', (req, res) => {
  res.render("programlaracihazekleme", { partials: getPartials() });
});

app.get('/programlaraanalitekleme', (req, res) => {
  res.render("programlaraanalitekleme", { partials: getPartials() });
});

app.get('/programlaratestdonemleriekleme', (req, res) => {
  res.render("programlaratestdonemleriekleme", { partials: getPartials() });
});

app.get('/analitlerebirimekleme', (req, res) => {
  res.render("analitlerebirimekleme", { partials: getPartials() });
});


app.get("/analitkitekle", (req, res) => {
  res.render("analitkitekle", { partials: getPartials() });
})




app.listen(5000, () => console.log('App is listening on url http://localhost:5000'));
