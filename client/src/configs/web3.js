const Web3 = require("web3");
export const web3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8545")
);

export const createContract = (abi, address, account) => {
  return new web3.eth.Contract(abi, address, {
    from: account
  });
};
