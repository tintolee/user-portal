import { useEnv } from '@src/contexts/env-context';
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  pageTitle: string;
  pageDescription?: string;
}

const Meta = ({ pageTitle, pageDescription = '' }: Props) => {
  const { IS_PROD } = useEnv();
  return (
    <Helmet>
      <html className="ss-bg-page-background" />
      <title>{pageTitle} - Sprint</title>
      <meta name="description" content={pageDescription} />

      {IS_PROD && (
        <>
          {/* <!-- Google Tag Manager --> */}
          <script>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TNJXLVF');`}
          </script>
          {/* <!-- End Google Tag Manager --> */}

          <noscript>
            {`<iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TNJXLVF"
          height="0"
          width="0"
          style="display: none; visibility: hidden"></iframe>`}
          </noscript>

          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-180567216-1"></script>
          <script>
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-180567216-1');`}
          </script>

          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10826884378"></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'AW-10826884378');`}
          </script>

          <meta name="facebook-domain-verification" content="nw4ejno7jllu3ujj51t0naxs2qgr92" />
          <script>
            {`!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '3157174554557373');
      fbq('track', 'PageView');`}
          </script>
          <noscript>
            {`<img
          alt=""
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=3157174554557373&ev=PageView&noscript=1"
        />`}
          </noscript>

          <script>
            {`!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '5386611248071915');
      fbq('track', 'PageView');`}
          </script>
          <noscript>
            {`<img
            alt=""
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=5386611248071915&ev=PageView&noscript=1"
            />`}
          </noscript>

          {/* <!-- Hotjar Tracking Code for https://sendsprint.com --> */}
          <script>
            {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2813088,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
          </script>
          {/* {HotJar()} */}

          {/* <!-- Event snippet for Website traffic conversion page -->  */}
          {/* <script>{`gtag('event', 'conversion', {'send_to': 'AW-10797843656/W5WyCPKpqo8DEMiJ6Jwo'});`}</script> */}
        </>
      )}
    </Helmet>
  );
};

export default Meta;
