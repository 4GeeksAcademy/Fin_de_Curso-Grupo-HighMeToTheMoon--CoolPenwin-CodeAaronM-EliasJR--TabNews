import React, {useContext} from "react";
import { Link } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const CardNewspaper = (props) => {
  const { store, actions } = useContext(Context);

  // Asegúrate de que estás pasando las propiedades correctas a setid
  const handleEditPaper = () => {
    actions.setid({
      id: props.id,
      name: props.name,
      description: props.description,
      logo: props.logo,
      link: props.link
    });
  };

  return (
    <>
      <div className="card m-2" style={{width: "18rem"}}>
        <img src={rigoImage} className="card-img-top" alt="..."/>
        <div className="card-body">
          <Link to="/AddNewspaper">
            <button type="button" className="btn btn-outline-light text-secondary" onClick={handleEditPaper}>
              <i className="fa-solid fa-pencil"></i>
            </button>
          </Link>
          <button type="button" className="btn btn-primary" onClick={() => actions.deleteNewspaper(props.id)}>
            DELETE
          </button>
          <h5 className="card-title">name: {props.name}</h5>
          <p className="card-text m-0">description: {props.description}</p>
          <p className="card-text m-0">logo: {props.logo}</p>
          <p className="card-text m-0">link: {props.link}</p>
          <p className="card-text m-0">id: {props.id}</p>
        </div>
      </div>
    </>
  );
};
