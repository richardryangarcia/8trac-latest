import React, { useState } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Card, Button } from "react-bootstrap";

export const Project = props => {
  const { account, id, projectAddress } = props;
  const { useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
  const projectInfo = useCacheCall(projectAddress, "fetchProject");
  const [contributeAmount, setContributeAmount] = useState("");
  const isMinter = useCacheCall(id, "isMinter", account);
  // const balance = useCacheCall(id, "balanceOf", account);
  // console.log(balance);
  const addMint = useCacheSend(id, "addMinter");
  let { send } = useCacheSend(projectAddress, "buyTokens");

  const contribute = ev => {
    ev.preventDefault();
    console.log(isMinter);
    if (!isMinter) {
      // addMint.send(projectAddress, { gas: 3000000000000 });
      addMint.send(account, { gas: 3000000000000 });
      console.log("finished");
    }
    send(account, { value: contributeAmount, gas: 3000000000000 });
    setContributeAmount("");
  };

  return (
    <Card>
      {projectInfo && (
        <div>
          <Card.Img
            className="project-img"
            variant="top"
            src={`https://ipfs.io/ipfs/${projectInfo.imageHash}`}
          />
          <Card.Body>
            <Card.Title>{projectInfo.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {projectInfo.description}
            </Card.Subtitle>
            <Card.Text>
              Goal: {projectInfo.cap}
              <br />
              Raised: {projectInfo.weiRaised}
            </Card.Text>
            <form className="contribute-form" onSubmit={contribute}>
              <div className="form-group">
                <label className="">Amount</label>
                <input
                  className="form-control"
                  value={contributeAmount}
                  onChange={ev => setContributeAmount(ev.target.value)}
                  placeholder="wei"
                />
                <Button type="submit" variant="success" size="sm">
                  Contribute
                </Button>
              </div>
            </form>
          </Card.Body>
        </div>
      )}
    </Card>
  );
};
