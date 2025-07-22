<template>
  <n-card class="account-item" :title="'Учетная запись'" size="small">
    <n-form label-placement="top">
      <div class="form-row">
        <n-form-item label="Метка" class="flex-item">
          <n-input
            v-model:value="labelInput"
            placeholder="например: dev;prod;"
            @blur="handleLabelBlur"
          />
        </n-form-item>

        <n-form-item label="Тип записи" class="flex-item">
          <n-select
            v-model:value="account.type"
            :options="typeOptions"
            @update:value="handleTypeChange"
          />
        </n-form-item>
      </div>

      <div class="form-row">
        <n-form-item
          label="Логин"
          class="flex-item"
          :feedback="loginError ? 'Обязательное поле' : null"
          :validation-status="loginError ? 'error' : undefined"
        >
          <n-input
            placeholder="Введите логин"
            v-model:value="account.login"
            maxlength="100"
            @blur="validateLogin"
          />
        </n-form-item>

        <n-form-item
          v-if="account.type === 'Локальная'"
          label="Пароль"
          class="flex-item"
          :feedback="passwordError ? 'Обязательное поле' : null"
          :validation-status="passwordError ? 'error' : undefined"
        >
          <n-input
            placeholder="Введите пароль"
            v-model:value="account.password"
            type="password"
            maxlength="100"
            @blur="validatePassword"
          />
        </n-form-item>
      </div>

      <n-button
        type="error"
        secondary
        size="small"
        @click="removeAccount"
        style="margin-top: 10px"
      >
        Удалить
      </n-button>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAccountsStore } from '@/stores/useAccountStore';
import type { Account } from '@/types/account';

const props = defineProps<{ account: Account }>();
const store = useAccountsStore();

const labelInput = ref(props.account.label.map(l => l.text).join(';'));

const typeOptions = [
  { label: 'LDAP', value: 'LDAP' },
  { label: 'Локальная', value: 'Локальная' },
];

const validateLogin = () => {
  props.account.errors = { ...props.account.errors, login: !props.account.login || props.account.login.length > 100 };
};

const validatePassword = () => {
  const err = props.account.type === 'Локальная' &&
    (!props.account.password || props.account.password.length > 100);
  props.account.errors = { ...props.account.errors, password: err };
};

const loginError = computed(() => props.account.errors?.login);
const passwordError = computed(() => props.account.errors?.password);

const handleLabelBlur = () => {
  const trimmed = labelInput.value.trim();
  props.account.label = trimmed === ''
    ? []
    : trimmed
        .split(';')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .slice(0, 50)
        .map(tag => ({ text: tag }));
};

const handleTypeChange = (newType: string) => {
  props.account.type = newType as 'LDAP' | 'Локальная';
  if (newType === 'LDAP') {
    props.account.password = null;
    props.account.errors = { ...props.account.errors, password: false };
  } else {
    props.account.password = '';
  }
};

const removeAccount = () => {
  store.removeAccount(props.account.id);
};
</script>

<style scoped>
.account-item {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1;
}
</style>