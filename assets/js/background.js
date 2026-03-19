(function () {
  'use strict';

  var VIDEOS = [
    'LSPuJ9ggVcA', // Skyrim Special Edition gameplay — Bethesda Softworks
    '4igb7__IrfA', // MW2 campaign gameplay — GameSpot
    'PsOPKZU5ZAA'  // FIFA 16 Gamescom gameplay — PS360HD
  ];

  var KEY = 'hero_video_index';
  var next = (parseInt(localStorage.getItem(KEY) || '0', 10) + 1) % VIDEOS.length;
  localStorage.setItem(KEY, next);
  var id = VIDEOS[next];

  var iframe = document.getElementById('hero-iframe');
  if (!iframe) return;

  // autoplay=1, mute=1, loop=1, controls=0, disablekb=1, playlist repeats the single video
  iframe.src = 'https://www.youtube-nocookie.com/embed/' + id
    + '?autoplay=1&mute=1&loop=1&playlist=' + id
    + '&controls=0&disablekb=1&modestbranding=1&rel=0&iv_load_policy=3&start=5';
}());
