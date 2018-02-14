myapp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
	
	

	.when('/page1',{
		templateUrl :'views/page1.html',
		controller:'page1control'
		})

	.when('/events',{
		templateUrl :'views/events.html',
		controller:'eventcontrol'
	})

	.when('/myeves',{
		templateUrl:'views/myevents.html',
		controller:'myeventcontrol'
	})

	.when('/invitedevents',{
		templateUrl:'views/invevents.html',
		controller:'invitecontrol'
	})


	.when('/page2',{
		templateUrl :'views/page2.html',
		controller:'page2control'
	}).otherwise({
		redirectTo : '/login'
	});
	$locationProvider.html5Mode({
       enabled: true,
       requireBase: false
    })

}])