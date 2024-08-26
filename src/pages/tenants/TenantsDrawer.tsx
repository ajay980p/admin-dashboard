import React from 'react'
import { Drawer, Form, Space } from 'antd'
import TenantForm from './forms/TenantForm';

interface TenantsDrawerProps {
    title: string;
    width: number;
    showDrawer: boolean;
    handleDrawer: () => void;
    form: any;
    children: React.ReactNode;
}
const TenantsDrawer: React.FC<TenantsDrawerProps> = ({ title, width, showDrawer, handleDrawer, form, children }) => {
    return (
        <>
            <Drawer
                title={title}
                width={width}
                onClose={handleDrawer}
                destroyOnClose={true}
                open={showDrawer}
                styles={{
                    body: {
                        background: "#f7f7f7",
                    },
                }}
                extra={
                    <Space>
                        {children}
                    </Space>
                }
            >
                <Form layout="vertical" form={form}>
                    <TenantForm />
                </Form>
            </Drawer>
        </>
    )
}

export default TenantsDrawer;