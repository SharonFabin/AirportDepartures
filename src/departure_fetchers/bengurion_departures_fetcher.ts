import axios from "axios";
import { Departure } from "../models/departure";
import DepartureBoardFetcher from "./departure_board_fetcher";
import BenGurionDepartureInfo from "../models/bengurion_departures_info";

class BenGurionDeparturesFetcher implements DepartureBoardFetcher {
  private readonly BASE_URL =
    "https://www.iaa.gov.il/umbraco/surface/FlightBoardSurface/Search";
  private readonly FLIGHT_TYPE = "Outgoing";
  private readonly AIRPORT_ID = "LLBG";
  private readonly UI_CULTURE = "en-US";

  constructor() {}

  public async fetchDepartures(): Promise<Departure[]> {
    const flightsData = await this.fetchDeparturesData();
    const departures = this.parseDepartures(flightsData);
    return departures;
  }

  // Prepare the request data and send a POST request to the Ben Gurion airport API
  // throws an error if the request fails or the response is not valid
  private async fetchDeparturesData(): Promise<BenGurionDepartureInfo[]> {
    const requestData = {
      FlightType: this.FLIGHT_TYPE,
      AirportId: this.AIRPORT_ID,
      UICulture: this.UI_CULTURE,
    };
    const response = await axios.post(this.BASE_URL, requestData);
    if (response.status !== 200 || !response.data) {
      throw new Error(`Failed to fetch departures from ${this.BASE_URL}`);
    }
    const flightsData = response.data["Flights"] as BenGurionDepartureInfo[];
    return flightsData;
  }

  private parseDepartures(data: BenGurionDepartureInfo[]): Departure[] {
    return data.map((departure: BenGurionDepartureInfo) => {
      return {
        airline: departure.Airline,
        destinationCity: departure.City,
        flightCode: departure.Flight,
        scheduleDate: departure.ScheduledDate,
        scheduleTime: departure.ScheduledTime,
        updateDate: departure.UpdatedDate,
        updateTime: departure.UpdatedTime,
      };
    });
  }
}

export default BenGurionDeparturesFetcher;
