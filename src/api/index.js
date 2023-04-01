import axios from "axios";

const url = "https://covid19.mathdro.id/api"; // https://covid19.mathdro.id/api/countries/country

export const fetchData = async (country) => {
  // fetchData(chine) ....   cofirmed, recovered, death, lastupdate
  let changeableUrl = url;

  if (country) {
    changeableUrl = `https://covid19.mathdro.id/api/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// export default kuchnaam;

export const fetchDailyData = async () => {
  // fetchDailyData();
  try {
    const { data } = await axios.get("https://covid19.mathdro.id/api/daily"); // https://covid19.mathdro.id/api/daily

    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  // fetchCountries()
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
