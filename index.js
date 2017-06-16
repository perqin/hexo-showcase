/* global hexo */

'use strict';

const assign = require('object-assign');

hexo.config.hexo_showcase = assign({
    showcase_dir: 'showcase'
}, hexo.config.hexo_showcase);

hexo.extend.generator.register('showcase', require('./lib/generator'));
