// JavaScript Document
//var fso, ts, s;
//var ForReading = 1;
//	fso = new ActiveXObject("Scripting.FileSystemObject");
//	ts = fso.OpenTextFile("1.txt", ForReading);
//	s = ts.ReadLine();
//	alert(s);


function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	
	
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			// alert(pair[1]);
			return pair[1];

		}
	}
	return (false);
}! function (e) {
	"function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function (e) {
		return this.slice(0, e.length) === e
	}), Object.assign || Object.defineProperty(Object, "assign", {
		enumerable: !1,
		configurable: !0,
		writable: !0,
		value: function (e, t) {
			"use strict";
			if (null == e) throw new TypeError("Cannot convert first argument to object");
			for (var o = Object(e), n = 1; n < arguments.length; n++) {
				var r = arguments[n];
				if (null != r)
					for (var a = Object.keys(Object(r)), i = 0, c = a.length; i < c; i++) {
						var s = a[i],
							d = Object.getOwnPropertyDescriptor(r, s);
						void 0 !== d && d.enumerable && (o[s] = r[s])
					}
			}
			return o
		}
	});
	var o, l = {
		loadingAct: function (e, t) {
			if (!e) return !1;
			var o = ['<div class="define-toast">', '<div class="toast_content_box">', '<div class="toast_content">', '<img class="toast_content_icon" mode="scaleToFill" src="../b/load.gif"/*tpa=http://api.xinbanglianmeng.com/pages/wx/image/load.gif*/ />', '<div class="toast_content_text">请稍等...</div>', "</div>", "</div>", "</div>"].join("");
			t = t || $("body");
			"show" === e ? ($(".define-toast").length || t.append(o), $(".define-toast").removeClass("hide")) : $(".define-toast").addClass("hide")
		},
		ajaxComm: function (e, t) {
			var o = $.Deferred();
			if (void 0 === e) throw new Error("apiName Error!");
			return t = t || {}, $.ajax({
				url: e,
				type: "post",
				data: t,
				dataType: "json",
				timeout: 12e3
			}).done(function (e) {
				e && 200 === e.Status ? o.resolve(e) : o.reject(e)
			}).fail(function (e) {
				o.reject(e)
			}), o.fail(function (e) {
				l.loadingAct("hide"), l.Toast(e.Msg || "服务器忙，请稍候重试")
			}), o
		},
		jsonpComm: function (e, t) {
			var o = $.Deferred();
			if (void 0 === e) throw new Error("apiName Error!");
			return t = t || {}, $.ajax({
				url: e,
				dataType: "jsonp",
				jsonp: "callback",
				data: t,
				success: function (e) {
					o.resolve(e)
				},
				error: function (e) {
					o.reject(e)
				}
			}), o.fail(function (e) {
				l.loadingAct("hide"), l.Toast(e.Msg || "服务器忙，请稍候重试")
			}), o
		},
		
		getRequest: function () {
			var e = location.search,
				t = new Object;
			if (-1 != e.indexOf("?")) {
				var o = e.substr(1);
				strs = o.split("&");
				for (var n = 0; n < strs.length; n++) t[strs[n].split("=")[0]] = unescape(strs[n].split("=")[1])
			}
			// alert(t);
			return t
		},
		HTMLEncode: function (e) {
			var t = document.createElement("div");
			null != t.textContent ? t.textContent = e : t.innerText = e;
			var o = t.innerHTML;
			return t = null, o
		},
		HTMLDecode: function (e) {
			var t = document.createElement("div");
			t.innerHTML = e;
			var o = t.innerText || t.textContent;
			return t = null, o
		},
		Base64: {
			_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
			encode: function (e) {
				var t, o, n, r, a, i, c, s = "",
					d = 0;
				for (e = l.Base64._utf8_encode(e); d < e.length;) r = (t = e.charCodeAt(d++)) >> 2, a = (3 & t) << 4 | (o = e.charCodeAt(d++)) >> 4, i = (15 & o) << 2 | (n = e.charCodeAt(d++)) >> 6, c = 63 & n, isNaN(o) ? i = c = 64 : isNaN(n) && (c = 64), s = s + this._keyStr.charAt(r) + this._keyStr.charAt(a) + this._keyStr.charAt(i) + this._keyStr.charAt(c);
				return s
			},
			decode: function (e) {
				var t, o, n, r, a, i, c = "",
					s = 0;
				for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); s < e.length;) t = this._keyStr.indexOf(e.charAt(s++)) << 2 | (r = this._keyStr.indexOf(e.charAt(s++))) >> 4, o = (15 & r) << 4 | (a = this._keyStr.indexOf(e.charAt(s++))) >> 2, n = (3 & a) << 6 | (i = this._keyStr.indexOf(e.charAt(s++))), c += String.fromCharCode(t), 64 != a && (c += String.fromCharCode(o)), 64 != i && (c += String.fromCharCode(n));
				return c = l.Base64._utf8_decode(c)
			},
			_utf8_encode: function (e) {
				var t = "";
				e = e.replace(/\r\n/g, "\n");
				for (var o = 0; o < e.length; o++) {
					var n = e.charCodeAt(o);
					n < 128 ? t += String.fromCharCode(n) : (127 < n && n < 2048 ? t += String.fromCharCode(n >> 6 | 192) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128)), t += String.fromCharCode(63 & n | 128))
				}
				return t
			},
			_utf8_decode: function (e) {
				var t, o, n, r = "",
					a = 0;
				for (t = o = 0; a < e.length;)(t = e.charCodeAt(a)) < 128 ? (r += String.fromCharCode(t), a++) : 191 < t && t < 224 ? (o = e.charCodeAt(a + 1), r += String.fromCharCode((31 & t) << 6 | 63 & o), a += 2) : (o = e.charCodeAt(a + 1), n = e.charCodeAt(a + 2), r += String.fromCharCode((15 & t) << 12 | (63 & o) << 6 | 63 & n), a += 3);
				return r
			}
		},
		setCookie: function (e, t, o) {
			var n = new Date,
				r = o;
			n.setTime(n.getTime() + 24 * r * 3600 * 1e3), document.cookie = e + "=" + t + ";expires=" + n.toGMTString()
		},
		getCookie: function (e) {
			for (var t, o = document.cookie.replace(/[ ]/g, "").split(";"), n = 0; n < o.length; n++) {
				var r = o[n].split("=");
				if (e == r[0]) {
					t = r[1];
					break
				}
			}
			return t
		},
		deleteCookie: function (e) {
			var t = new Date;
			t.setTime(t.getTime() - 1e4), document.cookie = e + "=v; expires =" + t.toGMTString()
		},
		selectText: function (e, t, o) {
			if (window.getSelection().removeAllRanges(), e.setSelectionRange) e.setSelectionRange(t, o);
			else if (e.createTextRange) {
				var n = e.createTextRange();
				n.collapse(!0), n.moveStart("character", t), n.moveEnd("character", o - t), n.select()
			} else console.log("all not");
			e.focus()
		},
		selectRange: function (e) {
			window.getSelection().removeAllRanges();
			var t = document.createRange();
			t.selectNode(e), window.getSelection().addRange(t)
		},
		copyComm: function (e, t, a, i) {
			document.queryCommandSupported("paste") ? console.log("支持JS粘贴") : console.log("不支持JS粘贴");
			var o = document.createElement("div");
			o.innerHTML = '<textarea id="androidContent" readonly style="user-select: auto;-webkit-user-select: auto;-ms-user-select: auto;outline: none;border: 0px;color: rgba(0,0,0,0.0);position: absolute;top:-9999px;left:-9999px;background-color: transparent;">' + t + '</textarea><div id="iosContent" style="user-select: auto;-webkit-user-select: auto;-ms-user-select: auto;position: absolute;top:-9999px;left:-9999px;color: rgba(0,0,0,0);background-color: transparent">' + t + "</div>", document.body.appendChild(o), e.addEventListener("click", function (e) {
				if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
					window.getSelection().removeAllRanges();
					var t = document.getElementById("iosContent"),
						o = document.createRange();
					o.selectNode(t), window.getSelection().addRange(o);
					try {
						document.execCommand("copy") ? a() : i()
					} catch (e) {
						i()
					}
					window.getSelection().removeAllRanges()
				} else {
					var n = document.querySelector("#androidContent"),
						r = n.value;
					n.value = r.replace(/<br\/>/g, ""), l.selectText(n, 0, n.value.length);
					try {
						document.execCommand("copy") ? a() : i()
					} catch (e) {
						i()
					}
				}
			})
		},
		urldecode: function (e) {
			var t, o, n = e,
				r = /(%[^%]{2})/;
			for (; null != (match = r.exec(n)) && 1 < match.length && "" != match[1];) t = parseInt(match[1].substr(1), 16), o = String.fromCharCode(t), n = n.replace(match[1], o);
			return n = function (e) {
				var t, o, n, r, a, i;
				for (t = "", n = e.length, o = 0; o < n;) switch ((r = e.charCodeAt(o++)) >> 4) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
						t += e.charAt(o - 1);
						break;
					case 12:
					case 13:
						a = e.charCodeAt(o++), t += String.fromCharCode((31 & r) << 6 | 63 & a);
						break;
					case 14:
						a = e.charCodeAt(o++), i = e.charCodeAt(o++), t += String.fromCharCode((15 & r) << 12 | (63 & a) << 6 | (63 & i) << 0)
				}
				return t
			}(n = n.replace(/\\+/g, " "))
		}
	};
	l.Toast = function (e) {
		var t = ['<div class="toast-model">', '<p class="toast-content">' + e + "</p>", "</div>"].join("");
		if (!e) return !1;
		clearTimeout(o), 0 < $(".toast-model").length ? $(".toast-content").text(e) : $("body").append(t), o = setTimeout(function () {
			$(".toast-model").remove()
		}, 2e3)
	}, e.BW = l
}(window), $(function () {
	var t = "",
		o = "",
		
		e = BW.getRequest(),
	    //'alert(e),
//	fso = new ActiveXObject("Scripting.FileSystemObject");
//
//	ts = fso.OpenTextFile("1.txt", ForReading);
//
//	s = ts.ReadLine();
//	alert(s);
	//document.getElementById("textarea").innerHTML = s;
	
	
	n = document.querySelector(".header-box"),
		r = e.pt ? e.pt : "";
		($(".copy-box").removeClass("hide"), $(".intro-box").removeClass("hide"), t = user, $(".robotId").text(t), BW.copyComm(n, t, function () {
			$(".copy-dialog").removeClass("hide"), $(".copy-tit").html("复制成功"), $(".fail-cont").hide(), -1 == navigator.userAgent.toString().indexOf("baiduboxapp") && -1 == navigator.userAgent.toString().indexOf("AlipayClient") || $(".close-button").hide(), $.ajax({
				url: "http://api.xxxxxxx.com/api/tb/index/wxClick/?cp=true&pt=" + r,
				type: "GET",
				dataType: "jsonp",
				success: function (data) {	
				}
			})
		}, function () {
			$(".copy-dialog").removeClass("hide"), $(".copy-tit").html("复制失败"), $(".copy-cont").hide(), -1 == navigator.userAgent.toString().indexOf("baiduboxapp") && -1 == navigator.userAgent.toString().indexOf("AlipayClient") || $(".close-button").hide()
		}))
	$(".close-button").on("click", function () {
		$(".copy-dialog").addClass("hide"), window.location.href = "weixin://"
	}), $(".turn-btn").on("click", function () {
		window.location.href = o
	})
});
