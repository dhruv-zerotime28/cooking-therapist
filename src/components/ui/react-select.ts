export const reactSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'var(--color-card)',
      borderColor: state.isFocused ? 'var(--color-ring)' : 'var(--color-border)',
      boxShadow: state.isFocused ? '0 0 0 1px var(--color-ring)' : null,
      '&:hover': {
        borderColor: 'var(--color-ring)',
      },
      borderRadius: 'var(--radius-md)',
      minHeight: '2.5rem',
      color: 'var(--color-foreground)', // Text color
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--color-card)', // Dropdown background
      color: 'var(--color-foreground)', // Dropdown text color
      borderRadius: 'var(--radius-md)',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'var(--color-secondary)' : 'transparent', // Secondary for focused item
      color: state.isFocused ? 'var(--color-secondary-foreground)' : 'var(--color-foreground)', // Text color
      cursor: 'pointer',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-secondary-foreground)',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'var(--color-secondary-foreground)',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: 'var(--color-secondary-foreground)',
      '&:hover': {
        backgroundColor: 'var(--color-destructive)',
        color: 'var(--color-destructive-foreground)',
      },
    }),
  };