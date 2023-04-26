export enum ECookieNames {
  USER_TOKEN = 'T_USER',
}

export interface IRespBody<T = object> {
  data?: T extends object ? T : object;
  message: string;
  err?: unknown;
} 

export enum EAirport {
  BTJ = 'BTJ',
  MES = 'MES',
  BTH = 'BTH',
  TNJ = 'TNJ',
  PKU = 'PKU',
  PDG = 'PDG',
  PLM = 'PLM',
  BKS = 'BKS',
  TKG = 'TKG',
  CGK = 'CGK',
  HLP = 'HLP',
  SUB = 'SUB',
  SOC = 'SOC',
  JOG = 'JOG',
  SRG = 'SRG',
  BDO = 'BDO',
  DPS = 'DPS',
  AMI = 'AMI',
  KOE = 'KOE',
  BPN = 'BPN',
  PNK = 'PNK',
  TRK = 'TRK',
  UPG = 'UPG',
  MDC = 'MDC',
  AMQ = 'AMQ',
  DJJ = 'DJJ',
  BIK = 'BIK',
  TIM = 'TIM',
  MKQ = 'MKQ',
}
export enum EAirline {
  GARUDA_INDONESIA = 'Garuda Indonesia',
  LION_AIR = 'Lion Air',
  BATIK_AIR = 'Batik Air',
  SUPERJET = 'Superjet',
  SRIWIJAYA = 'Sriwijaya',
  NAM_AIR = 'Nam Air',
}

export enum ETravelClass {
  BUSINESS_CLASS = 'business',
  PREMIUM_ECONOMY_CLASS = 'premium economy',
  ECONOMY_CLASS = 'economy',
}
