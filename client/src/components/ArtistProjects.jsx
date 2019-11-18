import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import ProjectArtifact from "../contracts/Project.json";
import { createContract } from "../configs/web3";
import { addContract } from "../configs/drizzle";
import { Project } from "./Project";
import { groupBy } from "../utils/grid";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ArtistProjects = props => {
  const { account, id, count, isOwner } = props;
  const { useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
  let projects;
  projects = useCacheCall(id, "projectAddresses");
  let groupedProjects;

  if (projects) {
    const Projects = projects.map(project => {
      const contract = createContract(ProjectArtifact.abi, project, account);
      addContract(project, contract, []);
      return <Project projectAddress={project} id={id} account={account} />;
    });

    groupedProjects = groupBy(4, Projects);
  }

  return (
    <div className="artist-projects">
      <div className="header">
        Projects ({count})
        <div className="add-btn">
          {isOwner && <Link to={`/add-project/${id}`}>Create Project</Link>}
        </div>
      </div>

      <hr />
      <Container>
        {groupedProjects &&
          groupedProjects.map(projectRow => {
            return (
              <div>
                <Row>
                  <Col xs={6} md={3}>
                    {projectRow[0]}
                  </Col>
                  <Col xs={6} md={3}>
                    {projectRow[1]}
                  </Col>
                  <Col xs={6} md={3}>
                    {projectRow[2]}
                  </Col>
                  <Col xs={6} md={3}>
                    {projectRow[3]}
                  </Col>
                </Row>
              </div>
            );
          })}
      </Container>
    </div>
  );
};
