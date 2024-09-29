import { useState } from 'react'
import { Breadcrumb, Button, Flex, Form, Table, Tag, Typography } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getCategoryList } from '../../services/api/CategoryApi';
import ProductFilter from '../products/ProductFilter';
import { PlusOutlined } from '@ant-design/icons';

const columns = [
    {
        title: "Sr. No.",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_: any, __: any, index: number) => index + 1,
    },
    {
        title: "Category Name",
        dataIndex: "name",
        key: "name",
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

const getCategory = async () => {
    const response = await getCategoryList();
    return response.data;
}
const Categories = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    // const [filters, setFilters] = useState<any>({});
    const [showDrawer, setShowDrawer] = useState(false);
    const [currentEditingProduct, setCurrentEditingProduct] = useState(null);
    const [form] = Form.useForm();
    const [formFilter] = Form.useForm();

    // Using useQuery to fetch the list of users
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategory
    });

    const handleDrawer = () => {
        setShowDrawer(false);
        setCurrentEditingProduct(null);
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
                            title: <Link to="/categories">Categories</Link>,
                        },
                    ]}
                />
                {/* {isUserDataFetching && <Spin indicator={<LoadingOutlined spin />} />} */}
            </Flex>

            <div style={{ marginTop: 20 }}>
                <ProductFilter formFilter={formFilter}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                        setShowDrawer(true)
                        setCurrentEditingProduct(null)
                        formFilter.resetFields();
                    }}>
                        Add Category
                    </Button>
                </ProductFilter>
            </div>

            {/* <ProductDrawer
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
            </ProductDrawer > */}

            <div style={{ marginTop: 20 }}>
                <Table
                    dataSource={categories}
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
                    rowKey={categories?._id}
                />
            </div>
        </>
    )
}

export default Categories;