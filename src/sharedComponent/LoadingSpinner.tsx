import { ConfigProvider, Flex, Spin } from "antd";

const LoadingSpinner = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'blue',
                    borderRadius: 2,
                },
            }}
        >
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Flex align="center" gap="middle"  >
                    <Spin size="large" />
                </Flex>
            </div>
        </ConfigProvider>
    )
}

export default LoadingSpinner


