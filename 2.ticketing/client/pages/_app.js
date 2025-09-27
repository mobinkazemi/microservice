import "bootstrap/dist/css/bootstrap.css";

import buildClient from "../api/buildClient";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      {<Header currentUser={currentUser}></Header>}

      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

  let response = { data: { currentUser: null } };
  try {
    response = await client.get("/api/users/current-user");
  } catch (err) {}

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    currentUser: response.data.currentUser,
    pageProps,
  };
};

export default AppComponent;
