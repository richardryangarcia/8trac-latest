import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Artists } from "./components/Artists";
import { Artist } from "./components/Artist";
import { LoadArtist } from "./components/LoadArtist";
import { AddArtistForm } from "./components/AddArtistForm";
import { AddMerchForm } from "./components/AddMerchForm";
import { AddProjectForm } from "./components/AddProjectForm";
import { drizzleReactHooks } from "drizzle-react";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const {
    account,
    drizzle,
    web3,
    contracts
  } = drizzleReactHooks.useDrizzleState(drizzleState => {
    return {
      account: drizzleState.accounts[0],
      contracts: drizzleState.contracts,
      drizzle: drizzleState.drizzleStatus.initialized,
      web3: drizzleState.web3.status
    };
  });

  useEffect(() => {
    if (web3 === "initialized" && drizzle && account) {
      setLoading(false);
    }
  }, [web3, drizzle, account]);

  return (
    <div>
      {loading ? (
        <div>
          <Home />
        </div>
      ) : (
        <>
          <Header account={account} />
          <div className="app" style={{ marginTop: "56px" }}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/artists" />} />
              {/* <Route
                exact
                path="/home"
                render={props => <Home account={account} />}
              /> */}
              <Route
                exact
                path="/register"
                render={props => <AddArtistForm account={account} />}
              />
              <Route
                exact
                path="/add-project/:id"
                render={props => (
                  <AddProjectForm {...props} account={account} />
                )}
              />
              <Route
                exact
                path="/add-merch/:id"
                render={props => <AddMerchForm {...props} account={account} />}
              />
              <Route
                exact
                path="/artists"
                render={props => <Artists account={account} />}
              />
              <Route
                exact
                path="/artist/:id"
                render={props =>
                  contracts && contracts[props.match.params.id] ? (
                    <Artist {...props} account={account} />
                  ) : (
                    <LoadArtist {...props} account={account} />
                  )
                }
              />
            </Switch>
          </div>
        </>
      )}
    </div>
  );
};
