angular.module('kanban', ['ngResource']);
angular.module('kanban').value('apiUrl', 'http://localhost:50075/api');
angular.module('kanban').controller('IndexController', function ($scope, $resource, apiUrl) {
    $scope.newList = {};
    $scope.newCard = {};

    var ListResource = $resource(apiUrl + '/lists/:ListId', { ListId: '@ListId' });

    var CardResource = $resource(apiUrl + '/cards/:CardId', { CardId: '@CardId' }, {

        'cards': {
            url: apiUrl + '/lists/:ListId/cards',
            method: 'GET',
            isArray: true
        }
    });
////////////////////////////////////////////////////////////////////////////////
    $scope.addList = function () {

        ListResource.save($scope.newList, function () {
            $scope.newList = {};
            alert('save list successful');
            activate();

        });
    };

    $scope.addCard = function (list) {
        list.newCard.ListId = list.ListId;
      
        CardResource.save(list.newCard, function () {
            alert('save card successful');
            activate();
        });
    };
////////////////////////////////////////////////////////////////////////////////
    $scope.deleteList = function (list) {
        list.$remove(function (data) {
            activate();
        })
    };

    $scope.deleteCard = function (card) {
       card.$remove(function (data) {
            activate();
        })
    };
///////////////////////////////////////////////////////////////////////////////
    function activate() {
        ListResource.query(function (data) {
            $scope.lists = data;
            $scope.lists.forEach(function (list) {
                list.cards = CardResource.cards({ ListId: list.ListId });
            });
        });
    }
////////////////////////////////////////////////////////////////////////////////
    activate();
});