import { apiGetChainNamespace, ChainsMap } from "caip-api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SolanaChainData } from "../chains/solana";
import { TernoaChainData } from "../chains/ternoa";

import { ChainNamespaces, getAllChainNamespaces } from "../helpers";

/**
 * Types
 */
interface IContext {
  chainData: ChainNamespaces;
}

/**
 * Context
 */
export const ChainDataContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export function ChainDataContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [chainData, setChainData] = useState<ChainNamespaces>({});

  const loadChainData = async () => {
    const namespaces = getAllChainNamespaces();
    console.log("ALL NAMESPACES", namespaces);
    const chainData: ChainNamespaces = {};
    await Promise.all(
      namespaces.map(async (namespace) => {
        console.log("NAMESPACE", namespace);
        let chains: ChainsMap | undefined;
        try {
          if (namespace === "solana") {
            chains = SolanaChainData;
          } else if (namespace === "ternoa") {
            chains = TernoaChainData;
          } else {
            chains = await apiGetChainNamespace(namespace);
          }
          console.log("CHAINS!", chains);
        } catch (e) {
          console.log("error", e);
          // ignore error
        }
        if (typeof chains !== "undefined") {
          chainData[namespace] = chains;
        }
      })
    );

    setChainData(chainData);
  };

  useEffect(() => {
    loadChainData();
  }, []);

  return (
    <ChainDataContext.Provider
      value={{
        chainData,
      }}
    >
      {children}
    </ChainDataContext.Provider>
  );
}

export function useChainData() {
  const context = useContext(ChainDataContext);
  if (context === undefined) {
    throw new Error(
      "useChainData must be used within a ChainDataContextProvider"
    );
  }
  return context;
}
