import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
  console.log({ currentUser });
  return <h1>landing page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  try {
    const { data } = await buildClient(context).get("/api/users/current-user");

    return { currentUser: data.currentUser };
  } catch (error) {
    console.error(error.message);

    return { currentUser: null };
  }
};

export default LandingPage;
