import { create_hours } from "./hours";

const _Date = Date;

const MOCK_DATE_STRING = "December 18, 2019 12:05:00";

const mockDate = (dateString) => {
  global.Date = class extends _Date {
    constructor(...args) {
      return args.length > 0 ? new _Date(...args) : new _Date(dateString);
    }

    static restore() {
      global.Date = _Date;
    }
  };

  global.Date.now = () => new _Date(MOCK_DATE_STRING).getTime();
};

beforeEach(() => {
  mockDate(MOCK_DATE_STRING);
});

afterEach(() => Date.restore());

const setup_hours = async (fakeHours = []) => {
  const sheetsApi = {
    fetchHours: async () => fakeHours,
  };
  const hours = create_hours({ sheetsApi });
  await hours.load();
  expect(hours.isLoaded()).toEqual(true);
  return hours;
};

describe("totals", () => {
  test("no hours worked", async () => {
    const hours = await setup_hours([]);

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
      saturday: { hours: 0 },
    });
  });

  test("calculates hours worked for each day of current week", async () => {
    const hours = await setup_hours([
      {
        // monday
        timestamp: new Date("December 16, 2019 12:01:00"),
        startDateTime: new Date("December 16, 2019 08:00:00"),
        endDateTime: new Date("December 16, 2019 12:00:00"),
        notes: "did stuff",
      },
      {
        // wednesday
        timestamp: new Date("December 18, 2019 12:01:00"),
        startDateTime: new Date("December 18, 2019 08:30:00"),
        endDateTime: new Date("December 18, 2019 12:00:00"),
        notes: "did other stuff",
      },
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
      saturday: { hours: 0 },
    });
  });

  test("calculates hours worked for the previous week", async () => {
    const hours = await setup_hours([
      {
        // monday - 4 hours
        timestamp: new Date("December 9, 2019 12:01:00"),
        startDateTime: new Date("December 9, 2019 08:00:00"),
        endDateTime: new Date("December 9, 2019 12:00:00"),
        notes: "did stuff",
      },
      {
        // wednesday - 3.5 hours
        timestamp: new Date("December 11, 2019 12:01:00"),
        startDateTime: new Date("December 11, 2019 08:30:00"),
        endDateTime: new Date("December 11, 2019 12:00:00"),
        notes: "did other stuff",
      },
    ]);

    const { previousWeek } = hours.totals();
    expect(previousWeek.hours).toBe(7.5);
  });

  test("calculates hours worked for a week in the past", async () => {
    const hours = await setup_hours([
      {
        // monday - 4 hours
        timestamp: new Date("December 2, 2019 12:01:00"),
        startDateTime: new Date("December 2, 2019 08:00:00"),
        endDateTime: new Date("December 2, 2019 12:00:00"),
        notes: "did stuff",
      },
      {
        // wednesday - 3.5 hours
        timestamp: new Date("December 4, 2019 12:01:00"),
        startDateTime: new Date("December 4, 2019 08:30:00"),
        endDateTime: new Date("December 4, 2019 12:00:00"),
        notes: "did other stuff",
      },
    ]);

    hours.set_week(new Date("December 4, 2019 12:05:00"));

    const actual_totals = hours.totals();
    expect(actual_totals.currentWeek.hours).toBe(7.5);
  });
});

describe("previous", () => {
  let hours;
  beforeEach(async () => {
    hours = await setup_hours([
      {
        // monday - 4 hours
        timestamp: new Date("December 9, 2019 12:01:00"),
        startDateTime: new Date("December 9, 2019 08:00:00"),
        endDateTime: new Date("December 9, 2019 12:00:00"),
        notes: "did stuff",
      },
      {
        // wednesday - 3.5 hours
        timestamp: new Date("December 11, 2019 12:01:00"),
        startDateTime: new Date("December 11, 2019 08:30:00"),
        endDateTime: new Date("December 11, 2019 12:00:00"),
        notes: "did other stuff",
      },
    ]);
  });

  test("moves week cursor back one week", async () => {
    hours.set_week(new Date());
    hours.previous();
    expect(hours.totals().currentWeek.hours).toBe(7.5);
  });

  test("returns totals after updating week cursor", async () => {
    hours.set_week(new Date());
    const totals = hours.previous();
    expect(totals.currentWeek.hours).toBe(7.5);
  });
  test("returns undefined if previous week is before start of data", async () => {
    hours.set_week(new Date());
    hours.previous();
    const totals = hours.previous();
    expect(totals).toBeUndefined();
  });
});

describe("next", () => {
  let hours;
  beforeEach(async () => {
    hours = await setup_hours([
      {
        // monday - 4 hours
        timestamp: new Date("December 9, 2019 12:01:00"),
        startDateTime: new Date("December 9, 2019 08:00:00"),
        endDateTime: new Date("December 9, 2019 12:00:00"),
        notes: "did stuff",
      },
      {
        // wednesday - 3.5 hours
        timestamp: new Date("December 11, 2019 12:01:00"),
        startDateTime: new Date("December 11, 2019 08:30:00"),
        endDateTime: new Date("December 11, 2019 12:00:00"),
        notes: "did other stuff",
      },
    ]);
  });

  test("moves week cursor forward one week", async () => {
    hours.set_week(new Date("December 4, 2019 12:05:00"));
    hours.next();
    expect(hours.totals().currentWeek.hours).toBe(7.5);
  });

  test("returns totals for the week after updating cursor", async () => {
    hours.set_week(new Date("December 4, 2019 12:05:00"));
    const totals = hours.next();
    expect(totals.currentWeek.hours).toBe(7.5);
  });

  test("returns undefined if next week begins in the future", async () => {
    hours.set_week(new Date());
    expect(hours.next()).toBeUndefined();
  });
});
