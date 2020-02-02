import React, { useState } from "react";

//api
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    //email
    const res = await api.post("/sessions", { email });

    if (res.data === null) {
      window.alert(
        "Email cadastrado com sucesso! Insira o e-mail novamente para logar"
      );
      return;
    }

    const { _id } = res.data;

    localStorage.setItem("user", _id);

    history.push("/profile");
  }

  return (
    <React.Fragment>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{" "}
        <strong>talentos</strong> para sua empresa!
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn">Entrar</button>
      </form>
    </React.Fragment>
  );
}
