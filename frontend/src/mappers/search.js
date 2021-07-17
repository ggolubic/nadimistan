export const toSearch = data => {
  return {
    grad: data.grad,
    zupanija: data.zupanija,
    cijena: data.cijena,
    m2: data.size,
    m2_greater: data.sizeGreater,
  };
};

export const fromSearch = data => {
  return data.map(oglas => ({
    link: oglas.link,
    cijena: oglas.cijena,
    cijena_parsed: oglas.cijena_parsed,
    title: oglas.title,
    zupanija: oglas.zupanija,
    naselje: oglas.naselje,
    grad: oglas.grad,
    brojSoba: oglas.broj_soba,
    size: oglas.m2,
    kat: oglas.kat,
    contact: oglas.mail || oglas.contact,
    opis: oglas.opis,
    parking: oglas.parking,
  }));
};
