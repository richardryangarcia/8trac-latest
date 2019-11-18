import React from "react";
import Artist from "../contracts/Artist.json";
import { drizzleReactHooks } from "drizzle-react";
import { Redirect } from "react-router-dom";
import { createContract } from "../configs/web3";
import { addContract } from "../configs/drizzle";

export const LoadArtist = props => {
  const { account } = props;
  const { id } = props.match.params;
  const { useCacheCall } = drizzleReactHooks.useDrizzle();
  const artist = useCacheCall("ArtistFactory", "artists", id);

  if (artist) {
    if (artist === "0x0000000000000000000000000000000000000000") {
      return <Redirect to={`/home`} />;
    }

    const contract = createContract(Artist.abi, artist, account);
    addContract(id, contract, ["LogProject"]);
    return <Redirect to={`/artist/${id}`} />;
  }

  return (
    <div className="App">
      <p>Loading Artist... </p>
    </div>
  );
};
