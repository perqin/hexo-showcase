/* global hexo */

'use strict';

const assign = require('object-assign');
var tildify = require('tildify');
var chalk = require('chalk');

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
    // // Display help message if user didn't input any arguments
    // if (!args._.length) {
    //     return this.call('help', {_: ['showcase']});
    // }
    //
    // const self = this;
    // if (args._.length) args._[0] = 'showcase';
    // return self.extend.console.get('new').call(self, args);


    var reservedKeys = {
        _: true,
        title: true,
        layout: true,
        slug: true,
        path: true,
        replace: true,
        // Global options
        config: true,
        debug: true,
        safe: true,
        silent: true
    };

    // Display help message if user didn't input any arguments
    if (!args._.length) {
        return this.call('help', {_: ['new']});
    }

    var data = {
        title: args._.pop(),
        layout: 'showcase',
        slug: args.s || args.slug
    };
    data.path = 'showcase/' + data.title;

    var keys = Object.keys(args);
    var key = '';
    var self = this;

    for (var i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        if (!reservedKeys[key]) data[key] = args[key];
    }

    return this.post.create(data, args.r || args.replace).then(function(post) {
        self.log.info('Created: %s', chalk.magenta(tildify(post.path)));
    });
});

hexo.extend.generator.register('showcase', require('./lib/generator'));
