import { Drizzle, generateStore } from "drizzle";
import ArtistFactory from "../contracts/ArtistFactory.json";

export const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [ArtistFactory],
  events: {
    ArtistFactory: ["LogArtistAdded"]
  },
  polls: {
    accounts: 1500
  }
};

const drizzleStore = generateStore(drizzleOptions);
export const drizzle = new Drizzle(drizzleOptions, drizzleStore);

window.ethereum.on("accountsChanged", function(accounts) {
  window.location.reload();
});

export const addContract = (name, contract, events) => {
  drizzle.addContract(
    {
      contractName: name,
      web3Contract: contract
    },
    events
  );
};
