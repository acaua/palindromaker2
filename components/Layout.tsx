import Head from "next/head";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Palindromaker</title>
        <meta name="description" content="Palindromaker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
