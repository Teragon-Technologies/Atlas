'use strict';

app.service('title', function($rootScope) {
	var title = '';

	return {
		setTitle: function(newTitle) {
			title = newTitle;
			$rootScope.$broadcast('TitleChanges', title);
		},
		getTitle: function() {
			return title;
		}
	}
});

app.service('error', function($rootScope, $location) {

	var error = '';

	return {
		response: function(message) {
			
			error = message.error;

			switch(error) {
				case 'You are not authenticated':
					$rootScope.$broadcast('ErrorChange', error);
					$location.path( "/login" );
					console.log(error);
					break;
			}
		},
		getError: function() {
			return error;
		},
		setMessage: function(message) {
			error = message.error;
			console.log(error);
			$rootScope.$broadcast('ErrorChange', error);
		}
	}
});