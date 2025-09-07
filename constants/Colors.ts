export const AppColors = {
  // Background colors
  background: '#f7f5f3', // hsl(45, 15%, 95%) - Very light, slightly warm gray
  card: '#ffffff', // hsl(0, 0%, 100%) - Clean, pure white
  
  // Primary colors
  primary: '#6b4423', // hsl(24, 45%, 25%) - Muted, earthy brown
  primaryForeground: '#f7f5f3', // hsl(45, 15%, 95%) - Same as background for cohesive look
  
  // Text colors
  foreground: '#2d231f', // hsl(24, 10%, 15%) - Dark, desaturated brown for high readability
  mutedForeground: '#7a6f66', // hsl(24, 5%, 45%) - Medium-dark, desaturated brown
  
  // Border colors
  border: '#c7bfb5', // hsl(45, 8%, 75%) - Light, warm gray for borders
  
  // Status colors
  success: '#16a34a', // hsl(142, 76%, 36%) - Green for success states
  successLight: 'rgba(22, 163, 74, 0.8)', // Semi-transparent green
  
  // Special colors for overlay
  overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  overlayCard: 'rgba(0, 0, 0, 0.7)', // Darker overlay for cards
  white: '#ffffff',
};

// Legacy Colors (keeping for compatibility)
const tintColorLight = '#6b4423';
const tintColorDark = '#6b4423';

export const Colors = {
  light: {
    text: '#2d231f',
    background: '#f7f5f3',
    tint: tintColorLight,
    icon: '#7a6f66',
    tabIconDefault: '#7a6f66',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#f7f5f3',
    background: '#2d231f',
    tint: tintColorDark,
    icon: '#7a6f66',
    tabIconDefault: '#7a6f66',
    tabIconSelected: tintColorDark,
  },
};
