export const fromLogin = data => ({
  email: data.email,
  full_name: data.full_name,
  id: data.id,
  is_active: true,
});
