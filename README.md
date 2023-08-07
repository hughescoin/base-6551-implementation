# Create an NFT with a Token Bound Account

This guide demonstrates how to create and interact with three smart contracts:

- An [ERC721](https://docs.openzeppelin.com/contracts/4.x/erc721) smart contract that serves as our NFT.
- A [registry contract](https://eips.ethereum.org/EIPS/eip-6551) that deploys another smart contract.
- A smart contract wallet (a.k.a. Token Bound Account) that will be owned by the NFT holder.

## Tools

We will use a few tools to write and deploy our smart contracts:

- [Hardhat](https://hardhat.org/): Helps deploy and interact with smart contracts.
- [Node.js](https://nodejs.org/en): Developer environment.
- [OpenZeppelin](https://www.openzeppelin.com/contracts): An open library for building secure smart contracts.
- [Coinbase Wallet](https://www.coinbase.com/wallet/): Non-custodial wallet for creating accounts and interacting with the blockchain.

## Wallet setup

Assuming you have set up your wallet (and safely stored away your seed phrase) and have some funds (testnet or mainnet), let's obtain the addresses and private keys needed for the demo.

### Enable Testnets

1. Click on the Settings tab
2. Select "Developer Settings"
3. Toggle "Testnets" on

### Switch Wallets + Copy Address

1. From the assets tab, click on the current address/account.
2. Select another address.

_Note: Each account will need funds in order to deploy contracts and interact with Base._

### Copy Private Key

_Do not share this with anyone._

1. Click on the Settings tab

![Settings tab](https://lh3.googleusercontent.com/pw/AIL4fc9S9Xe6-HAxyFpks4h8MPJAe7MXDrYYQjVdQ3ttQ0cCeHgnAro88ActJ5NJix6gwOBlkWvByl5fqacyn-IGA9YjxnFaFyEhbMuf2MNxb5wDD3eS9lA2N7LgP2VMbfpDw43moIVGe7IREv3bIarbwJQIrkmqgdI-2TDR0LQlhHhqhZdM9mmsb5VIB-gJzpVvd1vislXmA3FBDpRxcWN3UkKW9Ear-zK3qHfOIZT4k3wdK3XagCDCEaVHDqAXMQCefbIcDRluwHDc3a1uwTdx2pfb_dSMkGD87wFq65qa9AbfxnnRP-BUD8kMCDG3aO9a8Fx8jaUd6qg-gRFYqUcKZVlGxN1_C-7NWu-3Ow-5Wg1Cl-_ZF6zUA4sub8jMZIHn68OwAE2amLzoX15dkl1YZU5XEfIgOiM7p2qh1N8fBWsVk7BEQn4x1m-32EXn7FJHkb8bJdraRvgGsYN4CLDT1a_7UUcShj-FlKgfJZPUATpKJFWl6ohXNkWwoAhHq1KyZIuof22oeRrCMEW_0SWnyc-v5908_uJz5iV3PCT5JwSqFRG7dnRS_wK4j-OBR562WsRwkHYk5WL78nbQ8VoWRX_r_fAcakkNfkci74xH3TlJchuBuJQ1PjptJrl1_WpmMTgwAtykO9jrToCbyud0k_qGLEjmgj5aXm3YK71nwzn2spj6Eu2-3CwMUkbOWD8bKtSnePDvFRdzhx9g_1lmPpI8D0DJEb9oxUpUFJSjn8fJzpyeZDiwOMAC-MjGc1uRUTzgQJM5ohvIPJCt6Mht0aZTJVjvuNYFAdaFHbeDJNkX0bm2itw4igzDAPTCu4BHwDxGZpfzWCytNNMwl71EO78ESJvpWg4ZlUcuze8k8awP5XTxwzv2Xh38sj82kiY0q96_f6El8-J3sfBP2vAyAbHT20SGML57Q6zV-axi8l7DlZzeu_xCLaAoPzLkzmc=w367-h595-s-no?authuser=0)

2. Select "Developer Settings"

![Developer settings](https://lh3.googleusercontent.com/pw/AIL4fc9S9Xe6-HAxyFpks4h8MPJAe7MXDrYYQjVdQ3ttQ0cCeHgnAro88ActJ5NJix6gwOBlkWvByl5fqacyn-IGA9YjxnFaFyEhbMuf2MNxb5wDD3eS9lA2N7LgP2VMbfpDw43moIVGe7IREv3bIarbwJQIrkmqgdI-2TDR0LQlhHhqhZdM9mmsb5VIB-gJzpVvd1vislXmA3FBDpRxcWN3UkKW9Ear-zK3qHfOIZT4k3wdK3XagCDCEaVHDqAXMQCefbIcDRluwHDc3a1uwTdx2pfb_dSMkGD87wFq65qa9AbfxnnRP-BUD8kMCDG3aO9a8Fx8jaUd6qg-gRFYqUcKZVlGxN1_C-7NWu-3Ow-5Wg1Cl-_ZF6zUA4sub8jMZIHn68OwAE2amLzoX15dkl1YZU5XEfIgOiM7p2qh1N8fBWsVk7BEQn4x1m-32EXn7FJHkb8bJdraRvgGsYN4CLDT1a_7UUcShj-FlKgfJZPUATpKJFWl6ohXNkWwoAhHq1KyZIuof22oeRrCMEW_0SWnyc-v5908_uJz5iV3PCT5JwSqFRG7dnRS_wK4j-OBR562WsRwkHYk5WL78nbQ8VoWRX_r_fAcakkNfkci74xH3TlJchuBuJQ1PjptJrl1_WpmMTgwAtykO9jrToCbyud0k_qGLEjmgj5aXm3YK71nwzn2spj6Eu2-3CwMUkbOWD8bKtSnePDvFRdzhx9g_1lmPpI8D0DJEb9oxUpUFJSjn8fJzpyeZDiwOMAC-MjGc1uRUTzgQJM5ohvIPJCt6Mht0aZTJVjvuNYFAdaFHbeDJNkX0bm2itw4igzDAPTCu4BHwDxGZpfzWCytNNMwl71EO78ESJvpWg4ZlUcuze8k8awP5XTxwzv2Xh38sj82kiY0q96_f6El8-J3sfBP2vAyAbHT20SGML57Q6zV-axi8l7DlZzeu_xCLaAoPzLkzmc=w367-h595-s-no?authuser=0)

3. Click on "Show private key"

![Show private key](https://lh3.googleusercontent.com/pw/AIL4fc_TK6PWfcHJa1Fe_8W3kwOdJS4MGm4CuuoVqHSJwxmbPcC0tSh1AQRkdqK5Kwb2CvfFrZ2SDwIpHYH7t3Cs4lmM6ohxLJjrzgYC-3f2L5TKr1XzskMXH2z_2Y9LH8fuRvW3KM8N7tZqLvoV7QOBIBxjmbVxh2piOSG-2ouQMcHIAGr_ijgbi6b50FcntIrOjRIl4g43Tgkep-GaXe1qQwANc_BDUlP8TvJ8JbNkKcc6LhApZlb5Qn8bQmsyDP2VbUVro7hsRL4gNuPu3HrO1vePuo587KiVfoeYkbpmL8J2HlxpPkeMbyHNe3jhtPIMp4MVN3m-m28PItthTk45fpH7jl4zav5BM7niEPLyMb7qXxJ6CE0utO0TR0OwzwrV8itsOIRSg2wvd8OPp6E01XysKSiG5GfqudYeQF-D-mtfrXNa6CK46wYYSyVNcu-taXsobxUbF2YolymfGCDAGma1m_zbgBToFLxhdT7xCAdjjsxraEKB_8HN17GB21l-GTTCdX_bHpuMOrd1Q69sF8LczmAFGfjBXjFqDCXmJ0gIpRqFsfMVHcpPaXi4yw2DL2T-uKDhMvMNKjgp8ivPUQ5LPDD5b4ycUOoMam-X58XFhRvEDX461wCsj2UwnADbLKBfpenzuHQg3RFWnIAP2NvOrlTHZ99XXdZfZq0cH4ejfOjMdRGkdWR9lrKrkYieSp11IKttNEeFjShC5-mUh-iBAYEYlxUOny6n1RwVQp48wMlznK0QX3spI1v2P3z7jKY5aylbGusCdg9R8nQDxPlGH9-ct80StUB_rxT3Uj2QgTlTex6lG4q4YC8JAJNHxNjIfwDhoR9BseS-W51682nPaGuaMcL_es0ZHgqzgpVwJwnIeTSeHKMFJEAM4iu8vM3Imp3sNalShT4OndelT41XEPF1FXgMz_0pcGWifOWby9alMaKpCnhXI5X6iFA=w367-h595-s-no?authuser=0)

4. Enter password and select the disclaimer ✅

![Enter password](https://lh3.googleusercontent.com/pw/AIL4fc_3-RUz_Ili9VmK_RRSGodAM8DE0XNckZpV8p6TCXTV0k8JDGSLeixziSk9lQGYKMr2wcXuFD7cDc4T2JTEOnp82ak4zaWQ3_jJyM9bLS7YY_3l_Po29YDqrSLBAY3F6HS5OBQ5wXspFLplEW3pWLMjmljN88ijKEWX-d-LSKLA6deOofD1zjksaASPvH4DiAV2LjOc30XOZYAGmdZHTJDF4W34CWr-Zvu9yWoJES87NBSY3sk_5zgay2KrbFwV15uUNZOFHCq0nl_NgcQdqfdW1BiPo0Y9Uad7XhJ7svlv9V836oFO5sIpctLTMt61seF6tiQfXAa8-7nI9deb3sKRaKKDMI0UnrS5aMDvTjEfk6dZfSyBlytTlj1ps1tRJSlI0uFI9T1NpcTFe7ZCuRO132KAGoA5dkRx_UK3uoZpJMhEvyrIjQgYVeNeLrUX-iZLV9Ihz7T_ukwXDAOjWds40IGxFX5X226pB-lDjnqavswE4omKh7kmSIlNcGyv2COzgwi-1dH_rBgqz6QYUjZNNH1cdweil4RLI8p_VBzVAXCaw68Tb-4npwmrYAR7T5IKC0R7MC05wSeDsXyKt_1U9-K9FCcSCRleekMDMXpYK_IOlHhrKfTrCLUFL2pHMtI2b38NwONNzp8hmxKN4joVvNEUNpoLFntbv_-GB40bnbueG54FeixjSKrzUfxSp6nPH0SxIMPOqBFFNyLVmNRo1r2vG5ijLfSLaAPq5ZUIXcBLT_C5yI3qPoRi5TQzR90sOuLqZ-lLWBlIhdZVsGUVjcXZC0m6OtoPhonU8YttB5SJizlBqNIRY3kD2a4C0PJuGp5NTBIuBMP06vs7pVkVDxSHJJFxdMU_M9ej0s7nyCQ8a70C2L7LPw2dM38vza0hOe6C-gYrxxZDpHyt6JMjm7y3yeFRTKliFz0HIYLtMB33MBX6YDDGaYNKoqU=w368-h597-s-no?authuser=0)

### Request Testnet Funds

5. Click on the Settings tab
6. Select "Networks"
7. Select "Testnets"
8. Click on the water (💧) icon
9. Request testnet funds

## Environment Setup

1. Clone this repo.
2. Change into the directory using `cd erc-6551-implementation`.
3. Initiate a node project and install hardhat:
   ```bash
   npm install
   ```
4. Create a .env file in the root (erc-6551-implementation/) folder by typing
   `touch .env`
5. Add the following code to your .env file:
   ```
   WALLET_KEY=<Private Key of an account>
   WALLET2_ADDR=<Address of an additional wallet>
   WALLET2_KEY=<Private key of an additional account>
   ```

## Run Scripts

1. `npx hardhat run scripts/01_deploy_contracts.js --network base-local` will deploy, mint, and assign an NFT to the `WALLET2_ADDR`.
2. `npx hardhat run scripts/02_create_account.js --network base-local` will have the Registry contract create the token bound account and compute its address.
3. `npx hardhat run scripts/03_account_interaction.js --network base-local` will send funds from `WALLET_KEY` to the token bound account and transfer ownership of the NFT from `WALLET2_ADDR` to `WALLET_KEY`.

# Congrats!
