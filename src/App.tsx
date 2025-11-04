import { GardenProvider } from "@gardenfi/react-hooks";
import { Environment } from "@gardenfi/utils";
import { useWalletClient } from "wagmi";

function App() {
  // EVM
  const { data: walletClient } = useWalletClient();
  // Solana

  return (
    <GardenProvider
      children={<>Hello Garden</>}
      config={{
        environment: Environment.TESTNET,
        wallets: {
          evm: walletClient,
        },
      }}
    ></GardenProvider>
  );
}

export default App;
