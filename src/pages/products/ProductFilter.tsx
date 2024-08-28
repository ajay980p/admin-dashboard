import { Card, Col, Form, Input, Row, Select, Switch } from "antd"
import { Roles } from "../../utils/constant";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

interface ProductFilterProps {
    formFilter: any;
    handleValuesChange: (changedValues: any, allValues: any) => void;
    children: React.ReactNode;
}
const ProductFilter: React.FC<ProductFilterProps> = ({ formFilter, handleValuesChange, children }) => {


    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <Form form={formFilter} onValuesChange={handleValuesChange} layout="vertical">
            <Card>
                <Row justify={'space-between'}>
                    <Col>
                        <Row gutter={16}>
                            <Col>
                                <Form.Item name="search" style={{ margin: 0 }}>
                                    <Input.Search
                                        placeholder="Search User"
                                    />
                                </Form.Item>
                            </Col>

                            <Col>
                                <Form.Item name="role" style={{ margin: 0 }}>
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ width: 120 }}
                                        placeholder="Select Category"
                                        options={[
                                            { id: 1, value: Roles.ADMIN, label: 'Admin' },
                                            { id: 2, value: Roles.MANAGER, label: 'Manager' },
                                            { id: 3, value: Roles.CONSUMER, label: 'Customer' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>

                            <Col>
                                <Form.Item name="role" style={{ margin: 0 }}>
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ width: 120 }}
                                        placeholder="Select Restaurant"
                                        options={[
                                            { id: 1, value: Roles.ADMIN, label: 'Admin' },
                                            { id: 2, value: Roles.MANAGER, label: 'Manager' },
                                            { id: 3, value: Roles.CONSUMER, label: 'Customer' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>

                            <Col>
                                <Form.Item name="role" style={{ margin: 0, textAlign: 'center' }}>
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        onChange={onChange}
                                    />{' '}
                                    <span style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
                                        show only published
                                    </span>
                                </Form.Item>
                            </Col>

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

export default ProductFilter;