import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/auth-context";
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
          rebate
          originalTitleQuote
          rebateSavings
          radianQuote
          BuyerResponsibility
          sellerResponsibility
          SOTI
          SLTI
          SBR
          STPremium
          SAE906
          SAE8106
          STEndorsements
          SCF
          SSF
          STSettlementCharges
          STitleCharges
          BCF
          BSF
          BTSettlementCharges
          BAE906
          BAE8106
          BTEndorsements
          BLTI
          BBR
          BOTI
          BTPremium
          BTitleCharges
          TOTI
          TLTI
          TBR
          TTPremium
          TAE906
          TAE8106
          TTEndorsements
          TCF
          TSF
          TTSettlementCharges
          TTitleCharges
          BDST
          BMST
          BMIT
          BMRF
          BDRF
          BTTOGF
          SMST
          SDST
          SMIT
          SMRF
          SDRF
          STTOGF
          TDST
          TMST
          TMIT
          TMRF
          TDRF
          TTTOGF
          creator {
            _id
            email
          }
        }
      }
    `,
  };
  useEffect(() => {
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData["data"]["events"]);
        let k= resData["data"]["events"];
        for (let i=0;i<k.length;i++)
        {
            if(k[i]["creator"]["_id"]!==context.userId)
              delete k[i];
        }
        //console.log(k);
        setData(k);
        if(k.length==0)
          setHaveData(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return "Loading......";
  if (isError) return "Error.....";
  return (
    <div>
      {isLoading && <h1>Quotations page is Loading</h1>}
      {!haveData && <h1>No Previous quotations Available</h1>}
      <div className="blog-list">
        {data.map((d) => (
          <div className="blog-preview" key={d._id}>
            <Link to={`/middleware/${d._id}`}>
              <h2>{d.address}</h2>
              <p>{d.QuoteDate}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyQuotations;
