import React, {useState, useEffect, useContext, useCallback} from "react";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {useParams, useHistory} from "react-router-dom";
import {LoadingPage} from "./LoadingPage";
import {useMessage} from "../hooks/errorHook";
import {UserForm} from "./statelessComponents/UserForm";

export const EditUserPage = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
  });
  const [user, setUser] = useState(null);
  const {request, loading} = useHttp();
  const userId = useParams().id;
  const history = useHistory();
  const message = useMessage();

  const getUser = useCallback(async () => {
    try {
      const result = await request(`/api/auth/user/${userId}`, "GET", null,
        {Authorization: `Bearer ${auth.token}`});
      setUser(result);
    } catch (e) {
    }
  }, [auth.token, userId, request]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const editUserHandler = async (e) => {
    e.preventDefault();

    try {
      if (form.email && !validateEmail(form.email)) {
        message("Invalid email");
        return;
      }
      await request(`/api/auth/editUser/${userId}`, "PATCH", {
          firstName: form.firstName ? form.firstName : user.firstName,
          lastName: form.lastName ? form.lastName : user.lastName,
          userName: form.userName ? form.userName : user.userName,
          email: form.email ? form.email : user.email,
          phone: form.phone ? form.phone : user.phone,
        },
        {Authorization: `Bearer ${auth.token}`});
      history.push(`/userPage/${userId}`);
    } catch (e) {
    }
  };

  if (loading) {
    return <LoadingPage/>;
  }
  return (
    <div>
      {user &&
      <div>
        <h2>Edit user</h2>
        <UserForm
          changeHandler={changeHandler}
          submitMethod={editUserHandler}
          defaultValues={[user.firstName, user.lastName, user.userName, user.email, user.phone]}
          isCreatePage={false}
        />
      </div>}
    </div>
  );
};