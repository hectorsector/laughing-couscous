var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
    var b = function() {};
    b.prototype = a;
    return new b
};
$jscomp.underscoreProtoCanBeSet = function() {
    var a = {
            a: !0
        },
        b = {};
    try {
        return b.__proto__ = a, b.a
    } catch (d) {}
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
    return a
} : null;
$jscomp.inherits = function(a, b) {
    a.prototype = $jscomp.objectCreate(b.prototype);
    a.prototype.constructor = a;
    if ($jscomp.setPrototypeOf) {
        var d = $jscomp.setPrototypeOf;
        d(a, b)
    } else
        for (d in b)
            if ("prototype" != d)
                if (Object.defineProperties) {
                    var c = Object.getOwnPropertyDescriptor(b, d);
                    c && Object.defineProperty(a, d, c)
                } else a[d] = b[d];
    a.superClass_ = b.prototype
};
var Menu = function() {
    return Phaser.Scene.call(this, "menu") || this
};
$jscomp.inherits(Menu, Phaser.Scene);
Menu.prototype.create = function() {
    var a = this;
    this.add.sprite(360, 540, "bg_menu");
    this.add.sprite(0, 0, "header").setOrigin(0);
    this.add.sprite(0, config.height, "footer").setOrigin(0, 1);
    this.add.sprite(230, 50, "coin_bar");
    this.add.text(320, 50, String(game_data.coin), {
        fontFamily: "robotomono",
        fontSize: 31,
        align: "right",
        color: "#fff"
    }).setOrigin(1, .5);
    var b = draw_button(50, 50, "sound_on", this);
    b.name = "sound";
    check_audio(b);
    this.add.sprite(360, 315, "game_title");
    draw_button(360, 680, "play", this);
    draw_button(360, 790,
        "more", this);
    b = this.add.sprite(360, 960, "logo").setInteractive();
    b.name = "logo";
    b.setScale(.5);
    this.input.on("gameobjectdown", function(b, c) {
            "more" === c.name && CloudAPI.links.active() && window.open(CloudAPI.links.list().games);
            "logo" === c.name ? CloudAPI.links.active() && window.open(CloudAPI.links.list().logo) : c.button && (play_sound("click", a), a.tweens.add({
                targets: c,
                scaleX: .95,
                scaleY: .95,
                yoyo: !0,
                duration: 100,
                ease: "Linear",
                onComplete: function() {
                    "play" === c.name ? a.scene.start("game") : "sound" === c.name && switch_audio(c)
                }
            }))
        },
        this)
};

function switch_audio(a) {
    game_data[a.name] ? (game_data[a.name] = !1, a.setTexture("btn_sound_off")) : (game_data[a.name] = !0, a.setTexture("btn_sound_on"))
}

function check_audio(a) {
    game_data[a.name] ? a.setTexture("btn_sound_on") : a.setTexture("btn_sound_off")
};