import { Card, Col, Form, Input, Row, Select } from "antd"
import { Roles } from "../../utils/constant";

interface UserFilterProps {
    formFilter: any;
    handleValuesChange: (changedValues: any, allValues: any) => void;
    children: React.ReactNode;
}
const UserFilter: React.FC<UserFilterProps> = ({ formFilter, handleValuesChange, children }) => {
    return (
        <Form form={formFilter} onValuesChange={handleValuesChange} layout="vertical">
            <Card>
                <Row justify={'space-between'}>
                    <Col>
                        <Row gutter={16}>

                            <Col>
                                <Form.Item name="search">
                                    <Input.Search
                                        placeholder="Search User"
                                    />
                                </Form.Item>
                            </Col>

                            <Col>
                                <Form.Item name="role">
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ width: 120 }}
                                        placeholder="Select Role"
                                        options={[
                                            { id: 1, value: Roles.ADMIN, label: 'Admin' },
                                            { id: 2, value: Roles.MANAGER, label: 'Manager' },
                                            { id: 3, value: Roles.CONSUMER, label: 'Customer' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>

                            {/* <Col>
                            <Select
                                placeholder="Status"
                                style={{ width: 120 }}
                                // onChange={handleChange}
                                options={[
                                    { id: 1, value: 'active', label: 'Active' },
                                    { id: 2, value: 'inActive', label: 'Inactive' },
                                ]}
                            />
                        </Col> */}

                        </Row>
                    </Col>

                    <Col>
                        {children}
                    </Col>
                </Row>
            </Card>
        </Form>
    )
}

export default UserFilter