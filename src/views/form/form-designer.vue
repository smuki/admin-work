<template>
  <div :class="$style.container">
    <div
      :class="{
        [$style.contentWrap]: true,
        [$style.closeToolbar]: closeToolbar,
      }"
    >
      <div :class="$style.toolBarWrap">
        <div :class="$style.toolsBar">
          <EditorToolBar
            :drag-group="dragOptions.group"
            :config-tools="configTools"
            @onFilter="$message.error('该组件添加数目已达上限！')"
          />
          toolbar...
        </div>
        <span :class="$style.leftCaret" @click="closeToolbar = !closeToolbar">
          <i class="el-icon-caret-right"></i>
        </span>
      </div>

      <div v-if="false" :class="[$style.contentBox]">
        <n-form
          style="height: 100%"
          :model="rootFormData"
          v-bind="formProps"
          class="genFromComponent"
          :class="{
            layoutColumn: !formProps.inline,
            [`layoutColumn-${formProps.layoutColumn}`]: !formProps.inline,
            formInlineFooter: formProps.inlineFooter,
            formInline: formProps.inline,
            // [`genFromComponent_${schema.id}Form`]: !!schema.id,
          }"
        >
          <NestedEditor
            :child-component-list="componentList"
            :drag-options="dragOptions"
            :form-data="rootFormData"
            :form-props="formProps"
          >
            <n-form-item
              v-if="componentList.length > 0 && formFooter.show"
              :style="{
                display: formProps.inline && formProps.inlineFooter ? 'inline-block' : 'block',
              }"
              class="formFooter_item w100 formFooter_item-editor"
            >
              <el-button @click="$emit('onCancel')">{{ formFooter.cancelBtn }}</el-button>
              <el-button type="primary" @click="$emit('onSubmit')">
                {{ formFooter.okBtn }}
              </el-button>
            </n-form-item>
          </NestedEditor>
        </n-form>
        <div v-if="componentList.length === 0" :class="$style.tipBox">
          <p>拖拽左侧栏的组件进行添加</p>
        </div>
      </div>

      <div :class="$style.rightForm">
        <n-tabs v-model="activeName">
          <n-tab-pane v-if="curEditorItem" label="组件配置" name="compConfig">
            <VueJsonFrom
              v-model="curEditorItem.componentValue"
              :class="$style.configForm"
              :schema="curEditorItem.componentPack.propsSchema"
              :form-props="{
                labelPosition: 'right',
                labelWidth: '110px',
              }"
              :form-footer="{
                show: false,
              }"
            />
          </n-tab-pane>
          <n-tab-pane label="表单配置" name="formConfig">
            <VueJsonFrom
              v-model="formConfig"
              :class="$style.configForm"
              :schema="FormConfSchema"
              :form-props="{
                labelPosition: 'right',
                labelWidth: '110px',
              }"
              :form-footer="{
                show: false,
              }"
            />
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineAsyncComponent, getCurrentInstance, h } from 'vue'
  import { getSpecification } from '@/api/url'
  import { post } from '@/api/http'
  import EditorToolBar from './components/EditorToolBar.vue'
  import configTools from './config/tools'

  let installedNaive = false
  const VueNaiveForm = defineAsyncComponent(async () => {
    // eslint-disable-next-line no-unused-vars
    const [naive, antForm] = await Promise.all([
      import('./Naive/index.js'),
      import('@/vue3-form-naive'),
    ])

    return {
      name: 'naiveFormWrap',
      setup(props, { attrs, slots }) {
        // hack 动态install naive，因为我不知其它地方如何获取 vue app
        if (!installedNaive) {
          const instance = getCurrentInstance()
          instance.appContext.app.use(naive.default)
          installedNaive = true
        }

        return () =>
          h(
            antForm.default,
            {
              ...attrs,
            },
            slots
          )
      },
    }
  })

  //const typeItems = Object.keys(schemaTypes);

  const formData = {
    lastName: 'Liu',
    age: 88,
    bio: '知道的越多、就知道的越少',
    password: 'My.Pass',
    telephone: '1881446xxxx',
  }

  const uiSchema = {
    'ui:description': '简单表单例子（这里通过UiSchema覆盖了默认description描述配置）',
    firstName: {
      'ui:title': '名字',
      'ui:description': '比如：李白姓李、孙尚香姓孙、马可波罗姓马可波',
      'ui:emptyValue': '',
      'ui:options': {
        placeholder: '请输入你的姓',
        attrs: {
          autofocus: true,
        },
      },
    },
    bio: {
      'ui:options': {
        placeholder: '请输入你的签名',
        type: 'textarea',
        rows: 6,
      },
    },
  }

  const errorSchema = {
    bio: {
      'err:minLength': '签名最小长度10个字符串',
    },
  }

  export default {
    name: 'Demo',
    components: {
      EditorToolBar,
      //VueNaiveForm,
      //EditorHeader
    },
    data() {
      return {
        configTools,
        componentList: [],
        activeName: 'formConfig',
        curEditorItem: null, // 选中的formItem
        formConfig: {},

        //typeItems,
        formProps: {
          labelPosition: 'top',
          layoutColumn: 2,
        },
        schema: {},
        uiSchema,
        errorSchema,
        formData,
        //typeItems
        //...this.getDefaultSchemaMap(),
        formComponents: [
          {
            name: 'Naive',
            component: 'VueNaiveForm',
          },
        ],
        customFormats: {
          price(value) {
            return (
              value !== '' &&
              /^[0-9]\d*$|^\d+(\.\d{1,2})$/.test(value) &&
              value >= 0 &&
              value <= 999999.99
            )
          },
        },
      }
    },
    computed: {
      pageKey() {
        return this.$route.query.type
      },
      isUseLabelWidth() {
        return this.curVueForm !== 'VueAntForm'
      },
      trueFormProps() {
        if (!this.formProps)
          return {
            labelPosition: 'top',
          }

        const { labelColSpan, wrapperColSpan, labelWidth, ...otherProps } = this.formProps
        return {
          ...otherProps,
          ...(this.isUseLabelWidth
            ? {
                labelWidth: labelWidth ? `${labelWidth * 4}px` : undefined,
              }
            : {
                labelCol: {
                  span: labelColSpan,
                },
                wrapperCol: {
                  span: wrapperColSpan,
                },
              }),
        }
      },
      trueFormFooter() {
        // const {
        // labelColSpan,
        // wrapperColSpan
        // } = this.formProps;

        return this.isUseLabelWidth
          ? this.formFooter || {}
          : {
              formItemAttrs: {
                wrapperCol: {
                  span: 24,
                  offset: 0,
                },
              },
            }
      },
      curType() {
        return this.$route.query.type || 'Simple'
      },
      curUiSchemaCode: {
        get() {
          return this.genCodeStrComputedGetter('uiSchema')
        },
        set(val) {
          return this.genCodeStrComputedSetter('uiSchema', val)
        },
      },
      curFormDataCode: {
        get() {
          return this.genCodeStrComputedGetter('formData')
        },
        set(val) {
          return this.genCodeStrComputedSetter('formData', val)
        },
      },
      curErrorSchemaCode: {
        get() {
          return this.genCodeStrComputedGetter('errorSchema')
        },
        set(val) {
          return this.genCodeStrComputedSetter('errorSchema', val)
        },
      },
      //formProps() {
      //if (!this.formConfig.formProps) return {}
      //return {
      //...this.formConfig.formProps,
      //labelWidth: formatFormLabelWidth(this.formConfig.formProps.labelWidth),
      //}
      //},
      //formFooter() {
      //return this.formConfig.formFooter || {}
      //},
      dragOptions() {
        return {
          animation: 300,
          group: 'listComponentsGroup',
          disabled: false,
          ghostClass: 'ghostItem',
          filter: this.$style.disabled,
          draggable: '.draggableItem',
          tag: 'div',
          swapThreshold: 0.3,
          // forceFallback: true
          // fallbackTolerance: 0
        }
      },
      // trueFormProps:
    },
    watch: {
      $route() {
        this.initData()
      },
    },
    created() {
      this.initData()
    },
    methods: {
      getDefaultSchemaMap() {
        return {
          //schema: {},
          uiSchema: {},
          formData: {},
          errorSchema: {},
          formFooter: {
            show: true,
          },
          formProps: {
            labelWidth: 25,
            inline: false,
            labelPosition: 'top',
            inlineFooter: false,
            labelColSpan: 6,
            wrapperColSpan: 16,
            layoutColumn: 1,
            // defaultSelectFirstOption: false
          },
        }
      },
      genCodeStrComputedGetter(vmKey) {
        try {
          return this[vmKey] ? JSON.stringify(this[vmKey], null, 4) : '{}'
        } catch (e) {
          return '{}'
        }
      },
      genCodeStrComputedSetter(vmKey, val) {
        try {
          this[vmKey] = val ? JSON.parse(val) : {}
        } catch (e) {
          // 无法解析时不更新数据
          // this[vmKey] = {};
        }
      },
      doRefresh() {
        post({
          url: getSpecification,
          data: () => {
            return {
              page: 1,
              pageSize: 15,
            }
          },
        })
          .then((res) => {
            console.log('2----------------')
            console.log(res.specification)
            console.log('1----------------')

            this.schema = res.specification.components
            this.formProps = res.specification.configs
          })
          .catch(console.log)
      },
      initData() {
        this.doRefresh()
      },
      handleSearch() {
        console.log('handleSearch')

        console.log('$$uiFormRef', this.$refs.schemaForm.$$uiFormRef)
      },
      handleFormMounted(formRef) {
        console.log('handleFormMounted')

        console.log('Ui form component:', formRef)
      },
      handleDataChange() {
        console.log('Data change')
      },
      handleSubmit() {
        console.log('handleSubmit')
        console.log('Submit')
      },
      clipboard(value) {
        if (document.execCommand) {
          const input = document.createElement('input')
          document.body.appendChild(input)
          input.setAttribute('value', value)
          input.select()

          document.execCommand('copy')
          document.body.removeChild(input)

          return true
        }

        this.$message.info(value)
        return false
      },
      handleCancel() {
        console.log('cancel')
      },
      handleValidationFailed(errorObj) {
        console.log(errorObj)
        console.log('handleValidationFailed')
        console.warn(errorObj)
      },
      handlePreview() {
        const formatStr = (jsonCode) => JSON.stringify(JSON.parse(jsonCode))

        const genRoute = this.$router.resolve({
          query: {
            ui: this.curVueForm,
            type: 'Test',
            formData: formatStr(this.curFormDataCode),
            uiSchema: formatStr(this.curUiSchemaCode),
            errorSchema: formatStr(this.curErrorSchemaCode),
            formFooter: formatStr(JSON.stringify(this.trueFormFooter)),
            formProps: formatStr(JSON.stringify(this.trueFormProps)),
          },
        })
        const url = `${window.location.origin}${window.location.pathname}${genRoute.href}`

        if (this.clipboard(url)) {
          this.$message.success('复制预览地址成功')
        }
      },
    },
  }
