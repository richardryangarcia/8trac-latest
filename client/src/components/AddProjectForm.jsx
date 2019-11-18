import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { ipfs } from "../configs/ipfs";
import { Container, Card, Button } from "react-bootstrap";

export const AddProjectForm = props => {
  const { account } = props;
  const { id } = props.match.params;
  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cap, setCap] = useState(0);
  const [rate, setRate] = useState(0);
  const [imageBuffer, setImageBuffer] = useState([]);
  const [imageHash, setImageHash] = useState("");
  const { send } = useCacheSend(
    id,
    "createProject",
    rate,
    cap,
    name,
    description,
    imageHash
  );

  const create = ev => {
    ev.preventDefault();
    send(rate, cap, name, description, imageHash, {
      gas: 3000000000000
    });
    setName("");
    setDescription("");
    setCap("");
    setRate("");
  };

  const onImageSubmit = async event => {
    event.preventDefault();

    const result = await ipfs.add(imageBuffer);
    setImageHash(result[0].hash);
  };

  const captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      let bufferResult = Buffer(reader.result);
      setImageBuffer(bufferResult);
    };
  };

  return (
    <div className="form">
      <Container>
        <Card>
          <Card.Body>
            <h1>Add Project</h1>
            <b>Upload an image</b>
            <form onSubmit={onImageSubmit}>
              <input id="imageInput" type="file" onChange={captureFile} />
              <Button variant="success" type="submit">
                Submit
              </Button>
            </form>

            <form onSubmit={create}>
              <div className="form-group">
                <label className="">Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={ev => setName(ev.target.value)}
                  placeholder="name"
                />
              </div>

              <div className="form-group">
                <label className="">Description</label>
                <input
                  className="form-control"
                  value={description}
                  onChange={ev => setDescription(ev.target.value)}
                  placeholder="description"
                />
              </div>

              <div className="form-group">
                <label className="">Cap</label>
                <input
                  className="form-control"
                  value={cap}
                  onChange={ev => setCap(parseInt(ev.target.value))}
                  placeholder="cap"
                />
              </div>

              <div className="form-group">
                <label className="">Rate</label>
                <input
                  className="form-control"
                  value={rate}
                  onChange={ev => setRate(parseInt(ev.target.value))}
                  placeholder="rate"
                />
              </div>
              <Button className="submit-btn" type="submit">
                Submit
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
