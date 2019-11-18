import React from "react";
import { Link } from "react-router-dom";
import { drizzleReactHooks } from "drizzle-react";
import { ArtistProjects } from "./ArtistProjects";
import { ArtistMerch } from "./ArtistMerch";
import { Container } from "react-bootstrap";

export const Artist = props => {
  const { account } = props;
  const { id } = props.match.params;
  const { useCacheCall } = drizzleReactHooks.useDrizzle();
  // const balance = useCacheCall(id, "balanceOf", account);
  // console.log(balance);
  const artistInfo = useCacheCall(id, "fetchArtist");
  const { name, genre, location, projectCount, merchCount, owner } =
    artistInfo || {};
  const isOwner = owner && owner === account;

  return artistInfo ? (
    <div className="artist">
      <Container>
        <div className="profile-img-container">
          <img
            className="profile-img"
            src={`https://ipfs.io/ipfs/${artistInfo.imageHash}`}
          />

          <p>
            <b>{name}</b>
            <br />
            {genre}
            <br />
            {location}
          </p>
        </div>

        <ArtistProjects
          account={account}
          id={id}
          count={artistInfo.projectCount}
          isOwner={isOwner}
        />

        <ArtistMerch
          account={account}
          id={id}
          count={artistInfo.merchCount}
          isOwner={isOwner}
        />
      </Container>
    </div>
  ) : (
    <div className="App">Loading Artist...</div>
  );
};
