import type { AppProps, AppType } from "next/app";
import Layout from "@/components/layout";
import { trpc } from "../utils/trpc";
import "@/styles/globals.css";

const App: AppType<AppProps> = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default trpc.withTRPC(App);
