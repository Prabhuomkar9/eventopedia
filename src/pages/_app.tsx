import type { AppProps, AppType } from "next/app";
import Layout from "@/components/layout";
import "@/styles/globals.css";

const App: AppType<
  AppProps & {
    session: Session;
  }
> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
