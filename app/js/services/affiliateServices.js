'use strict';

affiliate.service('title', function($rootScope) {
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
})