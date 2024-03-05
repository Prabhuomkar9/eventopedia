import React from "react";
import Head from "next/head";
import { siteMetadata } from "~/constants";
import { useRouter } from "next/router";

const CustomHead = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const meta = {
    title:
      (pathname === "/"
        ? ""
        : pathname.charAt(1).toUpperCase() +
          pathname.split("/")[1]?.slice(1) +
          " | ") + siteMetadata.title,
    description: siteMetadata.description,
    type: "Website",
    canonicalUrl: siteMetadata.siteUrl + pathname,
    author: siteMetadata.author,
    siteUrl: siteMetadata.siteUrl,
    address: siteMetadata.address,
  };

  return (
    <Head>
      {/* TODO: revision needed */}
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <link href="/favicons/favicon.ico" rel="shortcut icon" />
      <link
        href="/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/favicons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000"></meta>
      <meta
        name="msapplication-square150x150logo"
        content="/favicons/mstile-150x150.png"
      />
      <link rel="canonical" href={meta.canonicalUrl} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta
        property="og:image"
        content={`${siteMetadata.siteUrl}/opengraph.png`}
      />
    </Head>
  );
};

export default CustomHead;
