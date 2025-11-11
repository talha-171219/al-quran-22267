import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hajj = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/hajj/guide');
  }, [navigate]);

  return null;
};

export default Hajj;
