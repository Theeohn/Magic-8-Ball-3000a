// =============================================================================
//  Name: magic 8 Ball
//  Author: Theeohn Megistus
//  License: MIT
//  Repository: https://github.com/Theeohn/Magic-8-Ball-3000a-
// =============================================================================

(function() {
  const C = {
    ANSWERS: [
      "Yes",
      "It is certain",
      "It is decidedly so",
      "Without a doubt",
      "Yes, definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Signs point to yes",
      "Reply hazy, try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Don't count on it",
      "Very doubtful",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
    ],
    GAPS: [60, 70, 90, 120, 160, 210, 270]
  };

  let shaking = 0, step = 0, timer, idx = Math.randInt(C.ANSWERS.length), cache = [];

  function getLines(i) {
    if (cache[i]) return cache[i];
    return (cache[i] = h.setFontMonofonto28().wrapString(C.ANSWERS[i], 154));
  }

  function draw(jx, jy, i) {  "ram";
   h.clearRect(0, 0, 480, 320);
   h.setColor(2).fillCircle(240 + jx, 160 + jy, 156);
   h.setColor(3).drawCircle(240 + jx, 160 + jy, 156);
   h.setColor(0).fillCircle(240 + jx, 160 + jy, 111);
   h.setColor(3).drawCircle(240 + jx, 160 + jy, 111);
   if (i >= 0) {
     const lines = getLines(i), n = lines.length, y0 = 160 + jy - (n - 1) * 16;
     h.setClipRect(160 + jx, 80 + jy, 320 + jx, 240 + jy);
     h.setColor(3).setFontMonofonto28().setFontAlign(0, 0);
     for (let k = 0; k < n; k++) h.drawString(lines[k], 240 + jx, y0 + k * 32);
     h.setClipRect(0, 0, 480, 320);
    }

    h.setColor(3).setFontMonofonto23().setFontAlign(-1, -1);
    h.drawString("Magic", 20, 18);
    h.drawString("8 Ball", 20, 46);
    
    h.setColor(2).setFontMonofonto14().setFontAlign(-1, -1);
    h.drawString("by Theeohn", 26, 72);

    h.setColor(2).setFontMonofonto14().setFontAlign(1, 1);
    h.drawString("Shake or use", 461, 279);
    h.drawString("a wheel to ask!", 461, 295);

    h.flip();
    Pip.lastFlip = getTime();
  }

  function finish() {
    shaking = 0;
    idx = Math.randInt(C.ANSWERS.length);
    draw(0, 0, idx);
  }

  function clickStep() {  "ram";
    Pip.playSound("SCROLL");
    draw(Math.randInt(11) - 5, Math.randInt(11) - 5, -1);
    step++;
    if (step < 8) timer = setTimeout(clickStep, C.GAPS[step - 1]);
    else finish();
  }

  function shake() {
    if (shaking) return;
    shaking = 1;
    step = 0;
    clickStep();
  }

  function onKnob1(dir) {
    if (dir === 0) shake();
    if (dir) shake();
  }

  function onKnob2(dir) {
    if (dir) shake();
  }

  Pip.onExclusive("knob1", onKnob1);
  Pip.onExclusive("knob2", onKnob2);
  draw(0, 0, idx);

  return {
    id: "MAGIC8BALL",
    notDefault: true,
    fullscreen: true,
    remove: function() {
      clearTimeout(timer);
      Pip.removeListener("knob1", onKnob1);
      Pip.removeListener("knob2", onKnob2);
      Pip.audioStop();
      h.clear();
    }
  };
});