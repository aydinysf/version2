var mysql = require('mysql');
var http=require('http');
const { response } = require('express');
var con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"biyomed_db"
});
con.connect();

exports.con=con;
