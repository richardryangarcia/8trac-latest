const ArtistFactory = artifacts.require("ArtistFactory");

module.exports = function(deployer) {
  deployer.deploy(ArtistFactory);
};
