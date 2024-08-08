import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [user, navigate, isAuthenticated, isLoading]);

  if (isLoading || !isAuthenticated)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
