export type AccountType = 'LDAP' | 'Локальная';

export interface Account {
  id: string;
  label: { text: string }[];
  type: AccountType;
  login: string;
  password: string | null;
  errors?: {
    label?: boolean;
    login?: boolean;
    password?: boolean;
  };
}
