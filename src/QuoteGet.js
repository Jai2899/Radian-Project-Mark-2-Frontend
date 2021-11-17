
import { useState,useContext } from "react";
import QuoteDisplay from './QuoteDisplay';
import AuthContext from "./context/auth-context";

const QuoteGet = () => {
  const context = useContext(AuthContext);
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
    //console.log(details);
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
    const token =context.token;
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+token
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        //console.log(resData);
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
      {isFetched && (<QuoteDisplay data={data}/>)}
    </div>
  );
};

export default QuoteGet;
