/* global hexo */

'use strict';

const assign = require('object-assign');

hexo.config.hexo_showcase = assign({
    showcase_dir: 'showcase'
}, hexo.config.hexo_showcase);

hexo.scaffold.get('showcase', (err) => {
    if (err) {
        hexo.scaffold.set('showcase', [
            '---',
            'layout: showcase',
            'title: {{ title }}',
            'date: {{ date }}',
            'permalink: showcases/:title/',
            '---'
        ].join('\n'), err => {
            if (err) console.warn('WARN  cannot set scaffold "showcase"');
        });
    }
});

hexo.extend.console.register('showcase', 'Create Showcase post', function (args) {
    // Display help message if user didn't input any arguments
    if (!args._.length) {
        return this.call('help', {_: ['showcase']});
    }

    const self = this;
    if (args._.length) args._[0] = 'showcase';
    return self.extend.console.get('new').call(self, args);
});

hexo.extend.generator.register('showcase', require('./lib/generator'));
