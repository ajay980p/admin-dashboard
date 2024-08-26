import { Breadcrumb, Button, Flex, Form, Spin, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { createNewUser, getAllUserList } from "../services/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../sharedComponent/LoadingSpinner";
import { useEffect, useState } from "react";
import UserFilter from "./UserFilter";
import UserDrawer from "./UserDrawer";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { UserData } from "../../utils/types";

const columns = [
    {
        title: "Sr. No.",
        dataIndex: "age",
        render: (text: string, record: any, index: number) => index + 1,
    },
    {
        title: "User Name",
        key: "name",
        render: (text: string, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
        title: "Status",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
    },
];

const getUsers = async (pageData: { currentPage: number, pageSize: number }) => {
    const response = await getAllUserList({
        currentPage: pageData.currentPage,
        pageSize: pageData.pageSize,
    });
    return response.data;
};

const submitUser = async (userData: UserData) => {
    const response = await createNewUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
    });
    return response.data;
};

const Users = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [form] = Form.useForm();

    // Using useQuery to fetch the list of users
    const { data: users, isLoading: isUsersLoading, refetch, isFetching: isUserDataFetching } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers({ currentPage, pageSize }),
    });

    // Using useMutation to handle user submission
    const { mutate: submitUserMutation, isPending: isFormSubmitting } = useMutation({
        mutationKey: ["submitUser"],
        mutationFn: submitUser,
        onSuccess: () => {
            setShowDrawer(false);
            form.resetFields();
            refetch();
        },
    });

    useEffect(() => {
        refetch();
    }, [currentPage, pageSize]);

    if (isUsersLoading || isFormSubmitting) {
        return <LoadingSpinner />;
    }

    const handleDrawer = () => {
        setShowDrawer(false);
    };

    const handleDrawerForm = async () => {
        try {
            const values = await form.validateFields();
            submitUserMutation(values);
        } catch (errorInfo) {
            console.log("Validation Failed:");
        }
    };

    return (
        <>
            <Flex justify="space-between" align="center">
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
                {isUserDataFetching && <Spin indicator={<LoadingOutlined spin />} size="large" />}
            </Flex>


            <div style={{ marginTop: 20 }}>
                <UserFilter>
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
                <Table
                    dataSource={users?.usersData}
                    columns={columns}
                    pagination={{
                        total: users?.totalRecords,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: (page, pageSize) => {
                            setCurrentPage(page);
                            setPageSize(pageSize);
                        },
                    }}
                />
            </div>
        </>
    );
};

export default Users;