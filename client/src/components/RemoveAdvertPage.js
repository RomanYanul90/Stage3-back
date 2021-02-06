import React, {useCallback, useContext,} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {removeAdvertById} from "../api/api";

export const RemoveAdvertPage = () => {
  const {token} = useContext(AuthContext);
  const {request} = useHttp();
  const history = useHistory();
  const advertId = useParams().id;

  const removeAdvert = useCallback(async () => {
    try {
      await removeAdvertById(advertId,token);
      history.push("/userAdverts");
    } catch (e) {
    }
    history.push("/userAdverts");
  }, [token, advertId, request, history]);

  return (
    <div className='delete-msg'>
      <h2>Are you sure you want to delete this ad?</h2>
      <button className='btn' onClick={removeAdvert}>Delete</button>
    </div>
  );
};