import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Link } from "react-router-dom";

export const ArtistLink = props => {
  const { artistId } = props;
  const { useCacheCall } = drizzleReactHooks.useDrizzle();
  const artistName = useCacheCall("ArtistFactory", "getArtistName", artistId);
  const artistImage = useCacheCall("ArtistFactory", "getArtistImage", artistId);
  return (
    <div className="artist-link">
      <Link to={`/artist/${artistId}`}>
        <img
          style={{ height: "200px", width: "200px" }}
          src={`https://ipfs.io/ipfs/${artistImage}`}
        ></img>
        <p>{artistName}</p>
      </Link>
    </div>
  );
};
