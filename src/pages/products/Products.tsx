import { useState } from 'react'
import { Breadcrumb, Button, Flex, Form, Spin, Table, Tag, Typography } from 'antd'
import { LoadingOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons'
import { getAllProductsList } from '../../services/api/ProductApi';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductFilter from './ProductFilter';
import { format } from 'date-fns';
import ProductDrawer from './ProductDrawer';

const columns = [
    {
        title: "Sr. No.",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (text: string, record: any, index: number) => index + 1,
    },
    {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Status",
        dataIndex: "isPublished",
        key: "status",
        render: (isPublished: boolean) => {
            return (
                isPublished ?
                    <Tag color="green">Active</Tag> :
                    <Tag color="red">Inactive</Tag>
            );
        }
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        render: (createdAt: string) => {
            return (
                <Typography.Text>
                    {format(new Date(createdAt), "dd/MM/yyyy")}
                </Typography.Text>
            );
        }
    },
];

const getProducts = async () => {
    const response = await getAllProductsList();
    return response.data;
};
const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState<any>({});
    const [showDrawer, setShowDrawer] = useState(false);
    const [currentEditingProduct, setCurrentEditingProduct] = useState(null);
    const [form] = Form.useForm();
    const [formFilter] = Form.useForm();

    // Using useQuery to fetch the list of users
    const { data: products, isLoading: isUsersLoading, refetch, isFetching: isUserDataFetching } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });

    const handleValuesChange = (changedValues: any, allValues: any) => {
        // refetch({ currentPage, pageSize, ...allValues });
    }

    const handleDrawer = () => {
        setShowDrawer(false);
        setCurrentEditingProduct(null);
    };

    const handleDrawerForm = async () => {
        try {
            const isFormEditMode = !!currentEditingProduct;
            const values = await form.validateFields();
            if (isFormEditMode) {
                // updateUserMutation({
                //     ...values, userId: currentEditingProduct?.userId, tenantId: values?.restaurant
                // });
            } else {
                // submitUserMutation({ ...values, tenantId: values?.restaurant });
                console.log("Form is submitting : ", form.getFieldsValue());
            }
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
                            title: <Link to="/products">Products</Link>,
                        },
                    ]}
                />
                {isUserDataFetching && <Spin indicator={<LoadingOutlined spin />} />}
            </Flex>

            <div style={{ marginTop: 20 }}>
                <ProductFilter formFilter={formFilter} handleValuesChange={handleValuesChange}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                        setShowDrawer(true)
                        setCurrentEditingProduct(null)
                        formFilter.resetFields();
                    }}>
                        Add Product
                    </Button>
                </ProductFilter>
            </div>

            <ProductDrawer
                title={!!currentEditingProduct ? "Edit Product" : "Create Product"}
                width={720}
                showDrawer={showDrawer}
                handleDrawer={handleDrawer}
                form={form}
                isEditMode={!!currentEditingProduct}
            >
                <>
                    <Button onClick={() => setShowDrawer(false)}>Cancel</Button>
                    <Button type="primary" onClick={() => handleDrawerForm()}>Submit</Button>
                </>
            </ProductDrawer >


            <div style={{ marginTop: 20 }}>
                <Table
                    dataSource={products}
                    columns={[...columns,
                    {
                        title: "Action",
                        key: "action",
                        render: (text: string, record: any) => {
                            return (
                                <Button danger onClick={() => setCurrentEditingProduct(record)}>Edit</Button>
                            );
                        }
                    }
                    ]}
                    rowKey={products?._id}
                />
            </div>
        </>
    )
}

export default Products