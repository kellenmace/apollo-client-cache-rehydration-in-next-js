import { ReactNode } from "react";

import Nav from "./Nav";

interface Props {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main style={{ maxWidth: "800px", margin: "4rem auto" }}>
        {children}
      </main>
      <footer style={{ border: "2px solid #eee", marginTop: "8rem", padding: "2rem" }}>
        Apollo Cache Rehydration Demo
      </footer>
    </>
  );
}
