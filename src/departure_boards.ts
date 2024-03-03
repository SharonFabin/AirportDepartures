import { Departure } from "./models/departure";

interface DepartureBoards {
  /*
   * Returns a list of supported airport codes
   */
  supportedAirports(): string[];
  /*
   * Returns a list of departures for the given airport
   * @param airport the airport code
   * @returns a list of departures
   * @throws an error if the airport is not supported
   */
  departuresFor(airport: String): Promise<Departure[]>;
}

export { DepartureBoards };
