<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader :show-filter="false">
          <template #top-right>
            <AddButton @add="onAddItem" />
          </template>
        </TableHeader>
      </template>
      <template #default>
        <n-data-table
          :loading="tableLoading"
          :data="dataList"
          :columns="tableColumns"
          :row-key="rowKey"
        />
      </template>
    </TableBody>
    <ModalDialog ref="modalDialogRef" @confirm="onDataFormConfirm">
      <template #content>
        <DataForm ref="dataFormRef" :options="formItems" />
      </template>
    </ModalDialog>
    <ModalDialog ref="menuModalDialogRef" title="菜单权限" contentHeight="40vh">
      <template #content>
        <n-tree
          :data="menuData"
          checkable
          block-line
          cascade
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
        />
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getMenuListByRoleId, getRoleList } from '@/api/url'
  import {
    TableActionModel,
    useRenderAction,
    useRowKey,
    useTable,
    useTableColumn,
  } from '@/hooks/table'
  import { DataFormType, ModalDialogType, FormItem } from '@/types/components'
  import { DataTableColumn, NInput, TreeOption, useDialog, useMessage } from 'naive-ui'
  import { defineComponent, h, nextTick, onMounted, ref, shallowReactive } from 'vue'

  interface RoleModeType {
    Name: string
    Role: string
    Description: string
    CreatedTime: string
  }

  const formItems = [
    {
      label: '角色编号',
      key: 'Role',
      value: ref(null),
      maxLength: 20,
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error('请输入角色编码')
          return false
        }
        return true
      },
      render: (formItem) => {
        return h(
          NInput,
          {
            value: formItem.value.value,
            disabled: formItem.disabled,
            onUpdateValue: (val) => {
              formItem.value.value = val
            },
            placeholder: '请输入角色描述',
          }
          // {
          //   prefix: () => h('div', ROLE_CODE_FLAG),
          // }
        )
      },
    },
    {
      label: '角色名称',
      type: 'input',
      key: 'Name',
      value: ref(null),
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error('请输入角色名称')
          return false
        }
        return true
      },
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          placeholder: '请输入角色名称',
        })
      },
    },
    {
      label: '角色描述',
      key: 'Description',
      value: ref(null),
      maxLength: 50,
      inputType: 'text',
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error('请输入角色名称')
          return false
        }
        return true
      },
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          placeholder: '请输入角色描述',
          type: 'textarea',
          rows: 3,
        })
      },
    },
  ] as FormItem[]
  function handleMenuData(
    menuData: Array<any>,
    defaultCheckedKeys: Array<string>,
    defaultExpandedKeys: Array<string>
  ) {
    const tempMenus = [] as Array<TreeOption>
    menuData.forEach((it) => {
      const tempMenu = {} as TreeOption
      tempMenu.key = it.menuUrl
      tempMenu.label = it.menuName
      defaultCheckedKeys.push(tempMenu.key as string)
      if (it.children) {
        defaultExpandedKeys.push(tempMenu.key as string)
        tempMenu.children = handleMenuData(it.children, defaultCheckedKeys, defaultExpandedKeys)
      }
      tempMenus.push(tempMenu)
    })
    return tempMenus
  }
  export default defineComponent({
    name: 'Role',
    setup() {
      const modalDialogRef = ref<ModalDialogType | null>(null)
      const dataFormRef = ref<DataFormType | null>(null)
      const menuModalDialogRef = ref<ModalDialogType | null>(null)
      const table = useTable<RoleModeType>()
      const rowKey = useRowKey('id')
      const naiveDialog = useDialog()
      const message = useMessage()
      const menuData = shallowReactive([] as Array<TreeOption>)
      const tableColumns = useTableColumn(
        [
          table.selectionColumn,
          table.indexColumn,
          {
            title: '角色编码',
            key: 'Role',
          },
          {
            title: '角色名称',
            key: 'Name',
          },
          {
            title: '角色描述',
            key: 'Description',
          },
          {
            title: '创建日期',
            key: 'CreatedTime',
          },
          {
            title: '操作',
            key: 'actions',
            render: (rowData) => {
              return useRenderAction([
                {
                  label: '编辑',
                  onClick: onUpdateItem.bind(null, rowData),
                },
                {
                  label: '删除',
                  type: 'error',
                  onClick: onDeleteItem.bind(null, rowData),
                  // },
                  // {
                  //   label: '菜单权限',
                  //   type: 'success',
                  //   onClick: onShowMenu.bind(null, rowData),
                },
              ] as TableActionModel[])
            },
          },
        ],
        {
          align: 'center',
        } as DataTableColumn
      )
      const defaultCheckedKeys = shallowReactive([] as Array<string>)
      const defaultExpandedKeys = shallowReactive([] as Array<string>)
      function doRefresh() {
        post<any>({
          url: '/ADM08000B/list',
          data: {},
        })
          .then((res) => {
            table.handleSuccess(res)
          })
          .catch(console.log)
      }
      function onAddItem() {
        modalDialogRef.value?.toggle()
        nextTick(() => {
          formItems.forEach((it) => {
            const key = it.key
            const propName = item[key]

            if (propName) {
              if (it.key === 'Role') {
                it.disabled = false
              }
            }
          })

          dataFormRef.value?.reset()
        })
      }
      function onUpdateItem(item: any) {
        modalDialogRef.value?.toggle()
        nextTick(() => {
          formItems.forEach((it) => {
            const key = it.key
            const propName = item[key]
            console.log(key)
            console.log(propName)

            if (propName) {
              if (it.key === 'sRole') {
                it.disabled = true
              }
              it.value.value = propName
            }
            console.log(it)
          })
        })
      }
      function onDeleteItem(data: any) {
        console.log(data)

        naiveDialog.warning({
          title: '提示',
          content: '是否要删除此菜单？',
          positiveText: '删除',
          onPositiveClick: () => {
            console.log(data)
            let formArray = {}
            formArray.sRole = data.sRole
            post<any>({
              url: '/ADM08000B/xdelete',
              data: formArray,
            })
              .then((res) => {
                if (res.sCode == 'SUCCESS') {
                  doRefresh()
                  message.success(data.sName + '删除成功！')
                }
              })
              .catch(console.log)
          },
        })
      }
      function onDataFormConfirm() {
        if (dataFormRef.value?.validator()) {
          modalDialogRef.value?.toggle()

          naiveDialog.success({
            title: '提示',
            positiveText: '确定',
            content:
              '模拟菜单添加成功，参数为：' + JSON.stringify(dataFormRef.value.generatorParams()),
          })
        }
      }
      function onShowMenu(item: any) {
        post({
          url: getMenuListByRoleId,
          data: {
            roleId: item.id,
          },
        })
          .then((res) => {
            menuData.length = 0
            menuData.push(...handleMenuData(res.data, defaultCheckedKeys, defaultExpandedKeys))
            menuModalDialogRef.value?.toggle()
          })
          .catch(console.log)
      }
      onMounted(doRefresh)
      return {
        modalDialogRef,
        menuModalDialogRef,
        dataFormRef,
        rowKey,
        menuData,
        tableColumns,
        formItems,
        defaultCheckedKeys,
        defaultExpandedKeys,
        ...table,
        onAddItem,
        onDataFormConfirm,
      }
    },
  })
</script>
