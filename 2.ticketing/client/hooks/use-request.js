import axios from "axios";
import { useState } from "react";

const UseRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const res = await axios({
        url: url,
        method: method,
        data: body,
      });

      if (onSuccess) {
        onSuccess(res.data);
      }

      return res.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {err.response.data.errors.map((e) => (
              <li key={e.message}>{e.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default UseRequest;
