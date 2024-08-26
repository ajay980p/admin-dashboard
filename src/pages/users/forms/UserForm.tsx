import { Card, Col, Form, Input, Row, Select } from 'antd'

const UserForm = () => {
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
                                    rules={[{ required: true, message: 'Please enter Email' }]}
                                >
                                    <Input size='large' type='email' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ required: true, message: 'Please enter Phone Number' }]}
                                >
                                    <Input size='large' type='number' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={24} style={{ marginTop: 24 }}>
                    <Card title="Security Info" bordered={false} >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true, message: 'Please enter Password' }]}
                                >
                                    <Input size='large' type='password' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    rules={[{ required: true, message: 'Please enter Confirm Password' }]}
                                >
                                    <Input size='large' type='password' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={24} style={{ marginTop: 24 }}>
                    <Card title="Roles" bordered={false} >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Select Role"
                                    rules={[{ required: true, message: 'Please select Role' }]}
                                >
                                    <Select
                                        size='large'
                                        placeholder="Select Role"
                                        style={{ width: '100%' }}
                                        // onChange={handleChange}
                                        options={[
                                            { id: 1, value: 'admin', label: 'Admin' },
                                            { id: 2, value: 'manager', label: 'Manager' },
                                            { id: 3, value: 'customer', label: 'Customer' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Select Restaurant"
                                    rules={[{ required: true, message: 'Please select Restaurant' }]}
                                >
                                    <Select
                                        size='large'
                                        placeholder="Select Restaurant"
                                        style={{ width: '100%' }}
                                        // onChange={handleChange}
                                        options={[
                                            { value: 'jack', label: 'Jack' },
                                            { value: 'lucy', label: 'Lucy' },
                                            { value: 'Yiminghe', label: 'yiminghe' },
                                            { value: 'disabled', label: 'Disabled' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default UserForm