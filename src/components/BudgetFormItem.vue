<template>
  <ElCard>
    <ElForm :model="formData" :rules="rules" ref="ruleForm">
      <ElFormItem label="Тип" prop="type">
        <ElSelect class="type-select" v-model="formData.type">
          <ElOption v-for="(typeTitle, key) in typeOfBudget" :key="key" :label="typeTitle" :value="typeTitle"/>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Комментарий" prop="comment">
        <ElInput v-model="formData.comment"></ElInput>
      </ElFormItem>
      <ElFormItem label="Сумма" prop="value">
        <ElInput v-model.number="formData.value"></ElInput>
      </ElFormItem>
      <ElButton @click="onSave" type="primary">Добавить</ElButton>
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
        {required: true, message: "Отметьте комментарий"}
      ],
      value: [
        {required: true, message: "Введите сумму"},
        {type: "number", message: "Необходимо ввести число"},
        {validator: checkSum},
      ],
    },
    typeOfBudget: {
      INCOME: "Доход",
      OUTCOME: "Расход"
    }
  }),

  methods: {
    async onSave() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const BudgetItem = this.formData.type === this.typeOfBudget.INCOME
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