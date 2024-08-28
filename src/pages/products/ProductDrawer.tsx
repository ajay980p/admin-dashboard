import React from 'react';
import { Drawer, Form, Space } from 'antd';
import ProductForm from './forms/ProductForm';

interface ProductDrawerProps {
    title: string;
    width: number;
    handleDrawer: () => void;
    showDrawer: boolean;
    form: any;
    isEditMode: boolean;
    children: React.ReactNode;
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({ title, width, handleDrawer, showDrawer, form, isEditMode, children }) => {
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
                    <ProductForm isEditMode={isEditMode} />
                </Form>
            </Drawer>
        </>
    );
};

export default ProductDrawer;