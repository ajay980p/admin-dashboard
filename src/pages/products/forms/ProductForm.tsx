import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import Pricing from './Pricing';
import Attributes from './Attributes';
import { useQuery } from '@tanstack/react-query';
import { getCategoryList } from '../../../services/api/CategoryApi';
import { getAllTenantsList } from '../../../services/api/TenantApi';


const getCategory = async () => {
    const response = await getCategoryList();
    return response.data;
}
const getTenants = async (pageData: { currentPage: number, pageSize: number }) => {
    const response = await getAllTenantsList({
        currentPage: pageData.currentPage,
        pageSize: pageData.pageSize,
    });
    return response.data;
}
const ProductForm = () => {
    const selectedCategory = Form.useWatch('category');
    const category = selectedCategory ? JSON.parse(selectedCategory) : null;

    // Using useQuery to fetch the list of users
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategory
    });

    // Using useQuery to fetch the list of Tenants
    const { data: tenants } = useQuery({
        queryKey: ["tenants"],
        queryFn: () => getTenants({ currentPage: 1, pageSize: 100 }),
    });

    console.log("Tenants : ", tenants)

    return (
        <>
            <Row>
                <Col span={24}>
                    <Card title="Product Info" bordered={false}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please enter Product Name' }]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="category"
                                    label="Category"
                                    rules={[{ required: true, message: 'Please select Category' }]}
                                >
                                    <Select
                                        size="large"
                                        showSearch
                                        allowClear
                                        placeholder="Select Category"
                                        style={{ width: '100%' }}
                                    >
                                        {categories && categories?.map((category: any) => (
                                            <Select.Option key={category.id} value={JSON.stringify(category)}>
                                                {category.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[{ required: true, message: 'Please select Category' }]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={24} style={{ marginTop: 24 }}>
                    <Card title="Product Image" bordered={false} >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please enter Password' }]}
                                >
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    // beforeUpload={beforeUpload}
                                    // onChange={handleChange}
                                    >
                                        <Space direction="vertical" align="center">
                                            <PlusOutlined />
                                            <Typography.Text>Upload</Typography.Text>
                                        </Space>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={24} style={{ marginTop: 24 }}>
                    <Card title="Restaurant" bordered={false} >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="role"
                                    label="Select Restaurant"
                                    rules={[{ required: true, message: 'Please select Restaurant.' }]}
                                >
                                    <Select
                                        size="large"
                                        showSearch
                                        allowClear
                                        placeholder="Select Category"
                                        style={{ width: '100%' }}
                                    >
                                        {tenants && tenants?.tenantsData?.map((tenant: any) => (
                                            <Select.Option key={tenant.id} value={tenant.name}>
                                                {tenant.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                    </Card>
                </Col>

                {selectedCategory &&
                    <>
                        <Pricing category={category} />
                        <Attributes category={category} />
                    </>
                }

                <Col span={24} style={{ marginTop: 24 }}>
                    <Card title="Other Properties" bordered={false} >
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="role" style={{ margin: 0, textAlign: 'center' }}>
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                    // onChange={onChange}
                                    />{' '}
                                    <span style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
                                        published
                                    </span>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default ProductForm;