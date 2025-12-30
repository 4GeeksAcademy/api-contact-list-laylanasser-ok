import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard.jsx";

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idToDelete, setIdToDelete] = useState(null);
  const BASE_URL = "https://playground.4geeks.com/contact";
  const SLUG = "layla";


useEffect(() => {
  const loadContacts = async () => {
    setLoading(true);
    try {

      let resp = await fetch(`${BASE_URL}/agendas/${SLUG}/contacts`);
      
 
      if (resp.status === 404) {
        await fetch(`${BASE_URL}/agendas/${SLUG}`, { method: "POST" });
        resp = await fetch(`${BASE_URL}/agendas/${SLUG}/contacts`);
      }

      if (!resp.ok) {
        throw new Error(`GET contacts failed: ${resp.status}`);
      }

      const data = await resp.json(); 
      setContacts(data.contacts || []);
    } catch (err) {
      console.error("Error cargando contactos:", err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  loadContacts();
}, []);
  const confirmDelete = async () => {
  try {
    const resp = await fetch(
      `${BASE_URL}/agendas/${SLUG}/contacts/${idToDelete}`,
      { method: "DELETE" }
    );

    if (!resp.ok) throw new Error(`DELETE failed: ${resp.status}`);

    setContacts((prev) => prev.filter((item) => item.id !== idToDelete));
    setIdToDelete(null);
  } catch (err) {
    console.error("Error borrando contacto:", err);
    alert("No se pudo borrar el contacto.");
  }
};


  if (loading) {
    return <h1 className="text-center mt-5">Cargando contactos...</h1>;
  }

  return (
    <div className="container-fluid px-5 mt-5">

      

      <div className="list-group mx-auto">
        {contacts.length > 0 ? (
          contacts.map((item) => (
            <ContactCard
              key={item.id}
              id={item.id}
              name={item.name}
              address={item.address}
              phone={item.phone}
              email={item.email}
              onDelete={() => setIdToDelete(item.id)}
            />
          ))
        ) : (
          <div className="text-center mt-5">
            <h3>La agenda está vacía</h3>
            <p>Usa el botón superior para añadir tu primer contacto.</p>
          </div>
        )}
      </div>

      {idToDelete && (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¿Estás seguro?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIdToDelete(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Si eliminas este contacto, no podrás recuperarlo.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIdToDelete(null)}
                >
                  Abandonar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmDelete}
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
