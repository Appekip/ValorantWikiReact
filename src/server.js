const express = require ('express');
dbOperation = require('./dbFile/dbOperations');

dbOperation.getDB().then (res => {
    console.log(res)
})