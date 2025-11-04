import { createConfig, http } from "wagmi";
import { arbitrum, arbitrumSepolia, mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, safe } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrum, sepolia, arbitrumSepolia], // All EVM chains you choose to support
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
