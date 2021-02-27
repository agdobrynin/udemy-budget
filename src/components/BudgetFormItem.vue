<template>
  <ElCard header="Добавить новый элемент бюджета">
    <ElForm
        :model="formData"
        :rules="rules"
        label-width="120px"
        ref="ruleForm"
        @submit.native.prevent="onSave">
      <ElFormItem label="Тип" prop="type">
        <ElSelect class="type-select" v-model="formData.type">
          <ElOption v-for="(typeTitle, key) in typeOfBudgetTitles"
                    :key="key"
                    :label="typeTitle"
                    :value="typeTitle"/>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Комментарий" prop="comment">
        <ElInput v-model="formData.comment"></ElInput>
      </ElFormItem>
      <ElFormItem label="Сумма" prop="value">
        <ElInput v-model.number="formData.value"></ElInput>
      </ElFormItem>
      <ElButton native-type="submit" type="primary">Добавить</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>

import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";

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
  },

  methods: {
    async onSave() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const BudgetItem = this.formData.type === BudgetItemIncome.typeTitle
              ? new BudgetItemIncome(this.formData.comment, this.formData.value)
              : new BudgetItemOutcome(this.formData.comment, this.formData.value);
          this.$emit("newBudgetItem", BudgetItem);
          this.$refs.ruleForm.resetFields();
        }
      });
    }
  },
}
</script>

<style scoped>
.type-select {
  width: 100%;
}
</style>