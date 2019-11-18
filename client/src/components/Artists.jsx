import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import { ArtistLink } from "./ArtistLink";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import { groupBy } from "../utils/grid";
const LATEST_ARTISTS_COUNT = 40;

export const Artists = () => {
  const { useCacheCall } = drizzleReactHooks.useDrizzle();
  const artistCount = useCacheCall("ArtistFactory", "artistCount");
  const artistLinks = [];
  let groupedLinks;

  if (artistCount && artistCount > 0) {
    let endOn =
      artistCount <= LATEST_ARTISTS_COUNT
        ? 0
        : artistCount - LATEST_ARTISTS_COUNT;

    for (let i = artistCount - 1; i >= endOn; i--) {
      artistLinks.push(<ArtistLink key={i} artistId={i} />);
    }

    groupedLinks = groupBy(4, artistLinks);
  }

  return (
    <div className="">
      <Jumbotron style={{ backgroundColor: "white" }}>
        <h1>8trac Artists</h1>
        <p>
          Browse the latest artists to join the platform and start supporting
        </p>
      </Jumbotron>
      <div>
        <Container>
          {groupedLinks &&
            groupedLinks.map(artistRow => {
              return (
                <div>
                  <Row>
                    <Col xs={6} md={3}>
                      {artistRow[0]}
                    </Col>
                    <Col xs={6} md={3}>
                      {artistRow[1]}
                    </Col>
                    <Col xs={6} md={3}>
                      {artistRow[2]}
                    </Col>
                    <Col xs={6} md={3}>
                      {artistRow[3]}
                    </Col>
                  </Row>
                </div>
              );
            })}
        </Container>
      </div>
    </div>
  );
};
