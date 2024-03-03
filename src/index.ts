import DepartureBoardsManager from "./departure_boards_manager";

const startApp = async () => {
  const departureBoardsManager = new DepartureBoardsManager();
  const supportedAirports = departureBoardsManager.supportedAirports();
  console.log("Supported airports: ", supportedAirports);
  const departures = await departureBoardsManager.departuresFor("LLBG");
  console.log("Departures: ", departures);
};
startApp();
