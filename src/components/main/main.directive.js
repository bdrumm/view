module.exports = function main($http, $cookies, $window, Auth, $firebaseArray) {  
    return {
      scope: true,
      controller: function($scope, $element, $attrs) {
        var ref = firebase.database().ref('users').child($scope.firebaseUser.uid).child("notes");
        $scope.notes = $firebaseArray(ref);
        if (annyang) {
          var commands = {
            'okay view remind me to *todo': function(todo) {
              $scope.notes.$add({text: todo});
            }
          };
          annyang.addCommands(commands);
          annyang.start();
        }

        position();
        $scope.inspectorOpen = false;
        
        jQuery($window).on('resize', function() {
          position();
        })

        function position() {
          var windowHeight = jQuery($element).find('.main').parent().height();
          var mainHeight = jQuery($element).find('.main').height();
          var mainWidth = jQuery($element).find('.main').width();
          var marginTop = (windowHeight - mainHeight) / 2;
          var widgetNumber = jQuery($element[0].querySelector('.main')).find('>div').length;
          
          jQuery($element[0].querySelector('.main')).css('marginTop', marginTop);
          jQuery($element[0].querySelector('.main')).find('>div').css('width', mainWidth/widgetNumber)
        }

        $scope.toggleInspector = function() {
          $scope.inspectorOpen = !$scope.inspectorOpen;
        }

        $scope.openInspector = function() {
          $scope.inspectorOpen = true;
        }

      },
      templateUrl: './components/main/main.template.html'
    }
};