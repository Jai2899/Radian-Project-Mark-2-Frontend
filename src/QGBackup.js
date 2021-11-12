import { useState } from "react";
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
    <div className="create">
      <h2>Get A Quotation</h2>
      {isPending && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Address</label>
            <input
              type="text"
              required
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Purchase Amount</label>
            <input
              type="number"
              required
              value={PurchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
            <label>Loan Amount</label>
            <input
              type="number"
              required
              value={LoanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <button>Add Blog</button>
          </form>
        </div>
      )}
      {isFetched && <h1>{data.address}</h1>}
    </div>
  );
};

export default QuoteGet;
