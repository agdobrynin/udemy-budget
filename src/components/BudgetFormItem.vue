<template>
  <ElCard header="Добавить новый элемент бюджета">
    <ElForm
        :model="formData"
        :rules="rules"
        label-width="120px"
        ref="ruleForm"
        class="form-new-budget-item"
        @submit.native.prevent="onSave">
      <ElFormItem label="Тип" prop="type">
        <el-row>
          <el-col :span="16">
            <ElSelect v-model="formData.type" ref="budgetType" class="form-new-budget-type" @change="setBudgetTypeTitle">
              <ElOption v-for="(typeTitle, key) in typeOfBudgetTitles"
                        :key="key"
                        :label="typeTitle"
                        :value="typeTitle"/>
            </ElSelect>
          </el-col>
          <el-col :span="8">
            <el-switch
                v-model="formData.rememberType"
                active-text="Запомнить"
                @change="setRememberBudgetType">
            </el-switch>
          </el-col>
        </el-row>
      </ElFormItem>
      <ElFormItem label="Сумма" prop="value">
        <ElInput v-model.number="formData.value" class="form-new-budget-value" ref="budgetValue"></ElInput>
      </ElFormItem>
      <ElFormItem label="Комментарий" prop="comment">
        <ElInput v-model="formData.comment" class="form-new-budget-comment"></ElInput>
      </ElFormItem>
      <ElButton native-type="submit" type="primary">Добавить</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>

import BudgetItemIncome from "@/Entity/BudgetItemIncome";
import BudgetItemOutcome from "@/Entity/BudgetItemOutcome";
import {mapActions, mapGetters} from "vuex";

const checkSum = (rule, value, callback) => {
  if (+value <= 0) {
    callback(new Error("Число должно быть больше нуля"));
  } else {
    callback();
  }
};

export default {
  name: "BudgetFormItem",

  data: () => ({
    formData: {
      type: undefined,
      rememberType: false,
      comment: undefined,
      value: undefined,
    },
    /**
     * Правила валидации полей добавления расхода и дохода.
     */
    rules: {
      type: [
        {required: true, message: "Укажите тип", trigger: "change"}
      ],
      comment: [
        {required: true, message: "Отметьте комментарий", trigger: "change"}
      ],
      value: [
        {required: true, message: "Введите сумму", trigger: "change"},
        {type: "number", message: "Необходимо ввести число", trigger: "change"},
        {validator: checkSum, trigger: "change"},
      ],
    },
    typeOfBudgetTitles: []
  }),

  created() {
    this.typeOfBudgetTitles.push(BudgetItemIncome.typeTitle);
    this.typeOfBudgetTitles.push(BudgetItemOutcome.typeTitle);
    this.formData.rememberType = this.getRememberBudgetType;
    if (this.formData.rememberType) {
      this.formData.type = this.getBudgetTypeTitle;
    }
  },

  computed: {
    ...mapGetters("budget", ["getRememberBudgetType", "getBudgetTypeTitle",]),
  },

  methods: {
    ...mapActions("budget", ["setRememberBudgetType", "setBudgetTypeTitle",]),

    async onSave() {
      if (await this.$refs.ruleForm.validate()) {
        const BudgetItem = this.formData.type === BudgetItemIncome.typeTitle
            ? new BudgetItemIncome(this.formData.comment, this.formData.value)
            : new BudgetItemOutcome(this.formData.comment, this.formData.value);
        this.$emit("newBudgetItem", BudgetItem);
        let prevType = "";
        if (this.rememberType) {
          prevType = this.formData.type;
        }
        this.$refs.ruleForm.resetFields();
        this.formData.type = prevType;
        this.$refs.budgetValue.focus();
      }
    }
  },
}
</script>
