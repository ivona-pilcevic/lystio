import type { ThemeConfig } from "antd";

const COLORS = {
  primary: "#A540F3",
  background: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
  border: "#EEE7FF",
  white: "#FFFFFF",
} as const;

const TYPOGRAPHY = {
  fontFamily:
    "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSize: 14,
  lineHeight: 1.6,
} as const;

const LAYOUT = {
  borderRadius: 8,
  controlHeight: 40,
} as const;

const SHADOWS = {
  menu: "0px 2px 8px 0px rgba(0, 0, 0, 0.12)",
} as const;

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: COLORS.primary,
    colorBgContainer: COLORS.background,
    colorText: COLORS.text,
    colorTextSecondary: COLORS.textSecondary,
    colorBorder: COLORS.border,

    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.fontSize,
    lineHeight: TYPOGRAPHY.lineHeight,

    borderRadius: LAYOUT.borderRadius,
    controlHeight: LAYOUT.controlHeight,

    boxShadow: SHADOWS.menu,
  },

  components: {
    Menu: {
      itemBg: COLORS.background,
      itemSelectedBg: COLORS.border,
      itemSelectedColor: COLORS.primary,
      itemHoverBg: COLORS.border,
      itemHoverColor: COLORS.primary,
      itemActiveBg: COLORS.border,
      fontSize: 14,
      fontFamily: TYPOGRAPHY.fontFamily,
      lineHeight: TYPOGRAPHY.lineHeight,
      fontWeightStrong: 500,
      boxShadow: SHADOWS.menu,
    },

    Layout: {
      headerBg: COLORS.background,
      headerColor: COLORS.text,
      headerPadding: "0 24px",
    },

    Button: {
      primaryColor: COLORS.background,
      fontWeight: 500,
      controlHeight: LAYOUT.controlHeight,
      borderRadius: LAYOUT.borderRadius,
    },

    Input: {
      controlHeight: LAYOUT.controlHeight,
      borderRadius: LAYOUT.borderRadius,
    },

    Select: {
      controlHeight: LAYOUT.controlHeight,
      borderRadius: LAYOUT.borderRadius,
    },

    Card: {
      borderRadius: LAYOUT.borderRadius,
      boxShadowTertiary: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
    },

    Table: {
      headerBg: COLORS.background,
      headerColor: COLORS.text,
      rowHoverBg: COLORS.border,
    },

    Typography: {
      fontSizeHeading1: 32,
      fontSizeHeading2: 24,
      fontSizeHeading3: 20,
      fontSizeHeading4: 16,
      fontSizeHeading5: 14,
      fontWeightStrong: 600,
    },
  },
};

export const themeColors = COLORS;
export const themeTypography = TYPOGRAPHY;
export const themeLayout = LAYOUT;
export const themeShadows = SHADOWS;
