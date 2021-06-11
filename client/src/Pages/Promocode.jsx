
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useHttp } from "../Hooks/http";
import { AuthContext } from "../Context/auth";

function PromocodesPage() {

  const history = useHistory();
  const { token } = useContext(AuthContext);
  
  const [promocodes, setPromocodes] = useState([]);
  const { loading, request } = useHttp();

  const fetchHandler = async () => {
    try {
      const data = await request("/promocode/all/", "GET", null, { 
        "Authorization": `Bearer ${token}` 
      });
      setPromocodes(data.value);
    }
    catch(e) {}
  }

  const addHandler = async () => {
    try {
      const data = await request("/promocode/generate", "GET", null, { 
        "Authorization": `Bearer ${token}` 
      });
      const generated = data.value;
      setPromocodes([...promocodes, generated]);
      history.push(`/detail/${generated._id}`);
    }
    catch(e) {}
  }

  return (
    <div>
      <h1>Promocodes</h1>
      <div>
        <button 
          onClick={fetchHandler}
          disabled={loading}
        >Fetch all</button>
        <button 
          onClick={addHandler}
          disabled={loading}
        >Generate new</button>
      </div>
      <div>
        <ul>
          {
            promocodes.map((promocode, i) => {
              const { _id, value, owner, date } = promocode;
              return (
                <li key={i}>
                <span>{value}</span>
                <Link to={`/detail/${_id}`}>Open</Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default PromocodesPage;
