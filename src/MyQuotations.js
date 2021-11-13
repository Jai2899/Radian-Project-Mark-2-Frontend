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

const requestBody = {
    query: `
        query {
          events {
            _id
            address
          }
        }
    `,
};

// const PersonPage = () => {
//
//
//
//     const [isLoading, setIsLoading] = useState(true);
//     const [data, setData] = useState();
//
//     useEffect(() => {
//         fetch(`/graphql`, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(requestBody),
//         })
//             .then((res) => res.json())
//             .then((response) => {
//                 setData(response);
//                 setIsLoading(false);
//                 console.log(`https://swapi.dev/api/people/${personId}`)
//             })
//             .catch((error) => console.log(error));
//     }, [personId]);
//
//     return (
//         <>
//             {!isLoading && (
//                 <>
//                     <h1>address: {data.address}</h1>
//                     <Link to="/">Back to homepage</Link>
//                 </>
//             )}
//         </>
//     );
// };

const MyQuotations = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        fetch('/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((response) => {
                setData(response.data.events);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const submit = (data) => {
        return data;
    }

    return (
        <div>
            {!isLoading &&
            data.map((event, id) => {
                return (
                    <h1 key={id}> {event.address}&nbsp;&nbsp;&nbsp;
                        <button class="showDetails"  onClick={submit}><Link to={{pathname: `/QuoteDisplay`, props: event}}>Show Details</Link></button>
                    </h1>
                );
            })}
        </div>
    );
};

export default MyQuotations;
