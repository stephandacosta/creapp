'use strict';

angular.module('creapp')
.constant('appConstants', {

  // CRE types
  creTypes:[
    'Any',
    'Retail',
    'Office',
    'Leisure',
    'Multifamily',
    'Hotel',
    'Senior Housing',
    'Industrial',
    'Health Care',
    'Land',
    'Agricultural',
    'Other'
  ],

  // states
  states: [
    { name: 'ALABAMA', iso: 'AL'},
    { name: 'ALASKA', iso: 'AK'},
    { name: 'AMERICAN SAMOA', iso: 'AS'},
    { name: 'ARIZONA', iso: 'AZ'},
    { name: 'ARKANSAS', iso: 'AR'},
    { name: 'CALIFORNIA', iso: 'CA'},
    { name: 'COLORADO', iso: 'CO'},
    { name: 'CONNECTICUT', iso: 'CT'},
    { name: 'DELAWARE', iso: 'DE'},
    { name: 'DC', iso: 'DC'},
    { name: 'MICRONESIA', iso: 'FM'},
    { name: 'FLORIDA', iso: 'FL'},
    { name: 'GEORGIA', iso: 'GA'},
    { name: 'GUAM', iso: 'GU'},
    { name: 'HAWAII', iso: 'HI'},
    { name: 'IDAHO', iso: 'ID'},
    { name: 'ILLINOIS', iso: 'IL'},
    { name: 'INDIANA', iso: 'IN'},
    { name: 'IOWA', iso: 'IA'},
    { name: 'KANSAS', iso: 'KS'},
    { name: 'KENTUCKY', iso: 'KY'},
    { name: 'LOUISIANA', iso: 'LA'},
    { name: 'MAINE', iso: 'ME'},
    { name: 'MARSHALL ISLANDS', iso: 'MH'},
    { name: 'MARYLAND', iso: 'MD'},
    { name: 'MASSACHUSETTS', iso: 'MA'},
    { name: 'MICHIGAN', iso: 'MI'},
    { name: 'MINNESOTA', iso: 'MN'},
    { name: 'MISSISSIPPI', iso: 'MS'},
    { name: 'MISSOURI', iso: 'MO'},
    { name: 'MONTANA', iso: 'MT'},
    { name: 'NEBRASKA', iso: 'NE'},
    { name: 'NEVADA', iso: 'NV'},
    { name: 'NEW HAMPSHIRE', iso: 'NH'},
    { name: 'NEW JERSEY', iso: 'NJ'},
    { name: 'NEW MEXICO', iso: 'NM'},
    { name: 'NEW YORK', iso: 'NY'},
    { name: 'NORTH CAROLINA', iso: 'NC'},
    { name: 'NORTH DAKOTA', iso: 'ND'},
    { name: 'NORTHERN MARIANA ISLANDS', iso: 'MP'},
    { name: 'OHIO', iso: 'OH'},
    { name: 'OKLAHOMA', iso: 'OK'},
    { name: 'OREGON', iso: 'OR'},
    { name: 'PALAU', iso: 'PW'},
    { name: 'PENNSYLVANIA', iso: 'PA'},
    { name: 'PUERTO RICO', iso: 'PR'},
    { name: 'RHODE ISLAND', iso: 'RI'},
    { name: 'SOUTH CAROLINA', iso: 'SC'},
    { name: 'SOUTH DAKOTA', iso: 'SD'},
    { name: 'TENNESSEE', iso: 'TN'},
    { name: 'TEXAS', iso: 'TX'},
    { name: 'UTAH', iso: 'UT'},
    { name: 'VERMONT', iso: 'VT'},
    { name: 'VIRGIN ISLANDS', iso: 'VI'},
    { name: 'VIRGINIA', iso: 'VA'},
    { name: 'WASHINGTON', iso: 'WA'},
    { name: 'WEST VIRGINIA', iso: 'WV'},
    { name: 'WISCONSIN', iso: 'WI'},
    { name: 'WYOMING', iso: 'WY' }
  ],

  // empty req used for req edit/publishing
  emptyReq : {
    // created: new Date,

    type: '',
    title: '',
    info: '',

    landOnly: false,
    landWithProperty: false,

    min_sqft: undefined,
    max_sqft: undefined,

    buy: false,
    buy_min_price: undefined,
    buy_max_price: undefined,

    exchange: false,
    exchange_min_price: undefined,
    exchange_max_price: undefined,

    lease: false,
    lease_min_price: undefined,
    lease_max_price: undefined,

    polygon: [],
    center: [],
    radius: 0,

    town: undefined,
    city: undefined,
    country_code: undefined,
    county: undefined,
    postcode: undefined,
    road: undefined,
    state: undefined,
    stateCode: undefined
    // active: true
  }

});
