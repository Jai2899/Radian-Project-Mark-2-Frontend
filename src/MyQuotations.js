// import React, {component} from 'react';
//
// const requestBody = {
//     query: `
//         query {
//           events {
//             address
//           }
//         }
//     `,
// };
// const getStaticProps = async () => {
//     try {
//         console.log("1");
//         const result = await fetch('/graphql', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(requestBody),
//         });
//         console.log(result);
//         const data = await result.json();
//
//         return {
//             props: { myQuotations: data}
//         }
//     } catch (err) {
//         console.log("2");
//         console.log(err);
//     }
// }
//
// const MyQuotations = async ({myQuotations}) => {
//     await getStaticProps();
//     console.log("hi quotations")
//     console.log(myQuotations);
//     return (
//         <div>
//             <h1>This is my quotations page</h1>,
//             {/*{myQuotations.map(myQuotation => {console.log(myQuotation)})}*/}
//             {/*    // <div key={myQuotation.address}>*/}
//             {/*    //     <a>*/}
//             {/*    //         <h3>{myQuotation.address}</h3>*/}
//             {/*    //     </a>*/}
//             {/*    //*/}
//             {/*    //     /!*<button>See the details</button>*!/*/}
//             {/*    // </div>*/}
//                 {/*console.log(myQuotation)*/}
//             {/*))}*/}
//         </div>
//     );
// }
//
// export default MyQuotations;

import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import QuoteDisplay from "./QuoteDisplay";

const MyQuotations = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [isFetched, setIsFetched] = useState(false);

    const requestBody = {
        query: `
                query {
                    events {
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

    const QuotePage = ({ match }) => {
        const {
            params: {address},
        } = match;
    }
    useEffect(() => {
        fetch('/graphql/${address}', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((response) => {
                setData(response.data.events);
                console.log(data);

                setIsLoading(false);
                setIsFetched(false);

            })
            .catch((error) => console.log(error));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log("hi")

        setIsFetched(true);

    }
    let dataQuote = {};
    return (
        <div>
            {!isLoading &&
            data.map((event, id) => {
                console.log(event);
                console.log(id);
                return (
                    <div key={id}>
                        <h1> {event.address}
                            {/*<button class="showDetails"  onClick={submit}><Link to={{pathname: `/QuoteDisplay`, props: event}}>Show Details</Link></button>*/}
                            <button class="showDetails"  onClick={(e) => {e.preventDefault();
                                dataQuote = event; setIsFetched(true);}}>{isFetched? (<QuoteDisplay data={dataQuote} />) : "Show the Details"}</button>
                        </h1>
                    </div>
                );
            })}
        </div>
    );
};

export default MyQuotations;
