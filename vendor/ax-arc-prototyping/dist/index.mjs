import { clsx as e } from "clsx";
import * as t from "react";
import { createContext as n, forwardRef as r, useCallback as i, useContext as a, useEffect as o, useImperativeHandle as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
import * as p from "@radix-ui/react-select";
import { Slot as m } from "@radix-ui/react-slot";
import * as h from "@radix-ui/react-tooltip";
import { DayPicker as g } from "react-day-picker";
import { createRoot as _ } from "react-dom/client";
import { EditorContent as v, NodeViewWrapper as y, ReactNodeViewRenderer as b, useEditor as x, useEditorState as S } from "@tiptap/react";
import { Extension as C, Node as w, mergeAttributes as T } from "@tiptap/core";
import E from "@tiptap/starter-kit";
import D from "@tiptap/extension-placeholder";
import O from "@tiptap/suggestion";
import * as k from "@radix-ui/react-checkbox";
import { addDays as A, format as j, isValid as M, parse as N, startOfToday as ee } from "date-fns";
import * as P from "@radix-ui/react-popover";
import * as te from "@radix-ui/react-switch";
import * as ne from "react-dom";
import { createPortal as re } from "react-dom";
import ie from "@tiptap/extension-underline";
import { Color as ae, FontSize as oe, TextStyle as se } from "@tiptap/extension-text-style";
import ce from "@tiptap/extension-highlight";
import le from "@tiptap/extension-link";
import ue from "@tiptap/extension-image";
import { Table as de, TableCell as fe, TableHeader as pe, TableRow as me } from "@tiptap/extension-table";
import * as he from "@radix-ui/react-label";
import * as ge from "@radix-ui/react-radio-group";
import * as _e from "@radix-ui/react-separator";
import { flexRender as ve, getCoreRowModel as ye, getFilteredRowModel as be, getPaginationRowModel as xe, getSortedRowModel as Se, useReactTable as Ce } from "@tanstack/react-table";
import * as F from "@radix-ui/react-tabs";
//#region src/lib/utils.ts
function I(...t) {
	return e(t);
}
//#endregion
//#region src/components/ui/annotation.tsx
var we = t.createContext({ enabled: !0 });
function Te({ enabled: e, children: t }) {
	return /* @__PURE__ */ d(we.Provider, {
		value: { enabled: e },
		children: t
	});
}
function Ee() {
	return t.useContext(we);
}
var De = /* @__PURE__ */ new WeakMap(), Oe = 0;
function ke(e) {
	return De.has(e) || De.set(e, Oe++), De.get(e);
}
function Ae() {
	let { enabled: e } = Ee(), [n, r] = t.useState([]), i = t.useRef(null), a = t.useCallback(() => {
		i.current !== null && cancelAnimationFrame(i.current), i.current = requestAnimationFrame(() => {
			let e = document.querySelectorAll("[data-annotation]"), t = [];
			e.forEach((e) => {
				let n = e.getAttribute("data-annotation"), r = e.getAttribute("data-annotation-side") ?? "right", i = e.getBoundingClientRect();
				n && (i.width > 0 || i.height > 0) && t.push({
					id: ke(e),
					text: n,
					side: r,
					rect: i
				});
			}), r(t);
		});
	}, []);
	return t.useEffect(() => {
		if (!e) {
			r([]);
			return;
		}
		a(), window.addEventListener("scroll", a, {
			capture: !0,
			passive: !0
		}), window.addEventListener("resize", a);
		let t = new MutationObserver(a);
		return t.observe(document.body, {
			subtree: !0,
			childList: !0,
			attributes: !0,
			attributeFilter: ["data-annotation", "data-annotation-side"]
		}), () => {
			window.removeEventListener("scroll", a, { capture: !0 }), window.removeEventListener("resize", a), t.disconnect(), i.current !== null && cancelAnimationFrame(i.current);
		};
	}, [e, a]), !e || n.length === 0 ? null : /* @__PURE__ */ d("div", {
		className: "ax-annotation-overlay",
		"aria-hidden": "true",
		children: n.map((e) => /* @__PURE__ */ d(je, { entry: e }, e.id))
	});
}
var L = 48, R = 3;
function je({ entry: { text: e, side: t, rect: n } }) {
	let r = n.left + n.width / 2, i = n.top + n.height / 2, a, o, s, c, l, p, m, h, g;
	return t === "right" ? (a = i - R, o = n.right - R, s = i - .5, c = n.right, l = L, p = 1, m = i, h = n.right + L, g = "translateY(-50%)") : t === "left" ? (a = i - R, o = n.left - R, s = i - .5, c = n.left - L, l = L, p = 1, m = i, h = n.left - L, g = "translate(-100%, -50%)") : t === "top" ? (a = n.top - R, o = r - R, s = n.top - L, c = r - .5, l = 1, p = L, m = n.top - L, h = r, g = "translate(-50%, -100%)") : (a = n.bottom - R, o = r - R, s = n.bottom, c = r - .5, l = 1, p = L, m = n.bottom + L, h = r, g = "translate(-50%, 0)"), /* @__PURE__ */ f(u, { children: [
		/* @__PURE__ */ d("div", {
			className: "ax-annotation-dot",
			style: {
				"--ax-t": `${a}px`,
				"--ax-l": `${o}px`
			}
		}),
		/* @__PURE__ */ d("div", {
			className: "ax-annotation-line",
			style: {
				"--ax-t": `${s}px`,
				"--ax-l": `${c}px`,
				"--ax-w": `${l}px`,
				"--ax-h": `${p}px`
			}
		}),
		/* @__PURE__ */ d("div", {
			className: "ax-annotation-label",
			style: {
				"--ax-t": `${m}px`,
				"--ax-l": `${h}px`,
				"--ax-tx": g
			},
			children: e
		})
	] });
}
//#endregion
//#region src/components/ui/avatar.tsx
var z = t.forwardRef(({ mode: e = "icon", shape: n = "square", theme: r = "flat", src: i, alt: a = "", initials: o, icon: s, loading: c = !1, className: l }, u) => {
	let [p, m] = t.useState(!1);
	return t.useEffect(() => {
		m(!1);
	}, [i]), /* @__PURE__ */ f("div", {
		ref: u,
		className: I("ax-avatar", n === "circle" ? "ax-avatar--circle" : "ax-avatar--square", r === "shadow" ? "ax-avatar--shadow" : "ax-avatar--flat", c && "ax-avatar--loading", l),
		children: [
			!c && e === "image" && i && /* @__PURE__ */ d("img", {
				className: I("ax-avatar-image", p ? "ax-avatar-image--loaded" : "ax-avatar-image--loading"),
				src: i,
				alt: a,
				referrerPolicy: "no-referrer",
				onLoad: () => m(!0)
			}),
			!c && e === "initials" && /* @__PURE__ */ d("span", {
				className: "ax-avatar-initials",
				children: o
			}),
			!c && e === "icon" && /* @__PURE__ */ d("span", {
				className: "ax-avatar-icon",
				children: s
			})
		]
	});
});
z.displayName = "Avatar";
//#endregion
//#region src/components/ui/select.tsx
var Me = (e) => /* @__PURE__ */ d(p.Root, { ...e });
Me.displayName = "Select";
var Ne = p.Group, Pe = p.Value, Fe = t.forwardRef(({ className: e, children: t, leftIcon: n, ...r }, i) => /* @__PURE__ */ f(p.Trigger, {
	ref: i,
	className: I("ax-select-trigger", e),
	...r,
	children: [
		n,
		/* @__PURE__ */ d("span", {
			className: "ax-select-value",
			children: t
		}),
		/* @__PURE__ */ d(p.Icon, {
			asChild: !0,
			children: /* @__PURE__ */ d("i", { className: "icon-chevron-down ax-select-icon" })
		})
	]
}));
Fe.displayName = p.Trigger.displayName;
var Ie = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(p.ScrollUpButton, {
	ref: n,
	className: I("ax-select-scroll-button", e),
	...t,
	children: /* @__PURE__ */ d("i", { className: "icon-chevron-up" })
}));
Ie.displayName = p.ScrollUpButton.displayName;
var Le = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(p.ScrollDownButton, {
	ref: n,
	className: I("ax-select-scroll-button", e),
	...t,
	children: /* @__PURE__ */ d("i", { className: "icon-chevron-down" })
}));
Le.displayName = p.ScrollDownButton.displayName;
var Re = t.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, i) => /* @__PURE__ */ d(p.Portal, { children: /* @__PURE__ */ f(p.Content, {
	ref: i,
	className: I("ax-select-content", e),
	position: n,
	...r,
	children: [
		/* @__PURE__ */ d(Ie, {}),
		/* @__PURE__ */ d(p.Viewport, {
			className: "ax-select-viewport",
			children: t
		}),
		/* @__PURE__ */ d(Le, {})
	]
}) }));
Re.displayName = p.Content.displayName;
var ze = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(p.Label, {
	ref: n,
	className: I("ax-select-label", e),
	...t
}));
ze.displayName = p.Label.displayName;
var Be = t.forwardRef(({ className: e, children: t, icon: n, avatar: r, ...i }, a) => /* @__PURE__ */ f(p.Item, {
	ref: a,
	className: I("ax-select-item", e),
	...i,
	children: [
		r && /* @__PURE__ */ d(z, {
			mode: "image",
			shape: "circle",
			src: r.src,
			alt: r.alt ?? "",
			className: "ax-select-item-avatar"
		}),
		!r && n && /* @__PURE__ */ d("span", {
			className: "ax-select-item-icon",
			children: n
		}),
		/* @__PURE__ */ d(p.ItemText, { children: t }),
		/* @__PURE__ */ d("span", {
			className: "ax-select-item-indicator",
			children: /* @__PURE__ */ d(p.ItemIndicator, { children: /* @__PURE__ */ d("i", { className: "ax-icon icon-tick" }) })
		})
	]
}));
Be.displayName = p.Item.displayName;
var Ve = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(p.Separator, {
	ref: n,
	className: I("ax-select-separator", e),
	...t
}));
Ve.displayName = p.Separator.displayName;
//#endregion
//#region src/components/ui/breadcrumb.tsx
var He = 5, Ue = 768;
function We() {
	let [e, n] = t.useState(() => typeof window < "u" && window.innerWidth < Ue);
	return t.useEffect(() => {
		let e = window.matchMedia(`(max-width: ${Ue - 1}px)`), t = (e) => n(e.matches);
		return e.addEventListener("change", t), n(e.matches), () => e.removeEventListener("change", t);
	}, []), e;
}
function Ge({ item: e }) {
	return e.items?.length ? /* @__PURE__ */ f(Me, {
		onValueChange: (t) => {
			let n = parseInt(t), r = e.items[n];
			r.href ? window.location.href = r.href : r.onClick?.();
		},
		children: [/* @__PURE__ */ d(Fe, {
			className: "ax-breadcrumb-select-trigger",
			"aria-label": "Show hidden breadcrumbs",
			children: /* @__PURE__ */ d("i", {
				className: "icon-more-horizontal",
				"aria-hidden": "true"
			})
		}), /* @__PURE__ */ d(Re, {
			className: "ax-breadcrumb-select-content",
			children: e.items.map((e, t) => /* @__PURE__ */ d(Be, {
				value: String(t),
				children: e.label
			}, t))
		})]
	}) : /* @__PURE__ */ d("button", {
		type: "button",
		className: "ax-breadcrumb-collapsed-btn",
		onClick: e.onClick,
		"aria-label": "Show hidden breadcrumbs",
		children: /* @__PURE__ */ d("i", {
			className: "icon-more-horizontal",
			"aria-hidden": "true"
		})
	});
}
function Ke({ items: e, className: n }) {
	let r = We(), i = e.length > He || r && e.length > 2 ? [
		e[0],
		{
			collapsed: !0,
			label: "",
			items: e.slice(1, -1)
		},
		e[e.length - 1]
	] : e;
	return /* @__PURE__ */ d("nav", {
		"aria-label": "Breadcrumb",
		className: I("ax-breadcrumb", n),
		children: i.map((e, n) => {
			let r = n === i.length - 1;
			return /* @__PURE__ */ f(t.Fragment, { children: [e.collapsed ? /* @__PURE__ */ d(Ge, { item: e }) : !r && e.href ? /* @__PURE__ */ d("a", {
				href: e.href,
				className: "ax-breadcrumb-item ax-breadcrumb-link",
				children: e.label
			}) : !r && e.onClick ? /* @__PURE__ */ d("button", {
				type: "button",
				onClick: e.onClick,
				className: "ax-breadcrumb-item ax-breadcrumb-link",
				children: e.label
			}) : /* @__PURE__ */ d("span", {
				className: "ax-breadcrumb-item",
				children: e.label
			}), !r && /* @__PURE__ */ d("i", {
				className: "icon-chevron-right ax-breadcrumb-sep",
				"aria-hidden": "true"
			})] }, n);
		})
	});
}
//#endregion
//#region src/components/ui/spinner.tsx
var B = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f("svg", {
	ref: n,
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "none",
	className: I("ax-spinner", e),
	"aria-label": "Loading",
	role: "status",
	...t,
	children: [/* @__PURE__ */ d("circle", {
		cx: "10",
		cy: "10",
		r: "8",
		strokeWidth: "2",
		stroke: "var(--primary-300)"
	}), /* @__PURE__ */ d("circle", {
		cx: "10",
		cy: "10",
		r: "8",
		strokeWidth: "2",
		stroke: "var(--text-primary)",
		strokeLinecap: "round",
		strokeDasharray: "50.265",
		strokeDashoffset: "37.699"
	})]
}));
B.displayName = "Spinner";
//#endregion
//#region src/components/ui/tooltip.tsx
var qe = h.Provider, Je = h.Root, Ye = h.Trigger, Xe = t.forwardRef(({ className: e, sideOffset: t = 6, ...n }, r) => /* @__PURE__ */ d(h.Portal, { children: /* @__PURE__ */ d(h.Content, {
	ref: r,
	sideOffset: t,
	className: I("ax-tooltip-content", e),
	...n
}) }));
Xe.displayName = h.Content.displayName;
function Ze({ content: e, children: t, side: n = "top", delayDuration: r = 300 }) {
	return /* @__PURE__ */ f(Je, {
		delayDuration: r,
		children: [/* @__PURE__ */ d(Ye, {
			asChild: !0,
			children: t
		}), /* @__PURE__ */ d(Xe, {
			side: n,
			children: e
		})]
	});
}
//#endregion
//#region src/components/ui/button.tsx
var Qe = [
	"primary",
	"destructive",
	"positive"
], V = t.forwardRef(({ className: e, variant: t = "primary", size: n = "default", asChild: r = !1, loading: i = !1, leftIcon: a, rightIcon: o, split: s = !1, onSplitClick: c, children: l, disabled: u, ...p }, h) => {
	let g = r ? m : "button", _ = u || i, v = I("ax-btn", `ax-btn--${t}`, `ax-btn-size--${n}`, e);
	return s ? /* @__PURE__ */ f("div", {
		className: I("ax-btn-split", _ && "ax-btn-split--disabled"),
		children: [
			/* @__PURE__ */ f(g, {
				className: I("ax-btn", `ax-btn--${t}`, `ax-btn-size--${n}`),
				"data-variant": t,
				ref: h,
				disabled: _,
				...p,
				children: [i ? /* @__PURE__ */ d(B, {}) : a, l]
			}),
			/* @__PURE__ */ d("div", {
				"aria-hidden": "true",
				className: I("ax-btn-split-divider", Qe.includes(t) ? "ax-btn-split-divider--light" : "ax-btn-split-divider--dark")
			}),
			/* @__PURE__ */ d("button", {
				type: "button",
				onClick: c,
				disabled: _,
				className: I("ax-btn", `ax-btn--${t}`, `ax-btn-size--${n}`),
				children: /* @__PURE__ */ d("i", { className: "icon-chevron-down" })
			})
		]
	}) : /* @__PURE__ */ f(g, {
		className: v,
		"data-variant": t,
		ref: h,
		disabled: _,
		...p,
		children: [
			i ? /* @__PURE__ */ d(B, {}) : a,
			l,
			o
		]
	});
});
V.displayName = "Button";
function H({ icon: e, buttonStyle: t = !0, rounded: n = !1, size: r = 20, selected: i = !1, tooltip: a, className: o, disabled: s, ...c }) {
	let l = /* @__PURE__ */ d("button", {
		type: "button",
		className: I("ax-icon-btn", t ? "ax-icon-btn--styled" : "ax-icon-btn--base", n && "ax-icon-btn--rounded", i && "ax-icon-btn--selected", `ax-icon-btn--size-${r}`, o),
		disabled: s,
		...c,
		children: /* @__PURE__ */ d("i", { className: e })
	});
	return a ? /* @__PURE__ */ d(Ze, {
		content: a,
		children: l
	}) : l;
}
H.displayName = "IconButton";
//#endregion
//#region src/components/ui/info-block.tsx
var $e = {
	info: "info-outline",
	positive: "circle-tick",
	warning: "warning-outline",
	negative: "incorrect-unsatisfactory"
};
function et({ type: e = "info", title: t, body: n, oneLine: r = !1, showTitle: i = !0, action: a = !1, actionLabel: o = "Understood", dismissIcon: s = !1, onAction: c, onDismiss: l, className: u }) {
	return /* @__PURE__ */ f("div", {
		role: "alert",
		className: I("ax-info-block", r ? "ax-info-block--one-line" : "ax-info-block--multi", `ax-info-block--${e}`, u),
		children: [/* @__PURE__ */ d("i", {
			className: `ax-icon icon-${$e[e]} ax-info-block-icon`,
			"aria-hidden": "true"
		}), /* @__PURE__ */ f("div", {
			className: "ax-info-block-content",
			children: [
				i && t && /* @__PURE__ */ d("p", {
					className: "ax-info-block-title",
					children: t
				}),
				!r && n && /* @__PURE__ */ d("p", {
					className: "ax-info-block-body",
					children: n
				}),
				!r && a && /* @__PURE__ */ d(V, {
					variant: "tertiary",
					onClick: c,
					children: o
				}),
				r && a && /* @__PURE__ */ d(V, {
					variant: "secondary",
					onClick: c,
					children: o
				}),
				r && s && /* @__PURE__ */ d(H, {
					icon: "icon-x-thick",
					size: 20,
					onClick: l,
					"aria-label": "Dismiss"
				})
			]
		})]
	});
}
et.displayName = "InfoBlock";
//#endregion
//#region src/components/ui/autocomplete.tsx
var tt = t.forwardRef(({ options: e, value: n, onChange: r, onQueryChange: i, placeholder: a, leftIcon: o, loading: s = !1, className: c }, l) => {
	let [u, p] = t.useState(""), [m, h] = t.useState(""), [g, _] = t.useState(!1), [v, y] = t.useState(-1), b = n !== void 0, x = b ? n : u, S = e.find((e) => e.value === x)?.label ?? "", C = x ? S : m, w = t.useMemo(() => {
		if (i || !m) return e;
		let t = m.toLowerCase();
		return e.filter((e) => e.label.toLowerCase().includes(t));
	}, [
		e,
		m,
		i
	]), T = t.useRef(null), E = t.useRef(null), D = t.useRef(null), O = (e) => {
		b || p(e.value), r?.(e.value), h(""), _(!1), y(-1), E.current?.blur();
	}, k = () => {
		b || p(""), r?.(""), i?.(""), h(""), _(!1), y(-1), E.current?.focus();
	}, A = (e) => {
		x && (b || p(""), r?.(""));
		let t = e.target.value;
		h(t), _(!0), y(-1), i?.(t);
	}, j = (e) => {
		if (!g) {
			(e.key === "ArrowDown" || e.key === "Enter") && (_(!0), y(0));
			return;
		}
		e.key === "ArrowDown" ? (e.preventDefault(), y((e) => Math.min(e + 1, w.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), y((e) => Math.max(e - 1, 0))) : e.key === "Enter" ? (e.preventDefault(), v >= 0 && w[v] && O(w[v])) : e.key === "Escape" && (_(!1), y(-1));
	};
	t.useEffect(() => {
		v < 0 || !D.current || D.current.children[v]?.scrollIntoView({ block: "nearest" });
	}, [v]), t.useEffect(() => {
		let e = (e) => {
			T.current && !T.current.contains(e.target) && (_(!1), y(-1));
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, []);
	let M = (e) => {
		T.current = e, typeof l == "function" ? l(e) : l && (l.current = e);
	}, N = !!x, ee = g && (s || w.length > 0);
	return /* @__PURE__ */ f("div", {
		ref: M,
		className: I("ax-autocomplete", c),
		children: [/* @__PURE__ */ f("div", {
			className: I("ax-input-wrapper", "ax-autocomplete-input-wrap"),
			children: [
				o && /* @__PURE__ */ d("span", {
					className: "ax-field-icon-left",
					children: o
				}),
				/* @__PURE__ */ d("input", {
					ref: E,
					type: "text",
					role: "combobox",
					"aria-expanded": g,
					"aria-autocomplete": "list",
					className: I("ax-input", o && "ax-input--has-icon-left", "ax-autocomplete-input"),
					placeholder: a,
					value: C,
					onChange: A,
					onFocus: () => {
						x || _(!0);
					},
					onKeyDown: j
				}),
				N && /* @__PURE__ */ d("button", {
					type: "button",
					className: "ax-autocomplete-clear",
					"aria-label": "Clear",
					onMouseDown: (e) => {
						e.preventDefault(), k();
					},
					children: /* @__PURE__ */ d("i", { className: "ax-icon icon-x-thick" })
				})
			]
		}), ee && /* @__PURE__ */ d("div", {
			className: "ax-autocomplete-dropdown",
			children: s ? /* @__PURE__ */ f("div", {
				className: "ax-autocomplete-loading",
				children: [/* @__PURE__ */ d(B, {}), /* @__PURE__ */ d("span", { children: "Searching…" })]
			}) : /* @__PURE__ */ d("ul", {
				ref: D,
				role: "listbox",
				className: "ax-autocomplete-list",
				children: w.map((e, t) => /* @__PURE__ */ d("li", {
					role: "option",
					"aria-selected": e.value === x,
					className: I("ax-autocomplete-item", e.value === x && "ax-autocomplete-item--selected", t === v && "ax-autocomplete-item--active"),
					onMouseDown: (t) => {
						t.preventDefault(), O(e);
					},
					children: e.label
				}, e.value))
			})
		})]
	});
});
tt.displayName = "Autocomplete";
//#endregion
//#region src/components/ui/badge.tsx
var nt = {
	positive: "icon-tick-thick",
	negative: "icon-x-thick",
	interim: "icon-in-progress",
	base: "icon-radio-unchecked"
};
function rt({ className: e, status: t = "none", active: n = !1, indicator: r = !1, iconOnly: i = !1, children: a, ...o }) {
	let s = nt[t];
	return /* @__PURE__ */ d("span", {
		className: I("ax-badge", n && "ax-badge--active", t !== "none" && `ax-badge--${t}`, r && "ax-badge--indicator", i && "ax-badge--icon-only", e),
		...o,
		children: r ? null : i && s ? /* @__PURE__ */ d("i", { className: `ax-icon ${s}` }) : a
	});
}
//#endregion
//#region src/components/ui/box.tsx
var U = (e) => `var(--space-${e})`;
function it(e) {
	let [t, n, r, i] = e.trim().split(/\s+/);
	return n ? r ? i ? {
		pt: U(t),
		pr: U(n),
		pb: U(r),
		pl: U(i)
	} : {
		pt: U(t),
		pr: U(n),
		pb: U(r),
		pl: U(n)
	} : {
		pt: U(t),
		pr: U(n),
		pb: U(t),
		pl: U(n)
	} : {
		pt: U(t),
		pr: U(t),
		pb: U(t),
		pl: U(t)
	};
}
var at = t.forwardRef(({ className: e, style: t, direction: n, gap: r, padding: i, pt: a, pr: o, pb: s, pl: c, px: l, py: u, justify: f, align: p, ...m }, h) => {
	let g = i ? it(i) : null, _ = {
		...r ? { "--ax-gap": U(r) } : {},
		...g ? {
			"--ax-pt": g.pt,
			"--ax-pr": g.pr,
			"--ax-pb": g.pb,
			"--ax-pl": g.pl
		} : {},
		...a ? { "--ax-pt": U(a) } : {},
		...o ? { "--ax-pr": U(o) } : {},
		...s ? { "--ax-pb": U(s) } : {},
		...c ? { "--ax-pl": U(c) } : {},
		...l ? {
			"--ax-pl": U(l),
			"--ax-pr": U(l)
		} : {},
		...u ? {
			"--ax-pt": U(u),
			"--ax-pb": U(u)
		} : {},
		...t
	};
	return /* @__PURE__ */ d("div", {
		ref: h,
		className: I("ax-box", n === "row" && "ax-box--row", n === "col" && "ax-box--col", f && "ax-box--justify", p && `ax-box--align-${p}`, e),
		style: _,
		...m
	});
});
at.displayName = "Box";
//#endregion
//#region src/components/ui/calendar.tsx
function W({ className: e, classNames: t, showOutsideDays: n = !1, ...r }) {
	return /* @__PURE__ */ d(g, {
		showOutsideDays: n,
		className: I("ax-calendar", e),
		classNames: {
			months: "ax-calendar-months",
			month: "ax-calendar-month",
			month_caption: "ax-calendar-caption",
			caption_label: "ax-calendar-caption-label",
			nav: "ax-calendar-nav",
			button_previous: "ax-calendar-nav-btn ax-calendar-nav-btn-prev",
			button_next: "ax-calendar-nav-btn ax-calendar-nav-btn-next",
			month_grid: "ax-calendar-table",
			weekdays: "ax-calendar-head-row",
			weekday: "ax-calendar-head-cell",
			week: "ax-calendar-row",
			day: "ax-calendar-cell",
			day_button: "ax-calendar-day",
			selected: "ax-calendar-day--selected",
			today: "ax-calendar-day--today",
			outside: "ax-calendar-day--outside",
			disabled: "ax-calendar-day--disabled",
			range_start: "ax-calendar-cell--range-start",
			range_end: "ax-calendar-cell--range-end",
			range_middle: "ax-calendar-cell--range-middle",
			hidden: "invisible",
			...t
		},
		components: { Chevron: ({ orientation: e }) => e === "left" ? /* @__PURE__ */ d("i", { className: "icon-chevron-left" }) : /* @__PURE__ */ d("i", { className: "icon-chevron-right" }) },
		...r
	});
}
W.displayName = "Calendar";
//#endregion
//#region src/components/ui/keyboard-hint.tsx
function ot() {
	if (typeof navigator > "u") return {
		isMac: !1,
		isMobile: !1
	};
	let e = navigator.userAgentData;
	if (e) return {
		isMac: e.platform === "macOS",
		isMobile: e.mobile
	};
	let t = navigator.userAgent, n = /Mobi|Android|iPhone|iPad|iPod/i.test(t);
	return {
		isMac: /Macintosh|MacIntel/i.test(t) && !n,
		isMobile: n
	};
}
var st = ot();
function ct() {
	return st;
}
function lt({ mac: e, win: t }) {
	let { isMac: n, isMobile: r } = ct();
	return r ? null : /* @__PURE__ */ d(u, { children: n ? e : t });
}
function G({ children: e, icon: t, onPrimary: n = !1, raised: r = !1, className: i }) {
	let a = !!t && !e;
	return /* @__PURE__ */ d("span", {
		className: I("ax-keyboard-hint", a ? "ax-keyboard-hint--icon" : "ax-keyboard-hint--text", n && "ax-keyboard-hint--on-primary", r && !n && "ax-keyboard-hint--raised", i),
		children: a ? t : e
	});
}
//#endregion
//#region src/components/ui/command-bar.tsx
var K = t.createContext(null);
function ut(e, t) {
	if (!t?.trim()) return e;
	let n = t.toLowerCase(), r = e.toLowerCase(), i = [], a = 0, o;
	for (; (o = r.indexOf(n, a)) !== -1;) o > a && i.push(e.slice(a, o)), i.push(/* @__PURE__ */ d("span", {
		className: "ax-cb__highlight",
		children: e.slice(o, o + n.length)
	}, o)), a = o + n.length;
	return a < e.length && i.push(e.slice(a)), i.length > 0 ? /* @__PURE__ */ d(u, { children: i }) : e;
}
function dt(e) {
	return e ? Array.from(e.querySelectorAll("[data-cb-item]")) : [];
}
var ft = /* @__PURE__ */ d(G, {
	raised: !0,
	icon: /* @__PURE__ */ d("i", { className: "icon-enter" })
});
function pt({ query: e, onQueryChange: n, placeholder: r, children: i, aiLabel: a, onAiClick: o, mode: s = "search", onEmptyBackspace: c, onAiSubmit: l, onSearchSubmit: p, searchHint: m, loading: h = !1, className: g, inputRef: _ }) {
	let v = s === "ai", y = r ?? (v ? "Ask for AI help, e.g. \"how do I enrol a learner?\"" : "Start typing to search for menu items or contacts"), [b, x] = t.useState(0), S = t.useRef(null), C = t.useRef(!1), w = !h && !!i && t.Children.count(i) > 0, T = h || v || w || !!a;
	return t.useEffect(() => {
		x(0);
	}, [e, i]), t.useLayoutEffect(() => {
		let e = dt(S.current), t = Math.min(b, e.length - 1);
		e.forEach((e, n) => {
			e.classList.toggle("ax-cb__row--active", n === t);
		}), !C.current && e[t] && e[t].scrollIntoView({ block: "nearest" }), C.current = !1;
	}), /* @__PURE__ */ d(K.Provider, {
		value: {
			activeIndex: b,
			setActiveIndex: x,
			contentRef: S,
			suppressScrollRef: C,
			query: e
		},
		children: /* @__PURE__ */ f("div", {
			className: I("ax-cb", g),
			role: "combobox",
			"aria-haspopup": "listbox",
			"aria-expanded": T,
			children: [/* @__PURE__ */ f("div", {
				className: "ax-cb__input-section",
				children: [
					/* @__PURE__ */ d("i", {
						className: I(v ? "icon-magic-ai-stars ax-cb__ai-icon" : "icon-search", "ax-cb__input-icon"),
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ d("input", {
						ref: _,
						className: "ax-cb__input",
						type: "text",
						value: e,
						onChange: (e) => n?.(e.target.value),
						onKeyDown: (t) => {
							let n = dt(S.current);
							t.key === "ArrowDown" ? (t.preventDefault(), x((e) => Math.min(e + 1, n.length - 1))) : t.key === "ArrowUp" ? (t.preventDefault(), x((e) => Math.max(e - 1, 0))) : t.shiftKey && t.key === "Enter" && !v ? (t.preventDefault(), p?.(e ?? "")) : t.key === "Enter" ? (t.preventDefault(), v && n.length === 0 ? l?.(e ?? "") : n[Math.min(b, n.length - 1)]?.click()) : t.key === "Backspace" && !e && c?.();
						},
						placeholder: y,
						autoComplete: "off",
						spellCheck: !1,
						role: "searchbox",
						"aria-label": v ? "Ask AI" : "Search"
					}),
					v ? /* @__PURE__ */ d("div", {
						className: "ax-cb__input-enter",
						"aria-hidden": "true",
						children: /* @__PURE__ */ d(G, {
							raised: !0,
							icon: /* @__PURE__ */ d("i", { className: "icon-enter" })
						})
					}) : m ? /* @__PURE__ */ d("div", {
						className: "ax-cb__input-enter",
						"aria-hidden": "true",
						children: m
					}) : null
				]
			}), T && /* @__PURE__ */ f(u, { children: [
				/* @__PURE__ */ d("div", {
					className: "ax-cb__divider",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ d("div", {
					className: "ax-cb__content",
					ref: S,
					role: "listbox",
					children: h ? /* @__PURE__ */ d("div", {
						className: "ax-cb__loading",
						children: /* @__PURE__ */ d(B, {})
					}) : v || w ? i : /* @__PURE__ */ d(mt, {
						label: a,
						onClick: o
					})
				}),
				!v && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("div", {
					className: "ax-cb__divider",
					"aria-hidden": "true"
				}), /* @__PURE__ */ f("div", {
					className: "ax-cb__hints-bar",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ f("div", {
							className: "ax-cb__hint",
							children: [/* @__PURE__ */ d(G, { icon: /* @__PURE__ */ d("i", { className: "icon-sort-arrows" }) }), /* @__PURE__ */ d("span", {
								className: "ax-cb__hint-label",
								children: "Select"
							})]
						}),
						/* @__PURE__ */ f("div", {
							className: "ax-cb__hint",
							children: [/* @__PURE__ */ d(G, { icon: /* @__PURE__ */ d("i", { className: "icon-enter" }) }), /* @__PURE__ */ d("span", {
								className: "ax-cb__hint-label",
								children: "Open"
							})]
						}),
						/* @__PURE__ */ f("div", {
							className: "ax-cb__hint",
							children: [
								/* @__PURE__ */ d(G, { children: "Cmd" }),
								/* @__PURE__ */ d("span", {
									className: "ax-cb__hint-sep",
									children: "+"
								}),
								/* @__PURE__ */ d(G, { icon: /* @__PURE__ */ d("i", { className: "icon-enter" }) }),
								/* @__PURE__ */ d("span", {
									className: "ax-cb__hint-label",
									children: "Open in a new tab"
								})
							]
						})
					]
				})] })
			] })]
		})
	});
}
function mt({ label: e, onClick: n }) {
	let r = t.useContext(K), i = t.useRef(null);
	return /* @__PURE__ */ f("button", {
		ref: i,
		type: "button",
		className: "ax-cb__row ax-cb__row--ai",
		"data-cb-item": !0,
		onClick: n,
		onMouseEnter: () => {
			if (!r || !i.current) return;
			let e = dt(r.contentRef.current).indexOf(i.current);
			e >= 0 && r.setActiveIndex(e);
		},
		children: [/* @__PURE__ */ f("div", {
			className: "ax-cb__row-inner",
			children: [/* @__PURE__ */ d("i", {
				className: "icon-magic-ai-stars ax-cb__row-icon ax-cb__ai-icon",
				"aria-hidden": "true"
			}), /* @__PURE__ */ d("span", {
				className: "ax-cb__row-label",
				children: e
			})]
		}), /* @__PURE__ */ d("div", {
			className: "ax-cb__row-shortcut ax-cb__row-shortcut--always",
			children: ft
		})]
	});
}
function ht({ heading: e, children: n, maxVisible: r = 4 }) {
	let [i, a] = t.useState(!1), o = t.useContext(K), s = t.Children.toArray(n), c = !i && s.length > r, l = c ? s.slice(0, r) : s;
	return t.useEffect(() => {
		a(!1);
	}, [n]), /* @__PURE__ */ f("div", {
		className: "ax-cb__section",
		role: "group",
		"aria-label": e,
		children: [
			/* @__PURE__ */ d("div", {
				className: "ax-cb__section-heading",
				"aria-hidden": "true",
				children: /* @__PURE__ */ d("span", {
					className: "ax-cb__section-heading-text",
					children: e
				})
			}),
			l,
			c && /* @__PURE__ */ d(gt, {
				count: s.length,
				onClick: () => {
					o?.suppressScrollRef && (o.suppressScrollRef.current = !0), a(!0), o?.setActiveIndex(0);
				}
			})
		]
	});
}
function gt({ count: e, onClick: n }) {
	let r = t.useContext(K), i = t.useRef(null);
	return /* @__PURE__ */ d("button", {
		ref: i,
		type: "button",
		className: "ax-cb__row ax-cb__row--see-all",
		"data-cb-item": !0,
		onClick: n,
		onMouseEnter: () => {
			if (!r || !i.current) return;
			let e = dt(r.contentRef.current).indexOf(i.current);
			e >= 0 && r.setActiveIndex(e);
		},
		children: /* @__PURE__ */ f("span", {
			className: "ax-cb__see-all-label",
			children: [
				"See all (",
				e,
				")"
			]
		})
	});
}
function _t(e) {
	let n = t.useContext(K), r = t.useRef(null), i = n?.query, a = () => {
		if (!n || !r.current) return;
		let e = dt(n.contentRef.current).indexOf(r.current);
		e >= 0 && n.setActiveIndex(e);
	};
	if (e.type === "see-all") return /* @__PURE__ */ d("button", {
		ref: r,
		type: "button",
		className: I("ax-cb__row ax-cb__row--see-all", e.className),
		"data-cb-item": !0,
		onClick: e.onClick,
		onMouseEnter: a,
		role: "option",
		children: /* @__PURE__ */ d("span", {
			className: "ax-cb__see-all-label",
			children: e.label
		})
	});
	if (e.type === "action") return /* @__PURE__ */ f("button", {
		ref: r,
		type: "button",
		className: I("ax-cb__row", e.className),
		"data-cb-item": !0,
		onClick: e.onClick,
		onMouseEnter: a,
		role: "option",
		children: [/* @__PURE__ */ f("div", {
			className: "ax-cb__row-inner",
			children: [e.icon && /* @__PURE__ */ d("i", {
				className: I(e.icon, "ax-cb__row-icon ax-cb__row-icon--primary"),
				"aria-hidden": "true"
			}), /* @__PURE__ */ d("span", {
				className: "ax-cb__row-action-label",
				children: e.label
			})]
		}), /* @__PURE__ */ d("div", {
			className: "ax-cb__row-shortcut",
			children: /* @__PURE__ */ d(G, {
				raised: !0,
				icon: /* @__PURE__ */ d("i", { className: "icon-enter" })
			})
		})]
	});
	if (e.type === "contact") {
		let t = e.shortcut ?? ft;
		return /* @__PURE__ */ f("button", {
			ref: r,
			type: "button",
			className: I("ax-cb__row", e.className),
			"data-cb-item": !0,
			onClick: e.onClick,
			onMouseEnter: a,
			role: "option",
			children: [/* @__PURE__ */ f("div", {
				className: "ax-cb__row-inner",
				children: [/* @__PURE__ */ d(z, {
					mode: e.avatarSrc ? "image" : "initials",
					shape: "circle",
					src: e.avatarSrc,
					initials: e.avatarInitials,
					className: "ax-cb__contact-avatar"
				}), /* @__PURE__ */ f("div", {
					className: "ax-cb__contact-info",
					children: [/* @__PURE__ */ d("span", {
						className: "ax-cb__row-label",
						children: ut(e.name, i)
					}), (e.org || e.email) && /* @__PURE__ */ f("div", {
						className: "ax-cb__contact-details",
						children: [
							e.org && /* @__PURE__ */ d("span", {
								className: "ax-cb__contact-meta",
								children: e.org
							}),
							e.org && e.email && /* @__PURE__ */ d("span", {
								className: "ax-cb__contact-dot",
								"aria-hidden": "true"
							}),
							e.email && /* @__PURE__ */ d("span", {
								className: "ax-cb__contact-meta ax-cb__contact-email",
								children: e.email
							})
						]
					})]
				})]
			}), /* @__PURE__ */ d("div", {
				className: "ax-cb__row-shortcut",
				children: t
			})]
		});
	}
	let o = e.shortcut ?? ft;
	return /* @__PURE__ */ f("button", {
		ref: r,
		type: "button",
		className: I("ax-cb__row", e.className),
		"data-cb-item": !0,
		onClick: e.onClick,
		onMouseEnter: a,
		role: "option",
		children: [
			e.parentLabel && /* @__PURE__ */ f("div", {
				className: "ax-cb__row-parent",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ d("span", {
					className: "ax-cb__row-parent-label",
					children: e.parentLabel
				}), /* @__PURE__ */ d("i", { className: "icon-arrow-right-short ax-cb__row-parent-arrow" })]
			}),
			/* @__PURE__ */ f("div", {
				className: "ax-cb__row-inner",
				children: [
					/* @__PURE__ */ d("i", {
						className: I(e.icon, "ax-cb__row-icon"),
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ d("span", {
						className: "ax-cb__row-label",
						children: ut(e.label, i)
					}),
					e.category && /* @__PURE__ */ d("span", {
						className: "ax-cb__row-category",
						children: ut(e.category, i)
					})
				]
			}),
			/* @__PURE__ */ d("div", {
				className: "ax-cb__row-shortcut",
				children: o
			})
		]
	});
}
function vt({ onAskAi: e }) {
	return /* @__PURE__ */ f("div", {
		className: "ax-cb__no-results-row",
		children: [/* @__PURE__ */ d("i", {
			className: "icon-info-outline ax-cb__no-results-icon",
			"aria-hidden": "true"
		}), /* @__PURE__ */ f("span", {
			className: "ax-cb__no-results-text",
			children: [
				"No results found, try adjusting search terms or",
				" ",
				/* @__PURE__ */ d("button", {
					type: "button",
					className: "ax-cb__ask-ai-link",
					onClick: e,
					children: "ask AI"
				}),
				" ",
				"how to use aXcelerate"
			]
		})]
	});
}
function yt({ children: e, onDismiss: t, dismissLabel: n = "Got it" }) {
	return /* @__PURE__ */ f("div", {
		className: "ax-cb__ai-block",
		children: [/* @__PURE__ */ d("i", {
			className: "icon-info-outline ax-cb__ai-block-icon",
			"aria-hidden": "true"
		}), /* @__PURE__ */ f("div", {
			className: "ax-cb__ai-block-body",
			children: [/* @__PURE__ */ d("p", {
				className: "ax-cb__ai-block-text",
				children: e
			}), t && /* @__PURE__ */ d("button", {
				type: "button",
				className: "ax-cb__ai-block-dismiss",
				onClick: t,
				children: n
			})]
		})]
	});
}
function bt() {
	return /* @__PURE__ */ f("div", {
		className: "ax-cb__ai-info",
		children: [/* @__PURE__ */ d("i", {
			className: "icon-info-outline ax-cb__ai-info-icon",
			"aria-hidden": "true"
		}), /* @__PURE__ */ f("p", {
			className: "ax-cb__ai-info-text",
			children: [
				"The AI assistant can guide you on using aXcelerate. For example, you could ask:",
				" ",
				/* @__PURE__ */ d("strong", { children: "\"how do I create a contact note?\"" }),
				" or",
				" ",
				/* @__PURE__ */ d("strong", { children: "\"where do I go to bulk enrol learners in a workshop?\"" }),
				" ",
				"This is powered by our ",
				/* @__PURE__ */ d("strong", { children: "Help & Support Centre" })
			]
		})]
	});
}
//#endregion
//#region src/components/ui/card.tsx
var xt = t.forwardRef(({ className: e, variant: t = "default", direction: n, gap: r, pad: i, ...a }, o) => /* @__PURE__ */ d("div", {
	ref: o,
	className: I("ax-card", t === "inline" && "ax-card--inline", n === "row" && "ax-card--row", r && `ax-card--gap-${r}`, i && `ax-card--pad-${i}`, e),
	...a
}));
xt.displayName = "Card";
var St = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: I("ax-card-header", e),
	...t
}));
St.displayName = "CardHeader";
var Ct = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: I("ax-card-title", e),
	...t
}));
Ct.displayName = "CardTitle";
var wt = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: I("ax-card-description", e),
	...t
}));
wt.displayName = "CardDescription";
var Tt = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: I("ax-card-footer", e),
	...t
}));
Tt.displayName = "CardFooter";
var Et = t.forwardRef(({ className: e, avatar: t, title: n, ...r }, i) => /* @__PURE__ */ f("div", {
	ref: i,
	className: I("ax-card-thumbnail-header", e),
	...r,
	children: [t, /* @__PURE__ */ d("h4", {
		className: "ax-card-title",
		children: n
	})]
}));
Et.displayName = "CardThumbnailHeader";
//#endregion
//#region src/data/ax-icons.ts
var Dt = [
	{
		name: "icon-tick",
		code: "e906"
	},
	{
		name: "icon-cancel",
		code: "e907"
	},
	{
		name: "icon-chevron-down",
		code: "e910"
	},
	{
		name: "icon-chevron-left",
		code: "e911"
	},
	{
		name: "icon-chevron-right",
		code: "e912"
	},
	{
		name: "icon-chevron-up",
		code: "e913"
	},
	{
		name: "icon-automation",
		code: "e91e"
	},
	{
		name: "icon-dollar-sign",
		code: "e927"
	},
	{
		name: "icon-dollar-sign-off",
		code: "e928"
	},
	{
		name: "icon-refund",
		code: "e929"
	},
	{
		name: "icon-link",
		code: "e92c"
	},
	{
		name: "icon-unlink",
		code: "e92d"
	},
	{
		name: "icon-time",
		code: "e92e"
	},
	{
		name: "icon-history",
		code: "e92f"
	},
	{
		name: "icon-download",
		code: "e932"
	},
	{
		name: "icon-list",
		code: "e935"
	},
	{
		name: "icon-matrix",
		code: "e937"
	},
	{
		name: "icon-merge",
		code: "e938"
	},
	{
		name: "icon-more-horizontal",
		code: "e93a"
	},
	{
		name: "icon-redo",
		code: "e93b"
	},
	{
		name: "icon-refresh",
		code: "e93c"
	},
	{
		name: "icon-search",
		code: "e940"
	},
	{
		name: "icon-web",
		code: "e944"
	},
	{
		name: "icon-export",
		code: "e955"
	},
	{
		name: "icon-flight",
		code: "e956"
	},
	{
		name: "icon-flight-return",
		code: "e957"
	},
	{
		name: "icon-help-articles",
		code: "e95c"
	},
	{
		name: "icon-code",
		code: "e972"
	},
	{
		name: "icon-external-link",
		code: "e973"
	},
	{
		name: "icon-login",
		code: "e974"
	},
	{
		name: "icon-submit",
		code: "e975"
	},
	{
		name: "icon-rating-bad",
		code: "e977"
	},
	{
		name: "icon-rating-good",
		code: "e978"
	},
	{
		name: "icon-resource-article",
		code: "e979"
	},
	{
		name: "icon-resource-guide",
		code: "e97a"
	},
	{
		name: "icon-generic-list",
		code: "e97d"
	},
	{
		name: "icon-mail",
		code: "e97e"
	},
	{
		name: "icon-permissions",
		code: "e980"
	},
	{
		name: "icon-sequence",
		code: "e981"
	},
	{
		name: "icon-tab",
		code: "e982"
	},
	{
		name: "icon-terminology",
		code: "e983"
	},
	{
		name: "icon-text",
		code: "e984"
	},
	{
		name: "icon-new-placement",
		code: "e985"
	},
	{
		name: "icon-checkbox-unchecked",
		code: "e988"
	},
	{
		name: "icon-checkbox-mid",
		code: "e98a"
	},
	{
		name: "icon-binary",
		code: "e98c"
	},
	{
		name: "icon-numbered-list",
		code: "e996"
	},
	{
		name: "icon-bulleted-list",
		code: "e997"
	},
	{
		name: "icon-upload",
		code: "e99a"
	},
	{
		name: "icon-filter",
		code: "e99d"
	},
	{
		name: "icon-image",
		code: "e99e"
	},
	{
		name: "icon-accept-unmarked",
		code: "e9a1"
	},
	{
		name: "icon-star-outline",
		code: "e9a8"
	},
	{
		name: "icon-star-solid",
		code: "e9a9"
	},
	{
		name: "icon-visibility",
		code: "e9aa"
	},
	{
		name: "icon-visibility-off",
		code: "e9ab"
	},
	{
		name: "icon-average-mood",
		code: "e9ac"
	},
	{
		name: "icon-happy",
		code: "e9ad"
	},
	{
		name: "icon-sad",
		code: "e9ae"
	},
	{
		name: "icon-very-happy",
		code: "e9af"
	},
	{
		name: "icon-very-sad",
		code: "e9b0"
	},
	{
		name: "icon-activities-tasks-list",
		code: "e9b3"
	},
	{
		name: "icon-certificate-outline-qualification",
		code: "e9b4"
	},
	{
		name: "icon-briefcase-placement",
		code: "e9b5"
	},
	{
		name: "icon-collapse-menu-hamburger",
		code: "e9b6"
	},
	{
		name: "icon-open-menu-hamburger",
		code: "e9b7"
	},
	{
		name: "icon-observation-list",
		code: "e9b8"
	},
	{
		name: "icon-hexagon-draw",
		code: "e9bd"
	},
	{
		name: "icon-test",
		code: "e9c0"
	},
	{
		name: "icon-clipboard-check",
		code: "e9c3"
	},
	{
		name: "icon-contact-add-outline",
		code: "e9c7"
	},
	{
		name: "icon-sort",
		code: "e9c8"
	},
	{
		name: "icon-camera-outline",
		code: "e9cc"
	},
	{
		name: "icon-tag",
		code: "e9ce"
	},
	{
		name: "icon-archive-outline",
		code: "e9d2"
	},
	{
		name: "icon-finance",
		code: "e9d4"
	},
	{
		name: "icon-note-outline",
		code: "e9d6"
	},
	{
		name: "icon-settings1",
		code: "e9d8"
	},
	{
		name: "icon-mapping-link",
		code: "e9dc"
	},
	{
		name: "icon-linking-type",
		code: "e9e0"
	},
	{
		name: "icon-trend-up",
		code: "f000"
	},
	{
		name: "icon-trend-down",
		code: "f001"
	},
	{
		name: "icon-stop",
		code: "f003"
	},
	{
		name: "icon-show",
		code: "f004"
	},
	{
		name: "icon-selection",
		code: "f005"
	},
	{
		name: "icon-pan-mode",
		code: "f006"
	},
	{
		name: "icon-numeracy",
		code: "f007"
	},
	{
		name: "icon-mobile",
		code: "f008"
	},
	{
		name: "icon-mag-glass-plus",
		code: "f009"
	},
	{
		name: "icon-mag-glass-minus",
		code: "f00a"
	},
	{
		name: "icon-lln",
		code: "f00b"
	},
	{
		name: "icon-lightning-bolt",
		code: "f00c"
	},
	{
		name: "icon-flask",
		code: "f00d"
	},
	{
		name: "icon-fit-width",
		code: "f00e"
	},
	{
		name: "icon-fit-page",
		code: "f00f"
	},
	{
		name: "icon-contact-tick1",
		code: "f011"
	},
	{
		name: "icon-contact-swap",
		code: "f012"
	},
	{
		name: "icon-contact-cross",
		code: "f013"
	},
	{
		name: "icon-cancelled",
		code: "f014"
	},
	{
		name: "icon-atom",
		code: "f015"
	},
	{
		name: "icon-add",
		code: "f016"
	},
	{
		name: "icon-all-inclusive",
		code: "e9e6"
	},
	{
		name: "icon-assignment",
		code: "e9e8"
	},
	{
		name: "icon-bookmark-outline",
		code: "e9e9"
	},
	{
		name: "icon-edit-outline",
		code: "e9ee"
	},
	{
		name: "icon-hotspot",
		code: "e9ef"
	},
	{
		name: "icon-learning-plan",
		code: "e9f0"
	},
	{
		name: "icon-mapping-review",
		code: "e9f1"
	},
	{
		name: "icon-chart-donut",
		code: "e9f2"
	},
	{
		name: "icon-tick-correct-filled",
		code: "e9f3"
	},
	{
		name: "icon-x-filled",
		code: "e9f4"
	},
	{
		name: "icon-outline-circle-unanswered",
		code: "e9f5"
	},
	{
		name: "icon-x-thick",
		code: "e9f6"
	},
	{
		name: "icon-people-search",
		code: "e9f7"
	},
	{
		name: "icon-file-upload",
		code: "e9f8"
	},
	{
		name: "icon-school",
		code: "e9f9"
	},
	{
		name: "icon-routes",
		code: "e9fa"
	},
	{
		name: "icon-message-outline",
		code: "e9fb"
	},
	{
		name: "icon-coordinates",
		code: "e9fc"
	},
	{
		name: "icon-automation-rule",
		code: "e9fd"
	},
	{
		name: "icon-briefcase",
		code: "e9fe"
	},
	{
		name: "icon-help-outline",
		code: "e9ff"
	},
	{
		name: "icon-note-add-outline",
		code: "ea00"
	},
	{
		name: "icon-rocket",
		code: "ea01"
	},
	{
		name: "icon-options",
		code: "ea02"
	},
	{
		name: "icon-portrait",
		code: "ea03"
	},
	{
		name: "icon-list-checks",
		code: "ea04"
	},
	{
		name: "icon-shapes",
		code: "ea05"
	},
	{
		name: "icon-unit-add",
		code: "ea06"
	},
	{
		name: "icon-blackboard",
		code: "ea07"
	},
	{
		name: "icon-assessment-instances",
		code: "ea08"
	},
	{
		name: "icon-clipboard-list",
		code: "ea09"
	},
	{
		name: "icon-multiple-people",
		code: "ea0a"
	},
	{
		name: "icon-account-star",
		code: "ea0b"
	},
	{
		name: "icon-person-outline",
		code: "ea0c"
	},
	{
		name: "icon-checklist",
		code: "ea0d"
	},
	{
		name: "icon-copy-outline",
		code: "ea0e"
	},
	{
		name: "icon-bin",
		code: "ea0f"
	},
	{
		name: "icon-tick-thick",
		code: "ea10"
	},
	{
		name: "icon-folder",
		code: "ea11"
	},
	{
		name: "icon-marked-circle",
		code: "ea12"
	},
	{
		name: "icon-image-edit",
		code: "ea13"
	},
	{
		name: "icon-grid-plus",
		code: "ea15"
	},
	{
		name: "icon-criteria",
		code: "ea16"
	},
	{
		name: "icon-assessment-groups",
		code: "ea17"
	},
	{
		name: "icon-info-tooltip",
		code: "ea18"
	},
	{
		name: "icon-book-outline",
		code: "ea19"
	},
	{
		name: "icon-undo",
		code: "ea1a"
	},
	{
		name: "icon-image-add",
		code: "ea1b"
	},
	{
		name: "icon-half-checked",
		code: "ea1c"
	},
	{
		name: "icon-radio-unchecked",
		code: "ea23"
	},
	{
		name: "icon-radio-checked",
		code: "ea24"
	},
	{
		name: "icon-field",
		code: "ea28"
	},
	{
		name: "icon-today",
		code: "ea29"
	},
	{
		name: "icon-taxi",
		code: "ea2a"
	},
	{
		name: "icon-signature",
		code: "ea2b"
	},
	{
		name: "icon-triangle",
		code: "ea2c"
	},
	{
		name: "icon-textarea",
		code: "ea2d"
	},
	{
		name: "icon-square-draw",
		code: "ea2e"
	},
	{
		name: "icon-sort-arrows",
		code: "ea2f"
	},
	{
		name: "icon-slash",
		code: "ea30"
	},
	{
		name: "icon-print-outline",
		code: "ea31"
	},
	{
		name: "icon-more-vertical",
		code: "ea32"
	},
	{
		name: "icon-marketplace-outline",
		code: "ea33"
	},
	{
		name: "icon-list-view",
		code: "ea34"
	},
	{
		name: "icon-hash-number",
		code: "ea35"
	},
	{
		name: "icon-expand",
		code: "ea36"
	},
	{
		name: "icon-dot",
		code: "ea37"
	},
	{
		name: "icon-divider",
		code: "ea38"
	},
	{
		name: "icon-bell-outline",
		code: "ea39"
	},
	{
		name: "icon-shuffle",
		code: "ea3a"
	},
	{
		name: "icon-warning-outline",
		code: "ea3b"
	},
	{
		name: "icon-info-outline",
		code: "ea3c"
	},
	{
		name: "icon-minus",
		code: "ea3d"
	},
	{
		name: "icon-learning-add",
		code: "ea3e"
	},
	{
		name: "icon-arrow-left-short",
		code: "ea3f"
	},
	{
		name: "icon-arrow-right-short",
		code: "ea40"
	},
	{
		name: "icon-columns",
		code: "ea41"
	},
	{
		name: "icon-download-outline",
		code: "ea42"
	},
	{
		name: "icon-exit",
		code: "ea43"
	},
	{
		name: "icon-file-outline",
		code: "ea44"
	},
	{
		name: "icon-logbook-add",
		code: "ea45"
	},
	{
		name: "icon-logbook",
		code: "ea46"
	},
	{
		name: "icon-rating-bad-outline",
		code: "ea47"
	},
	{
		name: "icon-rating-good-outline",
		code: "ea48"
	},
	{
		name: "icon-send",
		code: "ea49"
	},
	{
		name: "icon-verified",
		code: "ea4a"
	},
	{
		name: "icon-card-payment",
		code: "ea4b"
	},
	{
		name: "icon-announcement",
		code: "ea4c"
	},
	{
		name: "icon-home",
		code: "ea4d"
	},
	{
		name: "icon-attach",
		code: "ea4e"
	},
	{
		name: "icon-forum",
		code: "ea4f"
	},
	{
		name: "icon-heart-outline",
		code: "ea50"
	},
	{
		name: "icon-heart-solid",
		code: "ea51"
	},
	{
		name: "icon-present-gift",
		code: "ea52"
	},
	{
		name: "icon-vertical-pin",
		code: "ea53"
	},
	{
		name: "icon-grid",
		code: "ea54"
	},
	{
		name: "icon-incorrect-unsatisfactory",
		code: "ea55"
	},
	{
		name: "icon-circle-tick",
		code: "ea56"
	},
	{
		name: "icon-swap",
		code: "ea57"
	},
	{
		name: "icon-blank-gap",
		code: "ea58"
	},
	{
		name: "icon-menu",
		code: "ea59"
	},
	{
		name: "icon-reset-retry",
		code: "ea5a"
	},
	{
		name: "icon-play-video_rounded",
		code: "ea5b"
	},
	{
		name: "icon-theme-colour",
		code: "ea5c"
	},
	{
		name: "icon-tip-light",
		code: "ea5d"
	},
	{
		name: "icon-question-bank",
		code: "ea5e"
	},
	{
		name: "icon-arrow-down-short",
		code: "ea5f"
	},
	{
		name: "icon-arrow-up-short",
		code: "ea60"
	},
	{
		name: "icon-items-bank",
		code: "ea61"
	},
	{
		name: "icon-magic-ai-stars",
		code: "ea62"
	},
	{
		name: "icon-assessment-individual-marked",
		code: "ea63"
	},
	{
		name: "icon-globe-external",
		code: "ea64"
	},
	{
		name: "icon-learner",
		code: "ea65"
	},
	{
		name: "icon-shield-administrator",
		code: "ea66"
	},
	{
		name: "icon-text-color",
		code: "ea67"
	},
	{
		name: "icon-linkedin",
		code: "ea68"
	},
	{
		name: "icon-share",
		code: "ea69"
	},
	{
		name: "icon-broken-file",
		code: "ea6a"
	},
	{
		name: "icon-drag_rounded",
		code: "ea6b"
	},
	{
		name: "icon-calendar-outline",
		code: "ea6c"
	},
	{
		name: "icon-upload-underline",
		code: "ea6d"
	},
	{
		name: "icon-hand-wave",
		code: "ea6e"
	},
	{
		name: "icon-queue",
		code: "ea6f"
	},
	{
		name: "icon-chart-axis",
		code: "ea70"
	},
	{
		name: "icon-phone",
		code: "ea71"
	},
	{
		name: "icon-place-outline",
		code: "ea72"
	},
	{
		name: "icon-collapse-panel",
		code: "ea73"
	},
	{
		name: "icon-percentage",
		code: "ea74"
	},
	{
		name: "icon-crown",
		code: "ea75"
	},
	{
		name: "icon-in-progress",
		code: "ea76"
	},
	{
		name: "icon-sync",
		code: "ea77"
	},
	{
		name: "icon-authorisation",
		code: "ea78"
	},
	{
		name: "icon-pause",
		code: "ea79"
	},
	{
		name: "icon-contact-id",
		code: "ea7a"
	},
	{
		name: "icon-birthday-cake",
		code: "ea7b"
	},
	{
		name: "icon-bold",
		code: "ea7c"
	},
	{
		name: "icon-italic",
		code: "ea7d"
	},
	{
		name: "icon-underline",
		code: "ea7e"
	},
	{
		name: "icon-align-centre",
		code: "ea7f"
	},
	{
		name: "icon-align-justify",
		code: "ea80"
	},
	{
		name: "icon-align-left",
		code: "ea81"
	},
	{
		name: "icon-align-right",
		code: "ea82"
	},
	{
		name: "icon-remove-text-formatting",
		code: "ea83"
	},
	{
		name: "icon-award-ribbon",
		code: "ea84"
	},
	{
		name: "icon-enter",
		code: "ea85"
	},
	{
		name: "icon-contact-tick",
		code: "ea86"
	},
	{
		name: "icon-text-option",
		code: "ea87"
	}
], Ot = null;
function kt() {
	if (Ot) return Ot;
	let e = /* @__PURE__ */ new Set();
	try {
		for (let t of document.styleSheets) try {
			for (let n of t.cssRules) if (n instanceof CSSStyleRule) for (let t of n.style) typeof t == "string" && t.startsWith("--") && e.add(t);
		} catch {}
	} catch {}
	let t = getComputedStyle(document.documentElement);
	return Ot = [...e].sort().map((e) => ({
		name: e,
		value: t.getPropertyValue(e).trim()
	})), Ot;
}
function At(e) {
	return e.startsWith("#") || e.startsWith("rgb") || e.startsWith("hsl") || e.startsWith("oklch") || e.startsWith("color(");
}
function jt(e) {
	if (!e) return "";
	if (e.type === "iconChip") return `[icon:${e.attrs.name}(${e.attrs.code})]`;
	if (e.type === "tokenChip") return `[token:${e.attrs.name}(${e.attrs.value})]`;
	if (e.type === "text") return e.text ?? "";
	if (!e.content) return "";
	let t = e.content.map(jt);
	switch (e.type) {
		case "listItem": return `• ${t.join("")}`;
		case "bulletList": return t.join("\n");
		case "codeBlock": return `\`\`\`\n${t.join("")}\`\`\``;
		case "paragraph": return t.join("");
		default: return t.join("");
	}
}
function Mt(e) {
	return e ? e.getJSON().content?.map(jt).join("\n").trim() ?? "" : "";
}
function Nt({ node: e, editor: t, getPos: n, deleteNode: r }) {
	return /* @__PURE__ */ f(y, {
		as: "span",
		className: "icon-chip",
		children: [/* @__PURE__ */ f("span", {
			className: "editor-chip-body",
			onClick: () => {
				let r = n();
				r !== void 0 && t.chain().focus().deleteRange({
					from: r,
					to: r + e.nodeSize
				}).insertContentAt(r, "/icon ").run();
			},
			children: [/* @__PURE__ */ d("i", { className: e.attrs.name }), /* @__PURE__ */ d("span", { children: e.attrs.name.replace("icon-", "") })]
		}), /* @__PURE__ */ d("button", {
			className: "editor-chip-remove",
			onMouseDown: (e) => {
				e.preventDefault(), r();
			},
			tabIndex: -1,
			"aria-label": "Remove",
			children: "×"
		})]
	});
}
var Pt = w.create({
	name: "iconChip",
	group: "inline",
	inline: !0,
	atom: !0,
	addAttributes: () => ({
		name: { default: "" },
		code: { default: "" }
	}),
	parseHTML: () => [{ tag: "span[data-icon-chip]" }],
	renderHTML: ({ HTMLAttributes: e }) => ["span", T({ "data-icon-chip": "" }, e)],
	addNodeView: () => b(Nt)
});
function Ft({ node: e, editor: t, getPos: n, deleteNode: r }) {
	return /* @__PURE__ */ f(y, {
		as: "span",
		className: "token-chip",
		children: [/* @__PURE__ */ f("span", {
			className: "editor-chip-body",
			onClick: () => {
				let r = n();
				r !== void 0 && t.chain().focus().deleteRange({
					from: r,
					to: r + e.nodeSize
				}).insertContentAt(r, "/token ").run();
			},
			children: [At(e.attrs.value) && /* @__PURE__ */ d("span", {
				className: "token-chip-swatch",
				style: { background: e.attrs.value }
			}), /* @__PURE__ */ f("span", { children: [e.attrs.name, e.attrs.name.endsWith(":") && e.attrs.value ? ` ${e.attrs.value}` : ""] })]
		}), /* @__PURE__ */ d("button", {
			className: "editor-chip-remove",
			onMouseDown: (e) => {
				e.preventDefault(), r();
			},
			tabIndex: -1,
			"aria-label": "Remove",
			children: "×"
		})]
	});
}
var It = w.create({
	name: "tokenChip",
	group: "inline",
	inline: !0,
	atom: !0,
	addAttributes: () => ({
		name: { default: "" },
		value: { default: "" }
	}),
	parseHTML: () => [{ tag: "span[data-token-chip]" }],
	renderHTML: ({ HTMLAttributes: e }) => ["span", T({ "data-token-chip": "" }, e)],
	addNodeView: () => b(Ft)
}), Lt = r(({ items: e, command: t }, n) => {
	let [r, i] = l(0);
	o(() => i(0), [e]), s(n, () => ({ onKeyDown(n) {
		return n.key === "ArrowUp" ? (i((t) => (t - 1 + e.length) % e.length), !0) : n.key === "ArrowDown" ? (i((t) => (t + 1) % e.length), !0) : n.key === "Enter" ? (e[r] && t(e[r]), !0) : !1;
	} }));
	let a = e.length === 0 ? "No results found" : null;
	return e.length ? /* @__PURE__ */ d("div", {
		className: "suggestion-list",
		children: e.map((e, n) => /* @__PURE__ */ f("button", {
			className: `suggestion-item${n === r ? " is-selected" : ""}`,
			onMouseDown: (n) => {
				n.preventDefault(), t(e);
			},
			children: [
				e.kind === "command" && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("span", {
					className: "suggestion-cmd",
					children: "/"
				}), e.label] }),
				e.kind === "icon" && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("i", { className: e.name }), /* @__PURE__ */ d("span", { children: e.name.replace("icon-", "") })] }),
				e.kind === "token" && /* @__PURE__ */ f(u, { children: [
					At(e.value) ? /* @__PURE__ */ d("span", {
						className: "suggestion-token-swatch",
						style: { background: e.value }
					}) : /* @__PURE__ */ d("span", { className: "suggestion-token-swatch suggestion-token-swatch--empty" }),
					/* @__PURE__ */ d("span", {
						className: "suggestion-token-name",
						children: e.name
					}),
					/* @__PURE__ */ d("span", {
						className: "suggestion-token-value",
						children: e.value
					})
				] })
			]
		}, n))
	}) : /* @__PURE__ */ d("div", {
		className: "suggestion-list",
		children: /* @__PURE__ */ d("div", {
			className: "suggestion-empty",
			children: a
		})
	});
}), Rt = !1, zt = C.create({
	name: "slashCommands",
	addProseMirrorPlugins() {
		let e = { current: null };
		return [O({
			editor: this.editor,
			char: "/",
			allowSpaces: !0,
			startOfLine: !1,
			items: ({ query: e }) => {
				let t = e.toLowerCase(), [n, ...r] = t.split(" "), i = r.join(" ");
				return n === "icon" && (r.length > 0 || t.endsWith(" ")) ? Dt.filter((e) => e.name.replace("icon-", "").includes(i)).slice(0, 10).map((e) => ({
					kind: "icon",
					...e
				})) : n === "token" && (r.length > 0 || t.endsWith(" ")) ? kt().filter((e) => e.name.includes(i)).slice(0, 12).map((e) => ({
					kind: "token",
					...e
				})) : [{
					kind: "command",
					name: "icon",
					label: "icon — search & insert icon chip"
				}, {
					kind: "command",
					name: "token",
					label: "token — search & insert design token"
				}].filter((e) => e.name.startsWith(n));
			},
			command: ({ editor: e, range: t, props: n }) => {
				n.kind === "command" ? e.chain().focus().deleteRange(t).insertContent(`/${n.name} `).run() : n.kind === "icon" ? e.chain().focus().deleteRange(t).insertContent({
					type: "iconChip",
					attrs: {
						name: n.name,
						code: n.code
					}
				}).insertContent(" ").run() : n.kind === "token" && e.chain().focus().deleteRange(t).insertContent({
					type: "tokenChip",
					attrs: {
						name: n.name,
						value: n.value
					}
				}).insertContent(" ").run();
			},
			render: () => {
				let t = null, n = null, r = (r) => {
					n || (n = document.createElement("div"), n.className = "suggestion-portal", document.body.appendChild(n), t = _(n));
					let i = r.clientRect?.();
					i && n && (n.style.left = `${Math.min(i.left, window.innerWidth - 240)}px`, n.style.top = `${i.bottom + 4}px`), t.render(/* @__PURE__ */ d(Lt, {
						ref: e,
						items: r.items,
						command: r.command
					}));
				};
				return {
					onStart(e) {
						Rt = !0, r(e);
					},
					onUpdate: r,
					onExit() {
						Rt = !1, t?.unmount(), n?.remove(), t = null, n = null;
					},
					onKeyDown({ event: t }) {
						return e.current?.onKeyDown(t) ?? !1;
					}
				};
			}
		})];
	}
}), Bt = r(function({ onSubmit: e, onCancel: t }, n) {
	let r = c(null), i = x({
		extensions: [
			E,
			D.configure({ placeholder: "Describe the change… (Enter to copy · Shift+Enter for new line · / for commands)" }),
			Pt,
			It,
			zt
		],
		autofocus: !0,
		editorProps: {
			attributes: { class: "change-editor-content" },
			handleKeyDown(n, a) {
				return a.key === "Escape" ? (t(), !0) : a.key === "Enter" && !a.shiftKey ? Rt ? !1 : (e(Mt(r.current)), !0) : a.key === "Enter" && a.shiftKey ? (i?.commands.setHardBreak(), !0) : !1;
			}
		}
	});
	return o(() => {
		r.current = i;
	}, [i]), s(n, () => ({
		insertToken(e, t) {
			i?.chain().focus().insertContent({
				type: "tokenChip",
				attrs: {
					name: e,
					value: t
				}
			}).insertContent(" ").run();
		},
		insertIcon(e, t) {
			i?.chain().focus().insertContent({
				type: "iconChip",
				attrs: {
					name: e,
					code: t,
					blacklisted: !1
				}
			}).insertContent(" ").run();
		}
	}), [i]), /* @__PURE__ */ d("div", {
		className: "change-editor-toolbar-wrap",
		children: /* @__PURE__ */ d(v, { editor: i })
	});
}), Vt = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(k.Root, {
	ref: n,
	className: I("ax-checkbox", e),
	...t,
	children: /* @__PURE__ */ d(k.Indicator, {
		className: "ax-checkbox-indicator",
		children: /* @__PURE__ */ d("i", { className: "ax-icon icon-tick" })
	})
}));
Vt.displayName = k.Root.displayName;
//#endregion
//#region src/components/ui/chip.tsx
function Ht({ children: e, thumbnail: t, rounded: n = !1, roundedThumb: r = !1, draggable: i = !1, active: a = !1, disabled: o = !1, themed: s = !1, actionIcon: c, onAction: l, onRemove: u, removeDisabled: p = !1, removeTabIndex: m = -1, onClick: h, tabIndex: g, onFocus: _, onBlur: v, onKeyDown: y, onKeyUp: b, className: x }) {
	return /* @__PURE__ */ f("div", {
		role: h ? "button" : void 0,
		tabIndex: g === void 0 ? h ? 0 : void 0 : g,
		onClick: h,
		onFocus: _,
		onBlur: v,
		onKeyDown: y ?? (h ? (e) => {
			(e.key === "Enter" || e.key === " ") && h(e);
		} : void 0),
		onKeyUp: b,
		className: I("ax-chip", n && "ax-chip--rounded", t && "ax-chip--has-thumb", h && "ax-chip--interactive", a && "ax-chip--active", o && "ax-chip--disabled", s && "ax-chip--themed", x),
		children: [
			i && /* @__PURE__ */ d("span", {
				className: "ax-chip__drag",
				"aria-hidden": "true",
				children: /* @__PURE__ */ d("i", { className: "icon-drag_rounded" })
			}),
			t && /* @__PURE__ */ d("span", {
				className: "ax-chip__thumb-wrap",
				children: /* @__PURE__ */ d("img", {
					src: t,
					alt: "",
					className: I("ax-chip__thumb", (n || r) && "ax-chip__thumb--rounded")
				})
			}),
			/* @__PURE__ */ d("span", {
				className: "ax-chip__label",
				children: e
			}),
			c && /* @__PURE__ */ d("button", {
				type: "button",
				className: "ax-chip__action",
				onClick: (e) => {
					e.stopPropagation(), l?.(e);
				},
				tabIndex: -1,
				"aria-label": "Action",
				children: /* @__PURE__ */ d("i", { className: c })
			}),
			(u || p) && /* @__PURE__ */ d("button", {
				type: "button",
				className: "ax-chip__remove",
				onClick: u ? (e) => {
					e.stopPropagation(), u(e);
				} : void 0,
				disabled: p,
				tabIndex: m,
				"aria-label": "Remove",
				children: /* @__PURE__ */ d("i", { className: "icon-x-thick" })
			})
		]
	});
}
Ht.displayName = "Chip";
//#endregion
//#region src/components/ui/combobox.tsx
function Ut({ items: e, value: n, onValueChange: r, placeholder: i = "Select…", searchPlaceholder: a = "Search…", emptyText: o = "No results.", open: s, onOpenChange: c, contentStyle: l, className: u }) {
	let [p, m] = t.useState(!1), [h, g] = t.useState(""), [_, v] = t.useState(!1), [y, b] = t.useState(!1), [x, S] = t.useState(240), C = t.useRef(null), w = t.useRef(null), T = s === void 0 ? p : s;
	function E(e) {
		if (e && C.current) {
			let e = C.current.getBoundingClientRect(), t = typeof l?.width == "number" ? l.width : e.width;
			v(e.left + t > window.innerWidth - 16);
			let n = window.innerHeight - e.bottom - 8, r = e.top - 8;
			n < 200 && r > n ? (b(!0), S(Math.min(r - 44 - 16, 320))) : (b(!1), S(Math.min(n - 44 - 16, 320)));
		}
		e || g(""), m(e), c?.(e);
	}
	t.useEffect(() => {
		if (!T) return;
		function e(e) {
			C.current?.contains(e.target) || E(!1);
		}
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [T]), t.useEffect(() => {
		T && w.current?.focus();
	}, [T]);
	let D = t.useMemo(() => {
		let t = h.toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t) || e.value.toLowerCase().includes(t) || e.keywords?.some((e) => e.toLowerCase().includes(t))) : e;
	}, [e, h]), O = e.find((e) => e.value === n)?.label;
	function k(e) {
		r?.(e === n ? "" : e), E(!1);
	}
	return /* @__PURE__ */ f("div", {
		ref: C,
		style: {
			position: "relative",
			display: "block"
		},
		children: [/* @__PURE__ */ f("button", {
			type: "button",
			className: I("ax-combobox-trigger", u),
			onClick: () => E(!T),
			"aria-expanded": T,
			"aria-haspopup": "listbox",
			children: [/* @__PURE__ */ d("span", {
				className: I("ax-combobox-trigger-value", !n && "ax-combobox-trigger-value--placeholder"),
				children: O ?? i
			}), /* @__PURE__ */ d("i", { className: I("icon-chevron-down ax-combobox-chevron", T && "ax-combobox-chevron--open") })]
		}), T && /* @__PURE__ */ d("div", {
			className: "ax-combobox-content",
			style: {
				position: "absolute",
				...y ? { bottom: "calc(100% + 4px)" } : { top: "calc(100% + 4px)" },
				..._ ? { right: 0 } : { left: 0 },
				minWidth: "100%",
				...l
			},
			role: "dialog",
			children: /* @__PURE__ */ f("div", {
				className: "ax-combobox-command",
				children: [/* @__PURE__ */ f("div", {
					className: "ax-combobox-search",
					children: [/* @__PURE__ */ d("i", { className: "icon-search ax-combobox-search-icon" }), /* @__PURE__ */ d("input", {
						ref: w,
						className: "ax-combobox-search-input",
						value: h,
						onChange: (e) => g(e.target.value),
						placeholder: a
					})]
				}), /* @__PURE__ */ d("div", {
					className: "ax-combobox-list",
					role: "listbox",
					style: { maxHeight: x },
					children: D.length === 0 ? /* @__PURE__ */ d("div", {
						className: "ax-combobox-empty",
						children: o
					}) : D.map((e) => /* @__PURE__ */ f("div", {
						role: "option",
						"aria-selected": e.value === n,
						className: "ax-combobox-item",
						onMouseDown: (t) => {
							t.preventDefault(), k(e.value);
						},
						children: [e.label, e.value === n && /* @__PURE__ */ d("i", { className: "icon-tick ax-combobox-item-check" })]
					}, e.value))
				})]
			})
		})]
	});
}
Ut.displayName = "Combobox";
//#endregion
//#region src/components/ui/popover.tsx
var q = P.Root, J = P.Trigger, Y = t.forwardRef(({ className: e, align: t = "start", sideOffset: n = 4, ...r }, i) => /* @__PURE__ */ d(P.Portal, { children: /* @__PURE__ */ d(P.Content, {
	ref: i,
	align: t,
	sideOffset: n,
	className: I("ax-popover-content", e),
	...r
}) }));
Y.displayName = P.Content.displayName;
function Wt({ heading: e, body: t, dismissable: n = !1, action: r = !1, actionLabel: i = "Read more", content: a = !1, onDismiss: o, onAction: s, children: c, className: l }) {
	return /* @__PURE__ */ f("div", {
		className: I("ax-popover-card", l),
		children: [/* @__PURE__ */ f("div", {
			className: "ax-popover-card-content",
			children: [
				(e || t) && /* @__PURE__ */ f("div", {
					className: "ax-popover-card-text",
					children: [e && /* @__PURE__ */ d("p", {
						className: "ax-popover-card-heading",
						children: e
					}), t && /* @__PURE__ */ d("p", {
						className: "ax-popover-card-body",
						children: t
					})]
				}),
				a && /* @__PURE__ */ d("div", {
					className: "ax-popover-card-slot",
					children: c
				}),
				r && /* @__PURE__ */ d(V, {
					variant: "tertiary",
					onClick: s,
					className: "ax-popover-card-action",
					children: i
				})
			]
		}), n && /* @__PURE__ */ d(H, {
			icon: "icon-cancel",
			size: 20,
			buttonStyle: !1,
			onClick: o,
			"aria-label": "Dismiss"
		})]
	});
}
Wt.displayName = "PopoverCard";
function Gt(e) {
	let [t, n] = e.split("-");
	return {
		side: t,
		align: n ?? "center"
	};
}
function Kt({ heading: e, body: t, action: n = !1, actionLabel: r = "Read more", onAction: i, position: a = "top", field: o = !1, open: s, onOpenChange: c, content: l = !1, children: u }) {
	let { side: p, align: m } = Gt(a);
	return /* @__PURE__ */ f(q, {
		open: s,
		onOpenChange: c,
		children: [/* @__PURE__ */ d(J, {
			asChild: !0,
			children: /* @__PURE__ */ d(H, {
				icon: "icon-info-outline",
				size: o ? 18 : 20,
				buttonStyle: !1,
				className: s ? "ax-popover-trigger--active" : void 0,
				"aria-label": "More information"
			})
		}), /* @__PURE__ */ d(P.Portal, { children: /* @__PURE__ */ d(P.Content, {
			side: p,
			align: m,
			sideOffset: 6,
			className: "ax-popover-animated",
			children: /* @__PURE__ */ d(Wt, {
				heading: e,
				body: t,
				action: n,
				actionLabel: r,
				onAction: i,
				content: l,
				children: u
			})
		}) })]
	});
}
Kt.displayName = "InfoPopover";
//#endregion
//#region src/components/ui/date-picker.tsx
var qt = [
	"dd/MM/yy",
	"dd/MM/yyyy",
	"d/M/yy",
	"d/M/yyyy",
	"dd-MM-yy",
	"dd-MM-yyyy",
	"dd MMM yy",
	"dd MMM yyyy",
	"d MMM yy",
	"d MMM yyyy",
	"dd MMMM yy",
	"dd MMMM yyyy"
];
function Jt(e) {
	let t = e.trim().toLowerCase();
	if (!t) return;
	if (t === "today") return ee();
	if (t === "tomorrow") return A(ee(), 1);
	let n = /* @__PURE__ */ new Date();
	for (let t of qt) {
		let r = N(e.trim(), t, n);
		if (M(r)) return r;
	}
}
var Yt = "dd MMM yy";
function Xt(e) {
	let { mode: n = "single", placeholder: r, className: i, disabled: a } = e, [o, s] = t.useState(!1), [c, l] = t.useState(!1), [u, p] = t.useState(""), [m, h] = t.useState(void 0), g = t.useRef("start"), [_, v] = t.useState(0), y = t.useRef(void 0);
	if (n === "range") {
		let { selected: t, onSelect: n } = e, c = !!t?.from, l = t?.from ? t.to ? `${j(t.from, Yt)} – ${j(t.to, Yt)}` : j(t.from, Yt) : r ?? "Pick a date range", u = (e) => {
			e && (g.current = "start", y.current = void 0, h(t)), s(e);
		}, p = (e) => {
			if (g.current === "start") g.current = "end", h({
				from: e,
				to: void 0
			}), v((e) => e + 1);
			else {
				let t = m?.from ?? e, r = e < t ? {
					from: e,
					to: t
				} : {
					from: t,
					to: e
				};
				h(r), n?.(r), s(!1), g.current = "start";
			}
		};
		return /* @__PURE__ */ f(q, {
			open: o,
			onOpenChange: u,
			children: [/* @__PURE__ */ d(J, {
				asChild: !0,
				children: /* @__PURE__ */ f("button", {
					type: "button",
					className: I("ax-select-trigger ax-date-picker-trigger", i),
					disabled: a,
					...c ? {} : { "data-placeholder": "" },
					children: [/* @__PURE__ */ d("i", { className: "icon-calendar-outline" }), /* @__PURE__ */ d("span", {
						className: "ax-select-value",
						children: l
					})]
				})
			}), /* @__PURE__ */ d(Y, { children: /* @__PURE__ */ d(W, {
				mode: "range",
				selected: m,
				defaultMonth: y.current ?? t?.from,
				onMonthChange: (e) => {
					y.current = e;
				},
				onDayClick: p
			}, _) })]
		});
	}
	let { selected: b, onSelect: x } = e, [S, C] = t.useState(void 0), w = b ?? S, T = (e) => {
		b === void 0 && C(e), x?.(e);
	}, E = w ? j(w, Yt) : "", D = (e) => {
		if (l(!1), !e.trim()) {
			T(void 0);
			return;
		}
		let t = Jt(e);
		t && T(t);
	};
	return /* @__PURE__ */ f("div", {
		className: I("ax-date-picker-wrap", i),
		children: [/* @__PURE__ */ d("input", {
			type: "text",
			className: I("ax-date-picker-input", c && "ax-date-picker-input--focused"),
			value: c ? u : E,
			placeholder: r ?? "DD MMM YY",
			disabled: a,
			onFocus: (e) => {
				l(!0), p(E), E && e.target.select();
			},
			onChange: (e) => p(e.target.value),
			onBlur: () => D(u),
			onKeyDown: (e) => {
				e.key === "Enter" && e.currentTarget.blur(), e.key === "Escape" && (l(!1), p(""));
			}
		}), /* @__PURE__ */ f(q, {
			open: o,
			onOpenChange: s,
			children: [/* @__PURE__ */ d(J, {
				asChild: !0,
				children: /* @__PURE__ */ d("button", {
					type: "button",
					className: "ax-date-picker-cal-btn",
					disabled: a,
					tabIndex: -1,
					onMouseDown: (e) => e.preventDefault(),
					children: /* @__PURE__ */ d("i", { className: "icon-calendar-outline" })
				})
			}), /* @__PURE__ */ d(Y, {
				onMouseDown: (e) => e.preventDefault(),
				children: /* @__PURE__ */ d(W, {
					mode: "single",
					selected: w,
					defaultMonth: w,
					onSelect: (e) => {
						T(e), s(!1);
					}
				})
			})]
		})]
	});
}
Xt.displayName = "DatePicker";
//#endregion
//#region src/components/ui/activity-card-horizontal.tsx
var Zt = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thurs",
	"Fri",
	"Sat"
], Qt = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function $t(e) {
	return {
		day: Zt[e.getDay()],
		num: e.getDate(),
		monthYear: `${Qt[e.getMonth()]} ${String(e.getFullYear()).slice(-2)}`
	};
}
var en = t.forwardRef(({ title: e, overview: n, startDate: r, endDate: i, thumbnailSrc: a, codeLabel: o, codeValue: s, status: c, meta: l, chips: p, disabled: m, skeleton: h, onClick: g, className: _ }, v) => {
	let y = !a && r && i;
	return /* @__PURE__ */ f("button", {
		ref: v,
		type: "button",
		disabled: m,
		onClick: g,
		className: I("ax-activity-card-horizontal", m && "ax-activity-card-horizontal--disabled", h && "ax-activity-card-horizontal--skeleton", _),
		children: [/* @__PURE__ */ d("div", {
			className: "ax-activity-card-horizontal-thumb",
			children: a ? /* @__PURE__ */ d("img", {
				src: a,
				alt: "",
				className: "ax-activity-card-horizontal-thumb-img"
			}) : y ? /* @__PURE__ */ d("div", {
				className: "ax-activity-card-horizontal-date-range",
				children: [r, i].map((e, n) => {
					let { day: r, num: i, monthYear: a } = $t(e);
					return /* @__PURE__ */ f(t.Fragment, { children: [n === 1 && /* @__PURE__ */ d("div", { className: "ax-activity-card-horizontal-date-dash" }), /* @__PURE__ */ f("div", {
						className: "ax-activity-card-horizontal-date-col",
						children: [
							/* @__PURE__ */ d("span", {
								className: "ax-activity-card-horizontal-date-day",
								children: r
							}),
							/* @__PURE__ */ d("span", {
								className: "ax-activity-card-horizontal-date-num",
								children: i
							}),
							/* @__PURE__ */ d("span", {
								className: "ax-activity-card-horizontal-date-month",
								children: a
							})
						]
					})] }, n);
				})
			}) : null
		}), /* @__PURE__ */ f("div", {
			className: "ax-activity-card-horizontal-content",
			children: [/* @__PURE__ */ f("div", {
				className: "ax-activity-card-horizontal-top",
				children: [!h && o && s && /* @__PURE__ */ f("div", {
					className: "ax-activity-card-horizontal-code",
					children: [
						/* @__PURE__ */ d("span", {
							className: "ax-activity-card-horizontal-code-label",
							children: o
						}),
						/* @__PURE__ */ d("div", { className: "ax-activity-card-horizontal-code-divider" }),
						/* @__PURE__ */ d("span", {
							className: "ax-activity-card-horizontal-code-value",
							children: s
						})
					]
				}), h ? /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("div", { className: "ax-activity-card-horizontal-skel-line ax-activity-card-horizontal-skel-title" }), /* @__PURE__ */ d("div", { className: "ax-activity-card-horizontal-skel-line ax-activity-card-horizontal-skel-overview" })] }) : /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("p", {
					className: "ax-activity-card-horizontal-title",
					children: e
				}), n && /* @__PURE__ */ d("p", {
					className: "ax-activity-card-horizontal-overview",
					children: n
				})] })]
			}), /* @__PURE__ */ d("div", {
				className: "ax-activity-card-horizontal-bottom",
				children: h ? /* @__PURE__ */ d("div", { className: "ax-activity-card-horizontal-skel-line ax-activity-card-horizontal-skel-status" }) : p ? /* @__PURE__ */ d("div", {
					className: "ax-activity-card-horizontal-chips",
					children: p
				}) : c ? /* @__PURE__ */ f("div", {
					className: "ax-activity-card-horizontal-meta",
					children: [c, l?.map((e, n) => /* @__PURE__ */ f(t.Fragment, { children: [/* @__PURE__ */ d("span", { className: "ax-activity-card-horizontal-dot" }), /* @__PURE__ */ d("span", {
						className: "ax-activity-card-horizontal-meta-text",
						children: e
					})] }, n))]
				}) : null
			})]
		})]
	});
});
en.displayName = "ActivityCardHorizontal";
//#endregion
//#region src/components/ui/activity-card-portrait.tsx
var X = {
	p12537a00: "M15.7812 32.0221C15.7812 31.2454 16.4108 30.6158 17.1875 30.6158H38.6507C39.4273 30.6158 40.0569 31.2454 40.0569 32.0221C40.0569 32.7987 39.4273 33.4283 38.6507 33.4283H17.1875C16.4108 33.4283 15.7812 32.7987 15.7812 32.0221Z",
	p2dfd6000: "M15.7812 38.125C15.7812 37.3483 16.4108 36.7188 17.1875 36.7188H38.75C39.5267 36.7188 40.1562 37.3483 40.1562 38.125C40.1562 38.9017 39.5267 39.5312 38.75 39.5312H17.1875C16.4108 39.5312 15.7812 38.9017 15.7812 38.125Z",
	p2e56000: "M55.3125 54.9879V61.4062C55.3125 64.254 53.004 66.5625 50.1563 66.5625H5.15625C2.30853 66.5625 0 64.254 0 61.4062V5.15625C0 2.30853 2.30853 0 5.15625 0H50.1563C53.004 0 55.3125 2.30853 55.3125 5.15625V30.3195C60.7845 31.2462 64.9517 36.0087 64.9517 41.7445C64.9517 46.7909 61.7261 51.0839 57.2242 52.6741L59.8238 57.1766C60.4802 56.3193 61.4594 55.754 62.5301 55.6141L60.0056 51.2416C60.7946 50.6888 61.5115 50.0401 62.1395 49.3126L66.7375 57.2765C67.3164 58.2792 66.3387 59.4621 65.245 59.0824L63.4628 58.4637C62.7429 58.2138 61.9687 58.6607 61.8252 59.4091L61.4699 61.2619C61.2519 62.399 59.7386 62.6542 59.1598 61.6515L55.3125 54.9879ZM2.8125 5.15625C2.8125 3.86183 3.86183 2.8125 5.15625 2.8125H50.1563C51.4507 2.8125 52.5 3.86183 52.5 5.15625V30.1879C46.5032 30.6296 41.7751 35.6349 41.7751 41.7445C41.7751 44.9512 43.0776 47.8537 45.1824 49.9518L40.9534 57.2765C40.3746 58.2792 41.3522 59.4621 42.4459 59.0824L44.2281 58.4637C44.9481 58.2138 45.7222 58.6607 45.8657 59.4091L46.221 61.2619C46.439 62.399 47.9523 62.6542 48.5312 61.6515L52.5 54.7773V61.4062C52.5 62.7007 51.4507 63.75 50.1563 63.75H5.15625C3.86183 63.75 2.8125 62.7007 2.8125 61.4062V5.15625ZM53.3634 50.5203C58.2101 50.5203 62.1392 46.5913 62.1392 41.7445C62.1392 36.8978 58.2101 32.9688 53.3634 32.9688C48.5167 32.9688 44.5876 36.8978 44.5876 41.7445C44.5876 46.5913 48.5167 50.5203 53.3634 50.5203ZM45.1608 55.6141L47.4228 51.6963C48.3173 52.2314 49.2899 52.6494 50.3196 52.9289L47.8672 57.1766C47.2107 56.3193 46.2315 55.754 45.1608 55.6141Z",
	p3440d7b0: "M8.90625 6.25C7.78442 6.25 6.875 7.15942 6.875 8.28125V58.2812C6.875 59.4031 7.78442 60.3125 8.90625 60.3125H46.0389L45.8657 59.4091C45.7222 58.6607 44.9481 58.2138 44.2281 58.4637L42.4459 59.0824C41.4326 59.4342 40.519 58.4447 40.8504 57.5H9.6875V9.0625H45.625V33.1185C46.4616 32.3675 47.4082 31.7364 48.4375 31.2523V8.28125C48.4375 7.15942 47.5281 6.25 46.4062 6.25H8.90625Z",
	p3cb27d80: "M20.1562 20C20.1562 19.2233 20.7858 18.5938 21.5625 18.5938H33.75C34.5267 18.5938 35.1562 19.2233 35.1562 20C35.1562 20.7767 34.5267 21.4062 33.75 21.4062H21.5625C20.7858 21.4062 20.1562 20.7767 20.1562 20Z",
	p82f2d00: "M15.7812 26.011C15.7812 25.2344 16.4108 24.6048 17.1875 24.6048H38.6507C39.4273 24.6048 40.0569 25.2344 40.0569 26.011C40.0569 26.7877 39.4273 27.4173 38.6507 27.4173H17.1875C16.4108 27.4173 15.7812 26.7877 15.7812 26.011Z"
}, tn = t.forwardRef(({ title: e, description: t, codeLabel: n, codeValue: r, activityType: i, thumbnailSrc: a, disabled: o, selected: s, skeleton: c, onClick: l, className: p }, m) => /* @__PURE__ */ f("button", {
	ref: m,
	type: "button",
	disabled: o || c,
	onClick: l,
	"aria-busy": c || void 0,
	className: I("ax-activity-card-portrait", s && !o && !c && "ax-activity-card-portrait--selected", o && "ax-activity-card-portrait--disabled", c && "ax-activity-card-portrait--skeleton", p),
	children: [/* @__PURE__ */ d("div", {
		className: "ax-activity-card-portrait-thumb",
		children: !c && a ? /* @__PURE__ */ d("img", {
			src: a,
			alt: "",
			className: "ax-activity-card-portrait-thumb-img"
		}) : c ? null : /* @__PURE__ */ d("div", {
			className: "ax-activity-card-portrait-illustration",
			children: /* @__PURE__ */ f("svg", {
				className: "ax-activity-card-portrait-illustration-svg",
				fill: "none",
				preserveAspectRatio: "none",
				viewBox: "0 0 66.9097 66.5625",
				children: [
					/* @__PURE__ */ f("g", {
						opacity: "0.8",
						children: [
							/* @__PURE__ */ d("path", {
								clipRule: "evenodd",
								d: X.p3cb27d80,
								fill: "currentColor",
								fillRule: "evenodd"
							}),
							/* @__PURE__ */ d("path", {
								clipRule: "evenodd",
								d: X.p82f2d00,
								fill: "currentColor",
								fillRule: "evenodd"
							}),
							/* @__PURE__ */ d("path", {
								clipRule: "evenodd",
								d: X.p12537a00,
								fill: "currentColor",
								fillRule: "evenodd"
							}),
							/* @__PURE__ */ d("path", {
								clipRule: "evenodd",
								d: X.p2dfd6000,
								fill: "currentColor",
								fillRule: "evenodd"
							})
						]
					}),
					/* @__PURE__ */ d("path", {
						clipRule: "evenodd",
						d: X.p2e56000,
						fill: "currentColor",
						fillRule: "evenodd"
					}),
					/* @__PURE__ */ d("path", {
						d: X.p3440d7b0,
						fill: "currentColor",
						opacity: "0.6"
					})
				]
			})
		})
	}), /* @__PURE__ */ d("div", {
		className: "ax-activity-card-portrait-content",
		children: c ? /* @__PURE__ */ f("div", {
			className: "ax-activity-card-portrait-skel-groups",
			children: [/* @__PURE__ */ f("div", {
				className: "ax-activity-card-portrait-skel-group",
				children: [/* @__PURE__ */ d("div", { className: "ax-activity-card-portrait-skel-line ax-activity-card-portrait-skel-sub" }), /* @__PURE__ */ d("div", { className: "ax-activity-card-portrait-skel-line ax-activity-card-portrait-skel-main" })]
			}), /* @__PURE__ */ d("div", {
				className: "ax-activity-card-portrait-skel-group",
				children: /* @__PURE__ */ d("div", { className: "ax-activity-card-portrait-skel-line ax-activity-card-portrait-skel-main-short" })
			})]
		}) : /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ f("div", {
			className: "ax-activity-card-portrait-meta",
			children: [
				n && r && /* @__PURE__ */ f("div", {
					className: "ax-activity-card-portrait-code",
					children: [
						/* @__PURE__ */ d("span", {
							className: "ax-activity-card-portrait-code-label",
							children: n
						}),
						/* @__PURE__ */ d("div", { className: "ax-activity-card-portrait-code-divider" }),
						/* @__PURE__ */ d("span", {
							className: "ax-activity-card-portrait-code-value",
							children: r
						})
					]
				}),
				i && /* @__PURE__ */ d("div", {
					className: "ax-activity-card-portrait-type-chip",
					children: i
				}),
				e && /* @__PURE__ */ d("p", {
					className: "ax-activity-card-portrait-title",
					children: e
				})
			]
		}), t && /* @__PURE__ */ d("p", {
			className: "ax-activity-card-portrait-description",
			children: t
		})] })
	})]
}));
tn.displayName = "ActivityCardPortrait";
//#endregion
//#region src/components/ui/switch.tsx
var nn = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(te.Root, {
	className: I("ax-switch", e),
	...t,
	ref: n,
	children: /* @__PURE__ */ d(te.Thumb, { className: "ax-switch-thumb" })
}));
nn.displayName = te.Root.displayName;
//#endregion
//#region src/components/ui/detail-option.tsx
var rn = t.forwardRef(({ title: e, description: n, checked: r, onCheckedChange: i, disabled: a = !1, card: o = !0, className: s }, c) => {
	let l = t.useId();
	return /* @__PURE__ */ f("label", {
		ref: c,
		htmlFor: l,
		"aria-disabled": a || void 0,
		className: I("ax-detail-option", o ? "ax-detail-option--card" : "ax-detail-option--no-card", a && "ax-detail-option--disabled", s),
		children: [/* @__PURE__ */ f("div", {
			className: "ax-detail-option-content",
			children: [/* @__PURE__ */ d("span", {
				className: "ax-detail-option-title",
				children: e
			}), n && /* @__PURE__ */ d("span", {
				className: "ax-detail-option-description",
				children: n
			})]
		}), /* @__PURE__ */ d(nn, {
			id: l,
			checked: r,
			onCheckedChange: i,
			disabled: a
		})]
	});
});
rn.displayName = "DetailOption";
//#endregion
//#region src/components/ui/editor.tsx
function Z({ icon: e, active: t = !1, disabled: n = !1, onMouseDown: r, title: i }) {
	return /* @__PURE__ */ d("button", {
		type: "button",
		className: I("ax-editor-tool", t && "is-active"),
		disabled: n,
		onMouseDown: r,
		title: i,
		tabIndex: -1,
		children: /* @__PURE__ */ d("i", { className: e })
	});
}
function Q() {
	return /* @__PURE__ */ d("div", { className: "ax-editor-divider" });
}
var an = [
	"#20374B",
	"#5A6D80",
	"#8697A7",
	"#EE2737",
	"#E87000",
	"#F5C400",
	"#0AC251",
	"#3B82F6",
	"#6B46EF",
	"#EC4899"
], on = [
	"#FEF9C3",
	"#FEE2E2",
	"#DCFCE7",
	"#DBEAFE",
	"#EDE9FE",
	"#FCE7F3",
	"#F1F5F9",
	null
];
function sn({ colors: e, onSelect: t }) {
	return /* @__PURE__ */ d("div", {
		className: "ax-editor-color-grid",
		children: e.map((e, n) => /* @__PURE__ */ d("button", {
			type: "button",
			className: "ax-editor-swatch",
			style: { background: e ?? "transparent" },
			onMouseDown: (n) => {
				n.preventDefault(), t(e);
			},
			title: e ?? "Remove",
			children: e === null && /* @__PURE__ */ d("i", { className: "icon-remove-text-formatting" })
		}, n))
	});
}
var cn = [
	{
		label: "Paragraph",
		value: "paragraph"
	},
	{
		label: "Heading 1",
		value: "h1"
	},
	{
		label: "Heading 2",
		value: "h2"
	},
	{
		label: "Heading 3",
		value: "h3"
	},
	{
		label: "Heading 4",
		value: "h4"
	}
];
function ln({ editor: e, disabled: n }) {
	let [r, i] = t.useState(!1), { current: a } = S({
		editor: e,
		selector: ({ editor: e }) => ({ current: e ? cn.find((t) => t.value === "paragraph" ? e.isActive("paragraph") : e.isActive("heading", { level: parseInt(t.value.replace("h", "")) })) ?? cn[0] : cn[0] })
	});
	if (!e) return null;
	let o = (t) => {
		if (t === "paragraph") e.chain().focus().setParagraph().run();
		else {
			let n = parseInt(t.replace("h", ""));
			e.chain().focus().toggleHeading({ level: n }).run();
		}
		i(!1);
	};
	return /* @__PURE__ */ f(q, {
		open: r,
		onOpenChange: i,
		children: [/* @__PURE__ */ d(J, {
			asChild: !0,
			children: /* @__PURE__ */ f("button", {
				type: "button",
				className: "ax-editor-style-select",
				disabled: n,
				tabIndex: -1,
				children: [/* @__PURE__ */ d("span", { children: a.label }), /* @__PURE__ */ d("i", { className: "icon-chevron-down ax-editor-chevron" })]
			})
		}), /* @__PURE__ */ d(Y, {
			className: "ax-editor-style-popover",
			align: "start",
			sideOffset: 2,
			children: cn.map((e) => /* @__PURE__ */ d("button", {
				type: "button",
				className: I("ax-editor-style-option", e.value === a.value && "is-active"),
				onMouseDown: (t) => {
					t.preventDefault(), o(e.value);
				},
				children: e.label
			}, e.value))
		})]
	});
}
var un = [
	"8",
	"9",
	"10",
	"11",
	"12",
	"14",
	"16",
	"18",
	"20",
	"24",
	"28",
	"32",
	"36",
	"48",
	"72"
];
function dn({ editor: e, disabled: n }) {
	let [r, i] = t.useState(!1), { current: a } = S({
		editor: e,
		selector: ({ editor: e }) => ({ current: (e?.getAttributes("textStyle").fontSize)?.replace("pt", "") ?? "12" })
	});
	return e ? /* @__PURE__ */ f(q, {
		open: r,
		onOpenChange: i,
		children: [/* @__PURE__ */ d(J, {
			asChild: !0,
			children: /* @__PURE__ */ f("button", {
				type: "button",
				className: "ax-editor-style-select",
				disabled: n,
				tabIndex: -1,
				children: [/* @__PURE__ */ f("span", { children: [a, "pt"] }), /* @__PURE__ */ d("i", { className: "icon-chevron-down ax-editor-chevron" })]
			})
		}), /* @__PURE__ */ d(Y, {
			className: "ax-editor-style-popover ax-editor-size-popover",
			align: "start",
			sideOffset: 2,
			children: un.map((t) => /* @__PURE__ */ f("button", {
				type: "button",
				className: I("ax-editor-style-option", t === a && "is-active"),
				onMouseDown: (n) => {
					n.preventDefault(), e.chain().focus().setFontSize(`${t}pt`).run(), i(!1);
				},
				children: [t, "pt"]
			}, t))
		})]
	}) : null;
}
function fn({ onInsert: e }) {
	let [n, r] = t.useState(null);
	return /* @__PURE__ */ f("div", {
		className: "ax-editor-table-picker",
		children: [/* @__PURE__ */ d("div", {
			className: "ax-editor-table-grid",
			children: Array.from({ length: 6 }, (t, i) => Array.from({ length: 6 }, (t, a) => /* @__PURE__ */ d("div", {
				className: I("ax-editor-table-cell-btn", n && i <= n[0] && a <= n[1] && "is-active"),
				onMouseEnter: () => r([i, a]),
				onMouseLeave: () => r(null),
				onMouseDown: (t) => {
					t.preventDefault(), e(i + 1, a + 1);
				}
			}, `${i}-${a}`)))
		}), /* @__PURE__ */ d("p", {
			className: "ax-editor-table-label",
			children: n ? `${n[0] + 1} × ${n[1] + 1} table` : "Hover to select size"
		})]
	});
}
function pn({ editor: e, disabled: n }) {
	let [r, i] = t.useState(!1), [a, o] = t.useState(""), s = t.useRef(null), { isLink: c, currentUrl: l } = S({
		editor: e,
		selector: ({ editor: e }) => ({
			isLink: e?.isActive("link") ?? !1,
			currentUrl: e?.getAttributes("link").href ?? ""
		})
	}), u = (e) => {
		e && o(l), i(e);
	}, p = () => {
		let t = a.trim();
		t ? e?.chain().focus().setLink({ href: t }).run() : e?.chain().focus().unsetLink().run(), i(!1);
	};
	return e ? /* @__PURE__ */ f(q, {
		open: r,
		onOpenChange: u,
		children: [/* @__PURE__ */ d(J, {
			asChild: !0,
			children: /* @__PURE__ */ d("button", {
				type: "button",
				className: I("ax-editor-tool", c && "is-active"),
				disabled: n,
				tabIndex: -1,
				title: "Link",
				children: /* @__PURE__ */ d("i", { className: "icon-link" })
			})
		}), /* @__PURE__ */ f(Y, {
			className: "ax-editor-link-popover",
			align: "start",
			sideOffset: 4,
			children: [/* @__PURE__ */ f("div", {
				className: "ax-editor-link-row",
				children: [/* @__PURE__ */ d("input", {
					ref: s,
					className: "ax-editor-link-input",
					type: "url",
					placeholder: "Paste a link...",
					value: a,
					onChange: (e) => o(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && (e.preventDefault(), p()), e.key === "Escape" && i(!1);
					},
					autoFocus: !0
				}), /* @__PURE__ */ d("button", {
					type: "button",
					className: "ax-editor-link-confirm",
					title: "Apply",
					onMouseDown: (e) => {
						e.preventDefault(), p();
					},
					children: /* @__PURE__ */ d("i", { className: "icon-tick" })
				})]
			}), c && /* @__PURE__ */ d("button", {
				type: "button",
				className: "ax-editor-link-remove",
				onMouseDown: (t) => {
					t.preventDefault(), e.chain().focus().unsetLink().run(), i(!1);
				},
				children: "Remove link"
			})]
		})]
	}) : null;
}
function mn({ editor: e, deleteNode: n }) {
	let r = t.useRef(null), [i, a] = t.useState(!1), o = (t) => {
		let r = new FileReader();
		r.onload = () => {
			n(), e && e.commands.setImage({ src: r.result });
		}, r.readAsDataURL(t);
	};
	return /* @__PURE__ */ d(y, { children: /* @__PURE__ */ f("div", {
		className: I("ax-editor-upload-block", i && "ax-editor-upload-block--drag"),
		onClick: () => r.current?.click(),
		onDragOver: (e) => {
			e.preventDefault(), a(!0);
		},
		onDragLeave: () => a(!1),
		onDrop: (e) => {
			e.preventDefault(), a(!1);
			let t = e.dataTransfer.files[0];
			t && o(t);
		},
		children: [
			/* @__PURE__ */ d("input", {
				ref: r,
				type: "file",
				accept: "image/*",
				style: { display: "none" },
				onChange: (e) => {
					let t = e.target.files?.[0];
					t && o(t);
				}
			}),
			/* @__PURE__ */ f("div", {
				className: "ax-editor-upload-icon-wrap",
				children: [/* @__PURE__ */ d("i", { className: "icon-file-outline ax-editor-upload-file-icon" }), /* @__PURE__ */ d("div", {
					className: "ax-editor-upload-badge",
					children: /* @__PURE__ */ d("i", { className: "icon-upload" })
				})]
			}),
			/* @__PURE__ */ f("p", {
				className: "ax-editor-upload-text",
				children: [/* @__PURE__ */ d("span", {
					className: "ax-editor-upload-link",
					children: "Click to upload"
				}), " or drag and drop"]
			}),
			/* @__PURE__ */ d("p", {
				className: "ax-editor-upload-hint",
				children: "Maximum 3 files, 5MB each."
			})
		]
	}) });
}
var hn = w.create({
	name: "uploadBlock",
	group: "block",
	atom: !0,
	parseHTML() {
		return [{ tag: "div[data-type=\"upload-block\"]" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return ["div", T(e, { "data-type": "upload-block" })];
	},
	addNodeView() {
		return b(mn);
	}
}), gn = [
	{
		label: "Add row above",
		action: (e) => e?.chain().focus().addRowBefore().run()
	},
	{
		label: "Add row below",
		action: (e) => e?.chain().focus().addRowAfter().run()
	},
	{
		label: "Delete row",
		action: (e) => e?.chain().focus().deleteRow().run(),
		destructive: !0
	},
	null,
	{
		label: "Add column before",
		action: (e) => e?.chain().focus().addColumnBefore().run()
	},
	{
		label: "Add column after",
		action: (e) => e?.chain().focus().addColumnAfter().run()
	},
	{
		label: "Delete column",
		action: (e) => e?.chain().focus().deleteColumn().run(),
		destructive: !0
	},
	null,
	{
		label: "Delete table",
		action: (e) => e?.chain().focus().deleteTable().run(),
		destructive: !0
	}
];
function _n({ x: e, y: n, editor: r, onClose: i }) {
	let a = t.useRef(null);
	return t.useEffect(() => {
		let e = (e) => {
			a.current && !a.current.contains(e.target) && i();
		}, t = (e) => {
			e.key === "Escape" && i();
		};
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t);
		};
	}, [i]), re(/* @__PURE__ */ d("div", {
		ref: a,
		className: "ax-editor-context-menu",
		style: {
			top: n,
			left: e
		},
		children: gn.map((e, t) => e === null ? /* @__PURE__ */ d("div", { className: "ax-editor-context-menu-divider" }, t) : /* @__PURE__ */ d("button", {
			type: "button",
			className: I("ax-editor-context-menu-item", e.destructive && "ax-editor-context-menu-item--destructive"),
			onMouseDown: (t) => {
				t.preventDefault(), e.action(r), i();
			},
			children: e.label
		}, t))
	}), document.body);
}
function vn({ editor: e, disabled: t }) {
	let n = S({
		editor: e,
		selector: ({ editor: e }) => ({
			isBold: e?.isActive("bold") ?? !1,
			isItalic: e?.isActive("italic") ?? !1,
			isUnderline: e?.isActive("underline") ?? !1,
			isLink: e?.isActive("link") ?? !1,
			textColor: e?.getAttributes("textStyle").color,
			highlight: e?.getAttributes("highlight").color
		})
	});
	if (!e) return null;
	let r = t;
	return /* @__PURE__ */ f("div", {
		className: "ax-editor-toolbar",
		children: [
			/* @__PURE__ */ f("div", {
				className: "ax-editor-group",
				children: [
					/* @__PURE__ */ d(Z, {
						icon: "icon-image-add",
						disabled: r,
						title: "Add image",
						onMouseDown: (t) => {
							t.preventDefault(), e.chain().focus().command(({ tr: e, dispatch: t, state: n }) => {
								let r = n.schema.nodes.uploadBlock;
								if (!r) return !1;
								let i = r.create();
								return t && (e.replaceSelectionWith(i), t(e)), !0;
							}).run();
						}
					}),
					/* @__PURE__ */ d(pn, {
						editor: e,
						disabled: r
					}),
					/* @__PURE__ */ f(q, { children: [/* @__PURE__ */ d(J, {
						asChild: !0,
						children: /* @__PURE__ */ f("button", {
							type: "button",
							className: I("ax-editor-tool ax-editor-tool--chevron"),
							disabled: r,
							tabIndex: -1,
							title: "Table",
							children: [/* @__PURE__ */ d("i", { className: "icon-grid-plus" }), /* @__PURE__ */ d("i", { className: "icon-chevron-down ax-editor-chevron" })]
						})
					}), /* @__PURE__ */ d(Y, {
						className: "ax-editor-table-popover",
						align: "start",
						sideOffset: 4,
						children: /* @__PURE__ */ d(fn, { onInsert: (t, n) => e.chain().focus().insertTable({
							rows: t,
							cols: n,
							withHeaderRow: !0
						}).run() })
					})] })
				]
			}),
			/* @__PURE__ */ d(Q, {}),
			/* @__PURE__ */ f("div", {
				className: "ax-editor-group",
				children: [/* @__PURE__ */ d(Z, {
					icon: "icon-undo",
					disabled: r,
					title: "Undo",
					onMouseDown: (t) => {
						t.preventDefault(), e.chain().focus().undo().run();
					}
				}), /* @__PURE__ */ d(Z, {
					icon: "icon-redo",
					disabled: r,
					title: "Redo",
					onMouseDown: (t) => {
						t.preventDefault(), e.chain().focus().redo().run();
					}
				})]
			}),
			/* @__PURE__ */ d(Q, {}),
			/* @__PURE__ */ f("div", {
				className: "ax-editor-group",
				children: [
					/* @__PURE__ */ d(Z, {
						icon: "icon-bold",
						disabled: r,
						title: "Bold",
						active: n.isBold,
						onMouseDown: (t) => {
							t.preventDefault(), e.chain().focus().toggleBold().run();
						}
					}),
					/* @__PURE__ */ d(Z, {
						icon: "icon-italic",
						disabled: r,
						title: "Italic",
						active: n.isItalic,
						onMouseDown: (t) => {
							t.preventDefault(), e.chain().focus().toggleItalic().run();
						}
					}),
					/* @__PURE__ */ d(Z, {
						icon: "icon-underline",
						disabled: r,
						title: "Underline",
						active: n.isUnderline,
						onMouseDown: (t) => {
							t.preventDefault(), e.chain().focus().toggleUnderline().run();
						}
					})
				]
			}),
			/* @__PURE__ */ d(Q, {}),
			/* @__PURE__ */ d("div", {
				className: "ax-editor-group",
				children: /* @__PURE__ */ d(ln, {
					editor: e,
					disabled: r
				})
			}),
			/* @__PURE__ */ d(Q, {}),
			/* @__PURE__ */ d("div", {
				className: "ax-editor-group",
				children: /* @__PURE__ */ d(dn, {
					editor: e,
					disabled: r
				})
			}),
			/* @__PURE__ */ d(Q, {}),
			/* @__PURE__ */ f("div", {
				className: "ax-editor-group",
				children: [/* @__PURE__ */ f(q, { children: [/* @__PURE__ */ d(J, {
					asChild: !0,
					children: /* @__PURE__ */ f("button", {
						type: "button",
						className: "ax-editor-tool-color",
						disabled: r,
						tabIndex: -1,
						title: "Text color",
						children: [/* @__PURE__ */ d("i", { className: "icon-text-color" }), /* @__PURE__ */ d("div", {
							className: "ax-editor-color-bar",
							style: { background: n.textColor ?? "var(--text)" }
						})]
					})
				}), /* @__PURE__ */ d(Y, {
					className: "ax-editor-color-popover",
					align: "start",
					sideOffset: 4,
					children: /* @__PURE__ */ d(sn, {
						colors: [...an, null],
						onSelect: (t) => {
							t === null ? e.chain().focus().unsetColor().run() : e.chain().focus().setColor(t).run();
						}
					})
				})] }), /* @__PURE__ */ f(q, { children: [/* @__PURE__ */ d(J, {
					asChild: !0,
					children: /* @__PURE__ */ f("button", {
						type: "button",
						className: "ax-editor-tool-color",
						disabled: r,
						tabIndex: -1,
						title: "Highlight",
						children: [/* @__PURE__ */ d("i", { className: "icon-edit-outline" }), /* @__PURE__ */ d("div", {
							className: "ax-editor-color-bar",
							style: { background: n.highlight ?? "#FEF9C3" }
						})]
					})
				}), /* @__PURE__ */ d(Y, {
					className: "ax-editor-color-popover",
					align: "start",
					sideOffset: 4,
					children: /* @__PURE__ */ d(sn, {
						colors: on,
						onSelect: (t) => {
							t === null ? e.chain().focus().unsetHighlight().run() : e.chain().focus().toggleHighlight({ color: t }).run();
						}
					})
				})] })]
			}),
			/* @__PURE__ */ d(Q, {}),
			/* @__PURE__ */ d("div", {
				className: "ax-editor-group",
				children: /* @__PURE__ */ d(Z, {
					icon: "icon-more-horizontal",
					disabled: r,
					title: "More options"
				})
			})
		]
	});
}
function yn({ label: e = "Overview", showLabel: n = !0, placeholder: r = "Free Text", value: i, onChange: a, disabled: o = !1, viewOnly: s = !1, error: c = !1, errorMessage: l, className: u, minHeight: p = 164 }) {
	let m = x({
		extensions: [
			E,
			ie,
			se,
			ae,
			oe,
			ce.configure({ multicolor: !0 }),
			le.configure({ openOnClick: !1 }),
			ue,
			hn,
			de.configure({ resizable: !1 }),
			me,
			pe,
			fe,
			D.configure({ placeholder: r })
		],
		content: i,
		editable: !o && !s,
		onUpdate: ({ editor: e }) => {
			a?.(e.getHTML());
		}
	});
	t.useEffect(() => {
		if (!m) return;
		let e = !o && !s;
		m.isEditable !== e && m.setEditable(e);
	}, [
		m,
		o,
		s
	]);
	let [h, g] = t.useState(null), _ = t.useCallback((e) => {
		m?.isActive("table") && (e.preventDefault(), g({
			x: e.clientX,
			y: e.clientY
		}));
	}, [m]);
	return /* @__PURE__ */ f("div", {
		className: I("ax-editor", u),
		children: [
			n && /* @__PURE__ */ d("label", {
				className: "ax-editor-label",
				children: e
			}),
			/* @__PURE__ */ f("div", {
				className: I("ax-editor-body", o && "ax-editor-body--disabled", s && "ax-editor-body--view-only", c && "ax-editor-body--error"),
				children: [!s && /* @__PURE__ */ d(vn, {
					editor: m,
					disabled: o
				}), /* @__PURE__ */ d("div", {
					className: "ax-editor-content",
					style: { minHeight: p },
					onContextMenu: _,
					onClick: !s && !o ? () => m?.commands.focus() : void 0,
					children: /* @__PURE__ */ d(v, { editor: m })
				})]
			}),
			c && l && /* @__PURE__ */ d("span", {
				className: "ax-editor-error-msg",
				children: l
			}),
			h && /* @__PURE__ */ d(_n, {
				x: h.x,
				y: h.y,
				editor: m,
				onClose: () => g(null)
			})
		]
	});
}
//#endregion
//#region src/components/ui/field.tsx
function bn({ className: e, width: t, style: n, ...r }) {
	let i = t === "full" ? { width: "100%" } : t === "auto" ? { width: "fit-content" } : typeof t == "number" ? { width: t } : {};
	return /* @__PURE__ */ d("div", {
		className: I("ax-field", e),
		style: {
			...i,
			...n
		},
		...r
	});
}
function xn({ className: e, required: t, tooltip: n, children: r, ...i }) {
	return /* @__PURE__ */ f("label", {
		className: I("ax-field-label", e),
		...i,
		children: [
			r,
			t && /* @__PURE__ */ d("span", {
				className: "ax-label-required",
				"aria-hidden": "true",
				children: " *"
			}),
			n && /* @__PURE__ */ d(Ze, {
				content: n,
				children: /* @__PURE__ */ d("i", {
					className: "icon-info-tooltip ax-field-label-tooltip-icon",
					"aria-label": "More information"
				})
			})
		]
	});
}
function Sn({ className: e, ...t }) {
	return /* @__PURE__ */ d("p", {
		className: I("ax-field-description", e),
		...t
	});
}
//#endregion
//#region src/components/ui/display-field.tsx
function Cn({ label: e, value: t, icon: n, avatar: r, inline: i = !1, className: a }) {
	return /* @__PURE__ */ f("div", {
		className: I("ax-display-field", i && "ax-display-field--inline", a),
		children: [e && /* @__PURE__ */ d(xn, { children: e }), /* @__PURE__ */ f("div", {
			className: "ax-display-field-value-row",
			children: [
				n && /* @__PURE__ */ d("i", {
					className: I("ax-icon ax-display-field-icon", n),
					"aria-hidden": "true"
				}),
				r && /* @__PURE__ */ d(z, {
					mode: "image",
					src: r,
					shape: "circle"
				}),
				t && /* @__PURE__ */ d("span", {
					className: "ax-display-field-value",
					children: t
				})
			]
		})]
	});
}
Cn.displayName = "DisplayField";
//#endregion
//#region src/components/ui/input.tsx
var $ = t.forwardRef(({ className: e, type: t, leftIcon: n, hint: r, label: i, required: a, id: o, fieldStyle: s, style: c, ...l }, u) => {
	let p = n ?? (t === "search" ? /* @__PURE__ */ d("i", { className: "icon-search" }) : void 0), m = !!p || !!r, h = /* @__PURE__ */ d("input", {
		type: t,
		id: o,
		className: I("ax-input", p && "ax-input--has-icon-left", r && "ax-input--has-hint", e),
		ref: u,
		style: c,
		...l
	}), g = m ? /* @__PURE__ */ f("div", {
		className: "ax-input-wrapper",
		children: [
			p && /* @__PURE__ */ d("span", {
				className: "ax-field-icon-left",
				children: p
			}),
			h,
			r && /* @__PURE__ */ d("span", {
				className: "ax-field-hint-right",
				children: r
			})
		]
	}) : h;
	return i ? /* @__PURE__ */ f(bn, {
		style: s,
		children: [/* @__PURE__ */ d(xn, {
			htmlFor: o,
			required: a,
			children: i
		}), g]
	}) : g;
});
$.displayName = "Input";
//#endregion
//#region src/components/ui/advanced-filter.tsx
function wn(e, t, n) {
	if (e == null || e === "") return "…";
	switch (t) {
		case "select": return n?.find((t) => t.value === e)?.label ?? String(e);
		case "date": {
			if (e instanceof Date) return j(e, "dd MMM yy");
			let t = e;
			return t?.from && t?.to ? `${j(t.from, "dd MMM yy")} – ${j(t.to, "dd MMM yy")}` : t?.from ? j(t.from, "dd MMM yy") : "…";
		}
		case "number-range": {
			let t = e;
			return t?.from && t?.to ? `${t.from} – ${t.to}` : t?.from ? `from ${t.from}` : t?.to ? `to ${t.to}` : "…";
		}
		default: return String(e);
	}
}
function Tn({ value: e, onCommit: n }) {
	let [r, i] = t.useState(e == null ? "" : String(e)), a = t.useRef(null);
	t.useEffect(() => {
		a.current?.focus();
	}, []);
	let o = () => n(r);
	return /* @__PURE__ */ f("div", {
		className: "ax-adv-filter-slot",
		children: [/* @__PURE__ */ d("input", {
			ref: a,
			type: "text",
			className: "ax-adv-filter-slot-input",
			value: r,
			placeholder: "Enter value…",
			onChange: (e) => i(e.target.value),
			onKeyDown: (e) => {
				e.key === "Enter" && o();
			}
		}), /* @__PURE__ */ d("button", {
			className: "ax-adv-filter-slot-apply",
			onMouseDown: (e) => {
				e.preventDefault(), o();
			},
			children: "Apply"
		})]
	});
}
function En({ value: e, onCommit: n, onClose: r }) {
	let [i, a] = t.useState(e == null ? "" : String(e)), o = t.useRef(null);
	t.useEffect(() => {
		o.current?.focus();
	}, []);
	let s = () => n(i === "" ? void 0 : Number(i));
	return /* @__PURE__ */ f("div", {
		className: "ax-adv-filter-slot",
		children: [/* @__PURE__ */ d($, {
			ref: o,
			type: "number",
			label: "Enter a value",
			value: i,
			onChange: (e) => a(e.target.value),
			onKeyDown: (e) => {
				e.key === "Enter" && s();
			}
		}), /* @__PURE__ */ f("div", {
			className: "ax-adv-filter-slot-actions",
			children: [/* @__PURE__ */ d(V, {
				variant: "secondary",
				onClick: r,
				children: "Cancel"
			}), /* @__PURE__ */ d(V, {
				variant: "primary",
				onMouseDown: (e) => {
					e.preventDefault(), s();
				},
				children: "Apply"
			})]
		})]
	});
}
function Dn({ value: e, onCommit: n, onClose: r }) {
	let i = e ?? {}, [a, o] = t.useState(i.from ?? ""), [s, c] = t.useState(i.to ?? ""), l = t.useRef(null);
	t.useEffect(() => {
		l.current?.focus();
	}, []);
	let u = () => n({
		from: a,
		to: s
	});
	return /* @__PURE__ */ f("div", {
		className: "ax-adv-filter-slot",
		children: [
			/* @__PURE__ */ d($, {
				ref: l,
				type: "number",
				label: "From",
				value: a,
				onChange: (e) => o(e.target.value),
				onKeyDown: (e) => {
					e.key === "Enter" && u();
				}
			}),
			/* @__PURE__ */ d($, {
				type: "number",
				label: "To",
				value: s,
				onChange: (e) => c(e.target.value),
				onKeyDown: (e) => {
					e.key === "Enter" && u();
				}
			}),
			/* @__PURE__ */ f("div", {
				className: "ax-adv-filter-slot-actions",
				children: [/* @__PURE__ */ d(V, {
					variant: "secondary",
					onClick: r,
					children: "Cancel"
				}), /* @__PURE__ */ d(V, {
					variant: "primary",
					onMouseDown: (e) => {
						e.preventDefault(), u();
					},
					children: "Apply"
				})]
			})
		]
	});
}
function On({ value: e, options: n, onCommit: r }) {
	let [i, a] = t.useState(""), o = e, s = i ? n.filter((e) => e.label.toLowerCase().includes(i.toLowerCase())) : n;
	return /* @__PURE__ */ f("div", {
		className: "ax-combobox-command",
		children: [/* @__PURE__ */ f("div", {
			className: "ax-combobox-search",
			children: [/* @__PURE__ */ d("i", { className: "icon-search ax-combobox-search-icon" }), /* @__PURE__ */ d("input", {
				className: "ax-combobox-search-input",
				placeholder: "Search…",
				value: i,
				onChange: (e) => a(e.target.value),
				autoFocus: !0
			})]
		}), /* @__PURE__ */ d("div", {
			className: "ax-combobox-list",
			children: s.length === 0 ? /* @__PURE__ */ d("div", {
				className: "ax-combobox-empty",
				children: "No results"
			}) : s.map((e) => /* @__PURE__ */ f("div", {
				className: "ax-combobox-item",
				onMouseDown: (t) => {
					t.preventDefault(), r(e.value);
				},
				children: [/* @__PURE__ */ d("span", {
					className: "ax-adv-filter-select-label",
					children: e.label
				}), e.value === o && /* @__PURE__ */ d("i", { className: "icon-tick-thick ax-combobox-item-check" })]
			}, e.value))
		})]
	});
}
function kn({ value: e, onCommit: n }) {
	let [r, i] = t.useState(e);
	return /* @__PURE__ */ d("div", {
		className: "ax-adv-filter-slot ax-adv-filter-slot--calendar",
		children: /* @__PURE__ */ d(W, {
			mode: "single",
			selected: r,
			onSelect: (e) => {
				i(e), e && n(e);
			}
		})
	});
}
function An({ value: e, onCommit: n }) {
	let [r, i] = t.useState(e), [a, o] = t.useState(0), s = t.useRef("start");
	return /* @__PURE__ */ d("div", {
		className: "ax-adv-filter-slot ax-adv-filter-slot--calendar",
		children: /* @__PURE__ */ d(W, {
			mode: "range",
			selected: r,
			defaultMonth: r?.from,
			onDayClick: (e) => {
				if (s.current === "start") s.current = "end", i({
					from: e,
					to: void 0
				}), o((e) => e + 1);
				else {
					let t = r?.from ?? e, a = e < t ? {
						from: e,
						to: t
					} : {
						from: t,
						to: e
					};
					i(a), n(a), s.current = "start";
				}
			}
		}, a)
	});
}
function jn({ operator: e, value: t, onCommit: n }) {
	return d(e === "between" ? An : kn, {
		value: t,
		onCommit: n
	});
}
function Mn({ field: e, fieldLabel: n, operators: r, operator: i, value: a, selectOptions: o, onChange: s, onRemove: c, defaultOpen: l, className: u }) {
	let [p, m] = t.useState(!1), [h, g] = t.useState(!1);
	t.useEffect(() => {
		l && g(!0);
	}, [l]);
	let _ = r.find((e) => e.key === i) ?? r[0], v = wn(a, _.type, o), y = n ?? e, b = r.length > 1, x = _.type === "select" || _.type === "date", S = (e) => {
		s({
			operator: e,
			value: void 0
		}), m(!1), g(!0);
	}, C = (e) => {
		s({
			operator: _.key,
			value: e
		}), g(!1);
	}, w = () => g(!1), T = (() => {
		switch (_.type) {
			case "text": return /* @__PURE__ */ d(Tn, {
				value: a,
				onCommit: C
			}, _.key);
			case "number": return /* @__PURE__ */ d(En, {
				value: a,
				onCommit: C,
				onClose: w
			}, _.key);
			case "number-range": return /* @__PURE__ */ d(Dn, {
				value: a,
				onCommit: C,
				onClose: w
			}, _.key);
			case "select": return /* @__PURE__ */ d(On, {
				value: a,
				options: o ?? [],
				onCommit: C
			}, _.key);
			case "date": return /* @__PURE__ */ d(jn, {
				operator: _.key,
				value: a,
				onCommit: C
			}, _.key);
		}
	})();
	return /* @__PURE__ */ f("div", {
		className: I("ax-filter-chip", u),
		children: [
			/* @__PURE__ */ d("span", {
				className: "ax-filter-chip-seg ax-filter-chip-seg--field",
				children: y
			}),
			b ? /* @__PURE__ */ f(P.Root, {
				open: p,
				onOpenChange: m,
				children: [/* @__PURE__ */ d(P.Trigger, {
					asChild: !0,
					children: /* @__PURE__ */ d("button", {
						className: "ax-filter-chip-seg ax-filter-chip-seg--operator ax-filter-chip-seg--operator-btn",
						children: _.label
					})
				}), /* @__PURE__ */ d(P.Portal, { children: /* @__PURE__ */ d(P.Content, {
					className: "ax-combobox-content",
					align: "start",
					sideOffset: 6,
					onCloseAutoFocus: (e) => e.preventDefault(),
					children: /* @__PURE__ */ d("div", {
						className: "ax-combobox-list",
						children: r.map((e) => /* @__PURE__ */ f("div", {
							className: "ax-combobox-item",
							onMouseDown: (t) => {
								t.preventDefault(), S(e.key);
							},
							children: [/* @__PURE__ */ d("span", {
								className: "ax-adv-filter-select-label",
								children: e.label
							}), e.key === i && /* @__PURE__ */ d("i", { className: "icon-tick-thick ax-combobox-item-check" })]
						}, e.key))
					})
				}) })]
			}) : /* @__PURE__ */ d("span", {
				className: "ax-filter-chip-seg ax-filter-chip-seg--operator",
				children: _.label
			}),
			/* @__PURE__ */ f(P.Root, {
				open: h,
				onOpenChange: g,
				children: [/* @__PURE__ */ d(P.Trigger, {
					asChild: !0,
					children: /* @__PURE__ */ d("button", {
						className: "ax-filter-chip-seg ax-filter-chip-seg--value ax-filter-chip-seg--value-btn",
						children: v
					})
				}), /* @__PURE__ */ d(P.Portal, { children: /* @__PURE__ */ d(P.Content, {
					className: x ? "ax-combobox-content" : "ax-adv-filter-popover",
					align: "start",
					sideOffset: 6,
					onCloseAutoFocus: (e) => e.preventDefault(),
					children: T
				}) })]
			}),
			c && /* @__PURE__ */ d("button", {
				className: "ax-filter-chip-remove",
				onClick: c,
				"aria-label": `Remove filter: ${e}`,
				children: /* @__PURE__ */ d("i", { className: "icon-x-thick" })
			})
		]
	});
}
Mn.displayName = "AdvancedFilter";
//#endregion
//#region src/components/ui/filter-bar.tsx
function Nn({ fieldNames: e, onSelect: n }) {
	let [r, i] = t.useState(!1), [a, o] = t.useState(""), s = t.useRef(null);
	if (e.length === 0) return null;
	let c = a ? e.filter((e) => e.toLowerCase().includes(a.toLowerCase())) : e;
	return /* @__PURE__ */ f(P.Root, {
		open: r,
		onOpenChange: (e) => {
			i(e), e || o("");
		},
		children: [/* @__PURE__ */ d(P.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ f("button", {
				className: "ax-filter-btn ax-filter-btn--primary",
				type: "button",
				children: [/* @__PURE__ */ d("i", { className: "icon-add" }), "Add filter"]
			})
		}), /* @__PURE__ */ d(P.Portal, { children: /* @__PURE__ */ d(P.Content, {
			className: "ax-combobox-content",
			align: "start",
			sideOffset: 6,
			onCloseAutoFocus: (e) => e.preventDefault(),
			onOpenAutoFocus: (e) => {
				e.preventDefault(), s.current?.focus();
			},
			children: /* @__PURE__ */ f("div", {
				className: "ax-combobox-command",
				children: [/* @__PURE__ */ f("div", {
					className: "ax-combobox-search",
					children: [/* @__PURE__ */ d("i", { className: "icon-search ax-combobox-search-icon" }), /* @__PURE__ */ d("input", {
						ref: s,
						className: "ax-combobox-search-input",
						placeholder: "Search fields…",
						value: a,
						onChange: (e) => o(e.target.value)
					})]
				}), /* @__PURE__ */ d("div", {
					className: "ax-combobox-list",
					children: c.length === 0 ? /* @__PURE__ */ d("div", {
						className: "ax-combobox-empty",
						children: "No fields"
					}) : c.map((e) => /* @__PURE__ */ d("div", {
						className: "ax-combobox-item",
						onMouseDown: (t) => {
							t.preventDefault(), n(e), i(!1), o("");
						},
						children: e
					}, e))
				})]
			})
		}) })]
	});
}
function Pn({ field: e, operator: n, value: r, valueOptions: i, onChangeValue: a, onRemove: o, className: s }) {
	let [c, l] = t.useState(!1), [u, p] = t.useState(""), m = t.useRef(null), h = i && i.length > 0 && a, g = u ? (i ?? []).filter((e) => e.toLowerCase().includes(u.toLowerCase())) : i ?? [];
	return /* @__PURE__ */ f("div", {
		className: I("ax-filter-chip", s),
		children: [
			/* @__PURE__ */ d("span", {
				className: "ax-filter-chip-seg ax-filter-chip-seg--field",
				children: e
			}),
			/* @__PURE__ */ d("span", {
				className: "ax-filter-chip-seg ax-filter-chip-seg--operator",
				children: n
			}),
			h ? /* @__PURE__ */ f(P.Root, {
				open: c,
				onOpenChange: (e) => {
					l(e), e || p("");
				},
				children: [/* @__PURE__ */ d(P.Trigger, {
					asChild: !0,
					children: /* @__PURE__ */ d("button", {
						className: "ax-filter-chip-seg ax-filter-chip-seg--value ax-filter-chip-seg--value-btn",
						children: r
					})
				}), /* @__PURE__ */ d(P.Portal, { children: /* @__PURE__ */ d(P.Content, {
					className: "ax-combobox-content",
					align: "start",
					sideOffset: 6,
					onCloseAutoFocus: (e) => e.preventDefault(),
					onOpenAutoFocus: (e) => {
						e.preventDefault(), m.current?.focus();
					},
					children: /* @__PURE__ */ f("div", {
						className: "ax-combobox-command",
						children: [/* @__PURE__ */ f("div", {
							className: "ax-combobox-search",
							children: [/* @__PURE__ */ d("i", { className: "icon-search ax-combobox-search-icon" }), /* @__PURE__ */ d("input", {
								ref: m,
								className: "ax-combobox-search-input",
								placeholder: `Search ${e}…`,
								value: u,
								onChange: (e) => p(e.target.value)
							})]
						}), /* @__PURE__ */ d("div", {
							className: "ax-combobox-list",
							children: g.length === 0 ? /* @__PURE__ */ d("div", {
								className: "ax-combobox-empty",
								children: "No results"
							}) : g.map((e) => /* @__PURE__ */ f("div", {
								className: "ax-combobox-item",
								onMouseDown: (t) => {
									t.preventDefault(), a(e), l(!1), p("");
								},
								children: [/* @__PURE__ */ d("span", {
									style: { flex: 1 },
									children: e
								}), e === r && /* @__PURE__ */ d("i", { className: "icon-tick-thick ax-combobox-item-check" })]
							}, e))
						})]
					})
				}) })]
			}) : /* @__PURE__ */ d("span", {
				className: "ax-filter-chip-seg ax-filter-chip-seg--value",
				children: r
			}),
			o && /* @__PURE__ */ d("button", {
				className: "ax-filter-chip-remove",
				onClick: o,
				"aria-label": `Remove filter: ${e} ${n} ${r}`,
				children: /* @__PURE__ */ d("i", { className: "icon-x-thick" })
			})
		]
	});
}
function Fn({ field: e, direction: t = "asc", onToggle: n, className: r }) {
	return /* @__PURE__ */ f("div", {
		className: I("ax-filter-chip", r),
		children: [/* @__PURE__ */ d("span", {
			className: "ax-filter-chip-seg ax-filter-chip-seg--label",
			children: "Sort by"
		}), /* @__PURE__ */ f("button", {
			className: "ax-filter-chip-seg ax-filter-chip-seg--sort-field",
			onClick: n,
			"aria-label": `Sort by ${e} ${t === "asc" ? "ascending" : "descending"}`,
			children: [/* @__PURE__ */ d("span", { children: e }), /* @__PURE__ */ d("i", { className: I("icon-arrow-down", t === "desc" && "ax-filter-chip-sort-icon--asc") })]
		})]
	});
}
function In({ options: e, value: t, onChange: n, className: r }) {
	return /* @__PURE__ */ d("div", {
		className: I("ax-filter-chip ax-filter-chip--toggle", r),
		children: e.map((r, i) => /* @__PURE__ */ d("button", {
			className: I("ax-toggle-chip-option", r.value === t && "ax-toggle-chip-option--selected", i < e.length - 1 && "ax-toggle-chip-option--bordered"),
			onClick: () => n?.(r.value),
			"aria-pressed": r.value === t,
			children: r.label
		}, r.value))
	});
}
function Ln({ primary: e = !1, leftIcon: t, onClick: n, disabled: r, className: i, children: a }) {
	return /* @__PURE__ */ f("button", {
		className: I("ax-filter-btn", e && "ax-filter-btn--primary", i),
		onClick: n,
		disabled: r,
		type: "button",
		children: [t, a]
	});
}
function Rn() {
	return /* @__PURE__ */ d("div", {
		className: "ax-filter-bar-divider",
		"aria-hidden": "true"
	});
}
function zn({ filters: e = [], onRemoveFilter: n, onChangeFilter: r, fieldValueOptions: i, fieldDefinitions: a, advancedFilters: o, onAddAdvancedFilter: s, onRemoveAdvancedFilter: c, onChangeAdvancedFilter: l, sort: p, onToggleSort: m, toggleOptions: h, toggleValue: g, onToggleChange: _, onAddFilter: v, onMoreActions: y, extraButtons: b, actionsExtra: x, className: S }) {
	let [C, w] = t.useState(null), T = t.useRef([]), E = t.useRef(!1);
	t.useEffect(() => {
		let e = T.current, t = o ?? [];
		if (E.current && t.length === e.length + 1) {
			let n = t.find((t) => !e.some((e) => e.id === t.id));
			n && w(n.id);
		}
		E.current = !1, T.current = t;
	}, [o]);
	let D = b != null, O = h && h.length > 0, k = e.length > 0 || (o?.length ?? 0) > 0, A = p != null, j = [...Object.keys(a ?? {}), ...Object.keys(i ?? {})], M = (e) => {
		a?.[e] ? (E.current = !0, s?.(e)) : v?.(e);
	}, N = (v || s) && j.length > 0;
	return /* @__PURE__ */ f("div", {
		className: I("ax-filter-bar", S),
		role: "toolbar",
		"aria-label": "Filters",
		children: [
			A && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(Fn, {
				field: p.field,
				direction: p.direction,
				onToggle: m
			}), (D || O || k) && /* @__PURE__ */ d(Rn, {})] }),
			D && /* @__PURE__ */ f(u, { children: [b, (O || k) && /* @__PURE__ */ d(Rn, {})] }),
			O && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(In, {
				options: h,
				value: g,
				onChange: _
			}), k && /* @__PURE__ */ d(Rn, {})] }),
			e.map((e) => {
				let t = i?.[e.field] ?? i?.[e.field.toLowerCase()];
				return /* @__PURE__ */ d(Pn, {
					field: e.field,
					operator: e.operator,
					value: e.value,
					valueOptions: t,
					onChangeValue: r ? (t) => r(e.id, t) : void 0,
					onRemove: n ? () => n(e.id) : void 0
				}, e.id);
			}),
			o?.map((e) => {
				let t = a?.[e.field];
				return t ? /* @__PURE__ */ d(Mn, {
					field: e.field,
					fieldLabel: t.label,
					operators: t.operators,
					operator: e.operator,
					value: e.value,
					selectOptions: t.selectOptions,
					onChange: (t) => l?.(e.id, t),
					onRemove: c ? () => c(e.id) : void 0,
					defaultOpen: C === e.id
				}, e.id) : null;
			}),
			(N || y || x != null) && /* @__PURE__ */ f(u, { children: [(k || O || D || A) && /* @__PURE__ */ d(Rn, {}), /* @__PURE__ */ f("div", {
				className: "ax-filter-bar-actions",
				children: [
					x,
					N && /* @__PURE__ */ d(Nn, {
						fieldNames: j,
						onSelect: M
					}),
					y && /* @__PURE__ */ d(Ln, {
						onClick: y,
						children: /* @__PURE__ */ d("i", { className: "icon-more-horizontal" })
					})
				]
			})] })
		]
	});
}
zn.displayName = "FilterBar";
//#endregion
//#region src/components/ui/heading.tsx
var Bn = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
	5: "h5",
	6: "h6"
};
function Vn({ level: e = 1, as: t, color: n = "text", className: r, style: i, ...a }) {
	return /* @__PURE__ */ d(t ?? Bn[e], {
		className: I(`ax-heading ax-heading--${e}`, r),
		style: {
			color: `var(--${n})`,
			...i
		},
		...a
	});
}
//#endregion
//#region src/components/ui/icon.tsx
function Hn({ name: e, className: t, ...n }) {
	return /* @__PURE__ */ d("i", {
		className: I(`icon-${e}`, t),
		"aria-hidden": "true",
		...n
	});
}
Hn.displayName = "Icon";
//#endregion
//#region src/components/ui/label.tsx
var Un = t.forwardRef(({ className: e, required: t, children: n, ...r }, i) => /* @__PURE__ */ f(he.Root, {
	ref: i,
	className: I("ax-label", e),
	...r,
	children: [n, t && /* @__PURE__ */ d("span", {
		className: "ax-label-required",
		"aria-hidden": "true",
		children: " *"
	})]
}));
Un.displayName = he.Root.displayName;
//#endregion
//#region src/components/ui/modal.tsx
function Wn({ open: e, onClose: n, title: r, children: i, primaryLabel: a = "Save", onPrimary: o, secondaryLabel: s = "Cancel", onSecondary: c, tertiaryLabel: l, onTertiary: u, width: p, variant: m, className: h }) {
	let g = p ?? (m === "table" ? 960 : 420);
	return t.useEffect(() => {
		if (!e) return;
		let t = (e) => {
			e.key === "Escape" && n();
		};
		return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
	}, [e, n]), t.useEffect(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", () => {
		document.body.style.overflow = "";
	}), [e]), e ? re(/* @__PURE__ */ d("div", {
		className: "ax-modal-backdrop",
		onClick: (e) => {
			e.target === e.currentTarget && n();
		},
		children: /* @__PURE__ */ f("div", {
			className: I("ax-modal", m === "table" && "ax-modal--table", h),
			style: { width: g },
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "ax-modal-title",
			children: [
				/* @__PURE__ */ f("div", {
					className: "ax-modal-header",
					children: [/* @__PURE__ */ d("h3", {
						id: "ax-modal-title",
						className: "ax-modal-title",
						children: r
					}), /* @__PURE__ */ d("button", {
						className: "ax-icon-btn ax-icon-btn--base ax-modal-close",
						onClick: n,
						"aria-label": "Close",
						children: /* @__PURE__ */ d("i", { className: "icon-x-thick" })
					})]
				}),
				/* @__PURE__ */ d("div", {
					className: "ax-modal-content",
					children: i
				}),
				/* @__PURE__ */ f("div", {
					className: "ax-modal-footer",
					children: [l && /* @__PURE__ */ d(V, {
						variant: "tertiary",
						onClick: u,
						children: l
					}), /* @__PURE__ */ f("div", {
						className: "ax-modal-footer-actions",
						children: [s && /* @__PURE__ */ d(V, {
							variant: "secondary",
							onClick: c ?? n,
							children: s
						}), a && /* @__PURE__ */ d(V, {
							variant: "primary",
							onClick: o,
							children: a
						})]
					})]
				})
			]
		})
	}), document.body) : null;
}
Wn.displayName = "Modal";
//#endregion
//#region src/components/ui/pagination.tsx
function Gn(e, t) {
	if (t <= 7) return Array.from({ length: t }, (e, t) => t + 1);
	let n = [1], r = Math.max(2, e - 2), i = Math.min(t - 1, e + 2);
	r > 2 && n.push("ellipsis");
	for (let e = r; e <= i; e++) n.push(e);
	return i < t - 1 && n.push("ellipsis"), n.push(t), n;
}
function Kn({ page: e, pageCount: t, onPageChange: n, className: r }) {
	if (t <= 1) return null;
	let i = Gn(e, t);
	return /* @__PURE__ */ f("nav", {
		className: I("ax-pagination", r),
		"aria-label": "Pagination",
		children: [
			/* @__PURE__ */ f("button", {
				className: "ax-pagination-prev-next",
				onClick: () => n(e - 1),
				disabled: e <= 1,
				"aria-label": "Previous page",
				children: [/* @__PURE__ */ d("i", { className: "icon-chevron-left" }), "Prev"]
			}),
			i.map((t, r) => t === "ellipsis" ? /* @__PURE__ */ d("span", {
				className: "ax-pagination-ellipsis",
				children: "…"
			}, `e${r}`) : /* @__PURE__ */ d("button", {
				className: I("ax-pagination-page", t === e && "ax-pagination-page--active"),
				onClick: () => n(t),
				"aria-label": `Page ${t}`,
				"aria-current": t === e ? "page" : void 0,
				children: t
			}, t)),
			/* @__PURE__ */ f("button", {
				className: "ax-pagination-prev-next",
				onClick: () => n(e + 1),
				disabled: e >= t,
				"aria-label": "Next page",
				children: ["Next", /* @__PURE__ */ d("i", { className: "icon-chevron-right" })]
			})
		]
	});
}
Kn.displayName = "Pagination";
//#endregion
//#region src/components/ui/table-footer.tsx
var qn = [
	10,
	20,
	25,
	50,
	100
];
function Jn({ page: e, pageCount: t, onPageChange: n, pageSize: r, onPageSizeChange: i, pageSizeOptions: a = qn, totalCount: o, className: s }) {
	let c = o === 0 ? 0 : (e - 1) * r + 1, l = Math.min(e * r, o);
	return /* @__PURE__ */ f("div", {
		className: I("ax-table-footer", s),
		children: [
			/* @__PURE__ */ d(bn, {
				width: 140,
				children: /* @__PURE__ */ f(Me, {
					value: String(r),
					onValueChange: (e) => i(Number(e)),
					children: [/* @__PURE__ */ d(Fe, { children: /* @__PURE__ */ d(Pe, {}) }), /* @__PURE__ */ d(Re, { children: a.map((e) => /* @__PURE__ */ f(Be, {
						value: String(e),
						children: [e, " per page"]
					}, e)) })]
				})
			}),
			/* @__PURE__ */ d(Kn, {
				page: e,
				pageCount: t,
				onPageChange: n
			}),
			/* @__PURE__ */ d("span", {
				className: "ax-table-footer-count",
				children: o === 0 ? "No results" : `${c}–${l} of ${o}`
			})
		]
	});
}
Jn.displayName = "TableFooter";
//#endregion
//#region src/components/ui/thumbnail-item.tsx
var Yn = t.forwardRef(({ avatar: e, title: t, subline: n, extraString: r, rightSlot: i, variant: a = "default", className: o }, s) => /* @__PURE__ */ f("div", {
	ref: s,
	className: I("ax-thumbnail-item", a === "card" && "ax-thumbnail-item--card", o),
	children: [
		e,
		/* @__PURE__ */ f("div", {
			className: "ax-thumbnail-item-text",
			children: [/* @__PURE__ */ d("span", {
				className: "ax-thumbnail-item-title",
				children: t
			}), n && /* @__PURE__ */ f("div", {
				className: "ax-thumbnail-item-subline",
				children: [/* @__PURE__ */ d("span", {
					className: "ax-thumbnail-item-subline-text",
					children: n
				}), r && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("span", {
					className: "ax-thumbnail-item-sep",
					"aria-hidden": "true"
				}), /* @__PURE__ */ d("span", {
					className: "ax-thumbnail-item-subline-text",
					children: r
				})] })]
			})]
		}),
		i && /* @__PURE__ */ d("div", {
			className: "ax-thumbnail-item-right",
			children: i
		})
	]
}));
Yn.displayName = "ThumbnailItem";
//#endregion
//#region src/components/ui/top-bar.tsx
var Xn = t.forwardRef(({ breadcrumbs: e, leftContent: t, headingTitle: n, avatar: r, title: i, subline: a, extraString: o, rightContent: s, maxWidth: c, className: l }, u) => /* @__PURE__ */ d("div", {
	ref: u,
	className: I("ax-top-bar", l),
	children: /* @__PURE__ */ f("div", {
		className: "ax-top-bar-inner",
		style: c ? { "--ax-top-bar-max-width": `${c}px` } : void 0,
		children: [e && e.length > 0 && /* @__PURE__ */ d(Ke, { items: e }), /* @__PURE__ */ f("div", {
			className: "ax-top-bar-row",
			children: [/* @__PURE__ */ f("div", {
				className: "ax-top-bar-left",
				children: [
					t,
					n && r,
					n && i && /* @__PURE__ */ d("span", {
						className: "ax-top-bar-heading",
						children: i
					}),
					!n && (r || i) && /* @__PURE__ */ d(Yn, {
						avatar: r,
						title: i ?? "",
						subline: a,
						extraString: o
					})
				]
			}), s && /* @__PURE__ */ d("div", {
				className: "ax-top-bar-right",
				children: s
			})]
		})]
	})
}));
Xn.displayName = "TopBar";
//#endregion
//#region src/components/ui/table-header.tsx
function Zn({ children: e, filters: t, fieldValueOptions: n, onAddFilter: r, onRemoveFilter: i, onChangeFilter: a, fieldDefinitions: o, advancedFilters: s, onAddAdvancedFilter: c, onRemoveAdvancedFilter: l, onChangeAdvancedFilter: u, sort: p, onToggleSort: m, toggleOptions: h, toggleValue: g, onToggleChange: _, onMoreActions: v, extraButtons: y, actionsExtra: b, className: x, ...S }) {
	let C = t && t.length > 0 || s && s.length > 0 || h && h.length > 0 || r != null || c != null || o != null || p != null || y != null || b != null;
	return /* @__PURE__ */ f("div", {
		className: I("ax-table-header", x),
		children: [/* @__PURE__ */ d(Xn, {
			...S,
			className: "ax-table-header-topbar"
		}), (e || C) && /* @__PURE__ */ f("div", {
			className: "ax-table-header-body",
			children: [e && /* @__PURE__ */ d("div", {
				className: "ax-table-header-toolbar",
				children: e
			}), C && /* @__PURE__ */ d(zn, {
				filters: t,
				fieldValueOptions: n,
				onAddFilter: r,
				onRemoveFilter: i,
				onChangeFilter: a,
				fieldDefinitions: o,
				advancedFilters: s,
				onAddAdvancedFilter: c,
				onRemoveAdvancedFilter: l,
				onChangeAdvancedFilter: u,
				sort: p,
				onToggleSort: m,
				toggleOptions: h,
				toggleValue: g,
				onToggleChange: _,
				onMoreActions: v,
				extraButtons: y,
				actionsExtra: b
			})]
		})]
	});
}
Zn.displayName = "TableHeader";
//#endregion
//#region src/components/ui/nav.tsx
var Qn = t.forwardRef(({ children: e, header: t, headerAction: n, className: r, ...i }, a) => /* @__PURE__ */ f("div", {
	ref: a,
	className: I("ax-nav-menu", r),
	...i,
	children: [t && /* @__PURE__ */ f("div", {
		className: "ax-nav-menu-header",
		children: [/* @__PURE__ */ d("span", {
			className: "ax-nav-menu-header-title",
			children: t
		}), n]
	}), e]
}));
Qn.displayName = "VerticalNavMenu";
var $n = t.forwardRef(({ icon: e, active: t, flat: n = !0, className: r, children: i, ...a }, o) => {
	let s = I("ax-nav-item", !n && "ax-nav-item--raised", t && "ax-nav-item--active", r), c = /* @__PURE__ */ f(u, { children: [e && /* @__PURE__ */ d("span", {
		className: "ax-nav-item-icon",
		children: e
	}), /* @__PURE__ */ d("span", {
		className: "ax-nav-item-label",
		children: i
	})] });
	if ("href" in a && a.href !== void 0) {
		let { href: e, ...t } = a;
		return /* @__PURE__ */ d("a", {
			ref: o,
			href: e,
			className: s,
			...t,
			children: c
		});
	}
	let { disabled: l, ...p } = a;
	return /* @__PURE__ */ d("button", {
		ref: o,
		disabled: l,
		className: s,
		...p,
		children: c
	});
});
$n.displayName = "NavItem";
//#endregion
//#region src/components/ui/global-nav.tsx
var er = [
	[
		{
			id: "account",
			label: "aXcelerate account",
			icon: "icon-account-star"
		},
		{
			id: "switch-org",
			label: "Switch organisation accounts",
			icon: "icon-contact-swap"
		},
		{
			id: "impersonate",
			label: "Impersonate",
			icon: "icon-contact-id"
		}
	],
	[
		{
			id: "contact-profile",
			label: "Contact profile",
			icon: "icon-person-outline"
		},
		{
			id: "settings",
			label: "User settings & permissions",
			icon: "icon-settings1"
		},
		{
			id: "learner-portal",
			label: "Learner Portal",
			icon: "icon-learner"
		}
	],
	[{
		id: "logout",
		label: "Log out",
		icon: "icon-exit"
	}]
];
function tr({ onItemClick: e }) {
	return /* @__PURE__ */ d(u, { children: er.map((n, r) => /* @__PURE__ */ f(t.Fragment, { children: [r > 0 && /* @__PURE__ */ d("div", { className: "ax-global-nav__profile-menu-divider" }), n.map((t) => /* @__PURE__ */ f("button", {
		className: "ax-global-nav__profile-menu-item",
		onClick: () => e?.(t.id),
		children: [t.icon && /* @__PURE__ */ d("i", { className: t.icon }), /* @__PURE__ */ d("span", {
			className: "ax-global-nav__profile-menu-label",
			children: t.label
		})]
	}, t.id))] }, r)) });
}
function nr({ anchor: e, onClose: n, onItemClick: r, excludeRef: i }) {
	let a = t.useRef(null);
	t.useEffect(() => {
		let e = (e) => {
			let t = e.target, r = a.current?.contains(t) ?? !1, o = i?.current?.contains(t) ?? !1;
			!r && !o && n();
		};
		return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
	}, [n, i]);
	let o = {
		position: "fixed",
		bottom: window.innerHeight - e.bottom,
		left: e.right + 4
	};
	return ne.createPortal(/* @__PURE__ */ d("div", {
		ref: a,
		className: "ax-global-nav__profile-menu",
		style: o,
		children: /* @__PURE__ */ d(tr, { onItemClick: (e) => {
			r?.(e), n();
		} })
	}), document.body);
}
function rr() {
	return /* @__PURE__ */ f("svg", {
		width: "100%",
		height: "100%",
		viewBox: "0 0 70 64",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ d("path", {
				d: "M14.4962 42.8524C14.587 42.7616 14.7342 42.7616 14.825 42.8524L21.1386 49.1687C21.2294 49.2596 21.2294 49.4068 21.1386 49.4977L8.01813 62.6237C6.18387 64.4588 3.20995 64.4588 1.37569 62.6237C-0.458565 60.7887 -0.458564 57.8135 1.37569 55.9785L14.4962 42.8524Z",
				fill: "#0AC251",
				fillOpacity: "0.85"
			}),
			/* @__PURE__ */ d("path", {
				d: "M31.2624 39.366L26.1055 44.5251C25.285 45.3459 23.9548 45.3459 23.1344 44.5251L7.88619 29.2704C6.05193 27.4354 6.05193 24.4602 7.88619 22.6252C9.72045 20.7901 12.6944 20.7901 14.5286 22.6252L31.2624 39.366Z",
				fill: "url(#ax-logo-grad)"
			}),
			/* @__PURE__ */ d("path", {
				d: "M47.8694 55.9783C49.7037 57.8134 49.7037 60.7886 47.8694 62.6236C46.0352 64.4586 43.0613 64.4586 41.227 62.6236L28.1066 49.4976C28.0158 49.4067 28.0158 49.2594 28.1066 49.1686L34.4202 42.8523C34.511 42.7615 34.6582 42.7615 34.749 42.8523L47.8694 55.9783Z",
				fill: "#0AC251",
				fillOpacity: "0.85"
			}),
			/* @__PURE__ */ d("path", {
				d: "M51.7968 5.53521L69.433 0.0215233C69.8669 -0.114102 70.1917 0.422967 69.8703 0.744489L25.2382 45.3955C24.8985 45.7354 24.3478 45.7354 24.0081 45.3955L17.9807 39.3656L51.7968 5.53521Z",
				fill: "#0AC251"
			}),
			/* @__PURE__ */ d("defs", { children: /* @__PURE__ */ f("linearGradient", {
				id: "ax-logo-grad",
				x1: "27.9411",
				y1: "42.6886",
				x2: "7.87767",
				y2: "22.6337",
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ d("stop", { stopColor: "#0C9943" }), /* @__PURE__ */ d("stop", {
					offset: "1",
					stopColor: "#0AC251"
				})]
			}) })
		]
	});
}
function ir({ mainItems: e = [], bottomItems: n = [], activeItemId: r, onItemClick: i, orgName: a = "aXcelerate", logo: o, userName: s = "Jacob Jones", userAvatarSrc: c, hasNotification: l = !1, collapsed: u = !1, onCollapsedChange: p, onNewClick: m, onSearchClick: h, onNotificationClick: g, className: _ }) {
	let [v, y] = t.useState(/* @__PURE__ */ new Set()), [b, x] = t.useState(!1), [S, C] = t.useState(!1), [w, T] = t.useState(null), E = t.useRef(null), D = t.useRef(null), O = t.useRef(null), k = !u || b, A = (e) => {
		y((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, j = (e) => {
		e.submenu && e.submenu.length > 0 ? A(e.id) : i?.(e.id);
	}, M = (e) => r === e.id || (e.submenu?.some((e) => e.id === r) ?? !1);
	return t.useEffect(() => {
		k || C(!1);
	}, [k]), t.useEffect(() => {
		if (r) for (let t of e) t.submenu?.some((e) => e.id === r) && y((e) => new Set([...e, t.id]));
	}, [r, e]), /* @__PURE__ */ f("div", {
		ref: D,
		className: I("ax-global-nav-outer", u && "ax-global-nav-outer--collapsed"),
		onMouseEnter: () => x(!0),
		onMouseLeave: () => x(!1),
		children: [/* @__PURE__ */ f("nav", {
			ref: O,
			className: I("ax-global-nav", !k && "ax-global-nav--collapsed", _),
			children: [
				/* @__PURE__ */ f("div", {
					className: "ax-global-nav__header",
					children: [/* @__PURE__ */ f("div", {
						className: "ax-global-nav__logo",
						children: [/* @__PURE__ */ d("div", {
							className: "ax-global-nav__logo-thumbnail",
							children: o ?? /* @__PURE__ */ d(rr, {})
						}), /* @__PURE__ */ f("div", {
							className: "ax-global-nav__logo-name-row",
							children: [/* @__PURE__ */ d("span", {
								className: "ax-global-nav__logo-name",
								children: a
							}), /* @__PURE__ */ d("button", {
								className: "ax-global-nav__logo-chevron",
								"aria-label": "Organisation menu",
								children: /* @__PURE__ */ d("i", { className: "icon-chevron-down" })
							})]
						})]
					}), /* @__PURE__ */ d("button", {
						className: "ax-global-nav__collapse-btn",
						onClick: () => p?.(!u),
						"aria-label": u ? "Expand navigation" : "Collapse navigation",
						children: /* @__PURE__ */ d("i", { className: u ? "icon-open-menu-hamburger" : "icon-collapse-menu-hamburger" })
					})]
				}),
				/* @__PURE__ */ f("div", {
					className: "ax-global-nav__top-actions",
					children: [/* @__PURE__ */ f("button", {
						className: "ax-global-nav__new-btn",
						onClick: m,
						"aria-label": "New",
						children: [/* @__PURE__ */ d("i", { className: "icon-add" }), /* @__PURE__ */ d("span", {
							className: "ax-global-nav__new-label",
							children: "New"
						})]
					}), /* @__PURE__ */ f("button", {
						className: "ax-global-nav__search",
						onClick: h,
						"aria-label": "Search",
						children: [/* @__PURE__ */ d("i", { className: "icon-search" }), /* @__PURE__ */ d("span", {
							className: "ax-global-nav__search-placeholder",
							children: "Search"
						})]
					})]
				}),
				/* @__PURE__ */ d("div", { className: "ax-global-nav__divider" }),
				/* @__PURE__ */ d("div", {
					className: "ax-global-nav__scroll-area",
					children: /* @__PURE__ */ d("div", {
						className: "ax-global-nav__items",
						children: e.map((e) => {
							let t = v.has(e.id), n = M(e) && !e.submenu, a = (e.submenu?.length ?? 0) > 0;
							return /* @__PURE__ */ f("div", {
								className: "ax-global-nav__item-group",
								children: [/* @__PURE__ */ f("button", {
									className: I("ax-global-nav__item", n && "ax-global-nav__item--active", a && t && "ax-global-nav__item--accordion-open"),
									onClick: () => j(e),
									"aria-expanded": a ? t : void 0,
									children: [
										/* @__PURE__ */ d("i", { className: I("ax-global-nav__item-icon", e.icon) }),
										/* @__PURE__ */ f("div", {
											className: "ax-global-nav__item-label-wrap",
											children: [/* @__PURE__ */ d("span", {
												className: "ax-global-nav__item-label",
												children: e.label
											}), e.chip && /* @__PURE__ */ d("span", {
												className: "ax-global-nav__item-chip",
												children: e.chip
											})]
										}),
										a && /* @__PURE__ */ d("i", { className: I("ax-global-nav__item-chevron", t ? "icon-chevron-up ax-global-nav__item-chevron--open" : "icon-chevron-down ax-global-nav__item-chevron--closed") })
									]
								}), k && a && t && /* @__PURE__ */ f("div", {
									className: "ax-global-nav__submenu",
									children: [/* @__PURE__ */ d("div", { className: "ax-global-nav__submenu-line" }), /* @__PURE__ */ d("div", {
										className: "ax-global-nav__submenu-items",
										children: e.submenu.map((e) => /* @__PURE__ */ d("button", {
											className: I("ax-global-nav__subitem", r === e.id && "ax-global-nav__subitem--active"),
											onClick: () => i?.(e.id),
											children: /* @__PURE__ */ d("span", {
												className: "ax-global-nav__subitem-label",
												children: e.label
											})
										}, e.id))
									})]
								})]
							}, e.id);
						})
					})
				}),
				/* @__PURE__ */ f("div", {
					className: "ax-global-nav__bottom-fixed",
					children: [
						/* @__PURE__ */ d("div", { className: "ax-global-nav__divider" }),
						/* @__PURE__ */ d("div", {
							className: "ax-global-nav__bottom-items",
							children: n.map((e) => /* @__PURE__ */ f("button", {
								className: I("ax-global-nav__item", r === e.id && "ax-global-nav__item--active"),
								onClick: () => i?.(e.id),
								children: [/* @__PURE__ */ d("i", { className: I("ax-global-nav__item-icon", e.icon) }), /* @__PURE__ */ d("span", {
									className: "ax-global-nav__item-label",
									children: e.label
								})]
							}, e.id))
						}),
						/* @__PURE__ */ d("div", { className: "ax-global-nav__divider" }),
						/* @__PURE__ */ f("div", {
							className: "ax-global-nav__profile-row",
							children: [
								/* @__PURE__ */ f("button", {
									ref: E,
									className: I("ax-global-nav__profile-btn", S && "ax-global-nav__profile-btn--active"),
									onClick: () => {
										if (E.current) {
											let e = E.current.getBoundingClientRect();
											T({
												top: e.top,
												bottom: e.bottom,
												right: e.right
											});
										}
										C((e) => !e);
									},
									"aria-label": `Profile: ${s}`,
									"aria-expanded": S,
									children: [/* @__PURE__ */ d(z, {
										mode: c ? "image" : "initials",
										shape: "circle",
										src: c,
										alt: s,
										initials: (() => {
											if (!s) return "U";
											let e = s.trim().split(" ");
											return e.length >= 2 ? (e[0][0] + e[e.length - 1][0]).toUpperCase() : e[0][0].toUpperCase();
										})(),
										className: "ax-global-nav__profile-avatar"
									}), /* @__PURE__ */ d("span", {
										className: "ax-global-nav__profile-name",
										children: s
									})]
								}),
								/* @__PURE__ */ f("div", {
									className: "ax-global-nav__notification-wrap",
									children: [/* @__PURE__ */ d("button", {
										className: "ax-global-nav__notification-btn",
										onClick: g,
										"aria-label": "Notifications",
										children: /* @__PURE__ */ d("i", { className: "icon-bell-outline" })
									}), l && /* @__PURE__ */ d("span", {
										className: "ax-global-nav__notification-dot",
										"aria-hidden": "true"
									})]
								}),
								l && /* @__PURE__ */ d("span", {
									className: "ax-global-nav__notification-dot ax-global-nav__notification-dot--collapsed",
									"aria-hidden": "true"
								})
							]
						})
					]
				})
			]
		}), S && w && /* @__PURE__ */ d(nr, {
			anchor: w,
			onClose: () => C(!1),
			excludeRef: E
		})]
	});
}
//#endregion
//#region src/components/ui/radio-group.tsx
var ar = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(ge.Root, {
	className: I("ax-radio-group", e),
	...t,
	ref: n
}));
ar.displayName = ge.Root.displayName;
var or = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(ge.Item, {
	ref: n,
	className: I("ax-radio-item", e),
	...t,
	children: /* @__PURE__ */ d(ge.Indicator, { className: "ax-radio-indicator" })
}));
or.displayName = ge.Root.displayName;
//#endregion
//#region src/components/ui/option.tsx
var sr = t.forwardRef(({ checked: e, onCheckedChange: n, disabled: r, children: i, className: a }, o) => {
	let s = t.useId();
	return /* @__PURE__ */ f("label", {
		ref: o,
		htmlFor: s,
		className: I("ax-option", e && "ax-option--checked", r && "ax-option--disabled", a),
		children: [/* @__PURE__ */ d(Vt, {
			id: s,
			checked: e,
			disabled: r,
			onCheckedChange: (e) => n?.(!!e)
		}), /* @__PURE__ */ d("span", {
			className: "ax-option-label",
			children: i
		})]
	});
});
sr.displayName = "Option";
var cr = t.forwardRef(({ children: e, className: t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: I("ax-option-stack", t),
	children: e
}));
cr.displayName = "OptionStack";
var lr = t.forwardRef(({ value: e, disabled: n, children: r, className: i }, a) => {
	let o = t.useId();
	return /* @__PURE__ */ f("label", {
		ref: a,
		htmlFor: o,
		className: I("ax-option", n && "ax-option--disabled", i),
		children: [/* @__PURE__ */ d(or, {
			id: o,
			value: e,
			disabled: n
		}), /* @__PURE__ */ d("span", {
			className: "ax-option-label",
			children: r
		})]
	});
});
lr.displayName = "RadioOption";
//#endregion
//#region src/components/ui/progress-bar.tsx
function ur({ label: e = "Progress", value: t = 0, positive: n = !1, size: r = "medium", topLabel: i = !0, sideValue: a = !1, notch: o = !1, notchValue: s, valueLabel: c, className: l }) {
	let u = Math.min(100, Math.max(0, t)), p = c ?? `${u}%`, m = s === void 0 ? u : Math.min(100, Math.max(0, s));
	return /* @__PURE__ */ f("div", {
		className: I("ax-progress-bar", r === "small" && "ax-progress-bar--small", l),
		children: [i && r === "medium" && /* @__PURE__ */ f("div", {
			className: "ax-progress-label-row",
			children: [/* @__PURE__ */ d("span", {
				className: "ax-progress-label",
				children: e
			}), /* @__PURE__ */ d("span", {
				className: "ax-progress-label",
				children: p
			})]
		}), /* @__PURE__ */ f("div", {
			className: "ax-progress-track-row",
			children: [/* @__PURE__ */ f("div", {
				className: "ax-progress-track-wrapper",
				style: {
					"--ax-progress-value": `${u}%`,
					"--ax-progress-notch": `${m}%`
				},
				children: [/* @__PURE__ */ d("div", {
					className: I("ax-progress-track", n && "ax-progress-track--positive"),
					children: /* @__PURE__ */ d("div", { className: I("ax-progress-fill", n && "ax-progress-fill--positive") })
				}), o && /* @__PURE__ */ d("div", { className: "ax-progress-notch" })]
			}), a && /* @__PURE__ */ d("span", {
				className: "ax-progress-side-value",
				children: p
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/separator.tsx
var dr = t.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, i) => /* @__PURE__ */ d(_e.Root, {
	ref: i,
	decorative: n,
	orientation: t,
	className: I("ax-separator", t === "horizontal" ? "ax-separator--horizontal" : "ax-separator--vertical", e),
	...r
}));
dr.displayName = _e.Root.displayName;
//#endregion
//#region src/components/ui/single-select.tsx
var fr = t.forwardRef(({ options: e, value: n, defaultValue: r, onChange: i, borderless: a = !1, error: o = !1, iconOnly: s = !1, inline: c = !1, className: l, label: u, required: p, fieldWidth: m, fieldStyle: h }, g) => {
	let [_, v] = t.useState(r ?? e[0]?.value), y = n ?? _, b = t.useRef(null), x = t.useRef(/* @__PURE__ */ new Map()), [S, C] = t.useState({}), [w, T] = t.useState(!1), E = t.useCallback((e) => {
		let t = e ? x.current.get(e) : null;
		t && C({
			left: t.offsetLeft,
			top: t.offsetTop,
			width: t.offsetWidth,
			height: t.offsetHeight
		});
	}, []);
	t.useLayoutEffect(() => {
		E(y), T(!0);
	}, [y, E]);
	let D = (e) => {
		n === void 0 && v(e), i?.(e);
	}, O = (e, t) => {
		e ? x.current.set(t, e) : x.current.delete(t);
	}, k = /* @__PURE__ */ f("div", {
		ref: (e) => {
			b.current = e, typeof g == "function" ? g(e) : g && (g.current = e);
		},
		className: I("ax-single-select", a && "ax-single-select--borderless", o && "ax-single-select--error", c && "ax-single-select--inline", l),
		role: "radiogroup",
		children: [/* @__PURE__ */ d("span", {
			className: "ax-single-select-pill",
			style: {
				...S,
				opacity: +!!w
			},
			"aria-hidden": "true"
		}), e.map((e) => {
			let t = e.value === y;
			return /* @__PURE__ */ f("button", {
				ref: (t) => O(t, e.value),
				type: "button",
				role: "radio",
				"aria-checked": t,
				onClick: () => D(e.value),
				className: I("ax-single-select-option", s && "ax-single-select-option--icon-only", t && "ax-single-select-option--selected"),
				children: [
					e.leftIcon && /* @__PURE__ */ d("span", {
						className: "ax-single-select-option-left-icon",
						children: e.leftIcon
					}),
					e.icon && /* @__PURE__ */ d("span", {
						className: "ax-single-select-option-icon",
						children: e.icon
					}),
					!s && e.label && /* @__PURE__ */ d("span", { children: e.label })
				]
			}, e.value);
		})]
	});
	return u ? /* @__PURE__ */ f(bn, {
		width: m ?? "auto",
		style: h,
		children: [/* @__PURE__ */ d(xn, {
			required: p,
			children: u
		}), k]
	}) : k;
});
fr.displayName = "SingleSelect";
//#endregion
//#region src/components/ui/stat.tsx
function pr({ label: e, value: t, trend: n, filter: r, icon: i, clickable: a = !1, card: o = !0, flat: s = !1, onClick: c, className: l }) {
	let u = n?.startsWith("+"), p = n?.startsWith("-");
	return /* @__PURE__ */ f("div", {
		className: I("ax-stat", o && !s && "ax-stat--card", s && "ax-stat--flat", c && "ax-stat--clickable", l),
		onClick: c,
		children: [
			i && /* @__PURE__ */ d(z, {
				mode: "icon",
				shape: "circle",
				icon: i,
				className: "ax-stat-avatar"
			}),
			/* @__PURE__ */ f("div", {
				className: "ax-stat-label-row",
				children: [e && /* @__PURE__ */ d("span", {
					className: "ax-stat-label",
					children: e
				}), a && /* @__PURE__ */ d(H, {
					icon: "icon-arrow-right",
					size: 18,
					buttonStyle: !1,
					"aria-label": "View details"
				})]
			}),
			/* @__PURE__ */ f("div", {
				className: "ax-stat-value-row",
				children: [t !== void 0 && /* @__PURE__ */ d("span", {
					className: "ax-stat-value",
					children: t
				}), n && /* @__PURE__ */ d("span", {
					className: I("ax-stat-trend", u && "ax-stat-trend--positive", p && "ax-stat-trend--negative"),
					children: n
				})]
			}),
			r && /* @__PURE__ */ d("span", {
				className: "ax-stat-filter",
				children: r
			})
		]
	});
}
pr.displayName = "Stat";
//#endregion
//#region src/components/ui/status-chip.tsx
var mr = {
	base: "icon-radio-unchecked",
	positive: "icon-tick-thick",
	negative: "icon-x-thick",
	interim: "icon-in-progress",
	"try-again": "icon-refresh",
	submitted: "icon-radio-checked"
}, hr = {
	base: "Base",
	positive: "Positive",
	negative: "Negative",
	interim: "Interim",
	"try-again": "Retry",
	submitted: "Submitted"
}, gr = t.forwardRef(({ type: e = "base", size: t = "large", icon: n = !1, onPrimary: r = !1, className: i, children: a, ...o }, s) => /* @__PURE__ */ f("span", {
	ref: s,
	className: I("ax-status-chip", `ax-status-chip--${e}`, `ax-status-chip--${t}`, r && "ax-status-chip--on-primary", i),
	...o,
	children: [n && /* @__PURE__ */ d("i", {
		className: `ax-icon ${mr[e]} ax-status-chip-icon`,
		"aria-hidden": "true"
	}), /* @__PURE__ */ d("span", { children: a ?? hr[e] })]
}));
gr.displayName = "StatusChip";
//#endregion
//#region src/components/ui/table.tsx
function _r({ data: e, columns: n, pageSize: r = 10, pageSizeOptions: i, className: a, selectable: o = !0, onSelectionChange: s, stickyHeader: c, stickyOffset: l = 0, initialSorting: u, onSortingChange: p }) {
	let [m, h] = t.useState(u ?? []), [g, _] = t.useState(""), [v, y] = t.useState([]), [b, x] = t.useState({}), [S, C] = t.useState(!1), w = t.useRef(null);
	t.useEffect(() => {
		let e = w.current;
		if (!e) return;
		let t = () => C(e.scrollTop > 0);
		return e.addEventListener("scroll", t, { passive: !0 }), () => e.removeEventListener("scroll", t);
	}, []);
	let T = Ce({
		data: e,
		columns: o ? [{
			id: "__select__",
			enableSorting: !1,
			header: ({ table: e }) => /* @__PURE__ */ d(Vt, {
				checked: e.getIsAllPageRowsSelected() ? !0 : e.getIsSomePageRowsSelected() ? "indeterminate" : !1,
				onCheckedChange: (t) => e.toggleAllPageRowsSelected(!!t)
			}),
			cell: ({ row: e }) => /* @__PURE__ */ d(Vt, {
				checked: e.getIsSelected(),
				onCheckedChange: (t) => e.toggleSelected(!!t),
				onClick: (e) => e.stopPropagation()
			})
		}, ...n] : n,
		state: {
			sorting: m,
			globalFilter: g,
			columnFilters: v,
			rowSelection: b
		},
		onSortingChange: (e) => {
			h((t) => {
				let n = typeof e == "function" ? e(t) : e;
				return p?.(n), n;
			});
		},
		onGlobalFilterChange: _,
		onColumnFiltersChange: y,
		onRowSelectionChange: (t) => {
			x((n) => {
				let r = typeof t == "function" ? t(n) : t;
				return s?.(Object.keys(r).map((t) => e[parseInt(t)]).filter(Boolean)), r;
			});
		},
		enableRowSelection: o,
		getCoreRowModel: ye(),
		getSortedRowModel: Se(),
		getFilteredRowModel: be(),
		getPaginationRowModel: xe(),
		initialState: { pagination: { pageSize: r } }
	}), E = Object.keys(b).length;
	return /* @__PURE__ */ f("div", {
		ref: w,
		className: I("ax-table-wrap", a),
		children: [
			E > 0 && /* @__PURE__ */ f("div", {
				className: "ax-table-bulk-bar",
				children: [/* @__PURE__ */ f("span", {
					className: "ax-table-bulk-label",
					children: [
						E,
						" row",
						E === 1 ? "" : "s",
						" selected"
					]
				}), /* @__PURE__ */ d("button", {
					className: "ax-table-bulk-clear",
					onClick: () => {
						x({}), s?.([]);
					},
					children: "Clear selection"
				})]
			}),
			/* @__PURE__ */ f("table", {
				className: I("ax-table", c && "ax-table--sticky-header"),
				style: c && l ? { "--ax-table-sticky-offset": `${l}px` } : void 0,
				children: [/* @__PURE__ */ d("thead", {
					className: I("ax-table-head", S && "ax-table-head--scrolled"),
					children: T.getHeaderGroups().map((e) => /* @__PURE__ */ d("tr", {
						className: "ax-table-row",
						children: e.headers.map((e) => /* @__PURE__ */ d("th", {
							className: I("ax-table-th", e.id === "__select__" && "ax-table-th--checkbox", e.column.getCanSort() && "ax-table-th--sortable", e.column.getIsSorted() && "ax-table-th--sorted"),
							onClick: e.column.getToggleSortingHandler(),
							children: e.isPlaceholder ? null : /* @__PURE__ */ f("span", {
								className: "ax-table-th-inner",
								children: [ve(e.column.columnDef.header, e.getContext()), e.column.getCanSort() && /* @__PURE__ */ d("span", {
									className: I("ax-table-sort-icon", e.column.getIsSorted() === "asc" && "ax-table-sort-icon--asc"),
									children: /* @__PURE__ */ d("i", { className: "icon-arrow-down-short" })
								})]
							})
						}, e.id))
					}, e.id))
				}), /* @__PURE__ */ f("tbody", {
					className: "ax-table-body",
					children: [T.getRowModel().rows.map((e) => /* @__PURE__ */ d("tr", {
						className: I("ax-table-row ax-table-row--body", e.getIsSelected() && "ax-table-row--selected"),
						onClick: () => e.toggleSelected(),
						children: e.getVisibleCells().map((e) => /* @__PURE__ */ d("td", {
							className: I("ax-table-td", e.column.id === "__select__" && "ax-table-td--checkbox"),
							children: ve(e.column.columnDef.cell, e.getContext())
						}, e.id))
					}, e.id)), T.getRowModel().rows.length === 0 && /* @__PURE__ */ d("tr", {
						className: "ax-table-row",
						children: /* @__PURE__ */ d("td", {
							className: "ax-table-td ax-table-empty",
							colSpan: n.length + 1,
							children: "No results"
						})
					})]
				})]
			}),
			i ? /* @__PURE__ */ d(Jn, {
				page: T.getState().pagination.pageIndex + 1,
				pageCount: T.getPageCount(),
				onPageChange: (e) => T.setPageIndex(e - 1),
				pageSize: T.getState().pagination.pageSize,
				onPageSizeChange: (e) => {
					T.setPageSize(e), T.setPageIndex(0);
				},
				pageSizeOptions: i,
				totalCount: T.getFilteredRowModel().rows.length
			}) : T.getPageCount() > 1 ? /* @__PURE__ */ f("div", {
				className: "ax-table-pagination",
				children: [/* @__PURE__ */ f("span", {
					className: "ax-table-pagination-info",
					children: [
						T.getState().pagination.pageIndex * r + 1,
						"–",
						Math.min((T.getState().pagination.pageIndex + 1) * r, T.getFilteredRowModel().rows.length),
						" of ",
						T.getFilteredRowModel().rows.length
					]
				}), /* @__PURE__ */ d(Kn, {
					page: T.getState().pagination.pageIndex + 1,
					pageCount: T.getPageCount(),
					onPageChange: (e) => T.setPageIndex(e - 1)
				})]
			}) : null
		]
	});
}
//#endregion
//#region src/components/ui/tabs.tsx
var vr = F.Root, yr = t.forwardRef(({ className: e, pill: t, onPrimary: n, ...r }, i) => /* @__PURE__ */ d(F.List, {
	ref: i,
	className: I("ax-tabs-list", t && "ax-tabs-list--pill", n && "ax-tabs-list--on-primary", e),
	...r
}));
yr.displayName = F.List.displayName;
var br = t.forwardRef(({ className: e, children: t, leftIcon: n, badge: r, ...i }, a) => /* @__PURE__ */ f(F.Trigger, {
	ref: a,
	className: I("ax-tabs-trigger", e),
	...i,
	children: [/* @__PURE__ */ f("span", {
		className: "ax-tabs-trigger-inner",
		children: [
			n && /* @__PURE__ */ d("span", {
				className: "ax-tabs-trigger-icon",
				children: n
			}),
			t,
			r !== void 0 && /* @__PURE__ */ d(rt, { children: r })
		]
	}), /* @__PURE__ */ d("span", { className: "ax-tabs-trigger-indicator" })]
}));
br.displayName = F.Trigger.displayName;
var xr = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(F.Content, {
	ref: n,
	className: I("ax-tabs-content", e),
	...t
}));
xr.displayName = F.Content.displayName;
//#endregion
//#region src/components/ui/title-thumbnail.tsx
function Sr({ title: e = "Title", subtitle: t, statusLabel: n, showStatus: r = !0, showSubline: i = !0, thumbnail: a = !0, thumbnailSrc: o, className: s }) {
	let c = r && !!n, l = !!t, u = i && (c || l);
	return /* @__PURE__ */ f("div", {
		className: I("ax-title-thumbnail", a ? "ax-title-thumbnail--image" : "ax-title-thumbnail--text", s),
		children: [a && /* @__PURE__ */ f("div", {
			className: "ax-title-thumbnail__bg",
			"aria-hidden": "true",
			children: [o && /* @__PURE__ */ d("img", {
				src: o,
				alt: "",
				className: "ax-title-thumbnail__bg-img"
			}), /* @__PURE__ */ d("div", { className: "ax-title-thumbnail__bg-gradient" })]
		}), /* @__PURE__ */ f("div", {
			className: "ax-title-thumbnail__content",
			children: [/* @__PURE__ */ d("p", {
				className: "ax-title-thumbnail__title",
				children: e
			}), u && /* @__PURE__ */ f("div", {
				className: "ax-title-thumbnail__subline",
				children: [c && /* @__PURE__ */ d("span", {
					className: "ax-title-thumbnail__status",
					children: n
				}), l && /* @__PURE__ */ d("span", {
					className: "ax-title-thumbnail__subtitle",
					children: t
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/signature-block.tsx
function Cr({ label: e = "Signature", signed: n = !1, signedBy: r, signedAt: i, defaultMode: a = "draw", defaultTypedName: o = "", onSign: s, onClear: c, className: l }) {
	let [p, m] = t.useState(a), [h, g] = t.useState(!1), [_, v] = t.useState(o), y = t.useRef(null), b = t.useRef(!1), x = t.useRef(null), S = t.useRef("#20374b"), C = t.useMemo(() => /* @__PURE__ */ new Date(), []), w = i ?? C.toLocaleString("en-AU", {
		day: "numeric",
		month: "short",
		year: "2-digit",
		hour: "numeric",
		minute: "2-digit",
		hour12: !0
	}), T = r ? `${r} - ${w}` : w, E = r ? `Signed by ${r} - ${w}` : w, D = (e) => {
		let t = y.current, n = t.getBoundingClientRect();
		return {
			x: (e.clientX - n.left) * (t.width / n.width),
			y: (e.clientY - n.top) * (t.height / n.height)
		};
	}, O = (e) => {
		e.currentTarget.setPointerCapture(e.pointerId), b.current = !0, x.current = D(e), h || g(!0);
		let t = document.createElement("div");
		t.style.color = "var(--text)", document.body.appendChild(t), S.current = getComputedStyle(t).color, document.body.removeChild(t);
	}, k = (e) => {
		if (!b.current || !x.current) return;
		let t = y.current.getContext("2d"), n = D(e);
		t.beginPath(), t.moveTo(x.current.x, x.current.y), t.lineTo(n.x, n.y), t.strokeStyle = S.current, t.lineWidth = 2.5, t.lineCap = "round", t.lineJoin = "round", t.stroke(), x.current = n, s?.(y.current.toDataURL());
	}, A = () => {
		b.current = !1, x.current = null;
	}, j = () => {
		let e = y.current;
		e && e.getContext("2d").clearRect(0, 0, e.width, e.height), g(!1), c?.();
	}, M = (e) => {
		m(e), j(), v("");
	}, N = p === "draw" ? h : _.length > 0, ee = t.useCallback(() => {
		let e = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19), t = r ? `-${r.replace(/\s+/g, "-")}` : "", n = document.createElement("canvas");
		n.width = 800, n.height = 180;
		let i = n.getContext("2d");
		if (i.fillStyle = "#ffffff", i.fillRect(0, 0, 800, 180), p === "draw") {
			let e = y.current;
			if (!e) return;
			i.drawImage(e, 0, 0);
		} else {
			let e = getComputedStyle(document.documentElement).getPropertyValue("--text").trim() || "#20374b";
			i.font = "500 40px \"Dancing Script\", cursive", i.fillStyle = e, i.textBaseline = "middle", i.fillText(_, 24, 90);
		}
		let a = document.createElement("a");
		a.href = n.toDataURL("image/png"), a.download = `signature${t}-${e}.png`, document.body.appendChild(a), a.click(), document.body.removeChild(a);
	}, [
		p,
		_,
		r
	]), P = /* @__PURE__ */ f("div", {
		className: "ax-sig__toggle",
		role: "group",
		"aria-label": "Signature input mode",
		children: [/* @__PURE__ */ f("button", {
			className: I("ax-sig__toggle-btn", p === "draw" && "ax-sig__toggle-btn--active"),
			type: "button",
			onClick: () => M("draw"),
			children: [/* @__PURE__ */ d(Hn, { name: "signature" }), "Draw"]
		}), /* @__PURE__ */ f("button", {
			className: I("ax-sig__toggle-btn", p === "type" && "ax-sig__toggle-btn--active"),
			type: "button",
			onClick: () => M("type"),
			children: [/* @__PURE__ */ d(Hn, { name: "text-option" }), "Type"]
		})]
	}), te = /* @__PURE__ */ d("div", {
		className: "ax-sig__baseline",
		"aria-hidden": "true"
	}), ne = /* @__PURE__ */ f("div", {
		className: "ax-sig__canvas-wrap",
		children: [
			/* @__PURE__ */ d("canvas", {
				ref: y,
				className: "ax-sig__canvas",
				width: 800,
				height: 180,
				"aria-label": "Signature drawing area",
				...!n && {
					onPointerDown: O,
					onPointerMove: k,
					onPointerUp: A,
					onPointerLeave: A
				}
			}),
			(N || n) && /* @__PURE__ */ f("div", {
				className: "ax-sig__draw-topbar",
				children: [!n && /* @__PURE__ */ d(V, {
					variant: "tertiary",
					leftIcon: /* @__PURE__ */ d(Hn, { name: "bin" }),
					onClick: j,
					children: "Clear"
				}), /* @__PURE__ */ d("span", {
					className: "ax-sig__timestamp",
					children: n ? E : T
				})]
			}),
			!h && !n && /* @__PURE__ */ d("span", {
				className: "ax-sig__placeholder",
				"aria-hidden": "true",
				children: "Add your signature here"
			}),
			te
		]
	}), re = /* @__PURE__ */ f("div", {
		className: I("ax-sig__type-preview", n && "ax-sig__type-preview--centered"),
		children: [_ ? /* @__PURE__ */ d("span", {
			className: "ax-sig__cursive-name",
			children: _
		}) : !n && /* @__PURE__ */ d("span", {
			className: "ax-sig__cursive-placeholder",
			"aria-hidden": "true",
			children: "\xA0"
		}), (n || _) && /* @__PURE__ */ d("span", {
			className: "ax-sig__timestamp ax-sig__timestamp--overlay",
			children: n ? E : T
		})]
	});
	return /* @__PURE__ */ f("div", {
		className: I("ax-sig", n && "ax-sig--signed", l),
		children: [
			/* @__PURE__ */ d("span", {
				className: "ax-sig__field-label",
				children: e
			}),
			!n && P,
			p === "draw" && ne,
			p === "type" && /* @__PURE__ */ f(u, { children: [!n && /* @__PURE__ */ d($, {
				label: "Full Name",
				value: _,
				onChange: (e) => {
					v(e.target.value), s?.(e.target.value);
				}
			}), re] }),
			!n && /* @__PURE__ */ d(V, {
				className: "ax-sig__save",
				disabled: !N,
				onClick: ee,
				children: "Save"
			})
		]
	});
}
//#endregion
//#region src/components/ui/thumbnail-upload.tsx
function wr({ src: e, label: t = "Add an image to this Activity", iconOnly: n = !1, onUpload: r, onRemove: i, className: a }) {
	return e ? /* @__PURE__ */ f("div", {
		className: I("ax-thumbnail-upload ax-thumbnail-upload--filled", a),
		children: [/* @__PURE__ */ d("img", {
			src: e,
			alt: "",
			className: "ax-thumbnail-upload__image"
		}), /* @__PURE__ */ d("button", {
			className: "ax-thumbnail-upload__overlay",
			onClick: i,
			"aria-label": "Remove image",
			type: "button",
			children: /* @__PURE__ */ d("i", { className: "icon-cancel ax-thumbnail-upload__remove-icon" })
		})]
	}) : /* @__PURE__ */ f("button", {
		className: I("ax-thumbnail-upload ax-thumbnail-upload--empty", n && "ax-thumbnail-upload--icon-only", a),
		onClick: r,
		type: "button",
		children: [/* @__PURE__ */ d("i", { className: "icon-image-add ax-thumbnail-upload__icon" }), !n && /* @__PURE__ */ d("span", {
			className: "ax-thumbnail-upload__label",
			children: t
		})]
	});
}
//#endregion
//#region src/components/ui/toast.tsx
var Tr = {
	success: "circle-tick",
	warning: "warning-outline",
	error: "incorrect-unsatisfactory"
};
function Er({ type: e = "success", message: t, action: n = !1, actionLabel: r = "Undo", onAction: i, onDismiss: a, className: o }) {
	return /* @__PURE__ */ f("div", {
		role: "alert",
		className: I("ax-toast", `ax-toast--${e}`, o),
		children: [
			/* @__PURE__ */ d("div", {
				className: "ax-toast-icon-wrap",
				children: /* @__PURE__ */ d("i", {
					className: `ax-icon icon-${Tr[e]} ax-toast-icon`,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ d("p", {
				className: "ax-toast-message",
				children: t
			}),
			n && /* @__PURE__ */ d(V, {
				variant: "link",
				onClick: i,
				className: "ax-toast-action",
				children: r
			}),
			/* @__PURE__ */ d(H, {
				icon: "icon-cancel",
				size: 20,
				buttonStyle: !1,
				onClick: a,
				"aria-label": "Dismiss notification"
			})
		]
	});
}
Er.displayName = "Toast";
var Dr = n(null), Or = 5e3, kr = 350;
function Ar({ children: e }) {
	let [t, n] = l([]), [r, a] = l(/* @__PURE__ */ new Set()), s = c(/* @__PURE__ */ new Map()), u = i((e) => {
		let t = s.current.get(e);
		t && (clearTimeout(t), s.current.delete(e)), a((t) => new Set(t).add(e));
		let r = setTimeout(() => {
			n((t) => t.filter((t) => t.id !== e)), a((t) => {
				let n = new Set(t);
				return n.delete(e), n;
			});
		}, kr);
		s.current.set(`exit-${e}`, r);
	}, []), p = i((e) => {
		let t = crypto.randomUUID();
		n((n) => [...n, {
			...e,
			id: t
		}]);
		let r = setTimeout(() => u(t), Or);
		return s.current.set(t, r), t;
	}, [u]);
	return o(() => {
		let e = s.current;
		return () => e.forEach(clearTimeout);
	}, []), /* @__PURE__ */ f(Dr.Provider, {
		value: {
			toast: p,
			dismiss: u
		},
		children: [e, /* @__PURE__ */ d("div", {
			className: "ax-toast-stack",
			"aria-live": "polite",
			"aria-atomic": "false",
			children: t.map((e) => /* @__PURE__ */ d(Er, {
				type: e.type,
				message: e.message,
				action: e.action,
				actionLabel: e.actionLabel,
				onAction: e.onAction,
				onDismiss: () => u(e.id),
				className: r.has(e.id) ? "ax-toast--leaving" : ""
			}, e.id))
		})]
	});
}
Ar.displayName = "ToastProvider";
function jr() {
	let e = a(Dr);
	if (!e) throw Error("useToast must be used within a ToastProvider");
	return e;
}
//#endregion
export { en as ActivityCardHorizontal, tn as ActivityCardPortrait, Ae as AnnotationLayer, Te as AnnotationProvider, tt as Autocomplete, z as Avatar, rt as Badge, at as Box, Ke as Breadcrumb, V as Button, W as Calendar, xt as Card, wt as CardDescription, Tt as CardFooter, St as CardHeader, Et as CardThumbnailHeader, Ct as CardTitle, Bt as ChangeEditor, Vt as Checkbox, Ht as Chip, Ut as Combobox, pt as CommandBar, bt as CommandBarAiInfo, yt as CommandBarAiInfoBlock, _t as CommandBarItem, vt as CommandBarNoResults, ht as CommandBarSection, Xt as DatePicker, rn as DetailOption, Cn as DisplayField, yn as Editor, bn as Field, Sn as FieldDescription, xn as FieldLabel, zn as FilterBar, Rn as FilterBarDivider, Ln as FilterButton, Pn as FilterChip, ir as GlobalNav, Vn as Heading, Hn as Icon, H as IconButton, et as InfoBlock, Kt as InfoPopover, $ as Input, G as KeyboardHint, Un as Label, Wn as Modal, $n as NavItem, sr as Option, cr as OptionStack, Kn as Pagination, lt as PlatformHint, q as Popover, Wt as PopoverCard, Y as PopoverContent, J as PopoverTrigger, tr as ProfileMenuContent, ur as ProgressBar, ar as RadioGroup, or as RadioGroupItem, lr as RadioOption, Me as Select, Re as SelectContent, Ne as SelectGroup, Be as SelectItem, ze as SelectLabel, Le as SelectScrollDownButton, Ie as SelectScrollUpButton, Ve as SelectSeparator, Fe as SelectTrigger, Pe as SelectValue, dr as Separator, Cr as SignatureBlock, fr as SingleSelect, Fn as SortChip, B as Spinner, pr as Stat, gr as StatusChip, nn as Switch, _r as Table, Jn as TableFooter, Zn as TableHeader, vr as Tabs, xr as TabsContent, yr as TabsList, br as TabsTrigger, Yn as ThumbnailItem, wr as ThumbnailUpload, Sr as TitleThumbnail, Er as Toast, Ar as ToastProvider, In as ToggleChip, Ze as Tooltip, Xe as TooltipContent, qe as TooltipProvider, Je as TooltipRoot, Ye as TooltipTrigger, Xn as TopBar, Qn as VerticalNavMenu, I as cn, Ee as useAnnotationContext, ct as usePlatform, jr as useToast };
