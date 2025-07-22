<template>
  <div style="max-width: 800px; margin: 0 auto; padding: 24px;">
    <div style="display: flex; align-items: center; gap: 10px;">
      <n-h1 style="margin: 0;">Учетные записи</n-h1>
      <n-button @click="addAccount">+</n-button>
    </div>
    <n-divider />
    <n-h4 depth="2">Подсказка: для указания нескольких меток одной пары логин/пароль используйте разделитель <code>;</code></n-h4>

    <div style="margin-top: 24px;">
      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/useAccountStore';
import AccountItem from './accountItem.vue';

const { accounts, addAccount } = useAccountsStore();
</script>