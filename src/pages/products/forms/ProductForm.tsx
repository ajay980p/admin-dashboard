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
    const [form] = Form.useForm();
    const selectedCategoryId = Form.useWatch('categoryId');
    const selectedImage = Form.useWatch('image');

    console.log("Selected Image : ", selectedImage);

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
                                    name="categoryId"
                                    label="Select Category"
                                    rules={[{ required: true, message: 'Please select Category.' }]}
                                >
                                    <Select
                                        size="large"
                                        showSearch
                                        allowClear
                                        placeholder="Select Category"
                                        style={{ width: '100%' }}
                                    >
                                        {categories && Array.isArray(categories) && categories?.map((category: any) => (
                                            <Select.Option key={category._id} value={category._id}>
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
                                    rules={[{ required: true, message: 'Please enter Product Description.' }]}
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
                                    name="image"
                                    rules={[{ required: true, message: 'Please Choose the Product Image' }]}
                                >
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        beforeUpload={() => false}
                                        maxCount={1}
                                        onRemove={() => form.setFieldsValue({ "image": null })}
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
                                    name="tenantId"
                                    label="Select Restaurant"
                                    rules={[{ required: true, message: 'Please select Restaurant.' }]}
                                >
                                    <Select
                                        size="large"
                                        showSearch
                                        allowClear
                                        placeholder="Select Restaurant"
                                        style={{ width: '100%' }}
                                    >
                                        {tenants && tenants?.tenantsData?.map((tenant: any) => (
                                            <Select.Option key={tenant.id} value={tenant.id}>
                                                {tenant.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {selectedCategoryId && (
                    <>
                        <Pricing category={Array.isArray(categories) && categories.find(data => data._id === selectedCategoryId)} />
                        <Attributes category={Array.isArray(categories) && categories.find(data => data._id === selectedCategoryId)} />
                    </>
                )}

                <Col span={24} style={{ marginTop: 24 }}>
                    <Card title="Other Properties" bordered={false}>
                        <Row gutter={16}>
                            <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Item
                                    name="isPublished"
                                    valuePropName="checked"
                                    style={{ margin: 0, textAlign: 'center' }}
                                >
                                    <Switch
                                        onChange={(checked) => form.setFieldsValue({ "isPublished": checked })}
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                    />
                                </Form.Item>
                                <Typography.Text style={{ marginLeft: '8px', verticalAlign: 'middle', fontWeight: 500 }}>
                                    Published
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Card>
                </Col>

            </Row >
        </>
    )
}

export default ProductForm;