export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const buildSearchQueries = (destinationCountry, userCountry) => [
    `${destinationCountry} embassy ${userCountry}`,
    `${destinationCountry} consulate ${userCountry}`,
    `${destinationCountry} high commission ${userCountry}`,
    `embassy of ${destinationCountry} ${userCountry}`,
    `${destinationCountry}n embassy ${userCountry}`,
];

export const isValidEmbassy = (place, destinationCountry, userCountry) => {
  const displayName = (place.display_name || "").toLowerCase();
  const mainName = displayName.split(",")[0].trim();

  const dest = destinationCountry.toLowerCase();
  const user = userCountry.toLowerCase();

  const hasDestination =
    mainName.includes(dest) ||
    mainName.includes(dest + "n") ||
    mainName.includes(dest + "ian");

  const notUserCountry = !mainName.includes(user);

  const isEmbassy =
    mainName.includes("embassy") ||
    mainName.includes("consulate") ||
    mainName.includes("high commission") ||
    place.type === "embassy" ||
    place.class === "amenity";

  const addressCountry = (place.address?.country || "").toLowerCase();

  const locationMatch =
    displayName.includes(`, ${user}`) ||
    displayName.endsWith(user) ||
    addressCountry.includes(user);

  return hasDestination && notUserCountry && isEmbassy && locationMatch;
};
