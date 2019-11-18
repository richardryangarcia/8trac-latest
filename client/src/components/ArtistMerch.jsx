import React from "react";
import { Merch } from "./Merch";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { drizzleReactHooks } from "drizzle-react";
import { groupBy } from "../utils/grid";

export const ArtistMerch = props => {
  const { id, count, isOwner, account } = props;
  const { useCacheCall } = drizzleReactHooks.useDrizzle();

  const balance = useCacheCall(id, "balanceOf", account);
  console.log(balance);

  const merch = [];
  let groupedMerch;
  for (let i = 0; i < count; i++) {
    merch.push(<Merch account={account} id={id} merchId={i} />);
  }
  groupedMerch = groupBy(4, merch);

  return (
    <div className="artist-merch">
      <div className="header">
        Merch ({count})
        <div className="add-btn">
          {isOwner && <Link to={`/add-merch/${id}`}>Create Merch</Link>}
        </div>
      </div>
      <div className="balance">CUDI balance: {balance}</div>
      <hr />
      <Container>
        {groupedMerch &&
          groupedMerch.map(itemRow => {
            return (
              <Row>
                <Col xs={6} md={3}>
                  {itemRow[0]}
                </Col>
                <Col xs={6} md={3}>
                  {itemRow[1]}
                </Col>
                <Col xs={6} md={3}>
                  {itemRow[2]}
                </Col>
                <Col xs={6} md={3}>
                  {itemRow[3]}
                </Col>
              </Row>
            );
          })}
      </Container>
    </div>
  );
};
