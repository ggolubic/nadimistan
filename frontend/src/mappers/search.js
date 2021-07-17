export const toSearch = data => {
  return {
    grad: data.grad,
    zupanija: data.zupanija,
    cijena: data.cijena,
    m2: data.size,
    m2_greater: data.sizeGreater,
  };
};
