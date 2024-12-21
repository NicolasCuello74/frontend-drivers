import {
  GET_DRIVERS,
  GET_TEAMS,
  ORDER,
  FILTER,
  DETAIL,
  GET_BY_NAME,
  LOADING,
  POST_DRIVER,
  SET_CURRENT_PAGE,
  BORRAR,
} from "../actions/actions";

let initialState = {
  loading: false,
  allDrivers: [],
  driversCopy: [],
  allTeams: [],
  posts: [],
  detail: [],
  currentPage: 1,
  driversPerPage: 9,
  filterState: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        driversCopy: action.payload,
        loading:false,
      };
    case GET_BY_NAME:
      return {
        ...state,
        filterState: action.payload,
        currentPage: 1,
        loading: false
      };
    case POST_DRIVER:
      return {
        ...state,
        allDrivers: [...state.allDrivers, action.payload],
    driversCopy: [...state.driversCopy, action.payload],
      };
    case GET_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };
    case DETAIL:
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };
    case BORRAR:
      return {
        ...state,
        filterState: [],
        currentPage: 1,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ORDER:
      const orderByFilter = state.filterState.slice();
      if(orderByFilter.length > 0){
        orderByFilter.sort((a, b) => {
          if (action.payload === "AZ") {
            return a.forename.localeCompare(b.forename); // Comparación de cadenas
          } else if (action.payload === "ZA") {
            return b.forename.localeCompare(a.forename); // Invierte el orden para descendente
          } else if (action.payload === "Fa") {
            return new Date(a.dob) - new Date(b.dob); // Comparación de fechas ascendente
          } else if (action.payload === "FD") {
            return new Date(b.dob) - new Date(a.dob); // Comparación de fechas descendente
          }
          return 0;
        });
        return{
          ...state,
          filterState: orderByFilter,
          currentPage: 1,
        }
      }

      const ordered = state.allDrivers.slice(); // Clonación del array
      ordered.sort((a, b) => {
        if (action.payload === "AZ") {
          return a.forename.localeCompare(b.forename); // Comparación de cadenas
        } else if (action.payload === "ZA") {
          return b.forename.localeCompare(a.forename); // Invierte el orden para descendente
        } else if (action.payload === "Fa") {
          return new Date(a.dob) - new Date(b.dob); // Comparación de fechas ascendente
        } else if (action.payload === "FD") {
          return new Date(b.dob) - new Date(a.dob); // Comparación de fechas descendente
        }
        return 0;
      });
      return {
        ...state,
        filterState: ordered,
        currentPage: 1,
      };
      case FILTER:
        const selectedTeam = action.payload;
        console.log("Selected Team:", selectedTeam);
        console.log("DriversCopy:", state.driversCopy);
      
        const filteredDrivers = state.driversCopy.filter((driver) => {
          console.log("Driver.teams:", driver.teams); // Verifica la propiedad teams
          if (driver.teams) {
            return driver.teams.includes(selectedTeam);
          }
        });
        console.log("Filtered Drivers:", filteredDrivers);
      
        return {
          ...state,
          filterState: filteredDrivers,
          currentPage: 1,
        };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
