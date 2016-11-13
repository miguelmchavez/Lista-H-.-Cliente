angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.factory('Data', function () {
var user = {};
return {
    getUser: function () {
        return user;
    },
    setUser: function (userparameter) {
        user = userparameter;
    }
};
})

.controller('Fecha', function($scope, $http, Data) {

    $scope.inicio = new Date(2016, 10, 01);
    $scope.fin = new Date();
    //$scope.$apply();
    //$scope.fin = {selectedDate: new Date()}

    $scope.getSelect = function(inicio, fin) {
      //alert(inicio);
      var inicio= inicio.getFullYear() + '-' + ('0' + (inicio.getMonth() + 1)).slice(-2) + '-' + ('0' + inicio.getDate()).slice(-2);
      var fin= fin.getFullYear() + '-' + ('0' + (fin.getMonth() + 1)).slice(-2) + '-' + ('0' + fin.getDate()).slice(-2);
      $http.get('https://listahu.org/api/v1/denuncias/?added_from=' + inicio + '&added_to=' + fin).then(function(response) {
            $scope.denuncias = response.data.results;
        });

      };
      $scope.Input = function(opt) {
      Data.setUser(opt);
      //alert(opt.added);
      $scope.services = Data.setUser(opt);
      };
})

.controller('Numero', function($scope, $http, Data) {

    $scope.getInput = function() {
      $http.get('https://listahu.org/api/v1/denuncias/?numero=' + 595 + parseFloat($scope.customer)).then(function(response) {
            $scope.greeting = response.data.results;
        });
      };
    $scope.Input = function(opt) {
      Data.setUser(opt);
      //alert(opt.added);
      $scope.services = Data.setUser(opt);
      };
})
.controller('Categoria', function($scope, $rootScope, $http, Data) {
    $scope.dat = {
    model: null,
    option: [
      { title: 'Extorsión', id: 'extorsion' },
      { title: 'Estafa', id: 'estafa' },
      { title: 'SPAM', id: 'spam' }
      ]
   };
    
    $scope.Input = function(opt) {
      Data.setUser(opt);
      //alert(opt.added);
      $scope.services = Data.setUser(opt);
      };
      
    $scope.getSelect = function() {
      $http.get('https://listahu.org/api/v1/denuncias/?tipo=' + $scope.dat.model).then(function(response) {
            $scope.denuncias = response.data.results;
        });

      };
   
})
.controller('PlaylistCtrl', function($scope, $stateParams, Data) {
  //$scope.user = Data.getUser();
  $scope.service = Data.getUser();
});
