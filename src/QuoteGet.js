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
          <Grid>
            <Grid style={{ flexBasis: "100%", padding: "8px" }}>
              <Box className="jss80">
                <Box className="jss72">
                  <Box>
                    <Box style={{ lineHeight: "unset" }}>{data.address}</Box>
                  </Box>
                </Box>
                <Box className="jss84">
                  <Button className="jss85">Share</Button>
                  <Button className="jss85">Save</Button>
                  <Button className="jss85">Questions?</Button>
                </Box>
              </Box>
            </Grid>
            <Grid className="grid">
              <>
                <Box className="jss93">
                  <Paper elevation={2} className="jss94">
                    <Box className="jss76">
                      <Box className="jss96">
                        <span>Due Upon Closing</span>
                      </Box>
                    </Box>
                    <>
                      <Box className="jss99">
                        <Box className="jss102">
                          <Typography className="jss66">
                            Radian Quote
                          </Typography>
                          <Box>
                            <Typography>
                              <Box className="jss104">{data.radianQuote}</Box>
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="jss393">
                        <Box className="jss394">
                          <Typography className="jss79">
                            {data.originalTitleQuote}
                          </Typography>
                        </Box>
                        <Box
                          className="jss395"
                          style={{ width: "calc(100% - 200px)" }}
                        >
                          <Typography className="jss79">
                            Original Title Quote:
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="jss393">
                        <Box className="jss394">
                          <Typography className="jss79">
                            {data.rebateSavings}
                          </Typography>
                        </Box>
                        <Box
                          className="jss395"
                          style={{ width: "calc(100% - 200px)" }}
                        >
                          <Typography className="jss79">
                            Radian Instant Rebate Savings:
                          </Typography>
                        </Box>
                      </Box>
                    </>
                    <>
                      <Box className="jss105">
                        <Box className="jss106">
                          <Typography className="jss66">
                            Buyer Responsibility
                          </Typography>
                          <Box className="jss108">
                            <Typography className="style">
                              <Box className="jss109">
                                {data.BuyerResponsibility}
                              </Box>
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="jss106">
                          <Typography className="jss66">
                            Seller Responsibility
                          </Typography>
                          <Box className="jss108">
                            <Typography className="style">
                              <Box className="jss109">
                                {data.sellerResponsibility}
                              </Box>
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </>
                    <>
                      <Box className="jss114">
                        <Button className="button">Lets Get Started</Button>
                      </Box>
                    </>
                  </Paper>
                </Box>
              </>
              <>
                <Box className="jss115">
                  <Box className="jss78 jss388">
                    <Box className="jss390">
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                        style={{ width: "100%", height: "160px" }}
                      />
                    </Box>
                  </Box>
                  <Box className="jss391">
                    <Box className="jss392">
                      <>
                        <Box className="jss393">
                          <Box className="jss394">
                            <Typography className="jss79">
                              {data.Purchaseprice}
                            </Typography>
                          </Box>
                          <Box
                            className="jss395"
                            style={{ width: "calc(100% - 112px)" }}
                          >
                            <Typography className="jss79">
                              Purchase Price
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="jss393">
                          <Box className="jss394">
                            <Typography className="jss79">
                              {data.LoanAmount}
                            </Typography>
                          </Box>
                          <Box
                            className="jss395"
                            style={{ width: "calc(100% - 112px)" }}
                          >
                            <Typography className="jss79">
                              Loan Amount
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="jss393">
                          <Box className="jss394">
                            <Typography className="jss79">
                              {data.QuoteDate}
                            </Typography>
                          </Box>
                          <Box
                            className="jss395"
                            style={{ width: "calc(100% - 112px)" }}
                          >
                            <Typography className="jss79">
                              Quote Date
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="jss393">
                          <Box className="jss394">
                            <Typography className="jss79">Buy</Typography>
                          </Box>
                          <Box
                            className="jss395"
                            style={{ width: "calc(100% - 112px)" }}
                          >
                            <Typography className="jss79">
                              Transaction
                            </Typography>
                          </Box>
                        </Box>
                      </>
                    </Box>
                  </Box>
                </Box>
              </>
            </Grid>
          </Grid>
          <div className="qd1">
            <Paper
              elevation={6}
              style={{
                borderRadius: "30px",
                width: "auto",
                height: "auto",
                margin: "40px 50px 40px 50px",
              }}
            >
              <Box padding="16px">
                <h1 style={{ color: "rgb(0 166 160)" }}>Title Charges </h1>

                <Table style={{ width: "100%" }} aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          paddingRight: "125px",
                          fontSize: "25px",
                        }}
                      >
                        Premium
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        Buyer
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        Seller
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "rgb(0 166 160)",
                          fontSize: "25px",
                        }}
                      >
                        Total charges
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <h4>
                      Owner's Title
                      Insurance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </h4>

                    <TableCell>{data.BOTI}</TableCell>
                    <TableCell>{data.SOTI}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TOTI}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <h4>Lender's Title Insurance</h4>
                    <TableCell>{data.BLTI}</TableCell>
                    <TableCell>{data.SLTI}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TLTI}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <h4>Butlers Rebate (20%)</h4>
                    <TableCell>{data.BBR}</TableCell>
                    <TableCell>{data.SBR}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TBR}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell
                      variant="footer"
                      style={{
                        color: "rgb(0, 43, 73)",
                        fontWeight: "800",
                        borderBottom: "none",
                        fontSize: "20px",
                      }}
                    >
                      Total Premium
                    </TableCell>
                    <TableCell
                      style={{
                        color: "rgb(0, 43, 73)",
                        fontWeight: "800",
                        borderBottom: "none",
                        fontSize: "20px",
                      }}
                    >
                      {data.BTPremium}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "rgb(0, 43, 73)",
                        fontWeight: "800",
                        borderBottom: "none",
                        fontSize: "20px",
                      }}
                    >
                      {data.STPremium}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                        fontWeight: "bold",
                        color: "rgb(0 166 160)",
                        fontSize: "20px",
                      }}
                    >
                      {data.TTPremium}
                    </TableCell>
                  </TableBody>
                </Table>

                <br />
                <Table style={{ width: "100%" }} aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          paddingRight: "125px",
                          fontSize: "25px",
                        }}
                      >
                        Endorsements
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        Buyer
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        Seller
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "rgb(0 166 160)",
                          fontSize: "25px",
                        }}
                      >
                        Total charges
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <h4>
                      ALTA ENDORSEMENT 9-06 (Restrictions, Encroachments,
                      Minerals)
                    </h4>
                    <TableCell>{data.BAE906}</TableCell>
                    <TableCell>{data.SAE906}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TAE906}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <h4>
                      ALTA ENDORSEMENT 8.1-06 (Environmental Protection Lien)
                    </h4>
                    <TableCell>{data.BAE8106}</TableCell>
                    <TableCell>{data.SAE8106}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TAE8106}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell
                      variant="footer"
                      style={{
                        color: "rgb(0, 43, 73)",
                        fontWeight: "800",
                        borderBottom: "none",
                        fontSize: "20px",
                      }}
                    >
                      Total Endorsements
                    </TableCell>
                    <TableCell
                      style={{
                        color: "rgb(0, 43, 73)",
                        fontWeight: "800",
                        borderBottom: "none",
                        fontSize: "20px",
                      }}
                    >
                      {data.BTEndorsements}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "rgb(0, 43, 73)",
                        fontWeight: "800",
                        borderBottom: "none",
                        fontSize: "20px",
                      }}
                    >
                      {data.STEndorsements}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                        fontWeight: "bold",
                        color: "rgb(0 166 160)",
                        fontSize: "20px",
                      }}
                    >
                      {data.TTEndorsements}
                    </TableCell>
                  </TableBody>
                </Table>
                <br />
                <Table style={{ width: "100%" }} aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          paddingRight: "125px",
                          fontSize: "25px",
                        }}
                      >
                        Settlement Charges
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        Buyer
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        Seller
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "rgb(0 166 160)",
                          fontSize: "25px",
                        }}
                      >
                        Total Charges
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <h4>
                      Closing
                      Fee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </h4>
                    <TableCell>{data.BCF}</TableCell>
                    <TableCell>{data.SCF}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TCF}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <h4>Search Fee</h4>
                    <TableCell>{data.BSF}</TableCell>
                    <TableCell>{data.SSF}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TSF}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell
                      variant="footer"
                      style={{
                        color: "rgb(0, 43, 73)",
                        fontWeight: "800",
                        fontSize: "20px",
                      }}
                    >
                      Total Settlement Charges
                    </TableCell>
                    <TableCell
                      style={{
                        color: "rgb(0, 43, 73)",
                        fontWeight: "800",
                        fontSize: "20px",
                      }}
                    >
                      {data.BTSettlementCharges}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "rgb(0, 43, 73)",
                        fontWeight: "800",
                        fontSize: "20px",
                      }}
                    >
                      {data.STSettlementCharges}
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "rgb(0 166 160)",
                        fontSize: "20px",
                      }}
                    >
                      {data.TTSettlementCharges}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell
                      variant="footer"
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "rgb(0 166 160)",
                        borderBottom: "none",
                      }}
                    >
                      Total Title Charges
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "rgb(0 166 160)",
                        borderBottom: "none",
                      }}
                    >
                      {data.BTitleCharges}
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "rgb(0 166 160)",
                        borderBottom: "none",
                      }}
                    >
                      {data.STitleCharges}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                        fontWeight: "bold",
                        color: "rgb(0 166 160)",
                        fontSize: "20px",
                      }}
                    >
                      {data.TTitleCharges}
                    </TableCell>
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </div>

          <div className="qd1">
            <Paper
              elevation={6}
              style={{
                borderRadius: "30px",
                width: "auto",
                height: "auto",
                margin: "40px 50px 40px 50px",
              }}
            >
              <Box padding="16px">
                <h1 style={{ color: "rgb(0 166 160)" }}>
                  Taxes & Other Government Fees{" "}
                </h1>
                <Table style={{ width: "100%" }} aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          paddingRight: "125px",
                          fontSize: "25px",
                        }}
                      ></TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        Buyer
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        Seller
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color: "rgb(0 166 160)",
                          fontSize: "25px",
                        }}
                      >
                        Total charges
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <h4>
                      Deed State
                      Tax&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </h4>

                    <TableCell>{data.BDST}</TableCell>
                    <TableCell>{data.SDST}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TDST}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <h4>Mortgage State Tax</h4>
                    <TableCell>{data.BMST}</TableCell>
                    <TableCell>{data.SMST}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TMST}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <h4>Mortgage Intangible Tax</h4>
                    <TableCell>{data.BMIT}</TableCell>
                    <TableCell>{data.SMIT}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TMIT}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <h4>Mortgage Recording Fee</h4>
                    <TableCell>{data.BMRF}</TableCell>
                    <TableCell>{data.SMRF}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TMRF}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <h4>Deed Recording Fee</h4>
                    <TableCell>{data.BDRF}</TableCell>
                    <TableCell>{data.SDRF}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TDRF}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <h4>Total Taxes & Other Government Fees</h4>
                    <TableCell>{data.BTTOGF}</TableCell>
                    <TableCell>{data.STTOGF}</TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", color: "rgb(0 166 160)" }}
                    >
                      {data.TTTOGF}
                    </TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell
                      variant="footer"
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "rgb(0 166 160)",
                        borderBottom: "none",
                      }}
                    >
                      Total Taxes & Other Government Fees
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "rgb(0 166 160)",
                        borderBottom: "none",
                      }}
                    >
                      {data.BTTOGF}
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "rgb(0 166 160)",
                        borderBottom: "none",
                      }}
                    >
                      {data.STTOGF}
                    </TableCell>
                    <TableCell
                      style={{
                        borderBottom: "none",
                        fontWeight: "bold",
                        color: "rgb(0 166 160)",
                        fontSize: "20px",
                      }}
                    >
                      {data.TTTOGF}
                    </TableCell>
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteGet;
