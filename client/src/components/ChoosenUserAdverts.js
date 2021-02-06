import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertsList} from "./AdvertsList";
import {chosenUserAdverts} from "../api/api";

export const ChoosenUserAdverts = ({ownerName}) => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [adverts, setAdverts] = useState([]);

  const getAdverts = useCallback(async () => {
    try {
      console.log(ownerName);
      const result = await chosenUserAdverts(ownerName,token);
      setAdverts(result);
    } catch (e) {
    }
  }, [token, ownerName, request]);

  useEffect(() => {
    getAdverts();
  }, [getAdverts]);

  if (loading) {
    return <LoadingPage/>;
  }
  return (
    <div>
      {!loading && <AdvertsList adverts={adverts}/>}
    </div>
  );
};