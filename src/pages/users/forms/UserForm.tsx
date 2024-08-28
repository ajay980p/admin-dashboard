import { Card, Col, Form, Input, Row, Select } from 'antd'
import { Roles } from '../../../utils/constant';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllTenantsList } from '../../../services/api/TenantApi';

const getTenants = async (pageData: { currentPage: number, pageSize: number }) => {
    const response = await getAllTenantsList({
        currentPage: pageData.currentPage,
        pageSize: pageData.pageSize,
    });
    return response.data;
}
const UserForm = ({ isEditMode = false }: { isEditMode: boolean }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const selectedRole = Form.useWatch('role');

    // Using useQuery to fetch the list of Tenants
    const { data: tenants } = useQuery({
        queryKey: ["tenants"],
        queryFn: () => getTenants({ currentPage, pageSize }),
    });

    return (
        <>
            <Row>
                <Col span={24}>
                    <Card title="Basic Info" bordered={false}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="firstName"
                                    label="First Name"
                                    rules={[{ required: true, message: 'Please enter First Name' }]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="lastName"
                                    label="Last Name"
                                    rules={[{ required: true, message: 'Please enter Last Name' }]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Please enter Email' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                            {/* <Col span={12}>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ required: true, message: 'Please enter Phone Number' }]}
                                >
                                    <Input size='large' type='number' />
                                </Form.Item>
                            </Col> */}
                        </Row>
                    </Card>
                </Col>

                {!isEditMode && <Col span={24} style={{ marginTop: 24 }}>
                    <Card title="Security Info" bordered={false} >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true, message: 'Please enter Password' }]}
                                >
                                    <Input.Password size='large' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Please confirm your password' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords do not match'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                }

                <Col span={24} style={{ marginTop: 24 }}>
                    <Card title="Roles" bordered={false} >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="role"
                                    label="Select Role"
                                    rules={[{ required: true, message: 'Please select Role' }]}
                                >
                                    <Select
                                        size='large'
                                        showSearch
                                        allowClear
                                        placeholder="Select Role"
                                        style={{ width: '100%' }}
                                        options={[
                                            { id: 1, value: Roles.ADMIN, label: 'Admin' },
                                            { id: 2, value: Roles.MANAGER, label: 'Manager' },
                                            { id: 3, value: Roles.CONSUMER, label: 'Consumer' }
                                        ]}
                                    />
                                </Form.Item>
                            </Col>

                            {(selectedRole === Roles.MANAGER) && <Col span={12}>
                                <Form.Item
                                    name="restaurant"
                                    label="Select Restaurant"
                                    rules={[{ required: true, message: 'Please select Restaurant' }]}
                                >
                                    <Select
                                        size='large'
                                        showSearch
                                        allowClear
                                        placeholder="Select Restaurant"
                                        filterOption={(input, option) =>
                                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                        style={{ width: '100%' }}
                                        options={tenants?.tenantsData.map((tenant: { id: number; name: string }) => ({
                                            label: tenant.name,
                                            value: tenant.id
                                        }))}
                                    />
                                </Form.Item>
                            </Col>}

                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default UserForm