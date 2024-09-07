import React, { useEffect, useState } from 'react';
import ModalPreferenceVisitor from '../../components/molecules/Modal/ModalPreferensiVisitor';
import { useDispatch } from 'react-redux';
import { ListDeveloperPreference } from '../../store/actions/fetchData/userState';
import { useParams, useSearchParams } from 'react-router-dom';
import cookie from 'hs-cookie';
import axios from 'axios';
import { fetchGet, fetchPost } from '../../helpers/fetchApi';

const PreferenceVisitor = () => {
    const dispatch = useDispatch();
    const [queryParam] = useSearchParams();
    const [dataTemp, setDataTemp] = useState([]);
    const email = queryParam.get("user");

    useEffect(() => {
        dispatch(ListDeveloperPreference(decodeURIComponent(email),setDataTemp))
    }, []);
    return (
        <div className="forgot-pass__basePage">
            <ModalPreferenceVisitor dataDeveloper={dataTemp} email={email} />
        </div>
    );
};

export default PreferenceVisitor;