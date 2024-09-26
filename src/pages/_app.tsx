import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Head from 'next/head';
import { Provider } from 'react-redux';  // Import the Redux Provider
import store from "../redux/store";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../firebase'; // Import Firebase

import Banner from '../components/Banner'; // Import the Banner component

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // Track user state

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Update user state
    });

    // Cleanup Firebase auth listener on component unmount
    return () => unsubscribe();
  }, []);

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
        
        {/* Show Banner only when the user is NOT logged in */}
        {!user && <Banner />}
      </Provider>
    </>
  );
}

export default MyApp;
