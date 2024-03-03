import { DepartureBoards } from "./departure_boards";
import DepartureFetcher from "./departure_fetchers/departure_board_fetcher";
import BenGurionDeparturesFetcher from "./departure_fetchers/bengurion_departures_fetcher";
import { Departure } from "./models/departure";

class DepartureBoardsManager implements DepartureBoards {
  // supported airpots
  private departureBoardFethchers: {
    [airport: string]: DepartureFetcher;
  };

  constructor() {
    this.departureBoardFethchers = {
      LLBG: new BenGurionDeparturesFetcher(),
    };
  }

  public supportedAirports(): string[] {
    return Object.keys(this.departureBoardFethchers);
  }

  public async departuresFor(airport: string): Promise<Departure[]> {
    if (!this.supportedAirports().includes(airport)) {
      throw new Error(`Airport ${airport} is not supported`);
    }
    const fetcher = this.departureBoardFethchers[airport];
    const departures = await fetcher.fetchDepartures();

    return departures;
  }
}

export default DepartureBoardsManager;
