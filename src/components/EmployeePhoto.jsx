import { useState } from "react";

function EmployeePhoto({ src, alt }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <p role="status">Photo couldn't be loaded.</p>;
  }

  return (
    <img
      className="employee-photo"
      src={src}
      alt={alt}
      width="80"
      onError={() => setHasError(true)}
    />
  );
}

export default EmployeePhoto;
