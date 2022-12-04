import logo from './logo.svg';
import './Party.css';


function Party(props) {
  return (
    <div className="party">
        <img src={props.party.imageURL} className = "bannerImage"/>
        <div className="partyInfo">{props.party.name}</div>
        <div className="partyInfo">{props.party.price}$</div>
        <div className="partyInfo">Date: {props.party.date}</div>
    </div>
  );
}

export default Party;