import { Migration } from 'sequelize-cli';
import moment from 'moment-timezone';

import { 
  EAirline, 
  EAirport,
  ETravelClass,
} from '../../types';
import { IFlightCreationAttributes } from '../models/flights';
import { ISeatDetailsCreationAttributes } from '../models/seatDetails';

function createTravelClass(index: number) {
  const dummyTravelClass: ETravelClass[] = [
    ETravelClass.BUSINESS_CLASS,
    ETravelClass.ECONOMY_CLASS,
    ETravelClass.PREMIUM_ECONOMY_CLASS,
  ];
  return dummyTravelClass[index];
}

function randomAirlines() {
  const dummyAirlines: EAirline[] = [
    EAirline.GARUDA_INDONESIA,
    EAirline.BATIK_AIR,
    EAirline.LION_AIR,
    EAirline.NAM_AIR,
    EAirline.SRIWIJAYA,
    EAirline.SUPERJET,
  ];
  return dummyAirlines[Math.floor(Math.random() * dummyAirlines.length)];
}

function randomAirport() {
  const dummyAirport: EAirport[] = [
    EAirport.BTJ,
    EAirport.MES,
    EAirport.BTH,
    EAirport.TNJ,
    EAirport.PKU,
    EAirport.PDG,
    EAirport.PLM,
    EAirport.BKS,
    EAirport.TKG,
    EAirport.CGK,
    EAirport.HLP,
    EAirport.SUB,
    EAirport.SOC,
    EAirport.JOG,
    EAirport.SRG,
    EAirport.BDO,
    EAirport.DPS,
    EAirport.AMI,
    EAirport.KOE,
    EAirport.BPN,
    EAirport.PNK,
    EAirport.TRK,
    EAirport.UPG,
    EAirport.MDC,
    EAirport.AMQ,
    EAirport.DJJ,
    EAirport.BIK,
    EAirport.TIM,
    EAirport.MKQ,
  ];
  return dummyAirport[Math.floor(Math.random() * dummyAirport.length)];
}

function randomDate(isDepart: boolean, departDate?: Date): Date {
  const randHours = Math.floor(Math.random() * 12) + 0;

  if (isDepart) {
    const randDays = Math.floor(Math.random() * 365) + 1;
    const current = moment.tz('Asia/Jakarta');
    current.add(randDays, 'days');
    current.add(randHours, 'hours');

    return new Date(current.toLocaleString());
  }

  const departTime = moment.tz(departDate, 'Asia/Jakarta');
  departTime?.add(randHours, 'hours');

  return new Date(departTime?.toLocaleString());
}

function randomPrice() {
  return Math.floor(Math.random() * 500000) + 3000000;
}

function randomCapacity(travelClass: ETravelClass) {
  const decisionObj: Record<ETravelClass, number> = {
    [ETravelClass.BUSINESS_CLASS]: 15,
    [ETravelClass.ECONOMY_CLASS]: 40,
    [ETravelClass.PREMIUM_ECONOMY_CLASS]: 25,
  };
  return Math.floor(Math.random() * decisionObj[travelClass]) + 0;
}

function randomBoolean() {
  return Math.random() > 0.5;
}

export const migration: Migration = {
  async up(queryInterface) {
    const maxData = 10000;
    let arrDummyFlights: IFlightCreationAttributes[] = [];
    let arrDummySeats: ISeatDetailsCreationAttributes[] = [];

    for (let i = 0; i < maxData; i++) {
      const departTime = randomDate(true);
      arrDummyFlights.push({
        airport_from: randomAirport(),
        airport_destination: randomAirport(),
        airlines: randomAirlines(),
        is_refundable: randomBoolean(),
        is_rescheduleable: randomBoolean(),
        arrival_time: randomDate(false, departTime),
        departure_time: departTime,
      });

      for (let j = 0; j < 3; j++) {
        const travelClass = createTravelClass(j);
        arrDummySeats.push({
          flight_id: (i + 1),
          travel_class: travelClass,
          capacity: randomCapacity(travelClass),
          price: randomPrice(),
        });
      }
    }

    await queryInterface.bulkInsert('flights', arrDummyFlights);
    await queryInterface.bulkInsert('seat_details', arrDummySeats);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('flights', {}, {});
    await queryInterface.bulkDelete('seat_details', {}, {});
  },
};

export default migration;
