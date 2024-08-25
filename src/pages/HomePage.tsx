import { Avatar, Card, Col, Flex, Row, Space, Statistic, Tag, Typography } from "antd"
import Title from "antd/es/typography/Title"
import { ShoppingOutlined } from "@ant-design/icons";
const { Text } = Typography;

const HomePage = () => {

    const recentOrders = [
        {
            id: 1,
            name: "Rakesh Kohali",
            address: "main street, bandra",
            amount: 1250,
            status: "Preparing",
            statusColor: "red",
        },
        {
            id: 2,
            name: "John Doe",
            address: "side street, bandra",
            amount: 900,
            status: "On the way",
            statusColor: "blue",
        },
        {
            id: 3,
            name: "Naman Kar",
            address: "down street, bandra",
            amount: 1900,
            status: "Delivered",
            statusColor: "green",
        },
    ];

    return (
        <div>
            <Title level={4}>Welcome, Ajay 😀</Title>

            <div>
                <Flex justify="space-between">

                    <Space direction="vertical" size={16}>
                        <Card title={
                            <Row align="middle" gutter={8}>
                                <Col>
                                    <Avatar
                                        icon={<ShoppingOutlined />}
                                        style={{ backgroundColor: "#FF6F61" }}
                                    />
                                </Col>
                                <Col>
                                    <Text strong>Total orders</Text>
                                </Col>
                            </Row>
                        } style={{ width: 300 }}>
                            <Statistic value={112893} />
                        </Card>
                    </Space>


                    <Space direction="vertical" size={16}>
                        <Card title="Total Sale" style={{ width: 300 }}>
                            <Statistic value={112893} />
                        </Card>
                    </Space>

                    <Space direction="vertical">
                        <Card title={
                            <Row align="middle" gutter={8}>
                                <Col>
                                    <Avatar
                                        icon={<ShoppingOutlined />}
                                        style={{ backgroundColor: "#FF6F61" }}
                                    />
                                </Col>
                                <Col>
                                    <Text strong>Recent orders</Text>
                                </Col>
                            </Row>
                        } style={{ width: 500 }}>
                            <Col>
                                {recentOrders.map((order) => (
                                    <Row key={order.id} justify="space-between" align="middle" style={{ marginBottom: 16 }}                               >
                                        <Col>
                                            <Text strong>{order.name}</Text>
                                            <br />
                                            <Text type="secondary">{order.address}</Text>
                                        </Col>
                                        <Col>
                                            <Text strong >₹ {order.amount}</Text>
                                        </Col>
                                        <Col>
                                            <Tag color={order.statusColor} bordered={false} style={{ borderRadius: 25, padding: 7, fontWeight: 600 }} >{order.status}</Tag>
                                        </Col>
                                    </Row>
                                ))}

                                <Row justify="start">
                                    <Text underline style={{ cursor: "pointer", color: "#FF4D4F" }}>
                                        See all orders
                                    </Text>
                                </Row>
                            </Col>
                        </Card>
                    </Space>
                </Flex>

            </div>


        </div>
    )
}

export default HomePage