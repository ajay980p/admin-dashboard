import React from 'react';
import { Drawer, Form, Space } from 'antd';
import ProductForm from './forms/ProductForm';

interface ProductDrawerProps {
    title: string;
    width: number;
    handleDrawer: () => void;
    showDrawer: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    // isEditMode: boolean;
    children: React.ReactNode;
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({ title, width, handleDrawer, showDrawer, form, children }) => {
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
                <Form layout="vertical" form={form} initialValues={{ "attributes": [] }}>
                    <ProductForm />
                </Form>
            </Drawer >
        </>
    );
};

export default ProductDrawer;