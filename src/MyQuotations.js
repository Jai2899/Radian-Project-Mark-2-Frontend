import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/auth-context";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
const MyQuotations = () => {
  const context = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isError, setError] = useState(null);
  const [haveData, setHaveData] = useState(true);
  const requestBody = {
    query: `
      query {
        events {
          _id
          address
          purchaseAmount
          loanAmount
          QuoteDate          
          creator {
            _id
            email
          }
        }
      }
    `,
  };
  useEffect(() => {
    // Fetching data
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // throwing an error if fetching is not successful
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        // providing the quotes created by the user
        let quotes = resData["data"]["events"];
        for (let i = 0; i < quotes.length; i++)
        {
          // Deleting the quotes not created by the user
          if(quotes[i]["creator"]["_id"] !== context.userId)
              delete quotes[i];
        }
        // Updating data with the quotes created by the user
        setData(quotes);
        // Updating haveData variable
        if(quotes.length === 0)
          setHaveData(false);
      })
      .catch((err) => {
        console.log(err);
        // Updating isError variable
        setError(err);
      })
        // updating isLoading variable
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return "Loading......";
  if (isError !== null) return "Error.....";
  return (
    <div>
      {isLoading && <h1>Quotations page is Loading</h1>}
      {!haveData && <h1>No Previous quotations Available</h1>}
      <div className="blog-list">
        {data.map((d) => (
          <div className="blog-preview" key={d._id}>
            <Link to={`/middleware/${d._id}`}>
              <Grid style={{ flexBasis: "100%", padding: "8px"}}>
                <Box style={{ lineHeight: "unset", color: "lightcoral", backgroundColor: "#5aa950"}} className="bold">{d.address}</Box>
                <Box style={{ lineHeight: "unset" }}>Date: {d.QuoteDate}</Box>
                <Box style={{ lineHeight: "unset" }}>Purchase Amount: {d.purchaseAmount}</Box>
                <Box style={{ lineHeight: "unset" }}>Loan Amount: {d.loanAmount}</Box>
              </Grid>
              {/*<h2>{d.address}</h2>*/}
              {/*<p>{d.QuoteDate}</p>*/}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyQuotations;
