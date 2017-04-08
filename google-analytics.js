var config = require('./config.js');

module.exports = {
	init(){
		window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
		ga('create', config.google_analytics.property_id, 'auto');
		ga('send', 'pageview');
	}
}
