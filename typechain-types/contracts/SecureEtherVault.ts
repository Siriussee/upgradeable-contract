/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface SecureEtherVaultInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "deposit"
      | "getEtherBalance"
      | "getUserBalance"
      | "withdraw",
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getEtherBalance",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getUserBalance",
    values: [AddressLike],
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getEtherBalance",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserBalance",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export interface SecureEtherVault extends BaseContract {
  connect(runner?: ContractRunner | null): SecureEtherVault;
  waitForDeployment(): Promise<this>;

  interface: SecureEtherVaultInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent,
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent,
  ): Promise<this>;

  deposit: TypedContractMethod<[], [void], "payable">;

  getEtherBalance: TypedContractMethod<[], [bigint], "view">;

  getUserBalance: TypedContractMethod<[_user: AddressLike], [bigint], "view">;

  withdraw: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: "deposit",
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "getEtherBalance",
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getUserBalance",
  ): TypedContractMethod<[_user: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdraw",
  ): TypedContractMethod<[], [void], "nonpayable">;

  filters: {};
}
