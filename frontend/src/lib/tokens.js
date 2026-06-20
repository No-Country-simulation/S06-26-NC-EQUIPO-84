export const colors = {
  bg: '#0B0B14',
  bgElevated: '#12111E',
  surface: '#181729',
  surfaceHover: '#1F1E33',
  border: '#2A2840',

  violet: '#7C5CFC',
  violetSoft: '#9B82FF',
  violetDim: '#4C3B99',

  coral: '#FF6B4A',
  coralSoft: '#FF8A6B',
  coralDim: '#99412C',

  mint: '#3DDC97',
  mintSoft: '#6AE6B0',
  mintDim: '#25835B',

  textPrimary: '#F5F3FF',
  textSecondary: '#B8B4D6',
  textTertiary: '#74709C',

  amber: '#FFB84D',
  redAlert: '#FF5C7A',
}

export const easing = {
  premium: [0.16, 1, 0.3, 1],
  snappy: [0.34, 1.56, 0.64, 1],
  smooth: [0.4, 0, 0.2, 1],
}

export const transitions = {
  page: {
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -16, filter: 'blur(4px)', scale: 0.98 },
    transition: { duration: 0.5, ease: easing.premium },
  },
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easing.premium },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: easing.snappy },
  },
}

export const emotionMap = {
  happy: { emoji: '😊', label: 'Feliz', color: colors.mint, bg: 'radial-gradient(circle at 50% 30%, #1a3d2e 0%, #0B0B14 70%)' },
  tired: { emoji: '😴', label: 'Cansado', color: colors.violetSoft, bg: 'radial-gradient(circle at 50% 30%, #221d3d 0%, #0B0B14 70%)' },
  sad: { emoji: '😢', label: 'Triste', color: '#6B8FE8', bg: 'radial-gradient(circle at 50% 30%, #1a2440 0%, #0B0B14 70%)' },
  anxious: { emoji: '😰', label: 'Ansioso', color: colors.amber, bg: 'radial-gradient(circle at 50% 30%, #3d2f1a 0%, #0B0B14 70%)' },
  overwhelmed: { emoji: '😤', label: 'Sobrecargado', color: colors.redAlert, bg: 'radial-gradient(circle at 50% 30%, #3d1a24 0%, #0B0B14 70%)' },
}
