import profileImg from "../assets/img/rigo-baby.jpg";
import { Link } from "react-router-dom";

export default function ContactCard({ id, name, address, phone, email, onDelete }) {

    return (

        <>
            <div className="card mb-3" style={{ width: "100%" }}>
                <div className="row g-0 align-items-center">
                    <div className="col-md-3 d-flex justify-content-center p-3">
                        <img src={profileImg} alt="profile" className="rounded-circle" style={{ width: "100px", height: "100px", objectFit: "cover", border: "1px solid black" }}
                        />

                    </div>
                    <div className="col-md-7 ps-4">
                        <div className="card-body p-0">
                            <h5 className="card-text fw-bold mb-1">{name}</h5>
                            <p className="mb-1">
                                <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                                {address}
                                </p>

                                <p className="mb-1">
                                <i className="fas fa-phone me-2 text-muted"></i>
                                {phone}
                                </p>

                                <p className="mb-1">
                                <i className="fas fa-envelope me-2 text-muted"></i>
                                {email}
                                </p>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-end align-self-start p-3">
                        <Link to={`/form/${id}`} className="btn btn-link text-dark p-2"><i className="fas fa-pencil-alt"></i></Link>
                        <button className="btn btn-link" onClick={onDelete}>
                            <i className="fas fa-trash"></i>
                        </button>

                    </div>
                </div>
            </div>



        </>
    )
}