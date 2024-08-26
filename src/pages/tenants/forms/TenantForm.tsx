import { Card, Col, Form, Input, Row } from 'antd'

const TenantForm = () => {

    return (
        <>
            <Row>
                <Col span={24}>
                    <Card title="Basic Info" bordered={false}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please enter Tenant Name' }]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="mailId"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Please enter Email' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="address"
                                    label="Address"
                                    rules={[{ required: true, message: 'Please input valid Address' }]}
                                >
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default TenantForm;