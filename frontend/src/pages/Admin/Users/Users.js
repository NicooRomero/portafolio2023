import React, { useEffect, useState } from 'react';
import ListUsers from '../../../components/Admin/Users/ListUsers';
import { getAccToken } from '../../../api/auth';
import { GetUsers } from '../../../api/user';

const Users = () => {
    const [ usersData, setUsersData ] = useState([]);
    const [ reload, setReload ] = useState();
    const token = getAccToken();
    
    useEffect(() => {
        GetUsers(token, true).then(response => {
                setUsersData(response);
            });
            setReload(false)
    }, [token, reload]);

    return (
        <ListUsers usersData={usersData} setReload={setReload} />
    );
}

export default Users;