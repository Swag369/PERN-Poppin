//https://www.youtube.com/watch?v=SccSCuHhOw0
//https://www.youtube.com/watch?v=ldYcgPKEZC8

const express = require('express');
const app = express();
const cors = require("cors");
const db = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {console.log("backend working")});

app.route('/')
    .get(
        async(req, res) => {
            try{
                // res.json(await dblogic.getParties(db));
                let response = await db.query("SELECT * FROM parties");
                console.log(response.rows);
                res.send(response.rows);
                // console.log("got parties");
            }
            catch (err){
                console.error("get party issue");
            }
        }
    )
    .post(
        async(req, res) => {
            try{
                console.log(req.body)
                await db.query("INSERT INTO parties(partyname, imgurl, price, date) VALUES($1, $2, $3, $4)", [req.body.name, req.body.imageURL, req.body.price, req.body.date]);
                //a mistake is that my obejcts and db columns and var names are all out of sync which is cringe
                // console.log("party created");
                res.sendStatus(202);
            }
            catch (err){
                console.error("create party error");
            }
        }
    )


app.get('/delete',
    async(req, res) => {
        try{
            console.log(req.body)
            await db.query("DELETE FROM parties");
            console.log("parties deleted");
            res.send("deleted");
        }
        catch (err){
            console.error("create party error");
        }
    }
);