import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from 'antd'
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons"
import { useMutation, useQuery } from '@tanstack/react-query'
// import { Credentials } from '../Types'
import { useAuthStore } from '../../utils/store'
import { login, self } from '../../services/api/UserApi'
// import Logo from "../../assets/icons/pizza-logo.svg"

const loginUser = async (userData: { email: string, password: string }) => {
    const { data } = await login(userData)
    return data;
}
const getSelf = async () => {
    const { data } = await self();
    return data;
}
// const logoutUserFuntion = async () => {
//     const { data } = await logout();
//     return data;
// }
const Login = () => {
    const { setUser } = useAuthStore()

    const { refetch } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        enabled: false
    })

    // const { mutate: logoutUser } = useMutation({
    //     mutationKey: ['logout'],
    //     mutationFn: logoutUserFuntion,
    //     onSuccess: () => {
    //         logoutFromStore;
    //     }
    // });

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: (userData) => {
            refetch();
            setUser(userData.data)
        }
    });

    return (

        <Layout style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
            <Space direction='vertical' align={'center'} size={'large'}>
                <Card
                    title={
                        <Space style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>
                            <LockFilled />
                            Sign In
                        </Space>
                    } bordered={false} style={{ width: 300 }}>

                    <Form
                        initialValues={{ remember: true }}
                        onFinish={(values) =>
                            mutate({ email: values.username, password: values.password })
                        }
                    >
                        <Form.Item name={'username'}
                            rules={[
                                { required: true, message: 'Please input your username!' },
                                { type: 'email', message: 'Please enter a valid email address' }
                            ]}>
                            <Input prefix={< UserOutlined />} placeholder='Username'
                            />
                        </Form.Item>

                        <Form.Item name={'password'}
                            rules={[
                                { required: true, message: 'Please input your password!' },
                            ]}>
                            <Input.Password prefix={<LockOutlined />} placeholder='Password' />
                        </Form.Item>

                        <Flex justify='space-between'>
                            <Form.Item name={'remember'} valuePropName='checked'>
                                <Checkbox >Remember me</Checkbox>
                            </Form.Item>
                            <a href='#' id='login-form-forgot'>Forgot password</a>
                        </Flex>

                        {isError && <Alert type='error' message={error?.message} />}

                        <br />

                        <Form.Item>
                            <Button type='primary' htmlType='submit' style={{ width: '100%' }} loading={isPending}>Login</Button>
                        </Form.Item>

                    </Form>

                </Card>
            </Space>

        </Layout >
    )
}

export default Login