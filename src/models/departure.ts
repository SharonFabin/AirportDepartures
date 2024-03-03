type Departure = {
  // Airline name
  airline: string;
  // Destination city
  destinationCity: string;
  // Flight code such as "LY 001"
  flightCode: string;
  // Schedule date DD/MM (e.g. 01/01)
  scheduleDate: string;
  // Schedule time HH:MM (e.g. 13:00)
  scheduleTime: string;
  // Last update date DD/MM (e.g. 01/01)
  updateDate: string;
  // Last update time HH:MM (e.g. 13:00)
  updateTime: string;
};

export type { Departure };
