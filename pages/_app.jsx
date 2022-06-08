import "../sass/globals.scss";

import { StateContext } from "../context/StateContext";
import { Layout } from "../components";

import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
