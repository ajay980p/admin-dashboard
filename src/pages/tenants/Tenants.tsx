import { Breadcrumb, Button, Table } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { getAllTenantsList } from "../services/api";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../sharedComponent/LoadingSpinner";
import { useEffect, useState } from "react";
import TenantsFilter from "./TenantsFilter";
import TenantsDrawer from "./TenantsDrawer";
import { PlusOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Sr. No.',
        dataIndex: 'age',
        render: (text: string, record: any, index: number) => index + 1,
    },
    {
        title: 'Name',
        key: 'name',
        render: (text: string, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
        title: 'Address',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
    },
];

const getTenants = async () => {
    const response = await getAllTenantsList();
    return response.data;
}
const Tenants = () => {
    const [tenants, setTenants] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);

    const { mutate, data: dataReceived, isPending, isError } = useMutation({
        mutationKey: ['tenants'],
        mutationFn: getTenants,
        onSuccess: (response) => {
            setTenants(response.data);
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

    const handleDrawer = () => {
        setShowDrawer(!showDrawer);
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
                        title: <Link to="/tenants">Restaurants</Link>,
                    },
                ]}
            />


            <div style={{ marginTop: 20 }}>
                <TenantsFilter >
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleDrawer}>
                        Add Tenant
                    </Button>
                </TenantsFilter>
            </div>

            <TenantsDrawer title="Create Tenant" width={720} showDrawer={showDrawer} handleDrawer={handleDrawer} />

            <div style={{ marginTop: 20 }}>
                <Table dataSource={tenants} columns={columns} pagination={{ pageSize: 10 }} />
            </div>
        </>
    )
}

export default Tenants;