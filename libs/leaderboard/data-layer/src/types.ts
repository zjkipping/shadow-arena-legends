export interface TeamWithPoints {
  name: string;
  image: string;
  points: number;
  place: number;
}

export interface PlayerWithKills {
  name: string;
  kills: number;
  place: number;
}

export interface TeamWithStats {
  name: string;
  image: string;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  kills: number;
}
