export const toCreateSubscription = data => {
  return {
    config: {
      ...(data.grad && { grad: data.grad }),
      ...(data.zupanija && { zupanija: data.zupanija }),
      ...(data.cijena && { cijena: data.cijena }),
      ...(data.m2 && { m2: data.m2 }),
      ...(data.m2_greater && { m2_greater: data.m2_greater }),
    },
    interval: data.interval,
  };
};

export const fromCreateSubscription = data => {
  return {
    lastActive: data.last_active,
    subId: data.id,
    config: data.config,
    userId: data.user_id,
    interval: data.interval,
    disabled: data.disabled,
  };
};
export const fromLoadSubscription = data => {
  return data.map(sub => ({
    lastActive: sub.last_active,
    subId: sub.id,
    config: sub.config,
    userId: sub.user_id,
    interval: sub.interval,
    disabled: sub.disabled,
  }));
};
