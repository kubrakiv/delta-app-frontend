import MainPageHeaderComponent from "./MainPageHeaderComponent";
import GoalsComponent from "./GoalsComponent";
import AboutComponent from "./AboutComponent";
import ServicesComponent from "./ServicesComponent";
import ClientsComponent from "./ClientsComponent";
import GalleryComponent from "./GalleryComponent";
import MainComponent from "./MainComponent";
import ContactsComponent from "./ContactsComponent";
import FooterComponent from "./FooterComponent";

import "./style.scss";

const MainPageComponent = () => {
  return (
    <>
      <div className="main-page">
        <MainPageHeaderComponent />
        <main>
          <MainComponent />
          <AboutComponent />
          <ServicesComponent />
          <GoalsComponent />
          <GalleryComponent />
          <ClientsComponent />
          <ContactsComponent />
        </main>
        <FooterComponent />
      </div>
    </>
  );
};

export default MainPageComponent;
