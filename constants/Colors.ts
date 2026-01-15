export const AppColors = {
  background: '#f7f5f3',          // keep
  card: '#ffffff',                // keep

  primary: '#6b4423',              // keep BeamDrop brown
  primaryForeground: '#ffffff',    // clearer on buttons

  foreground: '#2d231f',           // solid, readable main text
  mutedForeground: '#6f625a',      // secondary text, still soft

  border: '#d2cbc3',               // slightly clearer separators

  success: '#16a34a',              // solid success color
  successLight: '#e6f6ec',         // readable success background

  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayCard: 'rgba(0, 0, 0, 0.7)',

  white: '#ffffff',
};


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
