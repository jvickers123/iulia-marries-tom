import { TentCosts, TentData, TentPrices } from '@/types/guest-page-types';

export const tentCosts: TentCosts = {
  emptyTent: {
    initialPrice: 179,
    minPeople: 1,
    maxPeople: 6,
    pricePerExtra: 19,
  },
  partyTent: {
    initialPrice: 239,
    minPeople: 2,
    maxPeople: 6,
    pricePerExtra: 49,
  },
  luxuryTent: {
    initialPrice: 339,
    minPeople: 2,
    maxPeople: 4,
    pricePerExtra: 69,
  },
};

export const getMaxNoPeopleForTent = (accomodationType: string) => {
  switch (accomodationType) {
    case 'empty':
      return tentCosts.emptyTent.maxPeople;
    case 'party':
      return tentCosts.partyTent.maxPeople;
    case 'luxury':
      return tentCosts.luxuryTent.maxPeople;
    default:
      return 6;
  }
};

export const returnCostPerTent = ({
  noPeople,
  accomodation,
}: {
  noPeople: number;
  accomodation: TentPrices;
}) => {
  const { initialPrice, minPeople, maxPeople, pricePerExtra } = accomodation;

  if (noPeople <= minPeople) {
    return initialPrice;
  }

  if (noPeople > maxPeople) {
    return initialPrice + (maxPeople - minPeople) * pricePerExtra;
  }

  return initialPrice + (noPeople - minPeople) * pricePerExtra;
};

export const calculateCosts = ({
  accomodationType,
  noPeople,
}: {
  accomodationType: string;
  noPeople: number;
}) => {
  const { emptyTent, partyTent, luxuryTent } = tentCosts;
  switch (accomodationType) {
    case 'empty':
      return returnCostPerTent({ noPeople, accomodation: emptyTent });
    case 'party':
      return returnCostPerTent({ noPeople, accomodation: partyTent });
    case 'luxury':
      return returnCostPerTent({ noPeople, accomodation: luxuryTent });
    default:
      return 0;
  }
};

export const checkBookingDataIsValid = (accomodationData: TentData) => {
  return Boolean(
    accomodationData.guests.length <=
      getMaxNoPeopleForTent(accomodationData.type) &&
      accomodationData.guests.length > 0 &&
      accomodationData.email
  );
};
