import React, {useState} from 'react'


const SearchBar = (props) => {

    let parties = props.parties;
    let partyDisplay = props.partyDisplay;
    let updatePartyDisplay = props.updatePartyDisplay;

    const [searchInput, setSearchInput] = useState("");

    //I could, mb even SHOULD do this with useeffect, but works cleanly, so I'm leaving it like this cuz I' haven't used useEffect before
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        //something about closures makes it so at this point searchInput is not updated yet, it's one stroke behind still. This can prolly be fixed if i use useEffect somehow, but I can also just use e.target.value so I do that
    
        if (searchInput.length > 0) {
            updatePartyDisplay(
                parties.filter((party) => {
                    return party.name.match(e.target.value);
                })
                //i COULD filter parties by more than name, i.e. price/date, but thats more work so I won't do it now
            );
        }
        //I'm acc not sure why searchInput.length being 0 makes it go back to normal, I'd expect it to NOT update the display, and leave it where it was, mb it does do that and since everything is named partyx, the p doesn't have an issue. Just in case, I have the update display
        if (searchInput.length == 0) {
            updatePartyDisplay(parties);
        }
    };

    return(
        <div>
            <input type="text" placeholder="Search here" onChange={handleChange} value={searchInput} />
        </div>
    )

};

export default SearchBar;
