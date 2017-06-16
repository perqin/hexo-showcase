/* global hexo */

'use strict';

const assign = require('object-assign');

hexo.config.hexo_showcase = assign({
    showcase_dir: 'showcase'
}, hexo.config.hexo_showcase);

// hexo.extend.console.register('showcase', 'Create Showcase post', function (args) {
//     const self = this;
//     args.p = 'showcase'
//     return self.extend.console.get('new').call(self, {
//         //
//     });
// });

hexo.extend.generator.register('showcase', require('./lib/generator'));
