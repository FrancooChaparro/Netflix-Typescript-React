import { useEffect, useState, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import styles from "../stylesheets/Footer.module.css"

interface Props {
    children?: ReactNode;
  }

export const ProtectedRoute = ({ children }: Props ) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <div className={styles.spinner} /> : (
    <>{children ? children : <Outlet />}</>
  );
};
