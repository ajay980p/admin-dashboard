import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './utils/router'
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#FF5F1F',
                    colorLink: '#FF5F1F',
                }
            }}>
                <RouterProvider router={router} />
            </ConfigProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
