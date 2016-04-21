var myAppModule = angular.module('holonisApp',[
	'jcs-autoValidate',
	'infinite-scroll',
	'angularSpinner',
	'mgcrea.ngStrap']);

myAppModule.controller('LoginController',function($scope,$http,$window){
	
	$scope.login = function(){
		
		$http.post('/app/authenticate',$scope.user).success(function (data) {
			if(data.success){
				$window.location.href = '/app/cards';
			}else{
				$scope.user = {};
			}
		}).error(function(data) {
			//console.log(":(",data);
			//display error message
		});
	}	
	
	$scope.signup = function(){		
		
		$http.post('/app/signup',$scope.register).success(function (data) {			
			if(data.success){
				$window.location.href = '/app/cards';
			}else{
				$scope.register = {};
				//error message
			}
			
		}).error(function(data) {
			console.log(":(",data);
			//internal error message
		});
		
	}
	
	$scope.logout = function(){		
		$window.location.href = '/app/logout';				
	}		
	
});

myAppModule.controller('CardsController', function ($scope,$http,$modal) {	
	
	$scope.isLoading = false	
	$scope.cards = [];	
	$scope.card = {};
	$scope.updateCard = {};
	
	$scope.getCards = function(){
		
		if(!$scope.isLoading){
			$scope.isLoading = true;
			$http.get('/app/users/cards').success(function(data){				
				
				angular.forEach(data,function(card){
					$scope.cards.push(card);
				});

				$scope.isLoading = false;				
				
			}).error(function(data){
				//console.log("error",data);
				$scope.isLoading = false;
			});
		}	
	};
	
	$scope.remove = function(index){
				
		if($scope.cards[index]['_id']){

			$http.delete('/app/users/cards/'+$scope.cards[index]['_id']).
				success(function(data){	
					if(data.success){
						$scope.cards.splice(index,1);
					}												
			}).error(function(data){
				console.log("error",data);
			});
		}else{
			$scope.cards.splice(index,1);
		}
		
	}	
	
	$scope.createCard = function(){				
		
		$http.post('/app/users/cards',$scope.card).
			success(function(data){								
				if(data.success){					
					$scope.cards.splice(0,0,{
						name:$scope.card.name,
						username:$scope.card.username,
						email:$scope.card.email,
						phone:$scope.card.phone,
						address:$scope.card.address,
						city:$scope.card.city,
						country:$scope.card.country
						/*address:{
							streetA:$scope.card.address,
							city:$scope.card.city,
							country:$scope.card.country
						}*/						
					});
					
					$scope.card = {};					
				}					
				
			}).error(function(data){
				console.log("error",data);
			});
			
	};
	
	$scope.updateCard = function(){
	
		if($scope.card['_id']){
			
			$http.post('/app/users/cards/'+$scope.card['_id'],$scope.card).
				success(function(data){
					if(data.success){
						//success message here
					}else{
						//success message here
					}												
			}).error(function(data){
				console.log("error",data);
			});
			
		}else{
			//crearlo
			$http.post('/app/users/cards',$scope.card).
			success(function(data){								
			
				if(data.success){
					
					$scope.cards[$scope.card.index] = $scope.card;  
					$scope.card = {};					
				}					
				
			}).error(function(data){
				console.log("error",data);
			});
		}
		$scope.createModal.hide();;
	}
	
	
	$scope.showCreateModal = function (card,index) {
		
		$scope.card = {
			name:card.name,
			username:card.username,
			email:card.email,
			phone:card.phone,
			address:card.address,
			city:card.city,
			country:card.country,
			index,index
		};		

		if(card['_id']){
			$scope.card['_id'] = card['_id'];			
		}
					
		$scope.createModal = $modal({
			scope: $scope,
			template: '../templates/partials/modal.edit.tpl.html',
			show: true
		})
	};
		
	//$scope.getCards();	
});