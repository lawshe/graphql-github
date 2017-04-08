module.exports = {
	init(){
    if (config && config.google_analytics){
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
      ga('create', config.google_analytics.property_id, 'auto');
      ga('send', 'pageview');
    }
	}
}
