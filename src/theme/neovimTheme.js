export const neovimTheme = {
  colors: {
    bg: {
      primary: '#0d1117',
      secondary: '#161b22',
      tertiary: '#1c2128',
      hover: '#21262d',
      active: '#2d333b',
      border: '#30363d',
    },
    text: {
      primary: '#c9d1d9',
      secondary: '#8b949e',
      tertiary: '#6e7681',
      accent: '#58a6ff',
      success: '#56d364',
      warning: '#d29922',
      error: '#f85149',
    },
    syntax: {
      keyword: '#ff7b72',
      string: '#a5d6ff',
      function: '#d2a8ff',
      variable: '#ffa657',
      comment: '#8b949e',
      constant: '#79c0ff',
    },
    ui: {
      selection: '#264f78',
      findMatch: '#9e6a03',
      activeLine: '#1c2128',
      lineNumber: '#6e7681',
      cursor: '#c9d1d9',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  typography: {
    fontFamily: {
      mono: '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    fontSize: {
      xs: '11px',
      sm: '12px',
      md: '13px',
      lg: '14px',
      xl: '16px',
    },
  },
  effects: {
    borderRadius: {
      sm: '4px',
      md: '6px',
      lg: '8px',
    },
    shadow: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.4)',
      md: '0 4px 6px rgba(0, 0, 0, 0.5)',
      lg: '0 8px 16px rgba(0, 0, 0, 0.6)',
    },
    transition: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

export const cssVariables = `
  --bg-primary: ${neovimTheme.colors.bg.primary};
  --bg-secondary: ${neovimTheme.colors.bg.secondary};
  --bg-tertiary: ${neovimTheme.colors.bg.tertiary};
  --bg-hover: ${neovimTheme.colors.bg.hover};
  --bg-active: ${neovimTheme.colors.bg.active};
  --bg-border: ${neovimTheme.colors.bg.border};
  
  --text-primary: ${neovimTheme.colors.text.primary};
  --text-secondary: ${neovimTheme.colors.text.secondary};
  --text-tertiary: ${neovimTheme.colors.text.tertiary};
  --text-accent: ${neovimTheme.colors.text.accent};
  --text-success: ${neovimTheme.colors.text.success};
  --text-warning: ${neovimTheme.colors.text.warning};
  --text-error: ${neovimTheme.colors.text.error};
  
  --font-mono: ${neovimTheme.typography.fontFamily.mono};
  --font-sans: ${neovimTheme.typography.fontFamily.sans};
  
  --transition-fast: ${neovimTheme.effects.transition.fast};
  --transition-normal: ${neovimTheme.effects.transition.normal};
`;
