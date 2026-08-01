// Approximate regional grocery cost index (national average = 100), by state.
// Derived from commonly published state-level cost-of-living patterns, then
// dampened toward 100 to reflect that groceries vary less by region than
// housing does. This is a static approximation, not a live price feed.
export const STATE_GROCERY_INDEX = {
  AL: 94, AK: 115, AZ: 101, AR: 93, CA: 114, CO: 103, CT: 106, DE: 102,
  DC: 120, FL: 101, GA: 96, HI: 140, ID: 98, IL: 100, IN: 95, IA: 95,
  KS: 94, KY: 95, LA: 96, ME: 106, MD: 104, MA: 107, MI: 95, MN: 99,
  MS: 93, MO: 94, MT: 98, NE: 96, NV: 102, NH: 103, NJ: 107, NM: 96,
  NY: 111, NC: 97, ND: 99, OH: 95, OK: 94, OR: 105, PA: 99, RI: 104,
  SC: 96, SD: 96, TN: 95, TX: 98, UT: 99, VT: 104, VA: 101, WA: 106,
  WV: 95, WI: 97, WY: 96,
};

export function describeGroceryIndex(stateCode) {
  const index = STATE_GROCERY_INDEX[stateCode];
  if (!index) return null;
  const diff = Math.round(Math.abs(index - 100));
  if (diff <= 2) return { index, text: "close to the national average" };
  const direction = index > 100 ? "above" : "below";
  return { index, text: `about ${diff}% ${direction} the national average` };
}

export async function resolveZip(zip) {
  const res = await fetch("https://api.zippopotam.us/us/" + encodeURIComponent(zip));
  if (!res.ok) return null;
  const data = await res.json();
  const place = data.places?.[0];
  if (!place) return null;
  return {
    city: place["place name"],
    state: place["state abbreviation"],
  };
}

export async function describeZipForPricing(zip) {
  const fallback = "ZIP code " + zip;
  try {
    const place = await resolveZip(zip);
    if (!place) return fallback;
    const idx = describeGroceryIndex(place.state);
    const location = "ZIP code " + zip + " (" + place.city + ", " + place.state + ")";
    return idx ? location + ", where grocery prices run " + idx.text : location;
  } catch {
    return fallback;
  }
}
