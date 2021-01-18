const Web3 = require('web3');
const Router = require('@koa/router');

const web3 = new Web3(process.env.INFURA_URL);
const router = new Router();

router.get('/', ctx=> {
	ctx.body = 'hello world';
});


module.exports = router;
