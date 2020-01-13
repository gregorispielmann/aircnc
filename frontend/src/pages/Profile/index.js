import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import socketio from "socket.io-client";

//api
import api from "../../services/api";

//css
import "./styles.css";

//widget
import Loading from "../../widgets/Loading";

export default function Profile() {
  const [spots, setSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [req, setReq] = useState([]);

  const user_id = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id }
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_req", data => {
      setReq([...req, data]);
    });
  }, [req, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const res = await api.get("/profile", {
        headers: { user_id }
      });

      setIsLoading(false);
      setSpots(res.data);
    }

    loadSpots();
  }, []);

  async function handleAccept(id) {
    setIsLoading(true);

    await api.post(`/bookings/${id}/approvals`);

    setReq(req.filter(r => r._id !== id));

    setIsLoading(false);
  }

  async function handleReject(id) {
    setIsLoading(true);

    await api.post(`/bookings/${id}/rejections`);

    setReq(req.filter(r => r._id !== id));

    setIsLoading(false);
  }

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <>
      <ul className="notifications">
        {req.map(r => (
          <li key={r._id}>
            <p>
              <strong>{r.user.email}</strong> está solicitando uma reserva em{" "}
              <strong>{r.spot.company}</strong> para a data{" "}
              <strong>{r.date}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(r._id)}>
              ACEITAR
            </button>
            <button className="reject" onClick={() => handleReject(r._id)}>
              REJEITAR
            </button>
          </li>
        ))}
      </ul>
      {spots.length === 0 ? (
        <div className="spots-empty">
          <h3>Nenhum spot encontrado!</h3>
        </div>
      ) : (
        <ul className="spot-list">
          {spots.map(s => (
            <li key={s._id}>
              <header
                style={{ backgroundImage: `url(${s.thumbnail_url})` }}
              ></header>
              <strong>{s.company}</strong>
              <span>{s.price ? `R$ ${s.price}/dia` : "Gratuito"}</span>
            </li>
          ))}
        </ul>
      )}
      <Link to="spots">
        <button className="btn">Cadastrar novo Spot</button>
      </Link>
    </>
  );
}
