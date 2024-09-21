import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Head from 'next/head';
import { Provider } from 'react-redux';  // Import the Redux Provider
import store from "../redux/store"

// Define the gtag function type
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: { [key: string]: unknown }) => void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag('config', 'G-366GM77WMG', {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Sober Tracker</title>
        {/* Google Site Verification Meta Tag */}
        <meta name="google-site-verification" content="LWkdPNhlJ4-3ynXtY-qDbkvX1CMYl98-YFcLRipwTs8" />
      </Head>

      {/* Google Analytics Script */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-366GM77WMG`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-366GM77WMG', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Wrap the app in Redux Provider */}
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
