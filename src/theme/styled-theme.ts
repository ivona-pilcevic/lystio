export const styledTheme = {
  colors: {
    primary: "#A540F3",
    primaryLight: "#F3E6FF",
    primaryHover: "#8E2FE0",
    background: "#FFFFFF",
    backgroundLight: "#F7F7FD",
    text: "#1F2937",
    textSecondary: "#6B7280",
    textTertiary: "#9CA3AF",
    border: "#EEE7FF",
    borderLight: "#F3F4F6",
    inputBorder: "#E5E7EB",
    white: "#FFFFFF",

    success: "#52C41A",
    warning: "#FAAD14",
    error: "#FF4D4F",
    info: "#1890FF",

    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",

    purple50: "#FAF5FF",
    purple100: "#F3E6FF",
    purple500: "#A540F3",
    purple600: "#8E2FE0",
  },

  typography: {
    fontFamily:
      "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

    sizes: {
      xs: "12px",
      sm: "14px",
      base: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "32px",
      "4xl": "40px",
      "5xl": "48px",
    },

    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      base: 1.6,
      relaxed: 1.75,
      loose: 2,
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "40px",
    "3xl": "48px",
    "4xl": "64px",
    "5xl": "80px",
  },

  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "992px",
    wide: "1200px",
    ultrawide: "1600px",
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  borderRadius: {
    sm: "4px",
    base: "8px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  shadows: {
    sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
    base: "0px 2px 8px 0px rgba(0, 0, 0, 0.12)",
    md: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
    lg: "0px 8px 24px 0px rgba(0, 0, 0, 0.18)",
    xl: "0px 12px 32px 0px rgba(0, 0, 0, 0.20)",
  },

  transitions: {
    fast: "150ms ease-in-out",
    base: "200ms ease-in-out",
    slow: "300ms ease-in-out",
  },
} as const;

export type StyledTheme = typeof styledTheme;
