import Image from "next/image";
import SEO from "./components/SEO";
import HeaderAndButton from "./components/sections/HeaderAndButton";

export default function Home() {

  const SEOdata = {
    title: "page title",
    description: "page description",
    image: "",
    keywords: "Security compliance",
    url: "https://www.whatbytes.com/"
  };



  // note here you can direclty write html in description see the <br> example
  const HeaderAndButtonSectionData = {
    heading: "Segment Users Your Way",
    description: "Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.<br/><br/>Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.Create user segments based on login frequency, authentication methods, or activity patterns to personalize user experiences.",
    button: {
      href: "https://www.loginradius.com/book-a-demo/",
      target: "_self",
      label: "Book Demo",
      icon: false,
    }
    }


  return (
    <>
      <SEO props={SEOdata} />
      {/* no scrollbar is a tailwind utility checkout global.css */}
      <div className="overflow-x-hidden relative no-scrollbar"> 
        <HeaderAndButton props={HeaderAndButtonSectionData}/>
      </div>
    </>
  );
}
