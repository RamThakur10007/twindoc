import React, { useEffect, useState } from "react";
import  axios  from "axios";
import { useParams } from "react-router-dom";

function VerifyUser() {
  const { id, token } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const response = await axios.get(
        `https://twinsdocbackend.onrender.com/user/${id}/verify/${token}`,
        {
          headers: {
            isvalidrequest: "twinsistech",
          },
        }
      );
      console.log(response)
      if (response.status == 200) {
        setMessage("User verified successfully");
      }
      setLoading(false);
    };
    verify();
  }, []);

  return (
    <div className="main-wrapper">
      <div className="content top-space">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="account-content">
                   {loading ? "Loading" :  <>
                    Hello Bro...  
                    {message}
                    </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyUser;
