import { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
const QuoteGet = () => {
  const [Address, setAddress] = useState("");
  const [PurchasePrice, setPurchasePrice] = useState("");
  const [LoanAmount, setLoanAmount] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const details = { Address, PurchasePrice, LoanAmount };
    const pp = parseInt(PurchasePrice);
    const la = parseInt(LoanAmount);
    console.log(details);
    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {address: "${Address}", purchaseAmount: ${pp}, loanAmount: ${la}}) {
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
    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setData(resData["data"]["createEvent"]);
        setIsPending(false);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {isPending && (
        <div className="getQuote">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Address"
              type="text"
              required
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              placeholder="Purchase Price"
              type="number"
              required
              value={PurchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
            <input
              placeholder="Loan Amount"
              type="number"
              required
              value={LoanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <button>Submit</button>
          </form>
        </div>
      )}
      {isFetched && (
        <div>
          
        </div>
      )}
    </div>
  );
};

export default QuoteGet;