</script>

<style module lang="postcss">
  @import 'demo-common/css/variable.css';

  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box {
    padding: 0 15px;
  }
  .typeList {
    padding: 10px 0 20px;
    font-size: 0;
  }
  .linkItem {
    display: inline-block;
    margin-right: 8px;
    margin-top: 8px;
    margin-left: auto !important;
  }
  .middleBox {
    :global {
      .el-card {
        border-top: none;
        overflow: visible;
      }
      .el-card__header {
        border-top: 1px solid #ebeef5;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        background: #ffffff;
        z-index: 3;
      }
    }
  }
  .middleBox_form {
    position: sticky;
    top: 0;
  }
  .formBox {
    max-height: calc(100vh - 40px);
    overflow: auto !important;
    :global .el-card__header {
      position: sticky;
      top: 0;
    }
  }

  :root {
    --site-top-height: 80px;
    --tool-bar-width: 280px;
    --right-form-width: 380px;
    --drag-area-width: auto;
  }
  /*预览模式 同步样式重置*/
  .container {
    position: relative;
    box-sizing: border-box;
    height: calc(100vh - var(--site-top-height));
    transition: 0.2s ease;
  }
  .hasTools {
    padding-left: var(--tool-bar-width);
    :global .el-icon-caret-right {
      transform: rotate(180deg);
    }
  }
  /*tools*/
  .toolBarWrap,
  .rightForm {
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--color-white);
    box-shadow: 0 0 0 1px rgba(171 171 171, 0.3);
    z-index: 2;
  }

  .rightForm,
  .toolsBar {
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  .toolBarWrap {
    padding-top: 10px;
    width: var(--tool-bar-width);
    left: 0;
    overflow: visible;
  }
  .toolsBar {
    height: 100%;
  }
  .leftCaret {
    cursor: pointer;
    position: absolute;
    display: flex;
    width: 18px;
    height: 38px;
    align-items: center;
    justify-content: center;
    top: 2px;
    right: 0;
    background: #ffffff;
    box-shadow: 0 0 4px 0 color(var(--color-black) a(0.2));
    border-radius: 2px 0 0 2px;
    :global .el-icon-caret-right {
      transition: all 0.3s ease;
      transform: rotate(180deg);
    }
    &:hover {
      box-shadow: 0 0 4px 0 color(var(--color-black) a(0.4));
      opacity: 1;
    }
  }
  .rightForm {
    box-sizing: border-box;
    padding: 10px;
    right: 0;
    width: var(--right-form-width);
  }
  .configForm {
    padding: 0 20px;
    & > h3 {
      font-size: 15px;
      font-weight: bold;
    }
  }

  /*content area*/
  .contentWrap {
    position: relative;
    overflow: auto;
    height: 100%;
    padding-left: var(--tool-bar-width);
    padding-right: var(--right-form-width);
    &::-webkit-scrollbar {
      width: 6px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: var(--background-color-base);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--color-text-placeholder);
    }
  }
  .closeToolbar {
    padding-left: 0;
    .toolBarWrap {
      left: calc(0 - var(--tool-bar-width));
      .leftCaret {
        right: -18px;
      }
      :global {
        .el-icon-caret-right {
          transform: rotate(0);
        }
      }
    }
  }
  .contentBox {
    position: relative;
    padding: 0;
    height: 100%;
  }
  .tipBox {
    pointer-events: none;
    top: 20px;
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    margin: 30vh 0;
    p {
      margin: 20px 0;
      font-size: 16px;
    }
  }
</style>
