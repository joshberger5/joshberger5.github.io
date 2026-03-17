(function () {
  'use strict';

  var THEMES = ['starfield', 'skyrim', 'battlefield', 'fifa'];
  var theme  = THEMES[Math.floor(Math.random() * THEMES.length)];

  var canvas = document.createElement('canvas');
  canvas.id  = 'bg-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext('2d');

  var W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // ── Theme 1: Starfield (Star Wars hyperspace) ─────────────
  function runStarfield() {
    var N     = 180;
    var speed = 6;
    var stars = [];

    function reset(s) {
      s.x  = (Math.random() - 0.5) * W * 2;
      s.y  = (Math.random() - 0.5) * H * 2;
      s.z  = W;
      s.pz = W;
    }

    for (var i = 0; i < N; i++) {
      var s = {};
      reset(s);
      s.z = Math.random() * W;
      stars.push(s);
    }

    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, W, H);

    function draw() {
      ctx.fillStyle = 'rgba(13,17,23,0.20)';
      ctx.fillRect(0, 0, W, H);

      var cx = W / 2, cy = H / 2;
      stars.forEach(function (s) {
        s.pz  = s.z;
        s.z  -= speed;
        if (s.z <= 0) { reset(s); return; }

        var sx = (s.x / s.z) * W + cx;
        var sy = (s.y / s.z) * W + cy;
        var px = (s.x / s.pz) * W + cx;
        var py = (s.y / s.pz) * W + cy;

        if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) { reset(s); return; }

        var progress = 1 - s.z / W;
        var alpha    = progress * 0.85;
        var size     = progress * 2.5;

        ctx.strokeStyle = 'rgba(88,166,255,' + alpha + ')';
        ctx.lineWidth   = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  // ── Theme 2: Skyrim (Snow + Aurora borealis) ──────────────
  function runSkyrim() {
    var N      = 160;
    var flakes = [];

    for (var i = 0; i < N; i++) {
      flakes.push({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.8 + 0.4,
        speed: Math.random() * 1.2 + 0.4,
        drift: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    var t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.004;

      // Aurora curtains
      for (var b = 0; b < 3; b++) {
        var hue  = 150 + b * 45 + Math.sin(t + b) * 30;
        var xOff = Math.sin(t * 0.6 + b * 2.1) * W * 0.12;
        var grad = ctx.createLinearGradient(0, 0, 0, H * 0.48);
        grad.addColorStop(0,   'hsla(' + hue + ',65%,52%,0.11)');
        grad.addColorStop(0.5, 'hsla(' + hue + ',55%,42%,0.05)');
        grad.addColorStop(1,   'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(xOff, 0, W * 0.85, H * 0.48);
      }

      // Snowflakes
      flakes.forEach(function (f) {
        f.y += f.speed;
        f.x += f.drift + Math.sin(t + f.r) * 0.2;
        if (f.y > H + 5)  { f.y = -5; f.x = Math.random() * W; }
        if (f.x > W + 5)  f.x = -5;
        if (f.x < -5)     f.x = W + 5;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(230,237,243,' + f.alpha + ')';
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  // ── Theme 3: Battlefield 1 (Rising embers + smoke) ────────
  function runBattlefield() {
    var N      = 130;
    var embers = [];

    function spawnEmber() {
      return {
        x:     Math.random() * W,
        y:     H + 10,
        vx:    (Math.random() - 0.5) * 1.2,
        vy:    -(Math.random() * 1.8 + 0.5),
        r:     Math.random() * 1.8 + 0.3,
        life:  1,
        decay: Math.random() * 0.006 + 0.002,
        hue:   12 + Math.random() * 28
      };
    }

    for (var i = 0; i < N; i++) {
      var e = spawnEmber();
      e.y = Math.random() * H;
      embers.push(e);
    }

    var t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.003;

      // Smoke haze at bottom
      var grad = ctx.createLinearGradient(0, H * 0.52, 0, H);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, 'rgba(110,55,15,' + (0.08 + Math.sin(t) * 0.025) + ')');
      ctx.fillStyle = grad;
      ctx.fillRect(0, H * 0.52, W, H * 0.48);

      // Embers
      embers.forEach(function (e, idx) {
        e.x    += e.vx + Math.sin(t + idx * 0.31) * 0.15;
        e.y    += e.vy;
        e.life -= e.decay;

        if (e.life <= 0 || e.y < -10) { embers[idx] = spawnEmber(); return; }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + e.hue + ',90%,62%,' + (e.life * 0.65) + ')';
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  // ── Theme 4: FIFA (Rain + stadium floodlights + pitch) ────
  function runFifa() {
    var N    = 220;
    var drops = [];

    function spawnDrop() {
      return {
        x:     Math.random() * (W + 200),
        y:    -Math.random() * H,
        len:   Math.random() * 14 + 6,
        speed: Math.random() * 5 + 4,
        alpha: Math.random() * 0.11 + 0.03
      };
    }

    for (var i = 0; i < N; i++) {
      drops.push(spawnDrop());
      drops[i].y = Math.random() * H;
    }

    var t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.006;

      // Floodlights from top-left and top-right
      var gAlpha = 0.06 + Math.sin(t * 0.5) * 0.015;
      var lGrad  = ctx.createRadialGradient(-W * 0.05, -H * 0.05, 20, -W * 0.05, -H * 0.05, W * 0.9);
      lGrad.addColorStop(0, 'rgba(255,252,210,' + gAlpha * 2.2 + ')');
      lGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = lGrad;
      ctx.fillRect(0, 0, W, H);

      var rGrad = ctx.createRadialGradient(W * 1.05, -H * 0.05, 20, W * 1.05, -H * 0.05, W * 0.9);
      rGrad.addColorStop(0, 'rgba(255,252,210,' + gAlpha * 2.2 + ')');
      rGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = rGrad;
      ctx.fillRect(0, 0, W, H);

      // Pitch glow at bottom
      var pGrad = ctx.createLinearGradient(0, H * 0.62, 0, H);
      pGrad.addColorStop(0, 'transparent');
      pGrad.addColorStop(1, 'rgba(63,185,80,0.08)');
      ctx.fillStyle = pGrad;
      ctx.fillRect(0, H * 0.62, W, H * 0.38);

      // Rain streaks
      ctx.save();
      ctx.lineWidth = 0.8;
      drops.forEach(function (d, idx) {
        d.x -= d.speed * 0.35;
        d.y += d.speed;
        if (d.y > H + 10 || d.x < -20) { drops[idx] = spawnDrop(); return; }

        ctx.globalAlpha = d.alpha;
        ctx.strokeStyle = 'rgba(180,215,255,1)';
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * 0.3, d.y - d.len);
        ctx.stroke();
      });
      ctx.restore();

      requestAnimationFrame(draw);
    }

    draw();
  }

  // ── Dispatch ──────────────────────────────────────────────
  switch (theme) {
    case 'starfield':   runStarfield();   break;
    case 'skyrim':      runSkyrim();      break;
    case 'battlefield': runBattlefield(); break;
    case 'fifa':        runFifa();        break;
  }
}());
