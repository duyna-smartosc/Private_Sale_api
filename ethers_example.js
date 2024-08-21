const { ethers } = require("ethers");
const { NSB_ERC721A_ABI, Gacha_ABI } = require("./04_abi");

const network = "https://eth-sepolia.public.blastapi.io";
const contractAddress = "0x2b8d199a0c03f1848ca7643ad733798632441c32";
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_s_token_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_b_token_address",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_b_token_decimals",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_s_token_decimals",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_max_spend_per_buyer",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_token_rate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_hardcap",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_softcap",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			}
		],
		"name": "AddressEmptyCode",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AddressInsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "FailedInnerCall",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"name": "HardCapExceed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidCapValue",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidInitializationParameters",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidLimitValue",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidLiquidityValue",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "enum Error.States",
				"name": "currentState",
				"type": "uint8"
			}
		],
		"name": "InvalidState",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidTimestampValue",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "LiquificationFailed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotClaimable",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotInPurchasePeriod",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotRefundable",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PurchaseBelowMinimum",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "maxSpendPerBuyer",
				"type": "uint256"
			}
		],
		"name": "PurchaseLimitExceed",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "SafeERC20FailedOperation",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SoftCapNotReached",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Unauthorized",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "Cancel",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "contribution",
				"type": "uint256"
			}
		],
		"name": "Purchase",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "Refund",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TokenClaimed",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "cancel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "publicsale_info",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "PRESALE_OWNER",
				"type": "address"
			},
			{
				"internalType": "contract IERC20",
				"name": "S_TOKEN",
				"type": "address"
			},
			{
				"internalType": "contract IERC20",
				"name": "B_TOKEN",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "S_TOKEN_DECIMALS",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "B_TOKEN_DECIMALS",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "TOKEN_RATE",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "MAX_SPEND_PER_BUYER",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "AMOUNT",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "HARDCAP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "SOFTCAP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "START_TIME",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "END_TIME",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "DURATION",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "publicsale_status",
		"outputs": [
			{
				"internalType": "bool",
				"name": "FORCE_FAILED",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "TOTAL_BASE_COLLECTED",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "TOTAL_TOKENS_SOLD",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "TOTAL_TOKENS_WITHDRAWN",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "TOTAL_BASE_WITHDRAWN",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "NUM_BUYERS",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_base_token_amount",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "refund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "status",
		"outputs": [
			{
				"internalType": "enum Error.States",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const erc20SaleAddress = "0xff6001ac505678c971ed4b9f51715276443b0115"
const erc20BaseAddress = "0xf830bf39d3ac05d8df88a878f5a2fd0e775abc6f";
const abiERC = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ECDSAInvalidSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "length",
				"type": "uint256"
			}
		],
		"name": "ECDSAInvalidSignatureLength",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "ECDSAInvalidSignatureS",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "ERC2612ExpiredSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "signer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC2612InvalidSigner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EnforcedPause",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ExpectedPause",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "currentNonce",
				"type": "uint256"
			}
		],
		"name": "InvalidAccountNonce",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidShortString",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "StringTooLong",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "EIP712DomainChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "eip712Domain",
		"outputs": [
			{
				"internalType": "bytes1",
				"name": "fields",
				"type": "bytes1"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "version",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "verifyingContract",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "salt",
				"type": "bytes32"
			},
			{
				"internalType": "uint256[]",
				"name": "extensions",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "nonces",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "permit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


const getPublicsaleInfo = async(rpcEndPoint, contractAddress, abi, privateKey, erc20SaleAddress, abiERC, erc20BaseAddress) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcEndPoint)
    const getGasPrice = await provider.getGasPrice();
    console.log("getGasPrice", +getGasPrice);
    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = new ethers.Contract(contractAddress, abi, wallet)
    const publicsaleInfo = await contract.publicsale_info();
    console.log("=================================")
    console.log("publicsaleInfo", publicsaleInfo);
    console.log("=================================")

    console.log("=================================")
    // const contractSaleToken = new ethers.Contract(erc20SaleAddress, abiERC, wallet);
    // const approveTxEtm = await contractSaleToken.estimateGas.approve(contractAddress, "1000000000000000000000");
    // console.log("approveTxEtm", +approveTxEtm);
    // console.log("gas cost for this transaction: ", approveTxEtm * getGasPrice / 1e18);
    // const nonce = await provider.getTransactionCount(wallet.address);
    // console.log('nonce', +nonce);
    // const approveTx = await contractSaleToken.approve(contractAddress, "1000000000000000000000", {
    //   gasPrice: "10000000000",
    //   gasLimit: Number(approveTxEtm) * 1.2,
    //   nonce
    // })
    // await approveTx.wait();
    // console.log(`Approve tx ${approveTx.hash}`)
    // console.log("=================================")

    // console.log("=================================")
    // const depositTx = await contract.deposit("100000000000000000000");
    // await depositTx.wait();
    // console.log(`Deposit tx ${depositTx.hash}`)
    // console.log("=================================")
    
    // console.log("=================================")
    // const getStatus = await contract.status();
    // console.log("getStatus", getStatus);
    // console.log("=================================")

    // const contractBaseToken = new ethers.Contract(erc20BaseAddress, abiERC, wallet);
    // const approveBaseTx = await contractBaseToken.approve(contractAddress, "1000000000000000000000")
    // await approveBaseTx.wait();
    // console.log(`approveBaseTx tx ${approveBaseTx.hash}`)
    
    console.log("=================================")
    const buyTx = await contract.purchase("10000000000");
    await buyTx.wait();
    console.log(`buyTx tx ${buyTx.hash}`)
    console.log("=================================")

    const receipt = await provider.getTransactionReceipt(buyTx.hash);
    console.log("eventData", receipt);
  } catch (error) {
    console.log(error)
  }
}

getPublicsaleInfo(
  network,
  contractAddress,
  abi,
  "51df14fb6587fe2f6e7e7b4d78c2ab6f9f125d2aba408775c3ec04153201ea1a",
  erc20SaleAddress,
  abiERC,
  erc20BaseAddress
)

const getEventsFromTransaction = async (provider, contract, txHash) => {
  try {
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!receipt) {
      throw new Error("Transaction receipt not found");
    }

    const events = [];
    for (const log of receipt.logs) {
      try {
        const parsedEvent = contract.interface.parseLog(log);

        if (parsedEvent.name === eventName) {
          events.push(parsedEvent);
        }
      } catch (error) {
        // Ignore if the log couldn't be parsed by the contract ABI
      }
    }

    return events;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// const scanEventsInTransaction = async (txHash) => {
//   try {
//     const provider = new ethers.providers.JsonRpcProvider(network);
//     const contract = new ethers.Contract(contractAddress, Gacha_ABI, provider);

//     const events = await getEventsFromTransaction(provider, contract, txHash);
//     if (events.length === 0) {
//       console.log("empty data")
//       return false;
//     } else {
//       console.log(events)
//       return true;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Replace 'YOUR_TRANSACTION_HASH' with the actual transaction hash to scan
// const transactionHash = "0x95e0fc309c83615bc8d944d46244147ae4c2363120353a7af8a2564ae0e69a2a";
// scanEventsInTransaction(transactionHash);
