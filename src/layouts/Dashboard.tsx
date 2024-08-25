import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../utils/store';
import { Avatar, Badge, Button, Dropdown, Flex, FlexProps, Layout, Menu, Space, theme, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import Logo from "../assets/icons/pizza-logo.svg"
import Icon, { BellOutlined, UserOutlined, BellFilled, MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined } from '@ant-design/icons';
import Orders from '../pages/sharedComponent/icons/Orders';
import Sales from '../pages/sharedComponent/icons/Sales';
import Promocode from '../pages/sharedComponent/icons/Promocode';
import MenuIcon from '../pages/sharedComponent/icons/MenuIcon';
import HomeIcon from '../pages/sharedComponent/icons/HomeIcon';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../pages/services/api';


const logoutUserFuntion = async () => {
    const { data } = await logout();
    return data;
}
const Dashboard = () => {
    const { logoutFromStore } = useAuthStore()
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAuthStore();

    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }

    const { mutate: logoutUser } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logoutUserFuntion,
        onSuccess: () => {
            logoutFromStore;
            return;
        }
    });



    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const items = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Home',
        },
        // {
        //     key: '2',
        //     icon: <Icon component={MenuIcon} />,
        //     label: 'Menu',
        // },
        {
            key: '3',
            icon: <Icon component={Orders} />,
            label: 'Orders',
        },
        {
            key: '4',
            icon: <Icon component={Sales} />,
            label: 'Sales',
        },
        {
            key: '5',
            icon: <Icon component={Promocode} />,
            label: 'Promos',
        },
    ]

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} theme='light' collapsible collapsed={collapsed}>
                <div className='logo'>
                    <img src={Logo} width={'25px'} style={{ marginRight: '10px' }} />
                    {!collapsed && <Typography.Text strong>Pizza Space</Typography.Text>}
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>

                    <Flex gap="middle" align="start" justify="space-between" style={{ paddingLeft: '16px', paddingRight: '30px' }}>
                        {/* <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        /> */}
                        <Badge text="Admin" status='success' />
                        <Space>
                            <Space style={{ paddingRight: '15px' }}>
                                <Badge dot={true} >
                                    <BellFilled />
                                </Badge>
                            </Space>
                            <Space wrap size={16}>
                                <Dropdown menu={
                                    {
                                        items: [{
                                            key: '1',
                                            icon: <UserOutlined />,
                                            label: 'Logout',
                                            onClick: () => logoutUser()
                                        }]
                                    }}
                                    placement="bottom">
                                    <Avatar size={40} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                </Dropdown>
                            </Space>
                        </Space>
                    </Flex>

                </Header>
                <Content
                    style={{
                        margin: '20px 16px',
                        padding: 24,
                        // minHeight: '78vh',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Mern Space Pizza App ©{new Date().getFullYear()} Created by Ajay
                </Footer>

            </Layout>
        </Layout >

    )
}

export default Dashboard