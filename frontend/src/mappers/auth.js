export const fromLogin = data => ({
  email: data.email,
  fullName: data.full_name,
  id: data.id,
  isActive: true,
});

export const toRegistration = data => ({
  email: data.email,
  full_name: data.fullName,
  password: data.password,
});
