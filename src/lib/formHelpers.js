export function canNext(step, profile) {
  if (step === 1) return Boolean(profile.age && profile.weight && profile.height);
  if (step === 3) return Boolean(profile.budget);
  return true;
}

export function toggleRestriction(restrictions, r) {
  return restrictions.includes(r)
    ? restrictions.filter(x => x !== r)
    : [...restrictions, r];
}
