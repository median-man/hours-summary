import { create_hours } from "./hours";

const _Date = Date;

const mockDate = dateString => {
  global.Date = class extends _Date {
    constructor(...args) {
      if (args.length) {
        return new _Date(...args);
      }
      return new _Date(dateString);
    }

    static restore() {
      global.Date = _Date;
    }
  };
};

describe("totals", () => {
  beforeEach(() => {
    mockDate("December 18, 2019 12:05:00");
  });

  afterEach(() => Date.restore());

  let hours;
  const setup = async (fakeHours = []) => {
    const sheetsApi = {
      fetchHours: async () => fakeHours
    };
    hours = create_hours({ sheetsApi });
    await hours.load();
    expect(hours.isLoaded()).toEqual(true);
  };

  test("no hours worked", async () => {
    await setup([]);

    const result = hours.totals();
    expect(result).toEqual({
      currentWeek: { hours: 0 },
      currentDay: { hours: 0 },
      previousWeek: { hours: 0 },
      sunday: { hours: 0 },
      monday: { hours: 0 },
      tuesday: { hours: 0 },
      wednesday: { hours: 0 },
      thursday: { hours: 0 },
      friday: { hours: 0 },
      saturday: { hours: 0 }
    });
  });

  test("calculates hours worked for each day of current week", async () => {
    await setup([
      {
        // monday
        timestamp: new Date("December 16, 2019 12:01:00"),
        startDateTime: new Date("December 16, 2019 08:00:00"),
        endDateTime: new Date("December 16, 2019 12:00:00"),
        notes: "did stuff"
      },
      {
        // wednesday
        timestamp: new Date("December 18, 2019 12:01:00"),
        startDateTime: new Date("December 18, 2019 08:30:00"),
        endDateTime: new Date("December 18, 2019 12:00:00"),
        notes: "did other stuff"
      }
    ]);

    const result = hours.totals();
    expect(result).toEqual({
      currentWeek: { hours: 7.5 },
      currentDay: { hours: 3.5 },
      previousWeek: { hours: 0 },
      sunday: { hours: 0 },
      monday: { hours: 4 },
      tuesday: { hours: 0 },
      wednesday: { hours: 3.5 },
      thursday: { hours: 0 },
      friday: { hours: 0 },
      saturday: { hours: 0 }
    });
  });

  test("calculates hours worked for the previous week", async () => {
    await setup([
      {
        // monday - 4 hours
        timestamp: new Date("December 9, 2019 12:01:00"),
        startDateTime: new Date("December 9, 2019 08:00:00"),
        endDateTime: new Date("December 9, 2019 12:00:00"),
        notes: "did stuff"
      },
      {
        // wednesday - 3.5 hours
        timestamp: new Date("December 11, 2019 12:01:00"),
        startDateTime: new Date("December 11, 2019 08:30:00"),
        endDateTime: new Date("December 11, 2019 12:00:00"),
        notes: "did other stuff"
      }
    ]);

    const { previousWeek } = hours.totals();
    expect(previousWeek.hours).toBe(7.5);
  });
});
