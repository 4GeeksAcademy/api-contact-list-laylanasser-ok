import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BASE_URL = "https://playground.4geeks.com/contact";
const SLUG = "layla";

const ContactForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  
  useEffect(() => {
    if (!id) return;

    const loadContact = async () => {
      try {
        const resp = await fetch(`${BASE_URL}/agendas/${SLUG}/contacts`);
        if (!resp.ok) throw new Error(`GET contacts failed: ${resp.status}`);

        const data = await resp.json(); // { contacts: [...] }
        const contact = (data.contacts || []).find((c) => c.id === Number(id));

        if (!contact) return;

        setName(contact.name || "");
        setEmail(contact.email || "");
        setPhone(contact.phone || "");
        setAddress(contact.address || "");
      } catch (err) {
        console.error("Error cargando contacto:", err);
        alert("No se pudo cargar el contacto para editar.");
      }
    };

    loadContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address) {
      alert("Rellena todos los campos");
      return;
    }

    try {
     
      const url = id
        ? `${BASE_URL}/agendas/${SLUG}/contacts/${id}`
        : `${BASE_URL}/agendas/${SLUG}/contacts`;

      const method = id ? "PUT" : "POST";

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
        }),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(`${method} failed: ${resp.status} ${text}`);
      }

      navigate("/");
    } catch (err) {
      console.error("Error guardando contacto:", err);
      alert("No se pudo guardar. Mira la consola para ver el error.");
    }
  };

  return (
    <div className="container mt-5">
      
      <h1>{id ? "Edit contact" : "Add new contact"}</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {id ? "Update" : "Save"}
        </button>

        <Link to="/" className="btn btn-secondary">
          Back home
        </Link>
      </form>
    </div>
  );
};

export default ContactForm;
