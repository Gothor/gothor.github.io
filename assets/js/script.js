document.addEventListener('DOMContentLoaded', function() {
    let burger = document.getElementById('burger');
    burger.addEventListener('click', function() {
        if (document.body.className.search('menu-open') >= 0) {
            document.body.className = document.body.className.split(' ').filter(n => n != 'menu-open').join(' ');
        } else {
            document.body.className += ' menu-open';
        }
    });

    let video = document.getElementsByTagName('video');
    if (video.length !== 0) {
        video = video[0];
        video.controls = false;

        video.parentElement.addEventListener('click', function() {
            if (video.paused) {
                video.parentElement.className += ' playing';
                video.play();
            } else {
                video.parentElement.className = video.parentElement.className.split(' ').filter(n => n != 'playing').join(' ');
                video.pause();
            }
        });
    }
});