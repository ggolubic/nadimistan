const removeFalsyValues = object => {
  let filteredValues = {};

  for (let [key, value] of Object.entries(object)) {
    if (typeof value === 'string') {
      value = value?.trim();
    }
    if (!!value) {
      filteredValues[key] = value;
    }
  }
  return filteredValues;
};

export const toSearch = data => {
  let filteredValues = removeFalsyValues(data);

  return {
    grad: filteredValues.grad,
    zupanija: filteredValues.zupanija,
    cijena: filteredValues.price,
    m2: filteredValues.size,
    m2_greater: filteredValues.sizeGreater,
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
