import React, {useContext} from "react";
import { Link } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const CardNewspaper = (props) => {
  const { store, actions } = useContext(Context);
  return(
<>

<div className="card m-2" style={{width: "18rem"}}>
  <img src={rigoImage} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <p className="card-text m-0">{props.description}</p>
    <p className="card-text m-0">{props.logo}</p>
    <p className="card-text m-0">{props.link}</p>
  </div>
</div>

</>
);}