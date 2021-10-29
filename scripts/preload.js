var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(b) {
    var a = function() {};
    a.prototype = b;
    return new a
};
$jscomp.underscoreProtoCanBeSet = function() {
    var b = {
            a: !0
        },
        a = {};
    try {
        return a.__proto__ = b, a.a
    } catch (c) {}
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(b, a) {
    b.__proto__ = a;
    if (b.__proto__ !== a) throw new TypeError(b + " is not extensible");
    return b
} : null;
$jscomp.inherits = function(b, a) {
    b.prototype = $jscomp.objectCreate(a.prototype);
    b.prototype.constructor = b;
    if ($jscomp.setPrototypeOf) {
        var c = $jscomp.setPrototypeOf;
        c(b, a)
    } else
        for (c in a)
            if ("prototype" != c)
                if (Object.defineProperties) {
                    var d = Object.getOwnPropertyDescriptor(a, c);
                    d && Object.defineProperty(b, c, d)
                } else b[c] = a[c];
    b.superClass_ = a.prototype
};
var Load = function() {
    return Phaser.Scene.call(this, "preload") || this
};
$jscomp.inherits(Load, Phaser.Scene);
Load.prototype.preload = function() {
    var b = this;
    if (CloudAPI.logos.active()) {
        var a = CloudAPI.logos.list();
        console.log(a)
    }
    a && this.load.image("logo", a.horizontal);
    this.add.sprite(360, 540, "bg_menu");
    this.add.sprite(0, 0, "header").setOrigin(0);
    this.add.sprite(0, config.height, "footer").setOrigin(0, 1);
    this.add.sprite(360, 315, "game_title");
    var c = this.add.rectangle(config.width / 2, 600, 600, 20);
    c.setStrokeStyle(4, 16777215);
    c.alpha = .7;
    var d = this.add.rectangle(config.width / 2, 600, 590, 10, 16777215);
    d.alpha = .8;
    this.load.on("progress",
        function(a) {
            d.width = 590 * a
        });
    this.load.on("complete", function() {
        c.destroy();
        d.destroy();
        var a = draw_button(360, 700, "start", b);
        b.tweens.add({
            targets: a,
            alpha: .5,
            yoyo: !0,
            duration: 300,
            loop: -1
        })
    }, this);
    this.input.on("gameobjectdown", function() {
        b.scene.start("menu")
    }, this);
    this.load.image("bg_game", "img/bg_game.png");
    this.load.image("window_big", "img/window_big.png");
    this.load.image("window_small", "img/window_small.png");
    this.load.image("coin_bar", "img/coin_bar.png");
    this.load.image("level_bar", "img/level_bar.png");
    this.load.spritesheet("lamp", "img/lamp.png", {
        frameWidth: 144,
        frameHeight: 144
    });
    this.load.spritesheet("guide", "img/guide.png", {
        frameWidth: 124,
        frameHeight: 280
    });
    this.load.image("tile0", "img/tile0.png");
    this.load.image("tile1", "img/tile1.png");
    this.load.image("tile2", "img/tile2.png");
    this.load.image("tile3", "img/tile3.png");
    this.load.image("btn_hint", "img/btn_hint.png");
    this.load.image("btn_more", "img/btn_more.png");
    this.load.image("btn_next", "img/btn_next.png");
    this.load.image("btn_home", "img/btn_home.png");
    this.load.image("btn_exit", "img/btn_exit.png");
    this.load.image("btn_close", "img/btn_close.png");
    this.load.image("btn_play", "img/btn_play.png");
    this.load.image("btn_pay_hint", "img/btn_pay_hint.png");
    this.load.image("btn_sound_on", "img/btn_sound_on.png");
    this.load.image("btn_sound_off", "img/btn_sound_off.png");
    this.load.image("btn_close_small", "img/btn_close_small.png");
    for (a = 1; 15 >= a; a++) this.load.image(String(a), "img/" + a + ".png"), this.load.image(String(a + "x"), "img/" + a + "x.png");
    for (a = 1; a <= game_data.total_level; a++) this.load.json("level-" +
        a, "level/level-" + a + ".json");
    this.load.audio("completed", "audio/completed.mp3");
    this.load.audio("click", "audio/click.mp3");
    this.load.audio("fill", "audio/fill.mp3");
    this.load.audio("hint", "audio/hint.mp3");
    this.load.audio("pop", "audio/pop.mp3")
};