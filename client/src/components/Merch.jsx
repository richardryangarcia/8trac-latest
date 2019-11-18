import React, { useState } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Card, Button } from "react-bootstrap";

export const Merch = props => {
  const { id, merchId, account } = props;
  const { useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
  const merchInfo = useCacheCall(id, "getMerch", merchId);
  const [purchaseQuantity, setPurchaseQuantity] = useState("");
  let { send } = useCacheSend(id, "buyMerch");

  const buyMerch = ev => {
    ev.preventDefault();
    const tot = purchaseQuantity * merchInfo.price;
    console.log("buy merch", purchaseQuantity);
    send(merchId, purchaseQuantity, tot);
    setPurchaseQuantity("");
  };
  return (
    <Card>
      {merchInfo && (
        <div>
          <Card.Img
            className="project-img"
            variant="top"
            src={`https://ipfs.io/ipfs/${merchInfo.imageUrl}`}
          />
          <Card.Body>
            <Card.Title>{merchInfo.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {merchInfo.description}
            </Card.Subtitle>
            <Card.Text>
              QTY: {merchInfo.quantity}
              <br />
              Price: {merchInfo.price}
              <br />
              <div
                className={`${
                  merchInfo.isAvailable ? "available" : "unavailable"
                }`}
              >
                {merchInfo.isAvailable ? "Available" : "Unavailable"}
              </div>
            </Card.Text>
            <form className="contribute-form" onSubmit={buyMerch}>
              <div className="form-group">
                <label className="">Quantity</label>
                <input
                  className="form-control"
                  value={purchaseQuantity}
                  onChange={ev => setPurchaseQuantity(ev.target.value)}
                  placeholder=""
                />
                <Button type="submit" variant="success" size="sm">
                  Buy
                </Button>
              </div>
            </form>
          </Card.Body>
        </div>
      )}
    </Card>
  );
};
