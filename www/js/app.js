(function () {
    var app = angular.module('MyNotes', ['ionic','MyNotes.NoteService']);


    app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('List', {
            url: '/list'
            ,templateUrl: 'templates/list.html'

        });
        $stateProvider.state('edit', {
            url: '/edit/:noteId'
            , templateUrl: 'templates/edit.html'
            , controller: 'EditCtrl'
        });
        $stateProvider.state('add', {
            url: '/add'
            , templateUrl: 'templates/edit.html'
            , controller: 'AddCtrl'
        });


        $stateProvider.state('slides', {
            url: '/slide'
            ,templateUrl: 'templates/setting.html'

        });


        $urlRouterProvider.otherwise('/list');
    });




    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });




    app.controller('ListCtrl', function ($scope, NoteService) {


        $scope.reordering = false;

        $scope.notes = NoteService.list();


        $scope.remove = function (noteId) {
            NoteService.remove(noteId);
        };

        $scope.move = function (note,fromIndex,toIndex) {
            console.log('moving from ' + fromIndex + 'to ' + toIndex);
            NoteService.move(note,fromIndex,toIndex);
        };

        $scope.toggleReordering = function(){
            $scope.reordering = !$scope.reordering ;


        }

    });


    app.controller('AddCtrl', function ($scope, $state,NoteService) {

        $scope.note = {

            id: new Date().getTime().toString(),
            title: '',
            description: ''

        };


       /* $scope.ratingsObj = {
            iconOn: 'ionic_rating_icon_on',    //Optional
            iconOff: 'ionic_rating_icon_off',   //Optional
            iconOnColor: 'rgb(200, 0, 100)',  //Optional
            iconOffColor:  'rgb(200, 100, 100)',    //Optional
            rating:  4, //Optional
            minRating:1,    //Optional
            callback: function(rating) {    //Mandatory
                $scope.ratingsCallback(rating);
            }
        };

        $scope.ratingsCallback = function(rating) {
            console.log('Selected rating is : ', rating);
        };

        */



        $scope.save = function () {
            NoteService.add($scope.note);
            $state.go('List');

        };

    });


    app.controller('EditCtrl', function ($scope, $state, NoteService) {



        $scope.note = angular.copy(NoteService.get($state.params.noteId));



        $scope.save = function () {
            NoteService.update($scope.note);
            $state.go('List');

        };

    });


}());