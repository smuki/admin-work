<template>
  <div :class="$style.container">
          <VueNaiveForm
              ref="schemaForm"
              :key="pageKey"
              v-model="formData"
              :schema="schema"
              :ui-schema="uiSchema"
              :error-schema="errorSchema"
              :custom-formats="customFormats"
              :form-footer="trueFormFooter"
              :form-props="trueFormProps"
              :fallback-label="true"
              @keyup.native.enter="handleSearch"
              @form-mounted="handleFormMounted"
              @change="handleDataChange"
              @cancel="handleCancel"
              @submit="handleSubmit"
              @validation-failed="handleValidationFailed">
          </VueNaiveForm>

  </div>
</template>

<script>
import { defineAsyncComponent, getCurrentInstance, h } from 'vue';
import { getSpecification } from '@/api/url'
import { post } from '@/api/http'

let installedNaive = false;
const VueNaiveForm = defineAsyncComponent(async () => {
  // eslint-disable-next-line no-unused-vars
  const [naive, antForm] = await Promise.all([
      import('./Naive/index.js'),
      import('@/vue3-form-naive')
  ]);

  return {
      name: 'naiveFormWrap',
      setup(props, { attrs, slots }) {
          // hack 动态install naive，因为我不知其它地方如何获取 vue app
          if (!installedNaive) {
              const instance = getCurrentInstance();
              instance.appContext.app.use(naive.default);
              installedNaive = true;
          }

          return () => h(antForm.default, {
              ...attrs
          }, slots);
      }
  };
});

//const typeItems = Object.keys(schemaTypes);

  const formData= {
      lastName: 'Liu',
      age: 88,
      bio: '知道的越多、就知道的越少',
      password: 'My.Pass',
      telephone: '1881446xxxx'
  }

  const    uiSchema = {
      'ui:description': '简单表单例子（这里通过UiSchema覆盖了默认description描述配置）',
      firstName: {
          'ui:title': '名字',
          'ui:description': '比如：李白姓李、孙尚香姓孙、马可波罗姓马可波',
          'ui:emptyValue': '',
          'ui:options': {
              placeholder: '请输入你的姓',
              attrs: {
                  autofocus: true
              }
          }
      },
      bio: {
          'ui:options': {
              placeholder: '请输入你的签名',
              type: 'textarea',
              rows: 6
          }
      }
  }

  const errorSchema= {
      bio: {
          'err:minLength': '签名最小长度10个字符串'
      }
  }

