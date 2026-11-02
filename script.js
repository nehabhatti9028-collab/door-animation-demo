(function () {
  var COLORS = ['#b3433f','#3f6fb0','#7da043','#7a58a0','#e08a3c','#3fa3b8','#c9a13a'];

  /* background stars + fireflies */
  var sky = document.getElementById('stars');
  for (var s = 0; s < 70; s++) {
    var st = document.createElement('div');
    st.className = 'star';
    st.style.left = Math.random() * 100 + '%';
    st.style.top = Math.random() * 100 + '%';
    st.style.animationDelay = (Math.random() * 4) + 's';
    st.style.animationDuration = (3 + Math.random() * 4) + 's';
    sky.appendChild(st);
  }
  for (var f = 0; f < 14; f++) {
    var ff = document.createElement('div');
    ff.className = 'firefly';
    ff.style.left = Math.random() * 100 + '%';
    ff.style.top = (30 + Math.random() * 65) + '%';
    ff.style.animationDelay = (Math.random() * 12) + 's';
    ff.style.animationDuration = (9 + Math.random() * 8) + 's';
    sky.appendChild(ff);
  }

  /* the 20 doors */
  var grid = document.getElementById('grid');
  for (var n = 1; n <= 20; n++) {
    grid.appendChild(makeDoor(n));
  }

  function makeDoor(n) {
    var item = document.createElement('div');
    item.className = 'item';

    var frame = document.createElement('div');
    frame.className = 'frame';
    frame.tabIndex = 0;
    frame.setAttribute('role', 'button');
    frame.setAttribute('aria-pressed', 'false');
    frame.setAttribute('aria-label', 'Open door ' + n);

    var scene = document.createElement('div');
    scene.className = 'scene';

    var room = document.createElement('div');
    room.className = 'room';
    for (var r = 0; r < 3; r++) {
      var shelf = document.createElement('div');
      shelf.className = 'shelf';
      for (var b = 0; b < 6; b++) {
        var book = document.createElement('div');
        book.className = 'book';
        book.style.setProperty('--i', b + r * 2);
        book.style.background = COLORS[(b + r * 2 + n) % COLORS.length];
        book.style.height = (20 + ((b * 7 + r * 5 + n * 3) % 18)) + 'px';
        shelf.appendChild(book);
      }
      room.appendChild(shelf);
    }

    var door = document.createElement('div');
    door.className = 'door';
    var knob = document.createElement('span');
    knob.className = 'knob';
    door.appendChild(knob);

    scene.appendChild(room);
    scene.appendChild(door);
    frame.appendChild(scene);

    for (var k = 0; k < 9; k++) {
      var sp = document.createElement('span');
      sp.className = 'spark';
      sp.style.left = (14 + Math.random() * 72) + '%';
      sp.style.setProperty('--d', (Math.random() * 3.5).toFixed(2) + 's');
      sp.style.setProperty('--x', (Math.random() * 50 - 25).toFixed(0) + 'px');
      frame.appendChild(sp);
    }

    function toggle() {
      var open = frame.classList.toggle('open');
      frame.setAttribute('aria-pressed', open ? 'true' : 'false');
    }
    frame.addEventListener('click', toggle);
    frame.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    var cap = document.createElement('div');
    cap.className = 'caption';
    cap.textContent = 'Mail Club ' + n;

    item.appendChild(frame);
    item.appendChild(cap);
    return item;
  }
})();