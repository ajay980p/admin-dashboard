import { Breadcrumb, Button, Flex, Form, Spin, Table } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../sharedComponent/LoadingSpinner";
import { useEffect, useState } from "react";
import TenantsFilter from "./TenantsFilter";
import TenantsDrawer from "./TenantsDrawer";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { TenantData } from "../../utils/types";
import { createNewTenant, getAllTenantsList } from "../../services/api/TenantApi";

const columns = [
    {
        title: 'Sr. No.',
        dataIndex: 'age',
        render: (_: string, __: any, index: number) => index + 1,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'mailId',
        key: 'mailId',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
    },
];

const getTenants = async (pageData: { currentPage: number, pageSize: number }) => {
    const response = await getAllTenantsList({
        currentPage: pageData.currentPage,
        pageSize: pageData.pageSize,
    });
    return response.data;
}
const submitTenant = async (tenantData: TenantData) => {
    const response = await createNewTenant({
        name: tenantData.name,
        address: tenantData.address,
        mailId: tenantData.mailId,
    });
    return response.data;
};
const Tenants = () => {
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [showDrawer, setShowDrawer] = useState(false);
    const [currentEditingTenant, setCurrentEditingTenant] = useState(null);

    // Using useQuery to fetch the list of Tenants
    const { data: tenants, isLoading: isTenantsLoading, refetch, isFetching: isTenantsDataFetching } = useQuery({
        queryKey: ["tenants"],
        queryFn: () => getTenants({ currentPage, pageSize }),
    });

    // Using useMutation to handle Tenants submission
    const { mutate: submitTenantMutation, isPending: isFormSubmitting } = useMutation({
        mutationKey: ["submitTenant"],
        mutationFn: submitTenant,
        onSuccess: () => {
            setShowDrawer(false);
            form.resetFields();
            refetch();
        },
    });

    useEffect(() => {
        if (currentEditingTenant) {

        }
    }, [currentEditingTenant]);

    useEffect(() => {
        refetch();
    }, [currentPage, pageSize]);

    if (isTenantsLoading || isFormSubmitting) {
        return <LoadingSpinner />
    }

    const handleDrawer = () => {
        setShowDrawer(false);
    }

    const handleTenantDrawer = async () => {
        try {
            const values = await form.validateFields();
            submitTenantMutation(values);
        } catch (errorInfo) {
            console.log('Validation Failed');
        }
    }

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
                            title: <Link to="/tenants">Restaurants</Link>,
                        },
                    ]}
                />
                {isTenantsDataFetching && <Spin indicator={<LoadingOutlined spin />} size="large" />}
            </Flex>


            <div style={{ marginTop: 20 }}>
                <TenantsFilter >
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowDrawer(true)}>
                        Add Tenant
                    </Button>
                </TenantsFilter>
            </div>

            <TenantsDrawer title="Create Tenant" width={720} showDrawer={showDrawer} handleDrawer={handleDrawer} form={form}>
                <Button onClick={handleDrawer}>Cancel</Button>
                <Button onClick={() => handleTenantDrawer()} type="primary"> Submit</Button>
            </TenantsDrawer>

            <div style={{ marginTop: 20 }}>
                <Table
                    dataSource={tenants?.tenantsData ? tenants?.tenantsData : []}
                    columns={[...columns,
                    {
                        title: "Action",
                        render: (_: any, record: any) => {
                            return (
                                <Button onClick={() => setCurrentEditingTenant(record)}>Edit</Button>
                            );
                        }
                    }]}
                    pagination={{
                        total: tenants?.totalRecords,
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
    )
}

export default Tenants;