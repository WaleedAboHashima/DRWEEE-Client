import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { LanguageContext } from "../language";
import { useContext } from "react";
import { GetUsersHandler } from "apis/data/Users/GetUsers";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = theme.palette;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const context = useContext(LanguageContext);
  const [keys, setKeys] = useState([]);
  const mockBarData = [
    {
      country: "Tito",
      "hot dog": 137,
      "hot dogColor": "hsl(229, 70%, 50%)",
      burger: 96,
      burgerColor: "hsl(296, 70%, 50%)",
      kebab: 72,
      kebabColor: "hsl(97, 70%, 50%)",
      donut: 140,
      donutColor: "hsl(340, 70%, 50%)",
    },
    {
      "hot dog": 55,
      "hot dogColor": "hsl(307, 70%, 50%)",
      country: "Basha",
      burger: 28,
      كباب: 50,
      hotdog: 100,
      fries: 500,
      sandwich: 200,
      burgerColor: "hsl(111, 70%, 50%)",
      kebab: 58,
      kebabColor: "hsl(273, 70%, 50%)",
      donut: 29,
      donutColor: "hsl(275, 70%, 50%)",
    },
    {
      country: "Ferrari ",
      "hot dog": 109,
      "hot dogColor": "hsl(72, 70%, 50%)",
      burger: 23,
      burgerColor: "hsl(96, 70%, 50%)",
      kebab: 34,
      kebabColor: "hsl(106, 70%, 50%)",
      donut: 152,
      donutColor: "hsl(256, 70%, 50%)",
    },
  ];
  useEffect(() => {
    dispatch(GetUsersHandler()).then((res) => {
      if (res.payload.data) {
        const countryCounts = {};
        const uniqueCountries = [];
        const users = res.payload.data.allUsers;

        users.forEach((user) => {
          const { City } = user;
          if (City) {
            // Increment count for the country
            countryCounts[City] = (countryCounts[City] || 0) + 1;

            // Add the country to the uniqueCountries array if not already present
            if (!uniqueCountries.includes(City)) {
              uniqueCountries.push(City);
            }
          }
        });
        const countsArray = uniqueCountries.map((city) => ({
          City: city,
          [city]: countryCounts[city] || 0,
        }));

        // Update the state with both counts and unique country names
        setData(countsArray);
        setKeys(uniqueCountries);
      }
    });
  }, [dispatch]);
  return (
    <ResponsiveBar
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[900],
            },
          },
          legend: {
            text: {
              fill: colors.grey[900],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[900],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[900],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[900],
          },
        },
      }}
      data={data}
      keys={keys}
      indexBy="City"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      tooltip={() => null} // Custom tooltip that renders nothing
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection:
            context.language === "en" ? "left-to-right" : "right-to-left",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivobar chart demo"
    />
  );
};

export default BarChart;
