import React from 'react';
import { Col, Row, Typography, Form, InputNumber, Space, Card } from 'antd';
import { Category } from '../../../utils/types';

interface Props {
    category: Category;
}

const Pricing: React.FC<Props> = ({ category }) => {
    return (
        <>
            <Col span={24} style={{ marginTop: 24 }}>
                <Card title="Product Price" bordered={false} >
                    <Row gutter={16}>
                        {Object.entries(category.priceConfiguration).map(([configurationKey, configurationValue]) => (
                            <div key={configurationKey}>

                                <Space direction='vertical' size="large" style={{ width: '100%' }}>

                                    <Typography.Text strong> {`${configurationKey} (${configurationValue.priceType})`} </Typography.Text>

                                    <Row gutter={20} style={{ width: '100%' }}>
                                        {configurationValue.availableOptions.map((option: string, index: number) => (
                                            <Col
                                                span={configurationValue.availableOptions.length === 2 ? 10 : 8}
                                                key={index}
                                                style={{ width: '100%' }}
                                            >
                                                <Form.Item
                                                    name={`${configurationKey}_${option}`}
                                                    label={option}
                                                    rules={[{
                                                        required: true,
                                                        message: `Please enter price for ${option}`
                                                    }]}
                                                    style={{ width: '100%' }}
                                                >
                                                    <InputNumber size="large" addonAfter="₹" style={{ width: '100%' }} />
                                                </Form.Item>
                                            </Col>
                                        ))}
                                    </Row>

                                </Space>
                            </div >
                        ))}
                    </Row >
                </Card>
            </Col>
        </>

    );
};

export default Pricing;