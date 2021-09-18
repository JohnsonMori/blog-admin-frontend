import { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
    pwa?: boolean
    logo?: string
} = {
    navTheme: 'dark',
    // 拂晓蓝
    primaryColor: '#13a8a8',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    title: 'Blog Admin',
    pwa: false,
    logo: 'https://zos.alipayobjects.com/rmsportal/JFKAMfmPehWfhBPdCjrw.svg',
    iconfontUrl: '',
}

export default Settings
