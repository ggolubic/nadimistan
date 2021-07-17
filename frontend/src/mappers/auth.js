export const fromLogin = data => ({
  email: data.email,
  fullName: data.full_name,
  id: data.id,
  isActive: true,
});
