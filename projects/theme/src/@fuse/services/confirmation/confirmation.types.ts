export interface FuseConfirmationConfig {
  title?: string;
  message?: string;
  icon?: {
      show?: boolean;
      name?: string;
      color?:
          | 'primary'
          | 'accent'
          | 'warn'
          | 'basic'
          | 'info'
          | 'success'
          | 'warning'
          | 'error';
  };
  actions?: {
      confirm?: {
          show?: boolean;
          label?: string;
          color?: 'primary' | 'accent' | 'warn';
      };
      cancel?: {
          show?: boolean;
          label?: string;
      };
  };
  dismissible?: boolean;
  form?: {
      [key: string]: {
          type: 'text' | 'textarea' | 'select' | 'checkbox';
          label?: string;
          value?: any;
          validators?: any[];
          options?: {value: any, label: string}[];
      }
  };
}
