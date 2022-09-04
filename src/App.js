import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";

import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  // as the app is the first component that is mounted, we moved the 
  // method that subscribe to firestore auth state
  // I understand it, but seems a bit messy. lets try to have only
  // a function call if possible; 
  const dispatch = useDispatch();
  useEffect(() => {
    async function runSubscribe() {
      const subscribe = onAuthStateChangedListener(async (user) => {
        if (user) {
          await createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
      });
      return subscribe;
    }
    // TODO: should return unsubscribed (when completed), but returning an error
    runSubscribe();
  });

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