export default {
  name: 'Demo',
  components: {
      //CodeEditor,
      VueNaiveForm,
      //EditorHeader
  },
  data() {
      return {
          //typeItems,
          formProps:{
              labelPosition:"top",
              layoutColumn:2
          },
          schema : {
          },
          uiSchema,
          errorSchema,
          formData,
          //typeItems
          //...this.getDefaultSchemaMap(),
          formComponents: [{
              name: 'Naive',
              component: 'VueNaiveForm'
          }],
          customFormats: {
              price(value) {
                  return value !== '' && /^[0-9]\d*$|^\d+(\.\d{1,2})$/.test(value) && value >= 0 && value <= 999999.99;
              }
          }
      };
  },
  computed: {
      pageKey() {
          return this.$route.query.type;
      },
      isUseLabelWidth() {
          return this.curVueForm !== 'VueAntForm';
      },
      trueFormProps() {
          if (!this.formProps) 
              return {
                  labelPosition:"top"
              };

          const {
              labelColSpan,
              wrapperColSpan,
              labelWidth,
              ...otherProps
          } = this.formProps;
          return {
              ...otherProps,
              ...this.isUseLabelWidth ? {
                  labelWidth: labelWidth ? `${labelWidth * 4}px` : undefined
              } : {
                  labelCol: {
                      span: labelColSpan
                  },
                  wrapperCol: {
                      span: wrapperColSpan
                  }
              }
          };
      },
      trueFormFooter() {
          // const {
          // labelColSpan,
          // wrapperColSpan
          // } = this.formProps;

          return this.isUseLabelWidth ? (this.formFooter || {}) : {
              formItemAttrs: {
                  wrapperCol: {
                      span: 24,
                      offset: 0
                  }
              }
          };
      },
      curType() {
          return this.$route.query.type || 'Simple';
      },
      curUiSchemaCode: {
          get() {
              return this.genCodeStrComputedGetter('uiSchema');
          },
          set(val) {
              return this.genCodeStrComputedSetter('uiSchema', val);
          }
      },
      curFormDataCode: {
          get() {
              return this.genCodeStrComputedGetter('formData');
          },
          set(val) {
              return this.genCodeStrComputedSetter('formData', val);
          }
      },
      curErrorSchemaCode: {
          get() {
              return this.genCodeStrComputedGetter('errorSchema');
          },
          set(val) {
              return this.genCodeStrComputedSetter('errorSchema', val);
          }
      },
      // trueFormProps:
  },
  watch: {
      $route() {
          this.initData();
      }
  },
  created() {
      this.initData();
  },
  methods: {
      getDefaultSchemaMap() {
          return {
              //schema: {},
              uiSchema: {},
              formData: {},
              errorSchema: {},
              formFooter: {
                  show: true
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
          };
      },
      genCodeStrComputedGetter(vmKey) {
          try {
              return this[vmKey] ? JSON.stringify(this[vmKey], null, 4) : '{}';
          } catch (e) {
              return '{}';
          }
      },
      genCodeStrComputedSetter(vmKey, val) {
          try {
              this[vmKey] = val ? JSON.parse(val) : {};
          } catch (e) {
              // 无法解析时不更新数据
              // this[vmKey] = {};
          }
      },
      doRefresh() 
      {
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
            console.log("2----------------")
            console.log(res.specification)
            console.log("1----------------")

            this.schema=res.specification.components;

          })
          .catch(console.log)
      },
      initData() {

          this.doRefresh();
      },
      handleSearch() {
          console.log("handleSearch");

          console.log('$$uiFormRef', this.$refs.schemaForm.$$uiFormRef);
      },
      handleFormMounted(formRef) {
          console.log("handleFormMounted");

          console.log('Ui form component:', formRef);
      },
      handleDataChange() {
          console.log('Data change');
      },
      handleSubmit() {
          console.log("handleSubmit");
          console.log('Submit');
      },
      clipboard(value) {
          if (document.execCommand) {
              const input = document.createElement('input');
              document.body.appendChild(input);
              input.setAttribute('value', value);
              input.select();

              document.execCommand('copy');
              document.body.removeChild(input);

              return true;
          }

          this.$message.info(value);
          return false;
      },
      handleCancel() {
          console.log('cancel');
      },
      handleValidationFailed(errorObj) {
          console.log(errorObj);
          console.log("handleValidationFailed");
          console.warn(errorObj);
      },
      handlePreview() {
          const formatStr = jsonCode => JSON.stringify(JSON.parse(jsonCode));

          const genRoute = this.$router.resolve({
              query: {
                  ui: this.curVueForm,
                  type: 'Test',
                  formData: formatStr(this.curFormDataCode),
                  uiSchema: formatStr(this.curUiSchemaCode),
                  errorSchema: formatStr(this.curErrorSchemaCode),
                  formFooter: formatStr(JSON.stringify(this.trueFormFooter)),
                  formProps: formatStr(JSON.stringify(this.trueFormProps)),
              }
          });
          const url = `${window.location.origin}${window.location.pathname}${genRoute.href}`;

          if (this.clipboard(url)) {
              this.$message.success('复制预览地址成功');
          }
      }
  }
};
</script>

<style module lang="postcss">
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
          border-top: 1px solid #EBEEF5;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: bold;
          background: #FFFFFF;
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
  :global .el-card__header{
      position: sticky;
      top: 0;
  }
}
</style>
