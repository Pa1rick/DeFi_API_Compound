const Web3 = require('web3');
const Router = require('@koa/router');
const config = require('./config.json');

const web3 = new Web3(process.env.INFURA_URL);
const router = new Router();

const cTokens = {
	cBat: new web3.eth.Contract(
		config.cTokenAbi,
		config.cBatAddress
	),
	cDai: new web3.eth.Contract(
		config.cTokenAbi,
		config.cDaiAddress
	)
};

router.get('/tokenBalance/:cToken/:address', async ctx => {
	const cToken  = cTokens[ctx.params.cToken];
	if(typeof cToken === 'undefined') {
		ctx.status = 400;
		ctx.body = {
			error: `cToken ${ctx.params.cToken} does not exist`
		}
		return;
	}

	try {
	const tokenBalance = await cToken
		.methods
		.balanceOfUnderlying(ctx.params.address)
		.call();
	ctx.body = {
		cToken: ctx.params.cToken,
		address: ctx.params.address,
		tokenBalance
		};
	} catch(e) {
		console.log(e);
		ctx.status = 500;
		ctx.body = {
			error: 'internal server error'
		}
	}
});


module.exports = router;
