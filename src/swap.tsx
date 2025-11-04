import { SupportedAssets } from "@gardenfi/orderbook";
import { useGarden } from "@gardenfi/react-hooks";
import BigNumber from "bignumber.js";
import { useState } from "react";

export const Swap = () => {
  const [quote, setQuote] = useState<{
    strategyId: string; // A unique identifier for each solver's quote
    quoteAmount: string;
  }>();

  const { swapAndInitiate, getQuote } = useGarden();

  // Define the assets involved in the swap
  const inputAsset = SupportedAssets.testnet.arbitrum_sepolia_WBTC;
  const outputAsset = SupportedAssets.testnet.bitcoin_testnet_BTC;

  // Amount to be swapped, converted to the smallest unit of the input asset
  const amount = new BigNumber(0.01).multipliedBy(10 ** inputAsset.decimals);

  // User's Bitcoin address to receive funds
  const btcAddress = "tb1q25q3632323232323232323232323232323232";

  const handleGetQuote = async () => {
    if (!getQuote) return;

    // Fetch a quote for the swap
    const quoteRes = await getQuote({
      fromAsset: inputAsset,
      toAsset: outputAsset,
      amount: amount.toNumber(),
      isExactOut: false, // Set to `true` if you wish to specify the output (receive) amount
    });
    if (!quoteRes || !quoteRes.ok) {
      return alert(quoteRes?.error ?? "Failed to get quote");
    }

    // Select a quote and save it (the user will confirm this quote before the swap is executed)
    const [_strategyId, quoteAmount] = Object.entries(quoteRes.val.quotes)[0];
    setQuote({
      strategyId: _strategyId,
      quoteAmount: quoteAmount,
    });
  };

  const handleSwap = async () => {
    if (!swapAndInitiate || !quote) return;

    // Initiate the swap with the selected quote and user's details
    const order = await swapAndInitiate({
      fromAsset: inputAsset,
      toAsset: outputAsset,
      sendAmount: amount.toString(),
      receiveAmount: quote.quoteAmount,
      additionalData: {
        btcAddress,
        strategyId: quote.strategyId,
      },
    });
    if (!order.ok) {
      return alert(order.error);
    }

    console.log("✅ Order created:", order.val);
  };

  return (
    <div>
      {/* Fetch swap quote */}
      <button onClick={handleGetQuote}>Get Quote</button>

      {/* Initiate the swap */}
      <button onClick={handleSwap}>Swap</button>
    </div>
  );
};
