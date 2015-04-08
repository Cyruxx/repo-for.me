var REPOS_URL  = 'http://repo-for.me/repos.json';


angular.module('github', [])
    .controller('GitHubController', function ($scope, $http) {
        $scope.tag = 'Random';
        $scope.tags = ['PHP', 'JavaScript', 'jQuery', 'Laravel', 'AngularJS', 'MeteorJS', 'BackboneJS'];
        $scope.currentUrl = 'http://github.com/Cyruxx';
        $scope.clickedTag = false;

        $scope.getGitHubRepoUrl = function() {
            // Google analytics
            ga('send', {
                'hitType': 'event',
                'eventCategory': 'Clicks',
                'eventAction': 'Open Repo',
                'eventLabel' : $scope.tag,
                'eventValue': 1
            });


            var responsePromise;

            responsePromise = $http.get(REPOS_URL);

            responsePromise.success(function (data, status, headers, config) {

                if(!$scope.clickedTag) {
                    // No clicked tag
                    var iTop    = Math.floor(Math.random() * $scope.tags.length);
                    var iItem   = Math.floor(Math.random() * data[$scope.tags[iTop].toLowerCase()].length);
                    $scope.currentUrl = data[$scope.tags[iTop].toLowerCase()][iItem].url;
                } else {
                    $scope.currentUrl = data[$scope.tag.toLowerCase()][Math.floor(Math.random() * data[$scope.tag.toLowerCase()].length)].url;
                }

            });

            responsePromise.error(function (data, status, headers, config) {
                swal({
                    'title': 'Oh no!',
                    'text': 'We are sorry, but we could not fetch a random repository\'s url. Maybe you are disconnected from the internet?',
                    'type': 'error'
                });
            });
        };

        $scope.switchTag = function($event) {
            var $tagElement     = $($event.target);

            if($tagElement.attr('data-tag') != $scope.tag) {
                $scope.tag          = $tagElement.attr('data-tag');
                $scope.clickedTag   = true;
            } else {
                $scope.tag          = 'Random';
                $scope.clickedTag   = false;
            }
            
            // Google analytics
            ga('send', {
                'hitType': 'event',
                'eventCategory': 'Clicks',
                'eventAction': 'Switch Tag',
                'eventLabel' : $scope.tag,
                'eventValue': 1
            });

            $scope.getGitHubRepoUrl();
        };

        $scope.clearTag = function () {
            $scope.clickedTag = false;
            $scope.tag        = 'Random';
            $scope.getGitHubRepoUrl();
        };
    });
