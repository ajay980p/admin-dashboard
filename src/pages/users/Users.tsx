import { Breadcrumb, Table } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { getAllUserList } from "../services/api";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../sharedComponent/LoadingSpinner";
import { useEffect, useState } from "react";
import UserFilter from "./UserFilter";

const columns = [
    {
        title: 'Sr. No.',
        dataIndex: 'age',
        render: (text: string, record: any, index: number) => index + 1,
    },
    {
        title: 'User Name',
        key: 'name',
        render: (text: string, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
        title: 'Status',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    // {
    //     title: 'Actions',
    //     dataIndex: 'actions',
    //     key: 'actions',
    // },
];

const getUsers = async () => {
    const response = await getAllUserList();
    return response.data;
}
const Users = () => {
    const [users, setUsers] = useState([]);

    const { mutate, data: dataReceived, isPending, isError } = useMutation({
        mutationKey: ['users'],
        mutationFn: getUsers,
        onSuccess: (response) => {
            setUsers(response.data);
        }
    });

    useEffect(() => {
        if (!dataReceived) {
            mutate();
        }
    }, [mutate, dataReceived]);

    if (isPending) {
        return <LoadingSpinner />
    }

    return (
        <>
            <Breadcrumb
                separator={<RightOutlined />}
                items={[
                    {
                        title: <Link to="/">Dashboard</Link>,
                    },
                    {
                        title: <Link to="/users">Users</Link>,
                    },
                ]}
            />


            <div style={{ marginTop: 20 }}>
                <UserFilter />
            </div>

            <div style={{ marginTop: 20 }}>
                <Table dataSource={users} columns={columns} />
            </div>
        </>
    )
}

export default Users