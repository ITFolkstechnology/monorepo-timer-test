module.exports = {
  extends: 'next',
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
  root: true,
}
