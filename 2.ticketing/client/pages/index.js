import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log({ currentUser });
  return <h1>landing page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  try {
    let response;

    // This is how we figure out that if requester is from browser or from inside the pod (Nodejs Pod environment)
    if (typeof window === "undefined") {
      // So we are on Pod Nodejs env
      const url =
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local" +
        "/api/users/current-user";

      response = await axios.get(url, { headers: req.headers });
    } else {
      // we are on browser
      const url = "/api/users/current-user";

      response = await axios.get(url);
    }

    return { currentUser: response.data.currentUser };
  } catch (error) {
    console.log(error.message);
    return { currentUser: null };
  }
};

export default LandingPage;
