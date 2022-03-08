import { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import { Main } from "../templates/Main";
import { Meta } from "../layout/Meta";
import "../styles/main.css";
import { VercelBanner } from "../components/VercelBanner";

// Allow the object default bc that's built in to Next.js
// eslint-disable-next-line @typescript-eslint/ban-types
type ExtendedAppProps<P = {}> = AppProps & {
  Component: NextComponentType<NextPageContext, any, P> & {
    title: string;
    description: string;
  };
};

const MyApp = ({ Component, pageProps }: ExtendedAppProps) => (
  <Main
    meta={<Meta title={Component.title} description={Component.description} />}
  >
    <Component {...pageProps} />
    <VercelBanner />
  </Main>
);

export default MyApp;
