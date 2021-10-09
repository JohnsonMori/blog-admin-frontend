import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { addNav } from '@/services/blog/api';
import type { ActionType } from '@ant-design/pro-table';

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

const MenuList: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable
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
