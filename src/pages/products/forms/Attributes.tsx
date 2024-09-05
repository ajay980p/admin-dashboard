import { Col, Card, Row, Switch, Radio, Form } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Category } from '../../../utils/types';

interface Props {
    category: Category;
}

const Attributes: React.FC<Props> = ({ category }) => {
    return (
        <Col span={24} style={{ marginTop: 24 }}>
            <Card title="Product Price" bordered={false}>
                <Row gutter={16}>
                    {category.attributes.map((option) => (
                        <Col key={option._id} span={24}>
                            <Row >
                                {(() => {
                                    switch (option.widgetType.toLowerCase()) {
                                        case 'switch':
                                            return (
                                                <Form.Item
                                                    // name={option.name}
                                                    label={option.name}
                                                    rules={[{
                                                        required: true,
                                                        message: `Please enter price for ${option}`
                                                    }]}
                                                    style={{ width: '100%', fontWeight: 500 }}
                                                >
                                                    <Switch
                                                        checkedChildren={<CheckOutlined />}
                                                        unCheckedChildren={<CloseOutlined />}
                                                        defaultChecked={option.defaultValue.toLowerCase() === 'yes'}
                                                    />
                                                </Form.Item>
                                            );
                                        case 'radio':
                                            return (
                                                <Form.Item
                                                    // name={option.name}
                                                    label={option.name}
                                                    rules={[{
                                                        required: true,
                                                        message: `Please enter price for ${option}`
                                                    }]}
                                                    style={{ width: '100%', fontWeight: 500 }}
                                                >
                                                    <Radio.Group defaultValue={option.defaultValue}>
                                                        {option.availableOptions.map((value) => (
                                                            <Radio.Button key={value} value={value}>
                                                                {value}
                                                            </Radio.Button>
                                                        ))}
                                                    </Radio.Group>
                                                </Form.Item>
                                            );
                                        default:
                                            return null;
                                    }
                                })()}
                            </Row>

                        </Col>
                    ))}
                </Row>
            </Card>
        </Col>
    );
};

export default Attributes;