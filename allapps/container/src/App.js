import React from "react";
import Routers from "./utils/Routers";
import Layout from "./utils/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./utils/Redux/actions/getUserAction";
import axios from "axios";
import { UIProvider } from "./context/ui/index";

const App = () => {
    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.GlazierToken);
    const user = useSelector((state) => state.dummy);

    // fetching data to check wether it is an admin
    React.useEffect(() => {
        if (userToken) {
            const response = axios.get(
                `http://localhost:8000/user/${userToken._id}`,
                {
                    headers: { authorization: `Bearer ${userToken.token}` },
                }
            );
            response.then((data) => {
                data.data.token = userToken?.token;
                const { tokens, ...rest } = data?.data;
                dispatch(getUser(rest));
            });
        }
    }, [user]);

    return (
        <>
            <UIProvider>
                <Layout>
                    <Routers />
                </Layout>
            </UIProvider>
        </>
    );
};

export default React.memo(App);

// import React from "react";
// import Routers from "./utils/Routers";
// import Layout from "./utils/Layout";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "./utils/Redux/actions/getUserAction";
// import axios from "axios";

// const App = () => {
//     const dispatch = useDispatch();
//     const userToken = useSelector((state) => state.GlazierToken);

//     // fetching data to check wether it is an admin
//     React.useEffect(() => {
//         if (userToken?.isAdmin?.toString().length === 0) {
//             const response = axios.get(
//                 `http://localhost:8000/user/${userToken._id}`,
//                 {
//                     headers: { authorization: `Bearer ${userToken.token}` },
//                 }
//             );
//             response.then((data) => {
//                 data.data.token = userToken?.token;
//                 const { tokens, ...rest } = data?.data;
//                 dispatch(getUser(rest));
//             });
//         }
//     });

//     return (
//         <>
//             <Layout>
//                 <Routers />
//             </Layout>
//         </>
//     );
// };

// export default React.memo(App);
