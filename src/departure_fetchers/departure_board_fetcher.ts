import { Departure } from "../models/departure";

interface DepartureBoardFetcher {
  fetchDepartures(): Promise<Departure[]>;
}

export default DepartureBoardFetcher;
