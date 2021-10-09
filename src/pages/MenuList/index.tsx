import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { addNav, navigation } from '@/services/blog/api';
import type { ActionType, ProColumns } from '@ant-design/pro-table';

/**
 * @en-US Add node
 * @zh-CN 添加导航菜单项
 * @param fields
 */

const handleAdd = async (fields: API.MenuListItem) => {
  const hide = message.loading('正在添加');

  try {
    const { code } = await addNav({ ...fields });
    hide();
    const success = code === 10000;
    if (success) {
      message.success('添加成功');
    }
    return success;
  } catch (error) {
    hide();
    message.error('添加失败，请重试!');
    return false;
  }
};

const columns: ProColumns<API.MenuListItem>[] = [
  {
    title: '导航名称',
    dataIndex: 'name',
    tip: 'The navigation name is unique',
  },
  // {
  //   title: '描述',
  //   dataIndex: 'desc',
  //   valueType: 'textarea',
  // },
  // {
  //   title: '服务调用次数',
  //   dataIndex: 'callNo',
  //   sorter: true,
  //   hideInForm: true,
  //   renderText: (val: string) => `${val}${'万'}`,
  // },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   hideInForm: true,
  //   valueEnum: {
  //     0: {
  //       text: '关闭',
  //       status: 'Default',
  //     },
  //     1: {
  //       text: '运行中',
  //       status: 'Processing',
  //     },
  //     2: {
  //       text: '已上线',
  //       status: 'Success',
  //     },
  //     3: {
  //       text: '异常',
  //       status: 'Error',
  //     },
  //   },
  // },
  // {
  //   title: '上次调度时间',
  //   sorter: true,
  //   dataIndex: 'updatedAt',
  //   valueType: 'dateTime',
  //   renderFormItem: (item, { defaultRender, ...rest }, form) => {
  //     const status = form.getFieldValue('status');

  //     if (`${status}` === '0') {
  //       return false;
  //     }

  //     if (`${status}` === '3') {
  //       return <Input {...rest} placeholder={'请输入异常原因！'} />;
  //     }

  //     return defaultRender(item);
  //   },
  // },
  // {
  //   title: '操作',
  //   dataIndex: 'option',
  //   valueType: 'option',
  //   render: (_, record) => [
  //     <a
  //       key="config"
  //       onClick={() => {
  //         handleUpdateModalVisible(true);
  //         setCurrentRow(record);
  //       }}
  //     >
  //       配置
  //     </a>,
  //     <a key="subscribeAlert" href="https://procomponents.ant.design/">
  //       订阅警报
  //     </a>,
  //   ],
  // },
];

const MenuList: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<API.MenuListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={navigation}
        columns={columns}
      />
      <ModalForm
        title={'新建导航'}
        width="400px"
        visible={visible}
        modalProps={{ destroyOnClose: true }}
        onVisibleChange={setVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as aAPI.RuleListItem);

          if (success) {
            setVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '名称为必填项',
            },
          ]}
          fieldProps={{ maxLength: 20 }}
          width="md"
          name="name"
          label="名称"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '路由为必填项',
            },
          ]}
          fieldProps={{ maxLength: 20 }}
          width="md"
          name="route"
          label="路由"
        />
        <ProFormDigit
          rules={[
            {
              required: true,
              message: '权重为必填项',
            },
          ]}
          label="权重"
          name="weight"
          width="xs"
          min={1}
          max={100}
          fieldProps={{ precision: 0 }}
          tooltip="权重为1～100的正整数，导航列表根据权重排序，数值越小权重越高"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default MenuList;
