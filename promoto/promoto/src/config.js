export const abi  = [
	{
		"constant": false,
		"inputs": [],
		"name": "cashOut",
		"outputs": [
			{
				"name": "remainingBalance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_artistAdd",
				"type": "address"
			}
		],
		"name": "pay",
		"outputs": [
			{
				"name": "tier",
				"type": "string"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_artistType",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			},
			{
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "registerArtist",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_artistAdd",
				"type": "address"
			}
		],
		"name": "subscribeToArtist",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkBalance",
		"outputs": [
			{
				"name": "artistBalance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getArtist",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "artistType",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "ipfs",
				"type": "string"
			},
			{
				"name": "subscribersCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfArtists",
		"outputs": [
			{
				"name": "artistsCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getSubscribersCount",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "validToRegister",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

export const address = '0xb8c234b27cb5cfd0480bbc5a6512573d6ca449d6'