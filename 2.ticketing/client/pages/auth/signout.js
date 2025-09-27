import { useEffect } from "react";
import UseRequest from "../../hooks/use-request";
import Router from "next/router";

const SignOutPage = () => {
  const { doRequest } = UseRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);
};

export default SignOutPage;
