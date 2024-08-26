import React from 'react'
import { Card, Col, Input, Row } from "antd"


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
                            <Input.Search
                                placeholder="Search Tenant"
                            />
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