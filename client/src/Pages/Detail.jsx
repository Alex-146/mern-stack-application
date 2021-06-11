
import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../Hooks/http";
import { AuthContext } from "../Context/auth";

import Loader from "../Components/Loader";
import Promocode from "../Components/Promocode";

function Detail() {

  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [promocode, setPromocode] = useState(null);
  const id = useParams().id;

  const getInfo = useCallback(async () => {
    try {
      const data = await request(`/promocode/${id}`, "GET", null, {
        "Authorization": `Bearer ${token}`
      });
      setPromocode(data.value);
    }
    catch(e) {}
  }, [token, id, request]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  if (loading) {
    return <Loader />
  }

  if (promocode) {
    const { _id, value, owner, date } = promocode;
    return (
      <div>
        <h1>Detail</h1>
        <Promocode id={_id} value={value} owner={owner} date={date}/>
      </div>
    );
  }

  return (
    <div>
      <h1>Detail</h1>
      <span>no promocode</span>
    </div>
  );
}

export default Detail;
