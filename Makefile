help:
	@echo "  node       npx hardhat node"
	@echo "  clean      npx hardhat clean"
	@echo "  compile    npx hardhat compile"
	@echo "  prettier   npx prettier --write 'contracts/**/*.sol'"
	@echo "  done       clean prettier test"
	@echo "  slither    slither . --print human-summary"
	@echo "  solhint    npx solhint contracts/**/*.sol"
	@echo "  coverage   npx hardhat coverage"


# npx
node:
	npx hardhat node

clean:
	npx hardhat clean

compile: clean
	npx hardhat compile

prettier:
	npx prettier --write 'contracts/**/*.sol'

done: clean prettier
	yarn test

# slither
slither:
	slither . --print human-summary

# solhint
solhint:
	npx solhint contracts/**/*.sol

# coverage
npx-coverage:
	npx hardhat coverage

coverage: npx-coverage
	open -a 'google chrome' './coverage/index.html'



