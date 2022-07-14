import { JsonRpcRequest } from "@walletconnect/jsonrpc-utils";
import { ChainData, ChainsMap } from "caip-api";
import { BLOCKCHAIN_LOGO_BASE_URL } from "../constants";

import {
  NamespaceMetadata,
  ChainMetadata,
  ChainRequestRender,
} from "../helpers";

export const PolkadotMetadata: NamespaceMetadata = {
  // eslint-disable-next-line no-useless-computed-key
  ["6859c81ca95ef624c9dfe4dc6e3381c3"]: {
    logo: "https://assets.coingecko.com/coins/images/15921/large/e55393fa-7b4d-40f5-9f36-9a8a6bdcb570.png",
    rgb: "230, 1, 122",
  },
  // eslint-disable-next-line no-useless-computed-key
  ["18bcdb75a0bba577b084878db2dc2546"]: {
    logo: "https://assets.coingecko.com/coins/images/15921/large/e55393fa-7b4d-40f5-9f36-9a8a6bdcb570.png",
    rgb: "230, 1, 122",
  },
};

export const TernoaChainData: ChainsMap = {
  "18bcdb75a0bba577b084878db2dc2546": {
    name: "Ternoa alphanet",
    id: "18bcdb75a0bba577b084878db2dc2546",
    rpc: ["https://rpc.polkadot.io"],
    slip44: 354,
    testnet: true,
  },
  "6859c81ca95ef624c9dfe4dc6e3381c3": {
    name: "Ternoa mainnet",
    id: "6859c81ca95ef624c9dfe4dc6e3381c3",
    rpc: ["https://rpc.polkadot.io"],
    slip44: 354,
    testnet: true,
  },
};

export function getChainMetadata(chainId: string): ChainMetadata {
  const reference = chainId.split(":")[1];
  const metadata = PolkadotMetadata[reference];
  if (typeof metadata === "undefined") {
    throw new Error(`No chain metadata found for chainId: ${chainId}`);
  }
  return metadata;
}

export function getChainRequestRender(
  request: JsonRpcRequest
): ChainRequestRender[] {
  let params = [{ label: "Method", value: request.method }];

  switch (request.method) {
    default:
      params = [
        ...params,
        {
          label: "params",
          value: JSON.stringify(request.params, null, "\t"),
        },
      ];
      break;
  }
  return params;
}
