import { Breadcrumb, Button, Form, Table } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { createNewUser, getAllUserList } from "../services/api";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../sharedComponent/LoadingSpinner";
import { useEffect, useState } from "react";
import UserFilter from "./UserFilter";
import UserDrawer from "./UserDrawer";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { UserData } from "../../utils/types";

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
const submitUser = async (userData: UserData) => {
    const response = await createNewUser({ firstName: userData.firstName, lastName: userData.lastName, email: userData.email, password: userData.password, role: userData.role });
    return response.data;
}
const Users = () => {
    const [users, setUsers] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [form] = Form.useForm();

    const { mutate, data: dataReceived, isPending, isError } = useMutation({
        mutationKey: ['users'],
        mutationFn: getUsers,
        onSuccess: (response) => {
            setUsers(response.data);
        }
    });

    const { mutate: submitUserMutation, isPending: isFormSubmitting } = useMutation({
        mutationKey: ['submitUser'],
        mutationFn: submitUser,
        onSuccess: (response) => {
            setShowDrawer(false);
            form.resetFields();
            mutate();
        }
    });

    useEffect(() => {
        if (!dataReceived) {
            mutate();
        }
    }, [mutate, dataReceived]);

    if (isPending || isFormSubmitting) {
        return <LoadingSpinner />
    }

    const handleDrawer = () => {
        setShowDrawer(false);
    }

    const handleDrawerForm = async () => {
        try {
            const values = await form.validateFields();
            submitUserMutation(values);
        } catch (errorInfo) {
            console.log('Validation Failed:');
        }
    };

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
                <UserFilter  >
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowDrawer(true)}>
                        Add User
                    </Button>
                </UserFilter>
            </div>

            <UserDrawer title="Create User" width={720} showDrawer={showDrawer} handleDrawer={handleDrawer} form={form}>
                <>
                    <Button onClick={() => setShowDrawer(false)}>Cancel</Button>
                    <Button type="primary" onClick={() => handleDrawerForm()}>Submit</Button>
                </>
            </UserDrawer>

            <div style={{ marginTop: 20 }}>
                <Table dataSource={users} columns={columns} />
            </div>
        </>
    )
}

export default Users