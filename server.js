const express = require('express');
const app = express();
const config = require('./config.js');
const axios = require('axios');

var canRequest = true;
function getPublicEntryAllowed(groupId){
    return new Promise((resolve, reject) => {
        if(canRequest != true){ setTimeout(() => {resolve(getPublicEntryAllowed(groupId))}, 0); }
        axios.get('https://groups.roblox.com/v1/groups/'+groupId, {
            withCredentials: true,
            headers: {
                Cookie: `.ROBLOSECURITY=${config.roblosecurity}`
            }
        })
            .then(function(res){
                resolve(res.data.publicEntryAllowed);
                canRequest = false;
                setTimeout(function(){ canRequest = true; }, config.interval);
            })
            .catch(function(err){
                reject(err);
            })
    });
}

app.get('/', async function(req, res){
    try{
        res.send(await getPublicEntryAllowed(req.query.groupId));
    }catch(err){
        res.sendStatus(500);
        res.send(err.message);
    }
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
})