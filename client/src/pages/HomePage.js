import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";

function HomePage() {
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return <>{loading ? <Spinner /> : <div>Home Page</div>}</>;
}

export default HomePage;
