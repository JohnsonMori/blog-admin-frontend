import { AlipayCircleOutlined, LockOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined } from '@ant-design/icons'
import { Alert, Space, message, Tabs } from 'antd'
import React, { useState } from 'react'
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form'
import { history, useModel } from 'umi'
import Footer from '@/components/Footer'
import { login } from '@/services/ant-design-pro/api'
import styles from './index.less'

const LoginMessage: React.FC<{
    content: string
}> = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type='error'
        showIcon
    />
)

const Login: React.FC = () => {
    const [submitting, setSubmitting] = useState(false)
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({})
    const [type, setType] = useState<string>('account')
    const { initialState, setInitialState } = useModel('@@initialState')

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.()

        if (userInfo) {
            await setInitialState((s) => ({ ...s, currentUser: userInfo }))
        }
    }

    const handleSubmit = async (values: API.LoginParams) => {
        setSubmitting(true)

        try {
            // 登录
            const msg = await login({ ...values, type })

            if (msg.status === 'ok') {
                const defaultLoginSuccessMessage = '登录成功！'
                message.success(defaultLoginSuccessMessage)
                await fetchUserInfo()
                /** 此方法会跳转到 redirect 参数所在的位置 */

                if (!history) return
                const { query } = history.location
                const { redirect } = query as {
                    redirect: string
                }
                history.push(redirect || '/')
                return
            } // 如果失败去设置用户错误信息

            setUserLoginState(msg)
        } catch (error) {
            const defaultLoginFailureMessage = '登录失败，请重试！'
            message.error(defaultLoginFailureMessage)
        }

        setSubmitting(false)
    }

    const { status, type: loginType } = userLoginState
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.main}>
                    <ProForm
                        initialValues={{
                            autoLogin: true,
                        }}
                        submitter={{
                            searchConfig: {
                                submitText: '登录',
                            },
                            render: (_, dom) => dom.pop(),
                            submitButtonProps: {
                                loading: submitting,
                                size: 'large',
                                style: {
                                    width: '100%',
                                },
                            },
                        }}
                        onFinish={async (values) => {
                            await handleSubmit(values as API.LoginParams)
                        }}>
                        <Tabs activeKey={type} onChange={setType}>
                            <Tabs.TabPane key='account' tab={'账户密码登录'} />
                        </Tabs>

                        {status === 'error' && loginType === 'account' && <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />}
                        {type === 'account' && (
                            <>
                                <ProFormText
                                    name='username'
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <UserOutlined className={styles.prefixIcon} />,
                                    }}
                                    placeholder={'用户名'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '用户名是必填项！',
                                        },
                                    ]}
                                />
                                <ProFormText.Password
                                    name='password'
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={styles.prefixIcon} />,
                                    }}
                                    placeholder={'密码'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码是必填项！',
                                        },
                                    ]}
                                />
                            </>
                        )}

                        <div
                            style={{
                                marginBottom: 24,
                            }}>
                            <ProFormCheckbox noStyle name='autoLogin'>
                                自动登录
                            </ProFormCheckbox>
                            <a
                                style={{
                                    float: 'right',
                                }}>
                                忘记密码 ?
                            </a>
                        </div>
                    </ProForm>
                    <Space className={styles.other}>
                        其他登录方式 :
                        <AlipayCircleOutlined className={styles.icon} />
                        <TaobaoCircleOutlined className={styles.icon} />
                        <WeiboCircleOutlined className={styles.icon} />
                    </Space>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login
