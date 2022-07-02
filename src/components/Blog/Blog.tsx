import GhostContentAPI, { GhostAPI } from "@tryghost/content-api";
import React, { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import Landing from "../Landing";
import SectionContainer from "../SectionContainer";
import "./blog.scss";

const GhostApiContext = React.createContext<GhostAPI | null>(null);

function Blog() {
  const params = useParams();
  const singleBlogPost = params.slug !== undefined;
  useEffect(() => {
    if (singleBlogPost) {
      document.getElementById("navbar")!.style.position = "sticky";
    }
    return () => {
      document.getElementById("navbar")!.style.position = "";
    };
  }, [params.slug]);

  const api = useMemo<GhostAPI>(
    () =>
      new GhostContentAPI({
        url: "https://vito-test.ghost.io",
        key: "267fbd81200677364417c21bb9",
        version: "v5.0",
      }),
    []
  );

  return (
    <div className="page blog">
      {!singleBlogPost && (
        <Landing>
          <h1 className="">Vito Blog</h1>
          <p>
            Here's where we'll post devlogs, ideas for new projects, and stuff
            we learn as we develop Vito.
          </p>
        </Landing>
      )}
      <SectionContainer>
        <GhostApiContext.Provider value={api}>
          <Outlet />
        </GhostApiContext.Provider>
      </SectionContainer>
    </div>
  );
}

export default Blog;
export { GhostApiContext };
