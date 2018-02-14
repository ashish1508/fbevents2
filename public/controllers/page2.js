var page2 = angular.module('page2',[]);

page2.directive('fileModel', ['$parse', function($parse){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                })
            })
        }
    }
}])

page2.service('multipartForm', ['$http', function($http){
    this.post = function(uploadUrl, data){
        var fd = new FormData();
        for(var key in data)
            fd.append(key, data[key]);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
}])


page2.controller('page2control', ['$scope', 'multipartForm', function($scope, multipartForm){
    $scope.evnt = {};
    $scope.evnt.invites=[];
    $scope.Submit = function(){
        console.log($scope.evnt);
        var uploadUrl = '/uploads/private';
        multipartForm.post(uploadUrl, $scope.evnt);
        //$scope.evnt.name = " ";
        //$scope.evnt.place = " ";
    }

    $scope.inv = function(){
        $scope.evnt.invites.push($scope.invite);
        $scope.invite = " ";
        console.log($scope.evnt.invites);
    }

}]);