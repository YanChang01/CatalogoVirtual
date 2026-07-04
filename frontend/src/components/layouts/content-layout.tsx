import React from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";

type ContentLayoutProps = {
  children: React.ReactNode;
};

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
