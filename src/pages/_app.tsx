import Layout from "@/components/layout.js";
import "@/styles/globals.css";
import type { AppProps, AppType } from "next/app";
import { trpc } from "../utils/trpc";

const App: AppType<AppProps> = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default trpc.withTRPC(App);
