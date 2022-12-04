async function addParty(db, partyJSON){
    console.log("got into the func");
    console.log(`INSERT INTO parties(partyname, imgurl, price, date) VALUES(${partyJSON})`);
    console.log(partyJSON);
    console.log("partyJSON is above");
    await db.query("INSERT INTO parties(partyname, imgurl, price, date) VALUES($1)", [partyJSON]);
}

async function getParties(db){
    return await db.query("SELECT * FROM parties");
}

module.exports = {addParty, getParties};