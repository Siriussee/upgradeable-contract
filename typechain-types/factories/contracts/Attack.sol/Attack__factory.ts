/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  Attack,
  AttackInterface,
} from "../../../contracts/Attack.sol/Attack";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "attack",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610768380380610768833981810160405281019061003291906100db565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610108565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100a88261007d565b9050919050565b6100b88161009d565b81146100c357600080fd5b50565b6000815190506100d5816100af565b92915050565b6000602082840312156100f1576100f0610078565b5b60006100ff848285016100c6565b91505092915050565b610651806101176000396000f3fe6080604052600436106100385760003560e01c80633ccfd60b1461015e5780639e5faafc14610175578063d0e30db01461018c57610039565b5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ea46193e6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156100a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100cb9190610473565b9050662386f26fc10000811061015c5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633ccfd60b6040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561014357600080fd5b505af1158015610157573d6000803e3d6000fd5b505050505b005b34801561016a57600080fd5b50610173610196565b005b34801561018157600080fd5b5061018a610245565b005b61019461036b565b005b60003373ffffffffffffffffffffffffffffffffffffffff16476040516101bc906104d1565b60006040518083038185875af1925050503d80600081146101f9576040519150601f19603f3d011682016040523d82523d6000602084013e6101fe565b606091505b5050905080610242576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023990610569565b60405180910390fd5b50565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ea46193e6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d79190610473565b9050662386f26fc1000081106103685760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633ccfd60b6040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561034f57600080fd5b505af1158015610363573d6000803e3d6000fd5b505050505b50565b662386f26fc100003410156103b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ac906105fb565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b15801561041d57600080fd5b505af1158015610431573d6000803e3d6000fd5b5050505050565b600080fd5b6000819050919050565b6104508161043d565b811461045b57600080fd5b50565b60008151905061046d81610447565b92915050565b60006020828403121561048957610488610438565b5b60006104978482850161045e565b91505092915050565b600081905092915050565b50565b60006104bb6000836104a0565b91506104c6826104ab565b600082019050919050565b60006104dc826104ae565b9150819050919050565b600082825260208201905092915050565b7f4661696c656420746f2077697468647261772073656e64657227732062616c6160008201527f6e63650000000000000000000000000000000000000000000000000000000000602082015250565b60006105536023836104e6565b915061055e826104f7565b604082019050919050565b6000602082019050818103600083015261058281610546565b9050919050565b7f4e656564206174206c6561737420302e303120657468657220746f20636f6d6d60008201527f656e63652061747461636b2e0000000000000000000000000000000000000000602082015250565b60006105e5602c836104e6565b91506105f082610589565b604082019050919050565b60006020820190508181036000830152610614816105d8565b905091905056fea264697066735822122092be0b714571d0f502008cd351e2fb0fef9c12f74b021a69ecd43b74f41c1ac064736f6c63430008140033";

type AttackConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AttackConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Attack__factory extends ContractFactory {
  constructor(...args: AttackConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _address: AddressLike,
    overrides?: NonPayableOverrides & { from?: string },
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_address, overrides || {});
  }
  override deploy(
    _address: AddressLike,
    overrides?: NonPayableOverrides & { from?: string },
  ) {
    return super.deploy(_address, overrides || {}) as Promise<
      Attack & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Attack__factory {
    return super.connect(runner) as Attack__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AttackInterface {
    return new Interface(_abi) as AttackInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Attack {
    return new Contract(address, _abi, runner) as unknown as Attack;
  }
}