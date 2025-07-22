import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Account } from '@/types/account';

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([]);

  const saved = localStorage.getItem('accounts');
  if (saved) {
    accounts.value = JSON.parse(saved);
  }

  watch(accounts, (newAccounts) => {
    localStorage.setItem('accounts', JSON.stringify(newAccounts));
  }, { deep: true });

  const addAccount = () => {
    accounts.value.push({
      id: crypto.randomUUID(),
      label: [],
      type: 'Локальная',
      login: '',
      password: '',
      errors: {
        login: true,
        password: true,
      },
    });
  };


  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter(acc => acc.id !== id);
  };

  return {
    accounts,
    addAccount,
    removeAccount,
  };
});