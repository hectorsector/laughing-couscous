var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(e) {
    var g = function() {};
    g.prototype = e;
    return new g
};
$jscomp.underscoreProtoCanBeSet = function() {
    var e = {
            a: !0
        },
        g = {};
    try {
        return g.__proto__ = e, g.a
    } catch (p) {}
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(e, g) {
    e.__proto__ = g;
    if (e.__proto__ !== g) throw new TypeError(e + " is not extensible");
    return e
} : null;
$jscomp.inherits = function(e, g) {
    e.prototype = $jscomp.objectCreate(g.prototype);
    e.prototype.constructor = e;
    if ($jscomp.setPrototypeOf) {
        var p = $jscomp.setPrototypeOf;
        p(e, g)
    } else
        for (p in g)
            if ("prototype" != p)
                if (Object.defineProperties) {
                    var w = Object.getOwnPropertyDescriptor(g, p);
                    w && Object.defineProperty(e, p, w)
                } else e[p] = g[p];
    e.superClass_ = g.prototype
};
var play_count = 2,
    show_at = 4,
    game_data = {
        cur_level: 1,
        coin: 0,
        total_level: 2,
        sound: !0,
        hint_cost: 6
    },
    local_data = localStorage.getItem("redfoc_connector");
local_data && (game_data = JSON.parse(local_data));
var first_play = 1,
    Game = function() {
        return Phaser.Scene.call(this, "game") || this
    };
$jscomp.inherits(Game, Phaser.Scene);
Game.prototype.create = function() {
    function e() {
        for (var b = x.getLength(), a = x.getChildren(), h = 0; h < b; h++) {
            var f = a[h];
            if (3 != u.array[f.pos.y][f.pos.x][1]) {
                var k = Math.floor(4 * Math.random()),
                    c = 0;
                1 === k ? c = 90 : 2 === k ? c = 180 : 3 === k && (c = 270);
                f.rotate = c;
                r[f.pos.y][f.pos.x].type = p(f.type, f.rotate);
                f.rotation = Math.PI / 180 * f.rotate
            }
        }
        w(0, !0) && e()
    }

    function g(b) {
        if (1 === b) return 0;
        if (2 === b) return 90;
        if (3 === b) return 180;
        if (4 === b) return 270;
        if (5 === b) return 0;
        if (6 === b) return 90;
        if (7 === b || 8 === b) return 0;
        if (9 === b) return 90;
        if (10 ===
            b) return 180;
        if (11 === b) return 270;
        if (12 === b) return 0;
        if (13 === b) return 90;
        if (14 === b) return 180;
        if (15 === b) return 270
    }

    function p(b, a) {
        if (1 === b) {
            if (0 === a) return 1;
            if (90 === a) return 2;
            if (180 === a) return 3;
            if (270 === a) return 4
        } else if (5 === b) {
            if (0 === a) return 5;
            if (90 === a) return 6;
            if (180 === a) return 5;
            if (270 === a) return 6
        } else {
            if (7 === b) return 7;
            if (8 === b) {
                if (0 === a) return 8;
                if (90 === a) return 9;
                if (180 === a) return 10;
                if (270 === a) return 11
            } else if (12 === b) {
                if (0 === a) return 12;
                if (90 === a) return 13;
                if (180 === a) return 14;
                if (270 ===
                    a) return 15
            }
        }
    }

    function w(b, a) {
        for (var h = 0, f = 0; f < D; f++)
            for (var k = 0; k < A; k++)
                if (8 <= r[f][k].type && 11 >= r[f][k].type) {
                    h++;
                    var c = void 0;
                    8 === r[f][k].type ? c = {
                        x: -1,
                        y: 0
                    } : 9 === r[f][k].type ? c = {
                        x: 0,
                        y: -1
                    } : 10 === r[f][k].type ? c = {
                        x: 1,
                        y: 0
                    } : 11 === r[f][k].type && (c = {
                        x: 0,
                        y: 1
                    });
                    I(k, f, c, 0, b)
                }
        if (h === E) {
            if (E = 0, b || a || K(), a) return !0
        } else E = 0
    }

    function I(b, a, h, f, k) {
        f++;
        var c = !1,
            e = !1;
        if (0 <= b + h.x && b + h.x < A && 0 <= a + h.y && a + h.y < D) {
            var l = r[a + h.y][b + h.x];
            if (0 === h.x && -1 === h.y)
                if (1 === l.type) {
                    var d = {
                        x: 1,
                        y: 0
                    };
                    c = !0
                } else 2 === l.type ? (d = {
                        x: -1,
                        y: 0
                    },
                    c = !0) : 6 === l.type ? (d = {
                    x: 0,
                    y: -1
                }, c = !0) : 7 === l.type ? (d = {
                    x: 0,
                    y: -1
                }, c = !0) : 15 === l.type && (e = !0);
            else 1 === h.x && 0 === h.y ? 2 === l.type ? (d = {
                x: 0,
                y: 1
            }, c = !0) : 3 === l.type ? (d = {
                x: 0,
                y: -1
            }, c = !0) : 5 === l.type ? (d = {
                x: 1,
                y: 0
            }, c = !0) : 7 === l.type ? (d = {
                x: 1,
                y: 0
            }, c = !0) : 12 === l.type && (e = !0) : 0 === h.x && 1 === h.y ? 3 === l.type ? (d = {
                x: -1,
                y: 0
            }, c = !0) : 4 === l.type ? (d = {
                x: 1,
                y: 0
            }, c = !0) : 6 === l.type ? (d = {
                x: 0,
                y: 1
            }, c = !0) : 7 === l.type ? (d = {
                x: 0,
                y: 1
            }, c = !0) : 13 === l.type && (e = !0) : -1 === h.x && 0 === h.y && (1 === l.type ? (d = {
                    x: 0,
                    y: 1
                }, c = !0) : 4 === l.type ? (d = {
                    x: 0,
                    y: -1
                }, c = !0) : 5 === l.type ?
                (d = {
                    x: -1,
                    y: 0
                }, c = !0) : 7 === l.type ? (d = {
                    x: -1,
                    y: 0
                }, c = !0) : 14 === l.type && (e = !0))
        }
        e ? (k && (k.push({
            id: f,
            x: b,
            y: a
        }), k.push({
            id: f + 1,
            x: b + h.x,
            y: a + h.y,
            lamp: !0
        })), E++) : c && (k && k.push({
            id: f,
            x: b,
            y: a
        }), I(b + h.x, a + h.y, d, f, k))
    }

    function K() {
        y = "completed";
        var b = [];
        w(b);
        for (var a = 1, d = 0, f = 0; f < b.length; f++) b[f].id > d && (d = b[f].id);
        var e = setInterval(function() {
            for (var c = 0; c < b.length; c++)
                if (b[c].id === a) {
                    for (var f = b[c], l = x.getLength(), h = x.getChildren(), k = 0; k < l; k++) {
                        var g = h[k];
                        g.pos.x === f.x && g.pos.y === f.y && g.setTexture(g.type + "x")
                    }
                    if (b[c].lamp)
                        for (f =
                            b[c].x, l = b[c].y, h = x.getLength(), k = x.getChildren(), g = 0; g < h; g++) {
                            var n = k[g];
                            12 === n.type && n.pos.x === f && n.pos.y === l && (n.setTexture("lamp"), n.play("lamp"))
                        }
                }
            a < d && play_sound("fill", m);
            a === d + 8 && (save_game(), play_sound("completed", m), m.add.rectangle(0, 0, 720, 1080, 0, .5).setOrigin(0), m.add.sprite(360, 540, "window_big"), m.add.text(360, 360, "Level " + (game_data.cur_level - 1) + "\ncompleted.", {
                fontFamily: "robotomono",
                fontSize: 50,
                align: "center",
                color: "#fff"
            }).setOrigin(.5), m.add.text(360, 460, "Bonus coin: +" + b.length, {
                fontFamily: "robotomono",
                fontSize: 35,
                align: "center",
                color: "#fff"
            }).setOrigin(.5), draw_button(360, 570, "next", m), draw_button(360, 690, "exit", m), clearInterval(e));
            a++
        }, 200);
        game_data.coin += b.length;
        game_data.cur_level++
    }

    function L() {
        G.clear(!0, !0);
        for (var b = [], a = x.getLength(), d = x.getChildren(), f = 0; f < a; f++) {
            var e = d[f];
            1 === u.array[e.pos.y][e.pos.x][1] && b.push(e)
        }
        0 < b.length && setTimeout(function() {
            play_sound("hint", m);
            y = "play";
            var c = b[Math.floor(Math.random() * b.length)];
            c.rotate = g(Number(u.array[c.pos.y][c.pos.x][0]));
            r[c.pos.y][c.pos.x].type = p(c.type, c.rotate);
            r[c.pos.y][c.pos.x].angle = c.rotate;
            c.rotation = Math.PI / 180 * c.rotate;
            a = H.getLength();
            d = H.getChildren();
            for (var f = 0; f < a; f++) {
                var e = d[f];
                e.pos.x === c.pos.x && e.pos.y === c.pos.y && (u.array[e.pos.y][e.pos.x][1] = 3, e.setTexture("tile2"))
            }
            w()
        }, 400)
    }
    this.add.sprite(360, 540, "bg_game");
    this.add.sprite(0, 0, "header").setOrigin(0);
    this.add.sprite(0, config.height, "footer").setOrigin(0, 1);
    this.add.sprite(230, 50, "coin_bar");
    this.add.sprite(430, 50, "level_bar");
    this.anims.create({
        key: "lamp",
        frames: this.anims.generateFrameNumbers("lamp"),
        frameRate: 8,
        repeat: -1,
        yoyo: !0
    });
    this.anims.create({
        key: "guide",
        frames: this.anims.generateFrameNumbers("guide"),
        frameRate: 8,
        repeat: -1
    });
    var m = this,
        y = "play",
        n = this.add.container(),
        G = this.add.group(),
        J = this.add.group(),
        A = 5,
        D = 5,
        E = 0,
        x = this.add.group(),
        H = this.add.group(),
        u = this.cache.json.get("level-" + game_data.cur_level);
    A = u.width;
    D = u.height;
    n.setPosition(72, 220);
    for (var r = [], t = 0; t < D; t++) {
        for (var F = [], z = 0; z < A; z++) {
            var d = {
                type: 0,
                angle: 0
            };
            if (0 < u.array[t][z][0]) {
                d =
                    Number(u.array[t][z][0]);
                var v = this.add.sprite(144 * z, 144 * t, "tile" + u.array[t][z][1]);
                v.pos = {
                    x: z,
                    y: t
                };
                v.block = !0;
                v.type = d;
                H.add(v);
                n.add(v);
                var B = void 0,
                    q = 0;
                1 <= d && 4 >= d ? (B = "1", 2 === d ? q = 90 : 3 === d ? q = 180 : 4 === d && (q = 270)) : 5 <= d && 6 >= d ? (B = "5", 6 === d && (q = 90)) : 7 === d ? B = "7" : 8 <= d && 11 >= d ? (B = "8", 9 === d ? q = 90 : 10 === d ? q = 180 : 11 === d && (q = 270)) : 12 <= d && 15 >= d && (B = "12", 13 === d ? q = 90 : 14 === d ? q = 180 : 15 === d && (q = 270));
                d = {
                    type: Number(d),
                    angle: q
                };
                var C = this.add.sprite(v.x, v.y, B).setInteractive();
                C.tile = !0;
                C.pos = v.pos;
                C.type = Number(B);
                C.rotation =
                    Math.PI / 180 * q;
                C.rotate = q;
                n.add(C);
                x.add(C)
            } else v = this.add.sprite(144 * z, 144 * t, "tile0"), n.add(v);
            F.push(d)
        }
        r.push(F)
    }
    6 === A ? n.setScale(.8) : 7 === A ? n.setScale(.665) : 8 === A && (n.setScale(.61), n.x -= 20, n.y -= 20);
    draw_button(670, 50, "home", this);
    n = draw_button(570, 50, "sound_on", this);
    n.name = "sound";
    check_audio(n);
    draw_button(50, 50, "hint", this);
    var M = this.add.text(320, 50, String(game_data.coin), {
        fontFamily: "robotomono",
        fontSize: 31,
        align: "right",
        color: "#fff"
    }).setOrigin(1, .5);
    this.add.text(485, 50, "Lv." + game_data.cur_level, {
        fontFamily: "robotomono",
        fontSize: 31,
        align: "right",
        color: "#fff"
    }).setOrigin(1, .5);
    first_play && 1 === game_data.cur_level && (y = "guide", n = m.add.rectangle(0, 0, 720, 1080, 0, .5).setOrigin(0), t = this.add.sprite(360, 540, "guide"), t.play("guide"), t.setScale(2), F = draw_button(480, 270, "close_small", this), J.addMultiple([n, t, F]));
    this.input.on("gameobjectdown", function(b, a) {
        "play" === y && a.tile && 3 != u.array[a.pos.y][a.pos.x][1] && (play_sound("pop", m), a.rotate += 90, 360 <= a.rotate && (a.rotate = 0), r[a.pos.y][a.pos.x].type = p(a.type,
            a.rotate), a.rotation = Math.PI / 180 * a.rotate, w());
        a.button && (play_sound("click", m), m.tweens.add({
            targets: a,
            scaleX: .95,
            scaleY: .95,
            yoyo: !0,
            duration: 100,
            ease: "Linear",
            onComplete: function() {
                if ("play" === y)
                    if ("hint" === a.name) {
                        y = "hint";
                        var b = m.add.rectangle(0, 0, 720, 1080, 0, .5).setOrigin(0),
                            d = m.add.sprite(360, 540, "window_small"),
                            e = m.add.text(360, 380, "Show hint", {
                                fontFamily: "robotomono",
                                fontSize: 50,
                                align: "center",
                                color: "#fff"
                            }).setOrigin(.5),
                            c = draw_button(360, 530, "pay_hint", m),
                            g = draw_button(360, 650, "close", m),
                            l = m.add.text(c.x + 50, c.y, String(game_data.hint_cost), {
                                fontFamily: "robotomono",
                                fontSize: 60,
                                align: "center",
                                color: "#fff"
                            }).setOrigin(.5);
                        G.addMultiple([b, d, e, c, g, l])
                    } else "sound" === a.name ? switch_audio(a) : "home" === a.name && m.scene.start("menu");
                else "pay_hint" === a.name ? game_data.coin >= game_data.hint_cost ? (game_data.coin -= game_data.hint_cost, M.setText(game_data.coin), L()) : alert("No enough coin!") : "close" === a.name ? (y = "play", G.clear(!0, !0)) : "exit" === a.name && m.scene.start("menu");
                "next" === a.name && (game_data.cur_level <=
                    game_data.total_level ? (play_count++, play_count > show_at && (play_count = 0, show_ad()), m.scene.start("game")) : (alert("Awesome! You've completed all levels. Level will be reset to 1."), game_data.cur_level = 1, m.scene.start("menu")))
            }
        }))
    }, this);
    this.input.on("pointerdown", function() {
        "guide" === y && (J.destroy(!0, !0), y = "play")
    });
    u.shuffle && e()
};

function save_game() {
    localStorage.setItem("redfoc_connector", JSON.stringify(game_data))
}

function play_sound(e, g) {
    game_data.sound && g.sound.play(e)
}

function draw_button(e, g, p, w) {
    e = w.add.sprite(e, g, "btn_" + p).setInteractive();
    e.button = !0;
    e.name = p;
    return e
}
var config = {
        type: Phaser.AUTO,
        width: 720,
        height: 1080,
        scale: {
            mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
            parent: "redfoc",
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [Boot, Load, Menu, Game]
    },
    game = new Phaser.Game(config);