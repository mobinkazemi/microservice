import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
  if (currentUser) {
    return <h1>You are logged in as: {currentUser.email}</h1>;
  } else {
    return <h1>You are not logged in</h1>;
  }
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
