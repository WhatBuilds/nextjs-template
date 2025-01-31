export default function SEO({ props }) {
    return (
        <head>
            <title>{props.title ? props.title : ""}</title>
            <meta name="description" content={props.description ? props.description : ""} />
            <meta name="keywords" content={props.keywords ? props.keywords : ""} />
            <meta rel="canonical" href={props.url ? props.url : ""} />
            <meta name="robots" content="max-image-preview:large" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content="LoginRadius" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={props.title ? props.title : ""} />
            <meta property="og:description" content={props.description ? props.description : ""} />
            <meta property="og:url" content={props.url ? props.url : ""} />
            <meta property="og:image" content={props.image ? props.image : ""} />
            <meta property="og:image:secure_url" content={props.image ? props.image : ""} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={props.title ? props.title : ""} />
            <meta name="twitter:description" content={props.description ? props.description : ""} />
            <meta name="twitter:image" content={props.image ? props.image : ""} />
            <meta name="google" content="nositelinkssearchbox" />
            <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon.png" />
            <meta name="google-site-verification" content="82mOyFwGR6V0DWaRSa66G72AjG_zHxL_Ie_APsk7oGw" />
        </head>
    );
}
