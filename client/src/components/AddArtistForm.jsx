import React, { useState } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { ipfs } from "../configs/ipfs";
import { Container, Card, Button } from "react-bootstrap";

export const AddArtistForm = () => {
  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [genre, setGenre] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [imageBuffer, setImageBuffer] = useState([]);
  const [imageHash, setImageHash] = useState("");
  const { send } = useCacheSend(
    "ArtistFactory",
    "addArtist",
    name,
    symbol,
    genre,
    bio,
    location,
    imageHash
  );

  const create = ev => {
    ev.preventDefault();
    send(name, symbol, genre, bio, location, imageHash);
    setName("");
    setSymbol("");
    setGenre("");
    setBio("");
    setLocation("");
    setImageBuffer([]);
    setImageHash("");
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
            <h1>Register as artist</h1>
            <b>Upload an image</b>
            <form onSubmit={onImageSubmit}>
              <input id="imageInput" type="file" onChange={captureFile} />
              <Button variant="success" type="submit">
                Save
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
                <label className="">Symbol</label>
                <input
                  className="form-control"
                  value={symbol}
                  onChange={ev => setSymbol(ev.target.value)}
                  placeholder="symbol"
                />
              </div>

              <div className="form-group">
                <label className="">Genre</label>
                <input
                  className="form-control"
                  value={genre}
                  onChange={ev => setGenre(ev.target.value)}
                  placeholder="symbol"
                />
              </div>

              <div className="form-group">
                <label className="">Bio</label>
                <input
                  className="form-control"
                  value={bio}
                  onChange={ev => setBio(ev.target.value)}
                  placeholder="symbol"
                />
              </div>

              <div className="form-group">
                <label className="">Location</label>
                <input
                  className="form-control"
                  value={location}
                  onChange={ev => setLocation(ev.target.value)}
                  placeholder="symbol"
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
