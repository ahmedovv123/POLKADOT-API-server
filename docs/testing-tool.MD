A testing tool has been written to cover API endpoints.
Repository: https://github.com/MaximilianGeorgiev/polkadot-testutils

Tests consist of (but will not be limited to):
- All endpoints should return status 200 when properly executed
- All endpoints should meet OpenAPI behaviour
- Blocks: two simultaneous calls provide different results for latest block
- Blocks: Get X blocks from N-th: Incorrect input should return status 500
- Blocks: Get block by number: Letter input should return status 500
- Blocks: Get block by hash number empty body should return status 404
- Transactions: Get transaction by block number should return 404 when there is an empty body
- Transactions:  Get transaction by block hash should return 404 when there is an empty body
- Transactions: Get X transactions after the Nth transaction should return 500 when there are negative numbers involved
- Transactions: Get X transactions after the Nth transaction should return 500 when X is bigger than the total amount of transactions
- Transactions: Transaction count cannot be negative
- Addresses: Address transaction count cannot be negative
- Addresses: Address transaction count must be 0 for invalid account
- Addresses: Address transactions for invalid address equal NaN
- Addresses: Address balance query for invalid address should result in status 500
- Addresses: Address balance query cannot have a negative balance
