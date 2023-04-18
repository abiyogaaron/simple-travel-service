import { Migration } from 'sequelize-cli';
import moment from 'moment-timezone';

import { EAirline, EAirport } from '../../types';
import { IFlightCreationAttributes } from '../models/flights';

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

function randomBoolean() {
  return Math.random() > 0.5;
}

export const migration: Migration = {
  async up(queryInterface) {
    const maxData = 10000;
    let arrDummy: IFlightCreationAttributes[] = [];

    for (let i = 0; i < maxData; i++) {
      const departTime = randomDate(true);
      arrDummy.push({
        airportFrom: randomAirport(),
        airportDestination: randomAirport(),
        airlines: randomAirlines(),
        price: randomPrice(),
        isRefundable: randomBoolean(),
        isRescheduleable: randomBoolean(),
        arrivalTime: randomDate(false, departTime),
        departureTime: departTime,
      });
    }
    await queryInterface.bulkInsert('flights', arrDummy);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('flights', {}, {});
  },
};

export default migration;
