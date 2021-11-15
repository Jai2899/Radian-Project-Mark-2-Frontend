import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import QuoteDisplay from "./QuoteDisplay";
const Middleware = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isError, setError] = useState(null);
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
        //console.log(resData["data"]["events"]);
        for (let i=0;i<Object.keys(resData["data"]["events"]).length;i++)
        {
            if(resData["data"]["events"][i]["_id"]===id)
            {
                setData(resData["data"]["events"][i]);
                break;
            }
            else
                console.log("Something Went Terribly wrong");
        }
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
  //console.log(id);
  return <div> {!isLoading && (<QuoteDisplay data={data}/>)}</div>;
};

export default Middleware;
