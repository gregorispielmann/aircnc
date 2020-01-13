import React, { useState, useMemo } from "react";

//api
import api from "../../services/api";

//css
import "./styles.css";

//image
import camera from "../../assets/camera.svg";

export default function Spots({history}) {
  //useState
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {

    e.preventDefault()

    const data = new FormData();
    const user_id = localStorage.getItem('user')

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
        headers: { user_id }
    });

    history.push('/profile')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumb" : ""}
      >
        <input
          type="file"
          onChange={e => setThumbnail(e.target.files[0])}
        ></input>
        <img src={camera} alt="Select your img" />
      </label>

      <label htmlFor="company">Empresa *</label>
      <input
        id="company"
        type="text"
        placeholder="Sua empresa"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />

      <label htmlFor="techs">
        Tecnologias * <span>(separado por vírgulas)</span>
      </label>
      <input
        id="techs"
        type="text"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />

      <label htmlFor="price">
        Preço da diária * <span>(em branco para gratuito)</span>
      </label>
      <input
        id="price"
        type="text"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button className="btn">Cadastrar Spot</button>
    </form>
  );
}
