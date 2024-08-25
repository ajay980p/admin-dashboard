import { Button, Card, Col, Input, Row, Select } from "antd"
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

const UserFilter = () => {
    return (
        <Card>

            <Row justify={'space-between'}>
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Input.Search
                                placeholder="Search User"
                            />
                        </Col>
                        <Col>
                            <Select
                                placeholder="User"
                                style={{ width: 120 }}
                                // onChange={handleChange}
                                options={[
                                    { id: 1, value: 'jack', label: 'Jack' },
                                    { id: 2, value: 'lucy', label: 'Lucy' },
                                    { id: 3, value: 'Yiminghe', label: 'yiminghe' },
                                    { id: 4, value: 'disabled', label: 'Disabled' },
                                ]}
                            />
                        </Col>

                        <Col>
                            <Select
                                placeholder="Status"
                                style={{ width: 120 }}
                                // onChange={handleChange}
                                options={[
                                    { id: 1, value: 'active', label: 'Active' },
                                    { id: 2, value: 'inActive', label: 'Inactive' },
                                ]}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col>
                    <Button type="primary" icon={<PlusOutlined />}>
                        Add User
                    </Button>
                </Col>
            </Row>



        </Card>
    )
}

export default UserFilter