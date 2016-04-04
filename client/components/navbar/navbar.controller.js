'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard
  var originatorEv;
  openMenu($mdOpenMenu, ev) {
    console.log('hel');
    originatorEv = ev;
    $mdOpenMenu(ev);
  }

  constructor() {
  }


}

angular.module('creapp3App')
  .controller('NavbarController', NavbarController);
