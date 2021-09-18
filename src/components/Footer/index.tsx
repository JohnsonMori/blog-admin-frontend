import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'
export default () => {
    const defaultMessage = '流浪喵体验技术部出品'
    const currentYear = new Date().getFullYear()
    return (
        <DefaultFooter
            copyright={`${currentYear} ${defaultMessage}`}
            links={[
                {
                    key: 'github',
                    title: <GithubOutlined />,
                    href: 'https://github.com/JohnsonMori',
                    blankTarget: true,
                },
                {
                    key: 'blog',
                    title: '面朝大海，春暖花开',
                    href: 'https://johnsonmori.github.io',
                    blankTarget: true,
                },
            ]}
        />
    )
}
