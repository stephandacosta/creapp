/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import BuyReq from '../api/buyreq/buyreq.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Buyers',
      info: 'Publish your requirements and find new contacts'
    }, {
      name: 'Sellers',
      info: 'Search requirements from qualified buyer.'
    });
  });

BuyReq.find({}).removeAsync()
  .then(() => {
    BuyReq.create({
      // _reqId: new mongoose.Types.ObjectId,
      created: new Date,
      user: 'somedude@somemail.com',
      title: 'a piece of land in the fields',
      info: 'I am looking for something cheap but this test is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: true,
      landWithProperty: true,
      type: 'Agriculture',

      price: 2.4,
      sqft: 100, 

      buy: true,
      exchange: false,

      polygons: [
                  [
                    [
                      37.520618678869305,
                      -122.2613525390625
                    ],
                    [
                      37.51626173528878,
                      -122.25311279296874
                    ],
                    [
                      37.48139702942734,
                      -122.2613525390625
                    ],
                    [
                      37.49338360812417,
                      -122.27783203125
                    ],
                    [
                      37.5238862196042,
                      -122.28195190429686
                    ],
                    [
                      37.520618678869305,
                      -122.2613525390625
                    ]
                  ],
                  [
                    [
                      37.54022177661216,
                      -122.310791015625
                    ],
                    [
                      37.51299386065851,
                      -122.31765747070314
                    ],
                    [
                      37.505368263398104,
                      -122.34100341796875
                    ],
                    [
                      37.51626173528878,
                      -122.35198974609375
                    ],
                    [
                      37.55328764595765,
                      -122.34374999999999
                    ],
                    [
                      37.54022177661216,
                      -122.310791015625
                    ]
                  ],
                  [
                    [
                      37.58267747761301,
                      -122.37808227539061
                    ],
                    [
                      37.58158917213053,
                      -122.38906860351562
                    ],
                    [
                      37.59682400108367,
                      -122.40142822265625
                    ],
                    [
                      37.60117623656667,
                      -122.3712158203125
                    ],
                    [
                      37.58267747761301,
                      -122.37808227539061
                    ]
                  ]
                ],
      active: true
    }, {
      // _reqId: new mongoose.Types.ObjectId,
      created: new Date,
      user: 'someotherdude@somemail.com',
      title: 'a restaurant',
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      price: 2.4,
      sqft: 100, 

      buy: true,
      exchange: false,

      polygons: [
                  [
                    [
                      37.42034463389752,
                      -122.02377319335938
                    ],
                    [
                      37.41270958119496,
                      -122.01965332031249
                    ],
                    [
                      37.391981943533516,
                      -122.04025268554688
                    ],
                    [
                      37.39307301476918,
                      -122.05261230468751
                    ],
                    [
                      37.4039828536417,
                      -122.07595825195312
                    ],
                    [
                      37.434521952377736,
                      -122.09243774414062
                    ],
                    [
                      37.42034463389752,
                      -122.02377319335938
                    ]
                  ],
                  [
                    [
                      37.48466628708502,
                      -122.25036621093749
                    ],
                    [
                      37.472678309670826,
                      -122.26684570312499
                    ],
                    [
                      37.47594794878128,
                      -122.28332519531249
                    ],
                    [
                      37.505368263398104,
                      -122.28607177734376
                    ],
                    [
                      37.48466628708502,
                      -122.25036621093749
                    ]
                  ],
                  [
                    [
                      37.71533133102705,
                      -122.42202758789061
                    ],
                    [
                      37.714244967649265,
                      -122.4481201171875
                    ],
                    [
                      37.74900069437069,
                      -122.44400024414062
                    ],
                    [
                      37.75334401310656,
                      -122.43438720703125
                    ],
                    [
                      37.71533133102705,
                      -122.42202758789061
                    ]
                  ]
                ],
      active: true
    }, {
      // _reqId: new mongoose.Types.ObjectId,
      created: new Date,
      user: 'someotherdude@somemail.com',
      title: 'a restaurant',
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      price: 1.2,
      sqft: 70, 

      buy: true,
      exchange: false,

      polygons: [
                  [
                    [
                      37.461778479617465,
                      -121.805419921875
                    ],
                    [
                      37.43670283999782,
                      -121.8218994140625
                    ],
                    [
                      37.4356124041315,
                      -121.85623168945312
                    ],
                    [
                      37.46831856835604,
                      -121.86035156249999
                    ],
                    [
                      37.472678309670826,
                      -121.82327270507812
                    ],
                    [
                      37.461778479617465,
                      -121.805419921875
                    ]
                  ]
                ],
      active: true
    }, {
      // _reqId: new mongoose.Types.ObjectId,
      created: new Date,
      user: 'someotherdude@somemail.com',
      title: 'a restaurant',
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      price: 1.2,
      sqft: 70, 

      buy: true,
      exchange: false,

      polygons: [
                  [
                    [
                      37.36360851770406,
                      -122.05673217773438
                    ],
                    [
                      37.35815085913536,
                      -122.03475952148436
                    ],
                    [
                      37.323212446730174,
                      -122.03750610351564
                    ],
                    [
                      37.323212446730174,
                      -122.09243774414062
                    ],
                    [
                      37.3319485736073,
                      -122.10891723632812
                    ],
                    [
                      37.38870863454208,
                      -122.10205078125
                    ],
                    [
                      37.36360851770406,
                      -122.05673217773438
                    ]
                  ],
                  [
                    [
                      37.75551557687061,
                      -122.16659545898438
                    ],
                    [
                      37.73705525336632,
                      -122.16934204101562
                    ],
                    [
                      37.73053874574077,
                      -122.18856811523436
                    ],
                    [
                      37.73488314788311,
                      -122.2119140625
                    ],
                    [
                      37.7761422535397,
                      -122.19818115234375
                    ],
                    [
                      37.75551557687061,
                      -122.16659545898438
                    ]
                  ]
                ],
      active: true
    }, {
      // _reqId: new mongoose.Types.ObjectId,
      created: new Date,
      user: 'someotherdude@somemail.com',
      title: 'a restaurant',
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      price: 1.2,
      sqft: 70, 

      buy: true,
      exchange: false,

      polygons: [
                  [
                    [
                      37.75979065676543,
                      -122.39559173583984
                    ],
                    [
                      37.75619417747575,
                      -122.39627838134766
                    ],
                    [
                      37.754565525566484,
                      -122.3997116088867
                    ],
                    [
                      37.75958708713444,
                      -122.40254402160645
                    ],
                    [
                      37.76053707395284,
                      -122.39876747131348
                    ],
                    [
                      37.75979065676543,
                      -122.39559173583984
                    ]
                  ],
                  [
                    [
                      37.765693932366844,
                      -122.41267204284668
                    ],
                    [
                      37.764811863655154,
                      -122.41498947143556
                    ],
                    [
                      37.76440475147078,
                      -122.42202758789061
                    ],
                    [
                      37.76847577247014,
                      -122.4228000640869
                    ],
                    [
                      37.76922210201122,
                      -122.41284370422362
                    ],
                    [
                      37.765693932366844,
                      -122.41267204284668
                    ]
                  ]
                ],
      active: true
    }, {
      // _reqId: new mongoose.Types.ObjectId,
      created: new Date,
      user: 'someotherdude@somemail.com',
      title: 'a restaurant',
      info: 'I am looking for a cool place but this text is a really long input to show what 500 words can do and blaaaa aaa aaaaaa aaaaaaaaa aaaaaa aaaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaa aaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaa a aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa a aaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaa aaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaaaaaa',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      landOnly: false,
      landWithProperty: true,
      type: 'Leisure',

      price: 1.2,
      sqft: 70, 

      buy: true,
      exchange: false,

      polygons: [
                  [
                    [
                      38.62223527691723,
                      -121.43669128417969
                    ],
                    [
                      38.61901643727863,
                      -121.4373779296875
                    ],
                    [
                      38.61606570737124,
                      -121.44424438476564
                    ],
                    [
                      38.617943458629746,
                      -121.44664764404295
                    ],
                    [
                      38.62330819136028,
                      -121.44664764404295
                    ],
                    [
                      38.62223527691723,
                      -121.43669128417969
                    ]
                  ]
                ],
      active: true
    });

  });



