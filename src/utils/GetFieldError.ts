export const getFieldError = (errors: any, path: string): string[] | null => {
  if (!errors || typeof errors !== 'object') return null;
  return errors[path] || null;
};
