export type LegalFraction = 'equalityAndBrotherhood' | 'honorAndConscience';
export type IllegalNormalFraction =
  | 'revolutionaryAvantGarde'
  | 'powerOfTradition'
  | 'truthInWealth';
export type IllegalStrangeFraction = 'woodenStick' | 'pathToThePeak' | 'redWater';

type FractionsGroupState<FractionName extends string> = {
  influence: number;
  fractions: Record<FractionName, number>;
};

export type Fraction = LegalFraction | IllegalNormalFraction | IllegalStrangeFraction;

export type FractionsState = {
  legal: FractionsGroupState<LegalFraction>;
  illegal: {
    influence: number;
    normal: FractionsGroupState<IllegalNormalFraction>;
    strange: FractionsGroupState<IllegalStrangeFraction>;
  };
};
