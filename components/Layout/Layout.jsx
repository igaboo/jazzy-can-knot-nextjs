import { Navbar, Footer } from "../";
import NotificationBanner from "../NotificationBanner/NotificationBanner";

import { useRouter } from "next/router";
import Head from "next/head";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="test">
      <Head>
        <title>Jazzy Can Knot</title>
      </Head>

      {router.pathname === "/" && <NotificationBanner />}

      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
