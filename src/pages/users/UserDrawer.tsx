import React from 'react';
import { Drawer, Form, Space } from 'antd';
import UserForm from './forms/UserForm';

interface UserDrawerProps {
    title: string;
    width: number;
    showDrawer: boolean;
    handleDrawer: () => void;
    form: any;
    children: React.ReactNode;
}

const UserDrawer: React.FC<UserDrawerProps> = ({ title, width, showDrawer, handleDrawer, form, children }) => {
    return (
        <>
            <Drawer
                title={title}
                width={width}
                onClose={handleDrawer}
                destroyOnClose={true}
                open={showDrawer}
                style={{
                    backgroundColor: '#f5f5f5',
                }}
                extra={
                    <Space>
                        {children}
                    </Space>
                }
            >
                <Form layout="vertical" form={form}>
                    <UserForm />
                </Form>
            </Drawer>
        </>
    );
};

export default UserDrawer;