import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Fasting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/fasting/guide");
  }, [navigate]);

  return null;
};

export default Fasting;
