import { Navbar, Footer } from "../";
import NotificationBanner from "../NotificationBanner/NotificationBanner";

import { useRouter } from "next/router";
import Head from "next/head";
import { useStateContext } from "../../context/StateContext";

export default function Layout({ children }) {
  const router = useRouter();

  const { navColor } = useStateContext();

  return (
    <div className="test">
      <Head>
        <title>Jazzy Can Knot</title>
        <meta name="theme-color" content={navColor} />
      </Head>

      {router.pathname === "/" && <NotificationBanner />}

      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
