import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/httpHook";
import {useMessage} from "../hooks/errorHook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {AdvertForm} from './statelessComponents/AdvertForm';
import {selectId} from '../hooks/selectId';

export const CreateAdvertPage = () => {
    // const [user, setUser] = useState(null);
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
    });

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };
    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    const createAdvertHandler = async (e) => {
        e.preventDefault();

        const userId = await selectId(auth.userId);

        try {
            const user = await request(`/api/auth/user/${userId}`, "GET", null, {Authorization: `Bearer ${auth.token}`});
            // setUser(user.userName);
            const data = await request('/api/advert/create', "POST", {
                ...form,
                userName: user.userName
            }, {Authorization: `Bearer ${auth.token}`});
            history.push(`/advert/${data.advert._id}`);

            message(data.message)
        } catch (e) {
        }
    };

    return (
        <div>
            <h2>Create advert</h2>
            <AdvertForm
                changeHandler={changeHandler}
                submitMethod={createAdvertHandler}
                defaultValues={[]}
            />
        </div>
    )
};