const express = require('express');
const app = express();
const cors = require('cors');
const { json, urlencoded} = require('body-parser');
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const slugJson = require('./slug.json');

app.get('/test', function(req, res){
    res.send(slugJson.info);
});

app.get('/slugApi/:slug', function(req, res){
    console.log('>>>>>', req.params);
    const {slug} = req.params;
    const selectedItem = slugJson.info.find(item => item.slug === slug) || {moduleName: 'Module Name Not Found'};
    res.send(selectedItem);
});

app.listen(3000, function () {
    console.info(`server started on port 3000`);
});
