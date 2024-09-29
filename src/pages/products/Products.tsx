import { useState } from 'react'
import { Breadcrumb, Button, Flex, Form, Spin, Table, Tag, Typography } from 'antd'
import { LoadingOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons'
import { createNewProduct, getAllProductsList } from '../../services/api/ProductApi';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import ProductFilter from './ProductFilter';
import { format } from 'date-fns';
import ProductDrawer from './ProductDrawer';
import LoadingSpinner from '../../sharedComponent/LoadingSpinner';

const columns = [
    {
        title: "Sr. No.",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_: any, __: any, index: number) => index + 1,
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
const submitProduct = async (values: any) => {
    const products = new FormData();

    products.append("name", values.name);
    products.append("description", values.description);
    products.append("priceConfiguration", JSON.stringify(values.priceConfiguration));
    products.append("attributes", JSON.stringify(values.attributes));
    products.append("tenantId", values.tenantId);
    products.append("categoryId", values.categoryId);
    products.append("isPublished", values.isPublished);
    products.append("image", values.image?.fileList?.[0]?.originFileObj);

    const response = await createNewProduct(products);
    return response.data;
}
const Products = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    // const [filters, setFilters] = useState<any>({});
    const [showDrawer, setShowDrawer] = useState(false);
    const [currentEditingProduct, setCurrentEditingProduct] = useState(null);
    const [form] = Form.useForm();
    const [formFilter] = Form.useForm();

    // Using useQuery to fetch the list of users
    const { data: products, isFetching: isUserDataFetching } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });

    // Using useMutation to handle Tenants submission
    const { mutate: submitProductMutation, isPending: isFormSubmitting } = useMutation({
        mutationKey: ["submitProduct"],
        mutationFn: submitProduct,
        onSuccess: () => {
            setShowDrawer(false);
            form.resetFields();
        },
    });

    if (isFormSubmitting) {
        return <LoadingSpinner />
    }

    const handleDrawer = () => {
        setShowDrawer(false);
        setCurrentEditingProduct(null);
    };

    const handleValuesChange = (changedValues: any, allValues: any) => {
        console.log("Changed Values : ", changedValues);
        console.log("All Values : ", allValues);
    };

    const handleDrawerForm = async () => {
        try {
            console.log("Forms data : ", form.getFieldsValue());
            const isFormEditMode = !!currentEditingProduct;
            await form.validateFields();
            if (isFormEditMode) {
                // updateUserMutation({
                //     ...values, userId: currentEditingProduct?.userId, tenantId: values?.restaurant
                // });
            } else {
                submitProductMutation(form.getFieldsValue());
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
                title={"Create Product"}
                width={720}
                showDrawer={showDrawer}
                handleDrawer={handleDrawer}
                form={form}
            // isEditMode={!!currentEditingProduct}
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
                        render: (_: string, record: any) => {
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