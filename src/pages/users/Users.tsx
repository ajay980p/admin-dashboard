import { Breadcrumb, Button, Flex, Form, Spin, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { createNewUser, getAllUserList, updateUserData } from "../services/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../sharedComponent/LoadingSpinner";
import { useEffect, useState } from "react";
import UserFilter from "./UserFilter";
import UserDrawer from "./UserDrawer";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { updateUserDataInterface, UserData } from "../../utils/types";
import { debounce } from "lodash";

const columns = [
    {
        title: "Sr. No.",
        dataIndex: "age",
        render: (text: string, record: any, index: number) => index + 1,
    },
    {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Restaurant At",
        dataIndex: "created_at",
        render: (text: string, record: any) => `${record.tenantName}, ${record.tenantAddress}`,
    },
    {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
    },
];

const getUsers = async (pageData: { currentPage: number, pageSize: number, search: string, role: string }) => {
    const response = await getAllUserList({
        currentPage: pageData.currentPage,
        pageSize: pageData.pageSize,
        search: pageData.search,
        searchRole: pageData.role
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
        tenantId: userData.tenantId
    });
    return response.data;
};
const updateUser = async (userData: updateUserDataInterface) => {
    const response = await updateUserData({
        userId: userData.userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        tenantId: userData.tenantId,
    });
    return response.data;
};

interface extendedUserData extends UserData {
    userId: number;
    tenantName: string;
}
const Users = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentEditingUser, setCurrentEditingUser] = useState<extendedUserData | null>(null);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState<any>({});
    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    // Using useQuery to fetch the list of users
    const { data: users, isLoading: isUsersLoading, refetch, isFetching: isUserDataFetching } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers({
            currentPage,
            pageSize,
            search: filters.search ? filters.search : "",
            role: filters.role ? filters.role : ""
        }),
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

    // Using useMutation to Update user
    const { mutate: updateUserMutation, isPending: isFormUpdating } = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: updateUser,
        onSuccess: () => {
            setShowDrawer(false);
            form.resetFields();
            refetch();
        },
    });

    useEffect(() => {
        refetch();
    }, [currentPage, pageSize, filters]);

    useEffect(() => {
        if (currentEditingUser) {
            form.setFieldsValue({
                firstName: currentEditingUser.firstName,
                lastName: currentEditingUser.lastName,
                email: currentEditingUser.email,
                role: currentEditingUser.role,
                restaurant: currentEditingUser?.tenantName
            });
            setShowDrawer(true);
        }
    }, [currentEditingUser]);


    if (isUsersLoading || isFormSubmitting || isFormUpdating) {
        return <LoadingSpinner />;
    }

    const handleDrawer = () => {
        setShowDrawer(false);
        setCurrentEditingUser(null);
    };

    const handleDrawerForm = async () => {
        try {

            const isFormEditMode = !!currentEditingUser;
            const values = await form.validateFields();
            if (isFormEditMode) {
                updateUserMutation({
                    ...values, userId: currentEditingUser?.userId, tenantId: values?.restaurant
                });
            } else {
                submitUserMutation({ ...values, tenantId: values?.restaurant });
            }
        } catch (errorInfo) {
            console.log("Validation Failed:");
        }
    };

    // Handle form value changes
    const handleValuesChange = debounce((changedValues: any, allValues: any) => {
        setCurrentPage(1);
        setFilters(allValues);
    }, 500);

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
                {isUserDataFetching && <Spin indicator={<LoadingOutlined spin />} />}
            </Flex>

            <div style={{ marginTop: 20 }}>
                <UserFilter formFilter={form1} handleValuesChange={handleValuesChange}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                        setShowDrawer(true)
                        setCurrentEditingUser(null)
                        form.resetFields()
                    }}>
                        Add User
                    </Button>
                </UserFilter>
            </div>

            <UserDrawer
                title={!!currentEditingUser ? "Edit User" : "Create User"}
                width={720}
                showDrawer={showDrawer}
                handleDrawer={handleDrawer}
                form={form}
                isEditMode={!!currentEditingUser}
            >
                <>
                    <Button onClick={() => setShowDrawer(false)}>Cancel</Button>
                    <Button type="primary" onClick={() => handleDrawerForm()}>Submit</Button>
                </>
            </UserDrawer >

            <div style={{ marginTop: 20 }}>
                <Table
                    dataSource={users?.usersData}
                    columns={[...columns,
                    {
                        title: "Action",
                        render: (text: string, record: any) => {
                            return (
                                <Button onClick={() => setCurrentEditingUser(record)}>Edit</Button>
                            );
                        }
                    }]}
                    pagination={{
                        total: users?.totalRecords,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: (page, pageSize) => {
                            setCurrentPage(page);
                            setPageSize(pageSize);
                        },
                        showTotal: (total, range) => {
                            return `Showing ${range[0]}-${range[1]} of ${total} items`;
                        }
                    }}
                />
            </div>
        </>
    );
};

export default Users;