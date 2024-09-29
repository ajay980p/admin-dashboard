import { Col, Card, Row, Switch, Radio, Form } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Category } from '../../../utils/types';

interface Props {
    category: Category;
}
const Attributes: React.FC<Props> = ({ category }) => {
    return (
        <Col span={24} style={{ marginTop: 24 }}>
            <Card title="Attributes" bordered={false}>
                <Row gutter={16}>
                    {category.attributes.map((option, index) => (
                        <Col key={option._id} span={24}>
                            <Row>
                                {(() => {
                                    switch (option.widgetType.toLowerCase()) {
                                        case 'switch':
                                            return (
                                                <Form.Item
                                                    name={['attributes', index, 'value']}
                                                    label={option.name}
                                                    valuePropName="checked"
                                                    initialValue={option.defaultValue.toLowerCase() === 'yes'}
                                                    style={{ width: '100%', fontWeight: 500 }}
                                                >
                                                    <Switch
                                                        checkedChildren={<CheckOutlined />}
                                                        unCheckedChildren={<CloseOutlined />}
                                                    />
                                                </Form.Item>
                                            );
                                        case 'radio':
                                            return (
                                                <Form.Item
                                                    name={['attributes', index, 'value']}
                                                    label={option.name}
                                                    initialValue={option.defaultValue}
                                                    style={{ width: '100%', fontWeight: 500 }}
                                                >
                                                    <Radio.Group>
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
                                {/* Hidden fields to hold additional data for each attribute */}
                                <Form.Item name={['attributes', index, 'name']} initialValue={option.name} hidden>
                                    <input type="hidden" />
                                </Form.Item>
                                <Form.Item name={['attributes', index, 'widgetType']} initialValue={option.widgetType} hidden>
                                    <input type="hidden" />
                                </Form.Item>
                            </Row>
                        </Col>
                    ))}
                </Row>
            </Card>
        </Col>
    );
};

export default Attributes;