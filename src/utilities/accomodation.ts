import { TentCosts, TentPrices } from '@/types/guest-page-types';

export const tentCosts: TentCosts = {
  emptyTent: {
    initialPrice: 159,
    minPeople: 1,
    maxPeople: 6,
    pricePerExtra: 0,
  },
  partyTent: {
    initialPrice: 199,
    minPeople: 2,
    maxPeople: 6,
    pricePerExtra: 28,
  },
  luxuryTent: {
    initialPrice: 299,
    minPeople: 2,
    maxPeople: 4,
    pricePerExtra: 50,
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

  return initialPrice + (noPeople - 2) * pricePerExtra;
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
