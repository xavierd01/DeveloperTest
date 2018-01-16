app.controller('DeviceController', ['$scope', '$interval', '$filter', function($scope, $interval, $filter) {
	$scope.devices = [
            { id: 1, name: 'Device #1' },
            { id: 2, name: 'Device #2' },
            { id: 3, name: 'Device #3' },
            { id: 4, name: 'Device #4' },
            { id: 5, name: 'Device #5' },
            { id: 6, name: 'Device #6' },
            { id: 7, name: 'Device #7' },
            { id: 8, name: 'Device #8' },
            { id: 9, name: 'Device #9' },
            { id: 10, name: 'Device #10' }
        ];
		
	$scope.reports = [];
	
	var stop;
	$scope.startReporting = function() {
		// Do not start reporting if already reporting.
		if (angular.isDefined(stop)) return;
		
		stop = $interval(function() {
			var deviceReport = {
				type: 'deviceReport',
				deviceId: (Math.floor(Math.random() * ($scope.devices.length)) + 1),
				reportDate: new Date(),
				latitude: (Math.random() * 180) - 90,
				longitude: (Math.random() * 360) - 180,
			};
		
			// Make this a function.
			var name = $filter('filter')($scope.devices, function(d) { return d.id === deviceReport.deviceId; })[0].name;
			deviceReport.deviceName = name;
			
			var existing = $filter('filter')($scope.reports, function(r) { return r.deviceId === deviceReport.deviceId; })[0];
			var rptIdx = $scope.reports.indexOf(existing);
			if (rptIdx !== -1) {
				// remove existing report
				$scope.reports.splice(rptIdx,1);
			} 
			// push new report.
			// Is there a better way?
			$scope.reports.splice(0,0,deviceReport);
		
		}, 2000);
	};
	
	$scope.stopReporting = function() {
		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
		}
	};
	
	$scope.$on('destroy', function() {
		// kill our timer
		$scope.stopReporting();
	});
	
}]);