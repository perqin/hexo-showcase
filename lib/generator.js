'use strict';

module.exports = function (locals) {
    const config = this.config;
    let showcaseDir = config.hexo_showcase.showcase_dir;
    const allPosts = locals.posts.filter(post => {
        return post.layout === 'showcase';
    });

    if (!allPosts.length) return;

    if (showcaseDir[showcaseDir.length - 1] !== '/') showcaseDir += '/';

    console.log('Showcase posts: ', allPosts.map(post => { return post.title + '\n'; }).join(''));

    return {
        path: 'showcases/index.html',
        layout: ['archive', 'index'],
        data: {
            base: showcaseDir,
            total: 1,
            current: 1,
            current_url: showcaseDir,
            posts: allPosts,
            prev: 0,
            prev_link: '',
            next: 0,
            next_link: ''
        }
    };
};
