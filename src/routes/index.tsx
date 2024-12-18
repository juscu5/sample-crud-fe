import React, { lazy, Suspense } from "react";
import RootLayout from './RootLayout';
import { Routes, Route } from "react-router-dom";

const Main = lazy(() => import("../pages/Main"));

const AppRoutes: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/crud" element={<RootLayout/>}>
            <Route path="user" element={<Main/>}/>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
