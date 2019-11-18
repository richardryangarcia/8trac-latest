import React, { useState } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { ipfs } from "../configs/ipfs";
import { Container, Card, Button } from "react-bootstrap";

export const AddMerchForm = props => {
  const { account } = props;
  const { id } = props.match.params;
  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageBuffer, setImageBuffer] = useState([]);
  const [imageHash, setImageHash] = useState("");
  const { send } = useCacheSend(
    id,
    "addMerch",
    name,
    description,
    quantity,
    price,
    imageHash
  );

  const create = ev => {
    ev.preventDefault();
    send(name, description, quantity, price, imageHash, {
      gas: 3000000000000
    });
    setName("");
    setDescription("");
    setQuantity("");
    setPrice("");
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
            <h1>Add Merch</h1>
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
                <label className="">Quantity</label>
                <input
                  className="form-control"
                  value={quantity}
                  onChange={ev => setQuantity(parseInt(ev.target.value))}
                  placeholder="quantity"
                />
              </div>

              <div className="form-group">
                <label className="">Price</label>
                <input
                  className="form-control"
                  value={price}
                  onChange={ev => setPrice(parseInt(ev.target.value))}
                  placeholder="price"
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
