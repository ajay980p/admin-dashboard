import React from 'react'
import { Card, Col, Form, Input, Row } from "antd"


interface TenantsFilterProps {
    children: React.ReactNode
}
const TenantsFilter: React.FC<TenantsFilterProps> = ({ children }) => {
    return (
        <Card>

            <Row justify={'space-between'}>
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Form.Item name="search" style={{ margin: 0 }}>
                                <Input.Search
                                    placeholder="Search Tenant"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>

                <Col>
                    {children}
                </Col>
            </Row>
        </Card>
    )
}

export default TenantsFilter