import PartyObject from './PartyObject'
import Party from './Party'
import SearchBar from './SearchBar'
import React, { useLayoutEffect, useEffect, useState } from 'react';

const randomURL = ["https://fileinfo.com/img/ss/xl/jpg_44.png", "https://img.freepik.com/free-photo/caucasian-beautiful-lady-glasses-smiling-near-3d-printing-machine-her-office-new-technologies-small-businesses-concept-computer-prototypes-table-tech-ambient-jpg-photo_633478-537.jpg", "https://img.freepik.com/free-photo/isolated-book-magazine-composition-dark-surface_125540-1444.jpg?w=1380&t=st=1669581144~exp=1669581744~hmac=8ba7d01aaa113e9f8e87de308ba8e6daeecbfa63d5b7cea4fc662a69b6fd5755", "https://www.adobe.com/express/feature/image/convert/jpg-to-png/media_15976899fbb2cad5800f47d4a27123ee40685c211.png"];

let counter = 1;

let parties = [];

// const getParties = async() => {
// 	const response = await fetch("http://localhost:5000/");
// 	let val = await response.json();
// 	val.forEach(
// 		party=>{
// 			parties.push(new PartyObject(party.partyname, party.imgurl, party.price, party.date));
// 		}
// 	);
// 	// console.log(val);
// 	console.log(parties);
// 	console.log("parties updated with db values");
// 	//idk why when i returned into db parties it was a promise and not an array
// }

// getParties();

function PartyList() {


	const [partyDisplay, updatePartyDisplay] = useState([...parties]);
	//this parties is still blank even if i put it after useeffect, its just not finna be like that, it sets it all up BEFORE the useeffect
	//when i had the getParties stuff above the function it still set it all up AFTER the function ran, tough but it be like that.

	useEffect(
			() => {
				const getParties = async() => {
					const response = await fetch("http://localhost:5000/");
					let val = await response.json();
					if(parties.length !== 0) {return;}
					val.forEach(
						party=>{
							parties.push(new PartyObject(party.partyname, party.imgurl, party.price, party.date));
						}
					);
					// console.log(val);
					// console.log(parties);
					updatePartyDisplay([...parties]);
					// console.log("parties updated with db values");
				}

				getParties();
			},
			[]);
			//idk fullt how this works but i mean it works for now
			//the double calling of the api has to do with strict mode in react and stuff im looking into
			//kk i kinda understood why that happened, smth abt react dev env trying to ensure multiple
			//mounts which can happen for some good reason will be handeled
			//but i fixed it by the parties.length !==0, not PERFECCT but basically bueno

	const newParty =  async() => {
		let name = "party" + counter;
		let image = randomURL[Math.round(Math.random()*3)];
		let price = Math.floor(Math.random()*100);
		let time = Date(2000+100*Math.random(), 12*Math.random(), 30*Math.random(), 24*Math.random(), 60*Math.random(), 60*Math.random(), 0);
		let x = new PartyObject(name, image, price, time);
		await fetch("http://localhost:5000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(x)});
		parties.push(x);
		updatePartyDisplay([...parties]);
		//not entirely sure why i had to spread parties... but ill figure it out later not huge issue. The problem was it would only render party1
		counter++;
		// console.log(x);
		// console.log(parties); //this console.log was one behind for some reason, even though it renders right it says parties is one less that is rendering and/or should be
	};


	return (
		<div className = "PartyList.css">
		<br/>
			<SearchBar partyDisplay = {partyDisplay} parties = {parties} updatePartyDisplay = {updatePartyDisplay} />
			<br/>
			<br/>

			<div>
				PARTY LIST
				<br/>
				<hr></hr>
				<br/>
			{//I used br's because it made my life easier, but i would use padding/margin in a real setting
			}
				{partyDisplay.map(
					(party) => {return ( //this works with map, but not with foreach, figure out why
						<Party party={party}/>
					)}
				)}
			</div>

			<div>
			<button onClick={newParty}>
				Generate Random Party
			</button>
			</div>
		</div>
	);
}

export default PartyList;