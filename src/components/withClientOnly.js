"use client";
import { useEffect, useState } from "react";

const withClientOnly = (WrappedComponent, LoadingComponent = null) => {
  return function ClientOnlyComponent(props) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return LoadingComponent ? <LoadingComponent /> : <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withClientOnly;
