import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../utils/store';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';
import Logo from "../assets/icons/pizza-logo.svg"
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme, Typography } from 'antd';
import Icon, { UserOutlined, BellFilled, ShoppingOutlined, MenuOutlined, CoffeeOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined } from '@ant-design/icons';
import Sales from '../pages/sharedComponent/icons/Sales';
import Promocode from '../pages/sharedComponent/icons/Promocode';
import MenuIcon from '../pages/sharedComponent/icons/MenuIcon';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../pages/services/api';


const getMenuItems = (role: string) => {
    const baseItems = [
        {
            key: "/",
            icon: <HomeOutlined />,
            label: <NavLink to="/" style={{ color: 'black' }}>Home</NavLink>
        },
        {
            key: "/tenants",
            icon: <CoffeeOutlined />,
            label: <NavLink to="/tenants" style={{ color: 'black' }}>Restaurants</NavLink>
        },
        {
            key: '/menu',
            icon: <MenuOutlined />,
            label: <NavLink to="/menu" style={{ color: 'black' }}>Menu</NavLink>
        },
        {
            key: '/orders',
            icon: <ShoppingOutlined />,
            label: <NavLink to="/orders" style={{ color: 'black' }}>Orders</NavLink>
        },
        {
            key: '/sales',
            icon: <Icon component={Sales} />,
            label: <NavLink to="/sales" style={{ color: 'black' }}>Sales</NavLink>
        },
        {
            key: '/promos',
            icon: <Icon component={Promocode} />,
            label: <NavLink to="/promos" style={{ color: 'black' }}>Promos</NavLink>
        },
    ]

    if (role === 'admin') {
        const menus = [...baseItems]

        menus.splice(1, 0, {
            key: "/users",
            icon: <UserOutlined />,
            label:
                <NavLink to="/users" style={{ color: 'black' }}>Users</NavLink>
        },)

        return menus;
    }
    return baseItems;
}

const logoutUserFuntion = async () => {
    const { data } = await logout();
    return data;
}
const Dashboard = () => {
    const { logoutFromStore, user } = useAuthStore();
    const [collapsed, setCollapsed] = useState(false);
    const items = getMenuItems(user?.role as string);
    const location = useLocation();

    const { mutate: logoutUser } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logoutUserFuntion,
        onSuccess: () => {
            logoutFromStore();
            <Navigate to={`/auth/login`} replace={true} />;
        }
    });

    if (user === null) {
        return <Navigate to={`/auth/login?returnTo=${location.pathname}`} replace={true} />;
    }

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

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
                    selectedKeys={[location.pathname]}
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
                        <Badge text={user.role === "admin" ? "You are an Admin" : `${user.firstName} ${user.lastName}`} status='success' />
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
                                    <Avatar size={40} style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />} />
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
                        backgroundColor: '#f5f5f5',
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