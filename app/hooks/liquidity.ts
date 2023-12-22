import { useEffect, useMemo, useState } from "react";
import { useInput } from "./input";
import { IAddress } from "@/utils/types";
import { writeContract, prepareWriteContract, erc20ABI, waitForTransaction, readContracts, readContract } from '@wagmi/core';
import { formatUnits, parseUnits } from "viem";
import { calculateTokenB, getDecimals, getToken } from "@/utils/helpers";
import { DEFAULT_CHAIN_ID, UNI_V2_ROUTER, UNI_V2_USDC_WETH } from "@/utils/constants";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { renderToast } from "@/config/toastify";

const ROUTER_ABI = require('../abis/IUniswapV2Router02.json').abi;
const PAIR_ABI = require('../abis/IUniswapV2Pair.json').abi;

const DEADLINE = Math.floor(Date.now() / 1000) + 300; // 5 minutes from now

export const useLiquidity = ({ tokenA, tokenB }: { tokenA: IAddress; tokenB: IAddress }) => {
  const { address } = useAccount();
  const { input: inputA, setInput: setInputA, handleChange: handleChangeA, clear: clearA } = useInput();
  const { input: inputB, setInput: setInputB, handleChange: handleChangeB, clear: clearB } = useInput();
  const [decimals, setDecimals] = useState({ tokenA: 18, tokenB: 18 });
  const [approved, setApproved] = useState({ tokenA: BigInt(0), tokenB: BigInt(0) });
  const [loading, setLoading] = useState({ tokenA: false, tokenB: false, deposit: false, withdraw: false })

  // Check if approved enough token A
  const approveEnoughA = useMemo(() => {
    if(!inputA) return false;
    return approved.tokenA >= parseUnits(inputA, decimals.tokenA)
  }, [inputA, approved.tokenA, decimals.tokenA])

  // Check if approved enough token B
  const approveEnoughB = useMemo(() => {
    if(!inputB) return false;
    return approved.tokenB >= parseUnits(inputB, decimals.tokenB);
  }, [inputB, approved.tokenB, decimals.tokenB])

  /**
   * @function addLiquidity
   */
  async function addLiquidity() {
    if(!inputA || !inputB) return;
    if(!approveEnoughA) {
      renderToast('add-liq', 'error', `Not approved enough ${getToken(tokenA)?.symbol || 'token A'}`)
      toast.error('Not approved enough token A', { toastId: 'addLiquidity' });
      return;
    }
    if(!approveEnoughB) {
      renderToast('add-liq', 'error', `Not approved enough ${getToken(tokenB)?.symbol || 'token B'}`)
      return;
    }

    setLoading({ ...loading, deposit: true });
    renderToast('add-liq', 'pending', 'Adding liquidity')
    try {
      
      const bigNumberDesiredA = parseUnits(inputA, decimals.tokenA);
      const bigNumberDesiredB = parseUnits(inputB, decimals.tokenB);
      const bigNumberMinA = parseUnits((Number(inputA) * 0.95).toString(), decimals.tokenA);
      const bigNumberMinB = parseUnits((Number(inputB) * 0.95).toString(), decimals.tokenB);

      const prepAddLiqTx = await prepareWriteContract({
        address: UNI_V2_ROUTER,
        abi: ROUTER_ABI,
        functionName: 'addLiquidity',
        args: [
          tokenB,
          tokenA,
          bigNumberDesiredB,
          bigNumberDesiredA,
          bigNumberMinB,
          bigNumberMinA,
          address,
          DEADLINE
        ]
      });
      const addLiqTx = await writeContract(prepAddLiqTx.request);
      renderToast('add-liq', 'pending', 'Transaction Submitted')
      const waited = await waitForTransaction({ hash: addLiqTx.hash });
      renderToast('add-liq', 'success', 'Added liquidity', addLiqTx.hash)
      console.log("Liquidity Added:", waited);
      setLoading({ ...loading, deposit: false });
      clearA();
      clearB();
    } catch (e) {
      console.error(e);
      renderToast('add-liq', 'error', 'Error occured')
      setLoading({ ...loading, deposit: false })
    }
  }

  /**
   * @function removeLiquidity
   */
  async function removeLiquidity() {
    // TODO
  }

  /**
   * @function addLiquidity
   * @param which - whether user would like to approve token A or token B
   */
  async function approveToken(which?: 'a' | 'b') {
    if(!inputA) return;
    // Determine which token to approve
    const determineWhich = () => {
      if(which === 'a') {
        return {
        value: inputA,
        token: tokenA,
        approveStateKey: 'tokenA',
        dec: decimals.tokenA
        }
      }
      return {
        value: inputB,
        token: tokenB,
        approveStateKey: 'tokenB',
        dec: decimals.tokenB
      }
    }
    const { token, value, approveStateKey, dec } = determineWhich();
    setLoading({ ...loading, [approveStateKey]: true });

    try {
      renderToast('approve', 'pending', `Approving ${getToken(which === 'a' ? tokenA : tokenB)?.symbol}`)
      // Convert amount to big number
      const bigNumberValue = parseUnits(value, dec)

      // Approve
      const prepApproveTx = await prepareWriteContract({
        address: token,
        abi: erc20ABI,
        functionName: 'approve',
        args: [UNI_V2_ROUTER, bigNumberValue],
        chainId: DEFAULT_CHAIN_ID
      });
      const approveTx = await writeContract(prepApproveTx.request);
      renderToast('approve', 'pending', `Submitted transaction`)
      await waitForTransaction({ hash: approveTx.hash })
      renderToast('approve', 'success', `${getToken(which === 'a' ? tokenA : tokenB)?.symbol} approved`)
      setApproved({ ...approved, [approveStateKey]: bigNumberValue });
      setLoading({ ...loading, [approveStateKey]: false });
    } catch (e) {
      toast.error('Error occured', { toastId: 'approve' })
      console.error(e);
      setLoading({ ...loading, [approveStateKey]: false })
    }
  }

  // Check token allowances when address is connected
  useEffect(() => {
    (async () => {
      if(!address) return;
      const allowances = await readContracts({
        contracts: [
          {
            address: tokenA,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, UNI_V2_ROUTER],
            chainId: DEFAULT_CHAIN_ID
          },
          {
            address: tokenB,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, UNI_V2_ROUTER],
            chainId: DEFAULT_CHAIN_ID
          }
        ]
      });
      setApproved({ 
        tokenA: allowances[0]?.result ?? BigInt(0), 
        tokenB: allowances[1]?.result ?? BigInt(0) 
      });
    })().catch(e => console.error(e));
  }, [address]);

  // Get decimals
  useEffect(() => {
    (async () => {
      if(!tokenA || !tokenB) return;
      setDecimals({
        tokenA: (await getDecimals(tokenA)),
        tokenB: (await getDecimals(tokenB))
      });
    })().catch(e => console.error(e));
  }, []);

  // Calculate amount out
  useEffect(() => {
    (async () => {
      if(inputA) {
        const [ reserve0, reserve1 ] = await readContract({
          address: UNI_V2_USDC_WETH,
          abi: PAIR_ABI,
          functionName: 'getReserves',
          args: []
        });
        const amountB = calculateTokenB(parseUnits(inputA, decimals.tokenA), reserve1, reserve0);
        console.log("amount B", amountB)
        setInputB(formatUnits(amountB, decimals.tokenB))
      }
    })().catch(e => console.error(e))
  }, [inputA])

  return {
    inputA,
    inputB,
    setInputA,
    setInputB,
    handleChangeA,
    handleChangeB,
    clearA,
    clearB,
    addLiquidity,
    removeLiquidity,
    approveToken,
    approved,
    loading,
    tokenA,
    tokenB,
    decimals,
    approveEnoughA,
    approveEnoughB
  }
}