import { clsx as e } from "clsx";
import * as t from "react";
import { createContext as n, forwardRef as r, useCallback as i, useContext as a, useEffect as o, useImperativeHandle as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
import * as p from "@radix-ui/react-select";
import { Slot as m } from "@radix-ui/react-slot";
import * as h from "@radix-ui/react-tooltip";
import { DayPicker as g } from "react-day-picker";
import { createRoot as _ } from "react-dom/client";
import { EditorContent as v, NodeViewWrapper as y, ReactNodeViewRenderer as b, useEditor as x } from "@tiptap/react";
import { Extension as S, Node as C, mergeAttributes as w } from "@tiptap/core";
import T from "@tiptap/starter-kit";
import E from "@tiptap/extension-placeholder";
import D from "@tiptap/suggestion";
import * as O from "@radix-ui/react-checkbox";
import { addDays as k, format as A, isValid as ee, parse as te, startOfToday as ne } from "date-fns";
import * as j from "@radix-ui/react-popover";
import * as re from "@radix-ui/react-switch";
import * as ie from "@radix-ui/react-label";
import { createPortal as ae } from "react-dom";
import * as M from "@radix-ui/react-radio-group";
import * as oe from "@radix-ui/react-separator";
import { flexRender as se, getCoreRowModel as ce, getFilteredRowModel as le, getPaginationRowModel as ue, getSortedRowModel as de, useReactTable as fe } from "@tanstack/react-table";
import * as N from "@radix-ui/react-tabs";
//#region src/lib/utils.ts
function P(...t) {
	return e(t);
}
//#endregion
//#region src/components/ui/annotation.tsx
var pe = t.createContext({ enabled: !0 });
function me({ enabled: e, children: t }) {
	return /* @__PURE__ */ d(pe.Provider, {
		value: { enabled: e },
		children: t
	});
}
function he() {
	return t.useContext(pe);
}
var ge = /* @__PURE__ */ new WeakMap(), _e = 0;
function ve(e) {
	return ge.has(e) || ge.set(e, _e++), ge.get(e);
}
function ye() {
	let { enabled: e } = he(), [n, r] = t.useState([]), i = t.useRef(null), a = t.useCallback(() => {
		i.current !== null && cancelAnimationFrame(i.current), i.current = requestAnimationFrame(() => {
			let e = document.querySelectorAll("[data-annotation]"), t = [];
			e.forEach((e) => {
				let n = e.getAttribute("data-annotation"), r = e.getAttribute("data-annotation-side") ?? "right", i = e.getBoundingClientRect();
				n && (i.width > 0 || i.height > 0) && t.push({
					id: ve(e),
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
		children: n.map((e) => /* @__PURE__ */ d(be, { entry: e }, e.id))
	});
}
var F = 48, I = 3;
function be({ entry: { text: e, side: t, rect: n } }) {
	let r = n.left + n.width / 2, i = n.top + n.height / 2, a, o, s, c, l, p, m, h, g;
	return t === "right" ? (a = i - I, o = n.right - I, s = i - .5, c = n.right, l = F, p = 1, m = i, h = n.right + F, g = "translateY(-50%)") : t === "left" ? (a = i - I, o = n.left - I, s = i - .5, c = n.left - F, l = F, p = 1, m = i, h = n.left - F, g = "translate(-100%, -50%)") : t === "top" ? (a = n.top - I, o = r - I, s = n.top - F, c = r - .5, l = 1, p = F, m = n.top - F, h = r, g = "translate(-50%, -100%)") : (a = n.bottom - I, o = r - I, s = n.bottom, c = r - .5, l = 1, p = F, m = n.bottom + F, h = r, g = "translate(-50%, 0)"), /* @__PURE__ */ f(u, { children: [
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
var L = t.forwardRef(({ mode: e = "icon", shape: n = "square", theme: r = "flat", src: i, alt: a = "", initials: o, icon: s, loading: c = !1, className: l }, u) => {
	let [p, m] = t.useState(!1);
	return t.useEffect(() => {
		m(!1);
	}, [i]), /* @__PURE__ */ f("div", {
		ref: u,
		className: P("ax-avatar", n === "circle" ? "ax-avatar--circle" : "ax-avatar--square", r === "shadow" ? "ax-avatar--shadow" : "ax-avatar--flat", c && "ax-avatar--loading", l),
		children: [
			!c && e === "image" && i && /* @__PURE__ */ d("img", {
				className: P("ax-avatar-image", p ? "ax-avatar-image--loaded" : "ax-avatar-image--loading"),
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
L.displayName = "Avatar";
//#endregion
//#region src/components/ui/select.tsx
var R = (e) => /* @__PURE__ */ d(p.Root, { ...e });
R.displayName = "Select";
var xe = p.Group, Se = p.Value, z = t.forwardRef(({ className: e, children: t, leftIcon: n, ...r }, i) => /* @__PURE__ */ f(p.Trigger, {
	ref: i,
	className: P("ax-select-trigger", e),
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
z.displayName = p.Trigger.displayName;
var Ce = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(p.ScrollUpButton, {
	ref: n,
	className: P("ax-select-scroll-button", e),
	...t,
	children: /* @__PURE__ */ d("i", { className: "icon-chevron-up" })
}));
Ce.displayName = p.ScrollUpButton.displayName;
var we = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(p.ScrollDownButton, {
	ref: n,
	className: P("ax-select-scroll-button", e),
	...t,
	children: /* @__PURE__ */ d("i", { className: "icon-chevron-down" })
}));
we.displayName = p.ScrollDownButton.displayName;
var B = t.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, i) => /* @__PURE__ */ d(p.Portal, { children: /* @__PURE__ */ f(p.Content, {
	ref: i,
	className: P("ax-select-content", e),
	position: n,
	...r,
	children: [
		/* @__PURE__ */ d(Ce, {}),
		/* @__PURE__ */ d(p.Viewport, {
			className: "ax-select-viewport",
			children: t
		}),
		/* @__PURE__ */ d(we, {})
	]
}) }));
B.displayName = p.Content.displayName;
var Te = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(p.Label, {
	ref: n,
	className: P("ax-select-label", e),
	...t
}));
Te.displayName = p.Label.displayName;
var V = t.forwardRef(({ className: e, children: t, icon: n, avatar: r, ...i }, a) => /* @__PURE__ */ f(p.Item, {
	ref: a,
	className: P("ax-select-item", e),
	...i,
	children: [
		r && /* @__PURE__ */ d(L, {
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
V.displayName = p.Item.displayName;
var Ee = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(p.Separator, {
	ref: n,
	className: P("ax-select-separator", e),
	...t
}));
Ee.displayName = p.Separator.displayName;
//#endregion
//#region src/components/ui/breadcrumb.tsx
var De = 5, Oe = 768;
function ke() {
	let [e, n] = t.useState(() => typeof window < "u" && window.innerWidth < Oe);
	return t.useEffect(() => {
		let e = window.matchMedia(`(max-width: ${Oe - 1}px)`), t = (e) => n(e.matches);
		return e.addEventListener("change", t), n(e.matches), () => e.removeEventListener("change", t);
	}, []), e;
}
function Ae({ item: e }) {
	return e.items?.length ? /* @__PURE__ */ f(R, {
		onValueChange: (t) => {
			let n = parseInt(t), r = e.items[n];
			r.href ? window.location.href = r.href : r.onClick?.();
		},
		children: [/* @__PURE__ */ d(z, {
			className: "ax-breadcrumb-select-trigger",
			"aria-label": "Show hidden breadcrumbs",
			children: /* @__PURE__ */ d("i", {
				className: "icon-more-horizontal",
				"aria-hidden": "true"
			})
		}), /* @__PURE__ */ d(B, {
			className: "ax-breadcrumb-select-content",
			children: e.items.map((e, t) => /* @__PURE__ */ d(V, {
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
function je({ items: e, className: n }) {
	let r = ke(), i = e.length > De || r && e.length > 2 ? [
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
		className: P("ax-breadcrumb", n),
		children: i.map((e, n) => {
			let r = n === i.length - 1;
			return /* @__PURE__ */ f(t.Fragment, { children: [e.collapsed ? /* @__PURE__ */ d(Ae, { item: e }) : !r && e.href ? /* @__PURE__ */ d("a", {
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
var H = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f("svg", {
	ref: n,
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "none",
	className: P("ax-spinner", e),
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
H.displayName = "Spinner";
//#endregion
//#region src/components/ui/tooltip.tsx
var Me = h.Provider, Ne = h.Root, Pe = h.Trigger, Fe = t.forwardRef(({ className: e, sideOffset: t = 6, ...n }, r) => /* @__PURE__ */ d(h.Portal, { children: /* @__PURE__ */ d(h.Content, {
	ref: r,
	sideOffset: t,
	className: P("ax-tooltip-content", e),
	...n
}) }));
Fe.displayName = h.Content.displayName;
function Ie({ content: e, children: t, side: n = "top", delayDuration: r = 300 }) {
	return /* @__PURE__ */ f(Ne, {
		delayDuration: r,
		children: [/* @__PURE__ */ d(Pe, {
			asChild: !0,
			children: t
		}), /* @__PURE__ */ d(Fe, {
			side: n,
			children: e
		})]
	});
}
//#endregion
//#region src/components/ui/button.tsx
var Le = [
	"primary",
	"destructive",
	"positive"
], U = t.forwardRef(({ className: e, variant: t = "primary", size: n = "default", asChild: r = !1, loading: i = !1, leftIcon: a, rightIcon: o, split: s = !1, onSplitClick: c, children: l, disabled: u, ...p }, h) => {
	let g = r ? m : "button", _ = u || i, v = P("ax-btn", `ax-btn--${t}`, `ax-btn-size--${n}`, e);
	return s ? /* @__PURE__ */ f("div", {
		className: P("ax-btn-split", _ && "ax-btn-split--disabled"),
		children: [
			/* @__PURE__ */ f(g, {
				className: P("ax-btn", `ax-btn--${t}`, `ax-btn-size--${n}`),
				"data-variant": t,
				ref: h,
				disabled: _,
				...p,
				children: [i ? /* @__PURE__ */ d(H, {}) : a, l]
			}),
			/* @__PURE__ */ d("div", {
				"aria-hidden": "true",
				className: P("ax-btn-split-divider", Le.includes(t) ? "ax-btn-split-divider--light" : "ax-btn-split-divider--dark")
			}),
			/* @__PURE__ */ d("button", {
				type: "button",
				onClick: c,
				disabled: _,
				className: P("ax-btn", `ax-btn--${t}`, `ax-btn-size--${n}`),
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
			i ? /* @__PURE__ */ d(H, {}) : a,
			l,
			o
		]
	});
});
U.displayName = "Button";
function W({ icon: e, buttonStyle: t = !0, rounded: n = !1, size: r = 20, selected: i = !1, tooltip: a, className: o, disabled: s, ...c }) {
	let l = /* @__PURE__ */ d("button", {
		type: "button",
		className: P("ax-icon-btn", t ? "ax-icon-btn--styled" : "ax-icon-btn--base", n && "ax-icon-btn--rounded", i && "ax-icon-btn--selected", `ax-icon-btn--size-${r}`, o),
		disabled: s,
		...c,
		children: /* @__PURE__ */ d("i", { className: e })
	});
	return a ? /* @__PURE__ */ d(Ie, {
		content: a,
		children: l
	}) : l;
}
W.displayName = "IconButton";
//#endregion
//#region src/components/ui/info-block.tsx
var Re = {
	info: "info-outline",
	positive: "circle-tick",
	warning: "warning-outline",
	negative: "incorrect-unsatisfactory"
};
function ze({ type: e = "info", title: t, body: n, oneLine: r = !1, showTitle: i = !0, action: a = !1, actionLabel: o = "Understood", dismissIcon: s = !1, onAction: c, onDismiss: l, className: u }) {
	return /* @__PURE__ */ f("div", {
		role: "alert",
		className: P("ax-info-block", r ? "ax-info-block--one-line" : "ax-info-block--multi", `ax-info-block--${e}`, u),
		children: [/* @__PURE__ */ d("i", {
			className: `ax-icon icon-${Re[e]} ax-info-block-icon`,
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
				!r && a && /* @__PURE__ */ d(U, {
					variant: "tertiary",
					onClick: c,
					children: o
				}),
				r && a && /* @__PURE__ */ d(U, {
					variant: "secondary",
					onClick: c,
					children: o
				}),
				r && s && /* @__PURE__ */ d(W, {
					icon: "icon-x-thick",
					size: 20,
					onClick: l,
					"aria-label": "Dismiss"
				})
			]
		})]
	});
}
ze.displayName = "InfoBlock";
//#endregion
//#region src/components/ui/autocomplete.tsx
var Be = t.forwardRef(({ options: e, value: n, onChange: r, onQueryChange: i, placeholder: a, leftIcon: o, loading: s = !1, className: c }, l) => {
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
	}, ee = (e) => {
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
	let te = (e) => {
		T.current = e, typeof l == "function" ? l(e) : l && (l.current = e);
	}, ne = !!x, j = g && (s || w.length > 0);
	return /* @__PURE__ */ f("div", {
		ref: te,
		className: P("ax-autocomplete", c),
		children: [/* @__PURE__ */ f("div", {
			className: P("ax-input-wrapper", "ax-autocomplete-input-wrap"),
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
					className: P("ax-input", o && "ax-input--has-icon-left", "ax-autocomplete-input"),
					placeholder: a,
					value: C,
					onChange: A,
					onFocus: () => {
						x || _(!0);
					},
					onKeyDown: ee
				}),
				ne && /* @__PURE__ */ d("button", {
					type: "button",
					className: "ax-autocomplete-clear",
					"aria-label": "Clear",
					onMouseDown: (e) => {
						e.preventDefault(), k();
					},
					children: /* @__PURE__ */ d("i", { className: "ax-icon icon-x-thick" })
				})
			]
		}), j && /* @__PURE__ */ d("div", {
			className: "ax-autocomplete-dropdown",
			children: s ? /* @__PURE__ */ f("div", {
				className: "ax-autocomplete-loading",
				children: [/* @__PURE__ */ d(H, {}), /* @__PURE__ */ d("span", { children: "Searching…" })]
			}) : /* @__PURE__ */ d("ul", {
				ref: D,
				role: "listbox",
				className: "ax-autocomplete-list",
				children: w.map((e, t) => /* @__PURE__ */ d("li", {
					role: "option",
					"aria-selected": e.value === x,
					className: P("ax-autocomplete-item", e.value === x && "ax-autocomplete-item--selected", t === v && "ax-autocomplete-item--active"),
					onMouseDown: (t) => {
						t.preventDefault(), O(e);
					},
					children: e.label
				}, e.value))
			})
		})]
	});
});
Be.displayName = "Autocomplete";
//#endregion
//#region src/components/ui/badge.tsx
function Ve({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ d("div", {
		className: P("ax-badge", `ax-badge--${t}`, e),
		...n
	});
}
//#endregion
//#region src/components/ui/box.tsx
var G = (e) => `var(--space-${e})`;
function He(e) {
	let [t, n, r, i] = e.trim().split(/\s+/);
	return n ? r ? i ? {
		pt: G(t),
		pr: G(n),
		pb: G(r),
		pl: G(i)
	} : {
		pt: G(t),
		pr: G(n),
		pb: G(r),
		pl: G(n)
	} : {
		pt: G(t),
		pr: G(n),
		pb: G(t),
		pl: G(n)
	} : {
		pt: G(t),
		pr: G(t),
		pb: G(t),
		pl: G(t)
	};
}
var Ue = t.forwardRef(({ className: e, style: t, direction: n, gap: r, padding: i, pt: a, pr: o, pb: s, pl: c, px: l, py: u, justify: f, align: p, ...m }, h) => {
	let g = i ? He(i) : null, _ = {
		...r ? { "--ax-gap": G(r) } : {},
		...g ? {
			"--ax-pt": g.pt,
			"--ax-pr": g.pr,
			"--ax-pb": g.pb,
			"--ax-pl": g.pl
		} : {},
		...a ? { "--ax-pt": G(a) } : {},
		...o ? { "--ax-pr": G(o) } : {},
		...s ? { "--ax-pb": G(s) } : {},
		...c ? { "--ax-pl": G(c) } : {},
		...l ? {
			"--ax-pl": G(l),
			"--ax-pr": G(l)
		} : {},
		...u ? {
			"--ax-pt": G(u),
			"--ax-pb": G(u)
		} : {},
		...t
	};
	return /* @__PURE__ */ d("div", {
		ref: h,
		className: P("ax-box", n === "row" && "ax-box--row", n === "col" && "ax-box--col", f && "ax-box--justify", p && `ax-box--align-${p}`, e),
		style: _,
		...m
	});
});
Ue.displayName = "Box";
//#endregion
//#region src/components/ui/calendar.tsx
function K({ className: e, classNames: t, showOutsideDays: n = !1, ...r }) {
	return /* @__PURE__ */ d(g, {
		showOutsideDays: n,
		className: P("ax-calendar", e),
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
K.displayName = "Calendar";
//#endregion
//#region src/components/ui/keyboard-hint.tsx
function We() {
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
var Ge = We();
function Ke() {
	return Ge;
}
function qe({ mac: e, win: t }) {
	let { isMac: n, isMobile: r } = Ke();
	return r ? null : /* @__PURE__ */ d(u, { children: n ? e : t });
}
function q({ children: e, icon: t, onPrimary: n = !1, raised: r = !1, className: i }) {
	let a = !!t && !e;
	return /* @__PURE__ */ d("span", {
		className: P("ax-keyboard-hint", a ? "ax-keyboard-hint--icon" : "ax-keyboard-hint--text", n && "ax-keyboard-hint--on-primary", r && !n && "ax-keyboard-hint--raised", i),
		children: a ? t : e
	});
}
//#endregion
//#region src/components/ui/command-bar.tsx
var J = t.createContext(null);
function Je(e, t) {
	if (!t?.trim()) return e;
	let n = t.toLowerCase(), r = e.toLowerCase(), i = [], a = 0, o;
	for (; (o = r.indexOf(n, a)) !== -1;) o > a && i.push(e.slice(a, o)), i.push(/* @__PURE__ */ d("span", {
		className: "ax-cb__highlight",
		children: e.slice(o, o + n.length)
	}, o)), a = o + n.length;
	return a < e.length && i.push(e.slice(a)), i.length > 0 ? /* @__PURE__ */ d(u, { children: i }) : e;
}
function Y(e) {
	return e ? Array.from(e.querySelectorAll("[data-cb-item]")) : [];
}
var Ye = /* @__PURE__ */ d(q, {
	raised: !0,
	icon: /* @__PURE__ */ d("i", { className: "icon-enter" })
});
function Xe({ query: e, onQueryChange: n, placeholder: r, children: i, aiLabel: a, onAiClick: o, mode: s = "search", onEmptyBackspace: c, onAiSubmit: l, loading: p = !1, className: m, inputRef: h }) {
	let g = s === "ai", _ = r ?? (g ? "Ask for AI help, e.g. \"how do I enrol a learner?\"" : "Start typing to search for menu items or contacts"), [v, y] = t.useState(0), b = t.useRef(null), x = t.useRef(!1), S = !p && !!i && t.Children.count(i) > 0, C = p || g || S || !!a;
	t.useEffect(() => {
		y(0);
	}, [e, i]), t.useLayoutEffect(() => {
		let e = Y(b.current), t = Math.min(v, e.length - 1);
		e.forEach((e, n) => {
			e.classList.toggle("ax-cb__row--active", n === t);
		}), !x.current && e[t] && e[t].scrollIntoView({ block: "nearest" }), x.current = !1;
	});
	let w = (t) => {
		let n = Y(b.current);
		t.key === "ArrowDown" ? (t.preventDefault(), y((e) => Math.min(e + 1, n.length - 1))) : t.key === "ArrowUp" ? (t.preventDefault(), y((e) => Math.max(e - 1, 0))) : t.key === "Enter" ? (t.preventDefault(), g && n.length === 0 ? l?.(e ?? "") : n[Math.min(v, n.length - 1)]?.click()) : t.key === "Backspace" && !e && c?.();
	};
	return /* @__PURE__ */ d(J.Provider, {
		value: {
			activeIndex: v,
			setActiveIndex: y,
			contentRef: b,
			suppressScrollRef: x,
			query: e
		},
		children: /* @__PURE__ */ f("div", {
			className: P("ax-cb", m),
			role: "combobox",
			"aria-haspopup": "listbox",
			"aria-expanded": C,
			children: [/* @__PURE__ */ f("div", {
				className: "ax-cb__input-section",
				children: [
					/* @__PURE__ */ d("i", {
						className: P(g ? "icon-magic-ai-stars ax-cb__ai-icon" : "icon-search", "ax-cb__input-icon"),
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ d("input", {
						ref: h,
						className: "ax-cb__input",
						type: "text",
						value: e,
						onChange: (e) => n?.(e.target.value),
						onKeyDown: w,
						placeholder: _,
						autoComplete: "off",
						spellCheck: !1,
						role: "searchbox",
						"aria-label": g ? "Ask AI" : "Search"
					}),
					g && /* @__PURE__ */ d("div", {
						className: "ax-cb__input-enter",
						"aria-hidden": "true",
						children: /* @__PURE__ */ d(q, {
							raised: !0,
							icon: /* @__PURE__ */ d("i", { className: "icon-enter" })
						})
					})
				]
			}), C && /* @__PURE__ */ f(u, { children: [
				/* @__PURE__ */ d("div", {
					className: "ax-cb__divider",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ d("div", {
					className: "ax-cb__content",
					ref: b,
					role: "listbox",
					children: p ? /* @__PURE__ */ d("div", {
						className: "ax-cb__loading",
						children: /* @__PURE__ */ d(H, {})
					}) : g || S ? i : /* @__PURE__ */ d(Ze, {
						label: a,
						onClick: o
					})
				}),
				!g && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("div", {
					className: "ax-cb__divider",
					"aria-hidden": "true"
				}), /* @__PURE__ */ f("div", {
					className: "ax-cb__hints-bar",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ f("div", {
							className: "ax-cb__hint",
							children: [/* @__PURE__ */ d(q, { icon: /* @__PURE__ */ d("i", { className: "icon-sort-arrows" }) }), /* @__PURE__ */ d("span", {
								className: "ax-cb__hint-label",
								children: "Select"
							})]
						}),
						/* @__PURE__ */ f("div", {
							className: "ax-cb__hint",
							children: [/* @__PURE__ */ d(q, { icon: /* @__PURE__ */ d("i", { className: "icon-enter" }) }), /* @__PURE__ */ d("span", {
								className: "ax-cb__hint-label",
								children: "Open"
							})]
						}),
						/* @__PURE__ */ f("div", {
							className: "ax-cb__hint",
							children: [
								/* @__PURE__ */ d(q, { children: "Cmd" }),
								/* @__PURE__ */ d("span", {
									className: "ax-cb__hint-sep",
									children: "+"
								}),
								/* @__PURE__ */ d(q, { icon: /* @__PURE__ */ d("i", { className: "icon-enter" }) }),
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
function Ze({ label: e, onClick: n }) {
	let r = t.useContext(J), i = t.useRef(null), a = () => {
		if (!r || !i.current) return;
		let e = Y(r.contentRef.current).indexOf(i.current);
		e >= 0 && r.setActiveIndex(e);
	};
	return /* @__PURE__ */ f("button", {
		ref: i,
		type: "button",
		className: "ax-cb__row ax-cb__row--ai",
		"data-cb-item": !0,
		onClick: n,
		onMouseEnter: a,
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
			children: Ye
		})]
	});
}
function Qe({ heading: e, children: n, maxVisible: r = 4 }) {
	let [i, a] = t.useState(!1), o = t.useContext(J), s = t.Children.toArray(n), c = !i && s.length > r, l = c ? s.slice(0, r) : s, u = () => {
		o?.suppressScrollRef && (o.suppressScrollRef.current = !0), a(!0), o?.setActiveIndex(0);
	};
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
			c && /* @__PURE__ */ d($e, {
				count: s.length,
				onClick: u
			})
		]
	});
}
function $e({ count: e, onClick: n }) {
	let r = t.useContext(J), i = t.useRef(null), a = () => {
		if (!r || !i.current) return;
		let e = Y(r.contentRef.current).indexOf(i.current);
		e >= 0 && r.setActiveIndex(e);
	};
	return /* @__PURE__ */ d("button", {
		ref: i,
		type: "button",
		className: "ax-cb__row ax-cb__row--see-all",
		"data-cb-item": !0,
		onClick: n,
		onMouseEnter: a,
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
function et(e) {
	let n = t.useContext(J), r = t.useRef(null), i = n?.query, a = () => {
		if (!n || !r.current) return;
		let e = Y(n.contentRef.current).indexOf(r.current);
		e >= 0 && n.setActiveIndex(e);
	};
	if (e.type === "see-all") return /* @__PURE__ */ d("button", {
		ref: r,
		type: "button",
		className: P("ax-cb__row ax-cb__row--see-all", e.className),
		"data-cb-item": !0,
		onClick: e.onClick,
		onMouseEnter: a,
		role: "option",
		children: /* @__PURE__ */ d("span", {
			className: "ax-cb__see-all-label",
			children: e.label
		})
	});
	if (e.type === "action") return /* @__PURE__ */ d("button", {
		ref: r,
		type: "button",
		className: P("ax-cb__row", e.className),
		"data-cb-item": !0,
		onClick: e.onClick,
		onMouseEnter: a,
		role: "option",
		children: /* @__PURE__ */ f("div", {
			className: "ax-cb__row-inner",
			children: [e.icon && /* @__PURE__ */ d("i", {
				className: P(e.icon, "ax-cb__row-icon ax-cb__row-icon--primary"),
				"aria-hidden": "true"
			}), /* @__PURE__ */ d("span", {
				className: "ax-cb__row-action-label",
				children: e.label
			})]
		})
	});
	if (e.type === "contact") {
		let t = e.shortcut ?? Ye;
		return /* @__PURE__ */ f("button", {
			ref: r,
			type: "button",
			className: P("ax-cb__row", e.className),
			"data-cb-item": !0,
			onClick: e.onClick,
			onMouseEnter: a,
			role: "option",
			children: [/* @__PURE__ */ f("div", {
				className: "ax-cb__row-inner",
				children: [/* @__PURE__ */ d(L, {
					mode: e.avatarSrc ? "image" : "initials",
					shape: "circle",
					src: e.avatarSrc,
					initials: e.avatarInitials,
					className: "ax-cb__contact-avatar"
				}), /* @__PURE__ */ f("div", {
					className: "ax-cb__contact-info",
					children: [/* @__PURE__ */ d("span", {
						className: "ax-cb__row-label",
						children: Je(e.name, i)
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
	let o = e.shortcut ?? Ye;
	return /* @__PURE__ */ f("button", {
		ref: r,
		type: "button",
		className: P("ax-cb__row", e.className),
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
						className: P(e.icon, "ax-cb__row-icon"),
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ d("span", {
						className: "ax-cb__row-label",
						children: Je(e.label, i)
					}),
					e.category && /* @__PURE__ */ d("span", {
						className: "ax-cb__row-category",
						children: Je(e.category, i)
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
function tt({ onAskAi: e }) {
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
function nt({ children: e, onDismiss: t, dismissLabel: n = "Got it" }) {
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
function rt() {
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
var it = t.forwardRef(({ className: e, variant: t = "default", direction: n, gap: r, pad: i, ...a }, o) => /* @__PURE__ */ d("div", {
	ref: o,
	className: P("ax-card", t === "inline" && "ax-card--inline", n === "row" && "ax-card--row", r && `ax-card--gap-${r}`, i && `ax-card--pad-${i}`, e),
	...a
}));
it.displayName = "Card";
var at = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: P("ax-card-header", e),
	...t
}));
at.displayName = "CardHeader";
var ot = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: P("ax-card-title", e),
	...t
}));
ot.displayName = "CardTitle";
var st = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: P("ax-card-description", e),
	...t
}));
st.displayName = "CardDescription";
var ct = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: P("ax-card-footer", e),
	...t
}));
ct.displayName = "CardFooter";
var lt = t.forwardRef(({ className: e, avatar: t, title: n, ...r }, i) => /* @__PURE__ */ f("div", {
	ref: i,
	className: P("ax-card-thumbnail-header", e),
	...r,
	children: [t, /* @__PURE__ */ d("h4", {
		className: "ax-card-title",
		children: n
	})]
}));
lt.displayName = "CardThumbnailHeader";
//#endregion
//#region src/data/ax-icons.ts
var ut = [
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
], dt = null;
function ft() {
	if (dt) return dt;
	let e = /* @__PURE__ */ new Set();
	try {
		for (let t of document.styleSheets) try {
			for (let n of t.cssRules) if (n instanceof CSSStyleRule) for (let t of n.style) typeof t == "string" && t.startsWith("--") && e.add(t);
		} catch {}
	} catch {}
	let t = getComputedStyle(document.documentElement);
	return dt = [...e].sort().map((e) => ({
		name: e,
		value: t.getPropertyValue(e).trim()
	})), dt;
}
function pt(e) {
	return e.startsWith("#") || e.startsWith("rgb") || e.startsWith("hsl") || e.startsWith("oklch") || e.startsWith("color(");
}
function mt(e) {
	if (!e) return "";
	if (e.type === "iconChip") return `[icon:${e.attrs.name}(${e.attrs.code})]`;
	if (e.type === "tokenChip") return `[token:${e.attrs.name}(${e.attrs.value})]`;
	if (e.type === "text") return e.text ?? "";
	if (!e.content) return "";
	let t = e.content.map(mt);
	switch (e.type) {
		case "listItem": return `• ${t.join("")}`;
		case "bulletList": return t.join("\n");
		case "codeBlock": return `\`\`\`\n${t.join("")}\`\`\``;
		case "paragraph": return t.join("");
		default: return t.join("");
	}
}
function ht(e) {
	return e ? e.getJSON().content?.map(mt).join("\n").trim() ?? "" : "";
}
function gt({ node: e, editor: t, getPos: n, deleteNode: r }) {
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
var _t = C.create({
	name: "iconChip",
	group: "inline",
	inline: !0,
	atom: !0,
	addAttributes: () => ({
		name: { default: "" },
		code: { default: "" }
	}),
	parseHTML: () => [{ tag: "span[data-icon-chip]" }],
	renderHTML: ({ HTMLAttributes: e }) => ["span", w({ "data-icon-chip": "" }, e)],
	addNodeView: () => b(gt)
});
function vt({ node: e, editor: t, getPos: n, deleteNode: r }) {
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
			children: [pt(e.attrs.value) && /* @__PURE__ */ d("span", {
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
var yt = C.create({
	name: "tokenChip",
	group: "inline",
	inline: !0,
	atom: !0,
	addAttributes: () => ({
		name: { default: "" },
		value: { default: "" }
	}),
	parseHTML: () => [{ tag: "span[data-token-chip]" }],
	renderHTML: ({ HTMLAttributes: e }) => ["span", w({ "data-token-chip": "" }, e)],
	addNodeView: () => b(vt)
}), bt = r(({ items: e, command: t }, n) => {
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
					pt(e.value) ? /* @__PURE__ */ d("span", {
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
}), xt = !1, St = S.create({
	name: "slashCommands",
	addProseMirrorPlugins() {
		let e = { current: null };
		return [D({
			editor: this.editor,
			char: "/",
			allowSpaces: !0,
			startOfLine: !1,
			items: ({ query: e }) => {
				let t = e.toLowerCase(), [n, ...r] = t.split(" "), i = r.join(" ");
				return n === "icon" && (r.length > 0 || t.endsWith(" ")) ? ut.filter((e) => e.name.replace("icon-", "").includes(i)).slice(0, 10).map((e) => ({
					kind: "icon",
					...e
				})) : n === "token" && (r.length > 0 || t.endsWith(" ")) ? ft().filter((e) => e.name.includes(i)).slice(0, 12).map((e) => ({
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
					i && n && (n.style.left = `${Math.min(i.left, window.innerWidth - 240)}px`, n.style.top = `${i.bottom + 4}px`), t.render(/* @__PURE__ */ d(bt, {
						ref: e,
						items: r.items,
						command: r.command
					}));
				};
				return {
					onStart(e) {
						xt = !0, r(e);
					},
					onUpdate: r,
					onExit() {
						xt = !1, t?.unmount(), n?.remove(), t = null, n = null;
					},
					onKeyDown({ event: t }) {
						return e.current?.onKeyDown(t) ?? !1;
					}
				};
			}
		})];
	}
}), Ct = r(function({ onSubmit: e, onCancel: t }, n) {
	let r = c(null), i = x({
		extensions: [
			T,
			E.configure({ placeholder: "Describe the change… (Enter to copy · Shift+Enter for new line · / for commands)" }),
			_t,
			yt,
			St
		],
		autofocus: !0,
		editorProps: {
			attributes: { class: "change-editor-content" },
			handleKeyDown(n, a) {
				return a.key === "Escape" ? (t(), !0) : a.key === "Enter" && !a.shiftKey ? xt ? !1 : (e(ht(r.current)), !0) : a.key === "Enter" && a.shiftKey ? (i?.commands.setHardBreak(), !0) : !1;
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
}), X = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(O.Root, {
	ref: n,
	className: P("ax-checkbox", e),
	...t,
	children: /* @__PURE__ */ d(O.Indicator, {
		className: "ax-checkbox-indicator",
		children: /* @__PURE__ */ d("i", { className: "ax-icon icon-tick" })
	})
}));
X.displayName = O.Root.displayName;
//#endregion
//#region src/components/ui/chip.tsx
function wt({ children: e, thumbnail: t, rounded: n = !1, draggable: r = !1, themed: i = !1, actionIcon: a, onAction: o, onRemove: s, onClick: c, className: l }) {
	return /* @__PURE__ */ f("div", {
		role: c ? "button" : void 0,
		tabIndex: c ? 0 : void 0,
		onClick: c,
		onKeyDown: c ? (e) => {
			(e.key === "Enter" || e.key === " ") && c(e);
		} : void 0,
		className: P("ax-chip", n && "ax-chip--rounded", t && "ax-chip--has-thumb", c && "ax-chip--interactive", i && "ax-chip--themed", l),
		children: [
			r && /* @__PURE__ */ d("span", {
				className: "ax-chip__drag",
				"aria-hidden": "true",
				children: /* @__PURE__ */ d("i", { className: "icon-drag_rounded" })
			}),
			t && /* @__PURE__ */ d("span", {
				className: "ax-chip__thumb-wrap",
				children: /* @__PURE__ */ d("img", {
					src: t,
					alt: "",
					className: P("ax-chip__thumb", n && "ax-chip__thumb--rounded")
				})
			}),
			/* @__PURE__ */ d("span", {
				className: "ax-chip__label",
				children: e
			}),
			a && /* @__PURE__ */ d("button", {
				type: "button",
				className: "ax-chip__action",
				onClick: (e) => {
					e.stopPropagation(), o?.(e);
				},
				tabIndex: -1,
				"aria-label": "Action",
				children: /* @__PURE__ */ d("i", { className: a })
			}),
			s && /* @__PURE__ */ d("button", {
				type: "button",
				className: "ax-chip__remove",
				onClick: (e) => {
					e.stopPropagation(), s(e);
				},
				tabIndex: -1,
				"aria-label": "Remove",
				children: /* @__PURE__ */ d("i", { className: "icon-x-thick" })
			})
		]
	});
}
wt.displayName = "Chip";
//#endregion
//#region src/components/ui/combobox.tsx
function Tt({ items: e, value: n, onValueChange: r, placeholder: i = "Select…", searchPlaceholder: a = "Search…", emptyText: o = "No results.", open: s, onOpenChange: c, contentStyle: l, className: u }) {
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
			className: P("ax-combobox-trigger", u),
			onClick: () => E(!T),
			"aria-expanded": T,
			"aria-haspopup": "listbox",
			children: [/* @__PURE__ */ d("span", {
				className: P("ax-combobox-trigger-value", !n && "ax-combobox-trigger-value--placeholder"),
				children: O ?? i
			}), /* @__PURE__ */ d("i", { className: P("icon-chevron-down ax-combobox-chevron", T && "ax-combobox-chevron--open") })]
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
Tt.displayName = "Combobox";
//#endregion
//#region src/components/ui/popover.tsx
var Et = j.Root, Dt = j.Trigger, Ot = t.forwardRef(({ className: e, align: t = "start", sideOffset: n = 4, ...r }, i) => /* @__PURE__ */ d(j.Portal, { children: /* @__PURE__ */ d(j.Content, {
	ref: i,
	align: t,
	sideOffset: n,
	className: P("ax-popover-content", e),
	...r
}) }));
Ot.displayName = j.Content.displayName;
function kt({ heading: e, body: t, dismissable: n = !1, action: r = !1, actionLabel: i = "Read more", content: a = !1, onDismiss: o, onAction: s, children: c, className: l }) {
	return /* @__PURE__ */ f("div", {
		className: P("ax-popover-card", l),
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
				r && /* @__PURE__ */ d(U, {
					variant: "tertiary",
					onClick: s,
					className: "ax-popover-card-action",
					children: i
				})
			]
		}), n && /* @__PURE__ */ d(W, {
			icon: "icon-cancel",
			size: 20,
			buttonStyle: !1,
			onClick: o,
			"aria-label": "Dismiss"
		})]
	});
}
kt.displayName = "PopoverCard";
function At(e) {
	let [t, n] = e.split("-");
	return {
		side: t,
		align: n ?? "center"
	};
}
function jt({ heading: e, body: t, action: n = !1, actionLabel: r = "Read more", onAction: i, position: a = "top", field: o = !1, open: s, onOpenChange: c, content: l = !1, children: u }) {
	let { side: p, align: m } = At(a);
	return /* @__PURE__ */ f(Et, {
		open: s,
		onOpenChange: c,
		children: [/* @__PURE__ */ d(Dt, {
			asChild: !0,
			children: /* @__PURE__ */ d(W, {
				icon: "icon-info-outline",
				size: o ? 18 : 20,
				buttonStyle: !1,
				className: s ? "ax-popover-trigger--active" : void 0,
				"aria-label": "More information"
			})
		}), /* @__PURE__ */ d(j.Portal, { children: /* @__PURE__ */ d(j.Content, {
			side: p,
			align: m,
			sideOffset: 6,
			className: "ax-popover-animated",
			children: /* @__PURE__ */ d(kt, {
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
jt.displayName = "InfoPopover";
//#endregion
//#region src/components/ui/date-picker.tsx
var Mt = [
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
function Nt(e) {
	let t = e.trim().toLowerCase();
	if (!t) return;
	if (t === "today") return ne();
	if (t === "tomorrow") return k(ne(), 1);
	let n = /* @__PURE__ */ new Date();
	for (let t of Mt) {
		let r = te(e.trim(), t, n);
		if (ee(r)) return r;
	}
}
var Pt = "dd MMM yy";
function Ft(e) {
	let { mode: n = "single", placeholder: r, className: i, disabled: a } = e, [o, s] = t.useState(!1), [c, l] = t.useState(!1), [u, p] = t.useState(""), [m, h] = t.useState(void 0), g = t.useRef("start"), [_, v] = t.useState(0), y = t.useRef(void 0);
	if (n === "range") {
		let { selected: t, onSelect: n } = e, c = !!t?.from, l = t?.from ? t.to ? `${A(t.from, Pt)} – ${A(t.to, Pt)}` : A(t.from, Pt) : r ?? "Pick a date range", u = (e) => {
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
		return /* @__PURE__ */ f(Et, {
			open: o,
			onOpenChange: u,
			children: [/* @__PURE__ */ d(Dt, {
				asChild: !0,
				children: /* @__PURE__ */ f("button", {
					type: "button",
					className: P("ax-select-trigger ax-date-picker-trigger", i),
					disabled: a,
					...c ? {} : { "data-placeholder": "" },
					children: [/* @__PURE__ */ d("i", { className: "icon-calendar-outline" }), /* @__PURE__ */ d("span", {
						className: "ax-select-value",
						children: l
					})]
				})
			}), /* @__PURE__ */ d(Ot, { children: /* @__PURE__ */ d(K, {
				mode: "range",
				selected: m,
				defaultMonth: y.current ?? t?.from,
				onMonthChange: (e) => {
					y.current = e;
				},
				onDayClick: p,
				initialFocus: !0
			}, _) })]
		});
	}
	let { selected: b, onSelect: x } = e, [S, C] = t.useState(void 0), w = b ?? S, T = (e) => {
		b === void 0 && C(e), x?.(e);
	}, E = w ? A(w, Pt) : "", D = (e) => {
		if (l(!1), !e.trim()) {
			T(void 0);
			return;
		}
		let t = Nt(e);
		t && T(t);
	};
	return /* @__PURE__ */ f("div", {
		className: P("ax-date-picker-wrap", i),
		children: [/* @__PURE__ */ d("input", {
			type: "text",
			className: P("ax-date-picker-input", c && "ax-date-picker-input--focused"),
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
		}), /* @__PURE__ */ f(Et, {
			open: o,
			onOpenChange: s,
			children: [/* @__PURE__ */ d(Dt, {
				asChild: !0,
				children: /* @__PURE__ */ d("button", {
					type: "button",
					className: "ax-date-picker-cal-btn",
					disabled: a,
					tabIndex: -1,
					onMouseDown: (e) => e.preventDefault(),
					children: /* @__PURE__ */ d("i", { className: "icon-calendar-outline" })
				})
			}), /* @__PURE__ */ d(Ot, {
				onMouseDown: (e) => e.preventDefault(),
				children: /* @__PURE__ */ d(K, {
					mode: "single",
					selected: w,
					defaultMonth: w,
					onSelect: (e) => {
						T(e), s(!1);
					},
					initialFocus: !0
				})
			})]
		})]
	});
}
Ft.displayName = "DatePicker";
//#endregion
//#region src/components/ui/activity-card-horizontal.tsx
var It = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thurs",
	"Fri",
	"Sat"
], Lt = [
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
function Rt(e) {
	return {
		day: It[e.getDay()],
		num: e.getDate(),
		monthYear: `${Lt[e.getMonth()]} ${String(e.getFullYear()).slice(-2)}`
	};
}
var zt = t.forwardRef(({ title: e, overview: n, startDate: r, endDate: i, thumbnailSrc: a, codeLabel: o, codeValue: s, status: c, meta: l, chips: p, disabled: m, skeleton: h, onClick: g, className: _ }, v) => {
	let y = !a && r && i;
	return /* @__PURE__ */ f("button", {
		ref: v,
		type: "button",
		disabled: m,
		onClick: g,
		className: P("ax-activity-card-horizontal", m && "ax-activity-card-horizontal--disabled", h && "ax-activity-card-horizontal--skeleton", _),
		children: [/* @__PURE__ */ d("div", {
			className: "ax-activity-card-horizontal-thumb",
			children: a ? /* @__PURE__ */ d("img", {
				src: a,
				alt: "",
				className: "ax-activity-card-horizontal-thumb-img"
			}) : y ? /* @__PURE__ */ d("div", {
				className: "ax-activity-card-horizontal-date-range",
				children: [r, i].map((e, n) => {
					let { day: r, num: i, monthYear: a } = Rt(e);
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
zt.displayName = "ActivityCardHorizontal";
//#endregion
//#region src/components/ui/activity-card-portrait.tsx
var Z = {
	p12537a00: "M15.7812 32.0221C15.7812 31.2454 16.4108 30.6158 17.1875 30.6158H38.6507C39.4273 30.6158 40.0569 31.2454 40.0569 32.0221C40.0569 32.7987 39.4273 33.4283 38.6507 33.4283H17.1875C16.4108 33.4283 15.7812 32.7987 15.7812 32.0221Z",
	p2dfd6000: "M15.7812 38.125C15.7812 37.3483 16.4108 36.7188 17.1875 36.7188H38.75C39.5267 36.7188 40.1562 37.3483 40.1562 38.125C40.1562 38.9017 39.5267 39.5312 38.75 39.5312H17.1875C16.4108 39.5312 15.7812 38.9017 15.7812 38.125Z",
	p2e56000: "M55.3125 54.9879V61.4062C55.3125 64.254 53.004 66.5625 50.1563 66.5625H5.15625C2.30853 66.5625 0 64.254 0 61.4062V5.15625C0 2.30853 2.30853 0 5.15625 0H50.1563C53.004 0 55.3125 2.30853 55.3125 5.15625V30.3195C60.7845 31.2462 64.9517 36.0087 64.9517 41.7445C64.9517 46.7909 61.7261 51.0839 57.2242 52.6741L59.8238 57.1766C60.4802 56.3193 61.4594 55.754 62.5301 55.6141L60.0056 51.2416C60.7946 50.6888 61.5115 50.0401 62.1395 49.3126L66.7375 57.2765C67.3164 58.2792 66.3387 59.4621 65.245 59.0824L63.4628 58.4637C62.7429 58.2138 61.9687 58.6607 61.8252 59.4091L61.4699 61.2619C61.2519 62.399 59.7386 62.6542 59.1598 61.6515L55.3125 54.9879ZM2.8125 5.15625C2.8125 3.86183 3.86183 2.8125 5.15625 2.8125H50.1563C51.4507 2.8125 52.5 3.86183 52.5 5.15625V30.1879C46.5032 30.6296 41.7751 35.6349 41.7751 41.7445C41.7751 44.9512 43.0776 47.8537 45.1824 49.9518L40.9534 57.2765C40.3746 58.2792 41.3522 59.4621 42.4459 59.0824L44.2281 58.4637C44.9481 58.2138 45.7222 58.6607 45.8657 59.4091L46.221 61.2619C46.439 62.399 47.9523 62.6542 48.5312 61.6515L52.5 54.7773V61.4062C52.5 62.7007 51.4507 63.75 50.1563 63.75H5.15625C3.86183 63.75 2.8125 62.7007 2.8125 61.4062V5.15625ZM53.3634 50.5203C58.2101 50.5203 62.1392 46.5913 62.1392 41.7445C62.1392 36.8978 58.2101 32.9688 53.3634 32.9688C48.5167 32.9688 44.5876 36.8978 44.5876 41.7445C44.5876 46.5913 48.5167 50.5203 53.3634 50.5203ZM45.1608 55.6141L47.4228 51.6963C48.3173 52.2314 49.2899 52.6494 50.3196 52.9289L47.8672 57.1766C47.2107 56.3193 46.2315 55.754 45.1608 55.6141Z",
	p3440d7b0: "M8.90625 6.25C7.78442 6.25 6.875 7.15942 6.875 8.28125V58.2812C6.875 59.4031 7.78442 60.3125 8.90625 60.3125H46.0389L45.8657 59.4091C45.7222 58.6607 44.9481 58.2138 44.2281 58.4637L42.4459 59.0824C41.4326 59.4342 40.519 58.4447 40.8504 57.5H9.6875V9.0625H45.625V33.1185C46.4616 32.3675 47.4082 31.7364 48.4375 31.2523V8.28125C48.4375 7.15942 47.5281 6.25 46.4062 6.25H8.90625Z",
	p3cb27d80: "M20.1562 20C20.1562 19.2233 20.7858 18.5938 21.5625 18.5938H33.75C34.5267 18.5938 35.1562 19.2233 35.1562 20C35.1562 20.7767 34.5267 21.4062 33.75 21.4062H21.5625C20.7858 21.4062 20.1562 20.7767 20.1562 20Z",
	p82f2d00: "M15.7812 26.011C15.7812 25.2344 16.4108 24.6048 17.1875 24.6048H38.6507C39.4273 24.6048 40.0569 25.2344 40.0569 26.011C40.0569 26.7877 39.4273 27.4173 38.6507 27.4173H17.1875C16.4108 27.4173 15.7812 26.7877 15.7812 26.011Z"
}, Bt = t.forwardRef(({ title: e, description: t, codeLabel: n, codeValue: r, activityType: i, thumbnailSrc: a, disabled: o, selected: s, skeleton: c, onClick: l, className: p }, m) => /* @__PURE__ */ f("button", {
	ref: m,
	type: "button",
	disabled: o || c,
	onClick: l,
	"aria-busy": c || void 0,
	className: P("ax-activity-card-portrait", s && !o && !c && "ax-activity-card-portrait--selected", o && "ax-activity-card-portrait--disabled", c && "ax-activity-card-portrait--skeleton", p),
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
								d: Z.p3cb27d80,
								fill: "currentColor",
								fillRule: "evenodd"
							}),
							/* @__PURE__ */ d("path", {
								clipRule: "evenodd",
								d: Z.p82f2d00,
								fill: "currentColor",
								fillRule: "evenodd"
							}),
							/* @__PURE__ */ d("path", {
								clipRule: "evenodd",
								d: Z.p12537a00,
								fill: "currentColor",
								fillRule: "evenodd"
							}),
							/* @__PURE__ */ d("path", {
								clipRule: "evenodd",
								d: Z.p2dfd6000,
								fill: "currentColor",
								fillRule: "evenodd"
							})
						]
					}),
					/* @__PURE__ */ d("path", {
						clipRule: "evenodd",
						d: Z.p2e56000,
						fill: "currentColor",
						fillRule: "evenodd"
					}),
					/* @__PURE__ */ d("path", {
						d: Z.p3440d7b0,
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
Bt.displayName = "ActivityCardPortrait";
//#endregion
//#region src/components/ui/switch.tsx
var Vt = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(re.Root, {
	className: P("ax-switch", e),
	...t,
	ref: n,
	children: /* @__PURE__ */ d(re.Thumb, { className: "ax-switch-thumb" })
}));
Vt.displayName = re.Root.displayName;
//#endregion
//#region src/components/ui/detail-option.tsx
var Ht = t.forwardRef(({ title: e, description: n, checked: r, onCheckedChange: i, disabled: a = !1, card: o = !0, className: s }, c) => {
	let l = t.useId();
	return /* @__PURE__ */ f("label", {
		ref: c,
		htmlFor: l,
		"aria-disabled": a || void 0,
		className: P("ax-detail-option", o ? "ax-detail-option--card" : "ax-detail-option--no-card", a && "ax-detail-option--disabled", s),
		children: [/* @__PURE__ */ f("div", {
			className: "ax-detail-option-content",
			children: [/* @__PURE__ */ d("span", {
				className: "ax-detail-option-title",
				children: e
			}), n && /* @__PURE__ */ d("span", {
				className: "ax-detail-option-description",
				children: n
			})]
		}), /* @__PURE__ */ d(Vt, {
			id: l,
			checked: r,
			onCheckedChange: i,
			disabled: a
		})]
	});
});
Ht.displayName = "DetailOption";
//#endregion
//#region src/components/ui/field.tsx
function Ut({ className: e, width: t, style: n, ...r }) {
	let i = t === "full" ? { width: "100%" } : t === "auto" ? { width: "fit-content" } : typeof t == "number" ? { width: t } : {};
	return /* @__PURE__ */ d("div", {
		className: P("ax-field", e),
		style: {
			...i,
			...n
		},
		...r
	});
}
function Wt({ className: e, required: t, tooltip: n, children: r, ...i }) {
	return /* @__PURE__ */ f("label", {
		className: P("ax-field-label", e),
		...i,
		children: [
			r,
			t && /* @__PURE__ */ d("span", {
				className: "ax-label-required",
				"aria-hidden": "true",
				children: " *"
			}),
			n && /* @__PURE__ */ d(Ie, {
				content: n,
				children: /* @__PURE__ */ d("i", {
					className: "icon-info-tooltip ax-field-label-tooltip-icon",
					"aria-label": "More information"
				})
			})
		]
	});
}
function Gt({ className: e, ...t }) {
	return /* @__PURE__ */ d("p", {
		className: P("ax-field-description", e),
		...t
	});
}
//#endregion
//#region src/components/ui/display-field.tsx
function Kt({ label: e, value: t, icon: n, avatar: r, inline: i = !1, className: a }) {
	return /* @__PURE__ */ f("div", {
		className: P("ax-display-field", i && "ax-display-field--inline", a),
		children: [e && /* @__PURE__ */ d(Wt, { children: e }), /* @__PURE__ */ f("div", {
			className: "ax-display-field-value-row",
			children: [
				n && /* @__PURE__ */ d("i", {
					className: P("ax-icon ax-display-field-icon", n),
					"aria-hidden": "true"
				}),
				r && /* @__PURE__ */ d(L, {
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
Kt.displayName = "DisplayField";
//#endregion
//#region src/components/ui/input.tsx
var Q = t.forwardRef(({ className: e, type: t, leftIcon: n, hint: r, label: i, required: a, id: o, fieldStyle: s, style: c, ...l }, u) => {
	let p = n ?? (t === "search" ? /* @__PURE__ */ d("i", { className: "icon-search" }) : void 0), m = !!p || !!r, h = /* @__PURE__ */ d("input", {
		type: t,
		id: o,
		className: P("ax-input", p && "ax-input--has-icon-left", r && "ax-input--has-hint", e),
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
	return i ? /* @__PURE__ */ f(Ut, {
		style: s,
		children: [/* @__PURE__ */ d(Wt, {
			htmlFor: o,
			required: a,
			children: i
		}), g]
	}) : g;
});
Q.displayName = "Input";
//#endregion
//#region src/components/ui/advanced-filter.tsx
function qt(e, t, n) {
	if (e == null || e === "") return "…";
	switch (t) {
		case "select": return n?.find((t) => t.value === e)?.label ?? String(e);
		case "date": {
			if (e instanceof Date) return A(e, "dd MMM yy");
			let t = e;
			return t?.from && t?.to ? `${A(t.from, "dd MMM yy")} – ${A(t.to, "dd MMM yy")}` : t?.from ? A(t.from, "dd MMM yy") : "…";
		}
		case "number-range": {
			let t = e;
			return t?.from && t?.to ? `${t.from} – ${t.to}` : t?.from ? `from ${t.from}` : t?.to ? `to ${t.to}` : "…";
		}
		default: return String(e);
	}
}
function Jt({ value: e, onCommit: n }) {
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
function Yt({ value: e, onCommit: n, onClose: r }) {
	let [i, a] = t.useState(e == null ? "" : String(e)), o = t.useRef(null);
	t.useEffect(() => {
		o.current?.focus();
	}, []);
	let s = () => n(i === "" ? void 0 : Number(i));
	return /* @__PURE__ */ f("div", {
		className: "ax-adv-filter-slot",
		children: [/* @__PURE__ */ d(Q, {
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
			children: [/* @__PURE__ */ d(U, {
				variant: "secondary",
				onClick: r,
				children: "Cancel"
			}), /* @__PURE__ */ d(U, {
				variant: "primary",
				onMouseDown: (e) => {
					e.preventDefault(), s();
				},
				children: "Apply"
			})]
		})]
	});
}
function Xt({ value: e, onCommit: n, onClose: r }) {
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
			/* @__PURE__ */ d(Q, {
				ref: l,
				type: "number",
				label: "From",
				value: a,
				onChange: (e) => o(e.target.value),
				onKeyDown: (e) => {
					e.key === "Enter" && u();
				}
			}),
			/* @__PURE__ */ d(Q, {
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
				children: [/* @__PURE__ */ d(U, {
					variant: "secondary",
					onClick: r,
					children: "Cancel"
				}), /* @__PURE__ */ d(U, {
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
function Zt({ value: e, options: n, onCommit: r }) {
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
function Qt({ value: e, onCommit: n }) {
	let [r, i] = t.useState(e);
	return /* @__PURE__ */ d("div", {
		className: "ax-adv-filter-slot ax-adv-filter-slot--calendar",
		children: /* @__PURE__ */ d(K, {
			mode: "single",
			selected: r,
			onSelect: (e) => {
				i(e), e && n(e);
			},
			initialFocus: !0
		})
	});
}
function $t({ value: e, onCommit: n }) {
	let [r, i] = t.useState(e), [a, o] = t.useState(0), s = t.useRef("start");
	return /* @__PURE__ */ d("div", {
		className: "ax-adv-filter-slot ax-adv-filter-slot--calendar",
		children: /* @__PURE__ */ d(K, {
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
			},
			initialFocus: !0
		}, a)
	});
}
function en({ operator: e, value: t, onCommit: n }) {
	return d(e === "between" ? $t : Qt, {
		value: t,
		onCommit: n
	});
}
function tn({ field: e, fieldLabel: n, operators: r, operator: i, value: a, selectOptions: o, onChange: s, onRemove: c, defaultOpen: l, className: u }) {
	let [p, m] = t.useState(!1), [h, g] = t.useState(!1);
	t.useEffect(() => {
		l && g(!0);
	}, [l]);
	let _ = r.find((e) => e.key === i) ?? r[0], v = qt(a, _.type, o), y = n ?? e, b = r.length > 1, x = _.type === "select" || _.type === "date", S = (e) => {
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
			case "text": return /* @__PURE__ */ d(Jt, {
				value: a,
				onCommit: C
			}, _.key);
			case "number": return /* @__PURE__ */ d(Yt, {
				value: a,
				onCommit: C,
				onClose: w
			}, _.key);
			case "number-range": return /* @__PURE__ */ d(Xt, {
				value: a,
				onCommit: C,
				onClose: w
			}, _.key);
			case "select": return /* @__PURE__ */ d(Zt, {
				value: a,
				options: o ?? [],
				onCommit: C
			}, _.key);
			case "date": return /* @__PURE__ */ d(en, {
				operator: _.key,
				value: a,
				onCommit: C
			}, _.key);
		}
	})();
	return /* @__PURE__ */ f("div", {
		className: P("ax-filter-chip", u),
		children: [
			/* @__PURE__ */ d("span", {
				className: "ax-filter-chip-seg ax-filter-chip-seg--field",
				children: y
			}),
			b ? /* @__PURE__ */ f(j.Root, {
				open: p,
				onOpenChange: m,
				children: [/* @__PURE__ */ d(j.Trigger, {
					asChild: !0,
					children: /* @__PURE__ */ d("button", {
						className: "ax-filter-chip-seg ax-filter-chip-seg--operator ax-filter-chip-seg--operator-btn",
						children: _.label
					})
				}), /* @__PURE__ */ d(j.Portal, { children: /* @__PURE__ */ d(j.Content, {
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
			/* @__PURE__ */ f(j.Root, {
				open: h,
				onOpenChange: g,
				children: [/* @__PURE__ */ d(j.Trigger, {
					asChild: !0,
					children: /* @__PURE__ */ d("button", {
						className: "ax-filter-chip-seg ax-filter-chip-seg--value ax-filter-chip-seg--value-btn",
						children: v
					})
				}), /* @__PURE__ */ d(j.Portal, { children: /* @__PURE__ */ d(j.Content, {
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
tn.displayName = "AdvancedFilter";
//#endregion
//#region src/components/ui/filter-bar.tsx
function nn({ fieldNames: e, onSelect: n }) {
	let [r, i] = t.useState(!1), [a, o] = t.useState(""), s = t.useRef(null);
	if (e.length === 0) return null;
	let c = a ? e.filter((e) => e.toLowerCase().includes(a.toLowerCase())) : e;
	return /* @__PURE__ */ f(j.Root, {
		open: r,
		onOpenChange: (e) => {
			i(e), e || o("");
		},
		children: [/* @__PURE__ */ d(j.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ f("button", {
				className: "ax-filter-btn ax-filter-btn--primary",
				type: "button",
				children: [/* @__PURE__ */ d("i", { className: "icon-add" }), "Add filter"]
			})
		}), /* @__PURE__ */ d(j.Portal, { children: /* @__PURE__ */ d(j.Content, {
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
function rn({ field: e, operator: n, value: r, valueOptions: i, onChangeValue: a, onRemove: o, className: s }) {
	let [c, l] = t.useState(!1), [u, p] = t.useState(""), m = t.useRef(null), h = i && i.length > 0 && a, g = u ? (i ?? []).filter((e) => e.toLowerCase().includes(u.toLowerCase())) : i ?? [];
	return /* @__PURE__ */ f("div", {
		className: P("ax-filter-chip", s),
		children: [
			/* @__PURE__ */ d("span", {
				className: "ax-filter-chip-seg ax-filter-chip-seg--field",
				children: e
			}),
			/* @__PURE__ */ d("span", {
				className: "ax-filter-chip-seg ax-filter-chip-seg--operator",
				children: n
			}),
			h ? /* @__PURE__ */ f(j.Root, {
				open: c,
				onOpenChange: (e) => {
					l(e), e || p("");
				},
				children: [/* @__PURE__ */ d(j.Trigger, {
					asChild: !0,
					children: /* @__PURE__ */ d("button", {
						className: "ax-filter-chip-seg ax-filter-chip-seg--value ax-filter-chip-seg--value-btn",
						children: r
					})
				}), /* @__PURE__ */ d(j.Portal, { children: /* @__PURE__ */ d(j.Content, {
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
function an({ field: e, direction: t = "asc", onToggle: n, className: r }) {
	return /* @__PURE__ */ f("div", {
		className: P("ax-filter-chip", r),
		children: [/* @__PURE__ */ d("span", {
			className: "ax-filter-chip-seg ax-filter-chip-seg--label",
			children: "Sort by"
		}), /* @__PURE__ */ f("button", {
			className: "ax-filter-chip-seg ax-filter-chip-seg--sort-field",
			onClick: n,
			"aria-label": `Sort by ${e} ${t === "asc" ? "ascending" : "descending"}`,
			children: [/* @__PURE__ */ d("span", { children: e }), /* @__PURE__ */ d("i", { className: P("icon-arrow-down", t === "desc" && "ax-filter-chip-sort-icon--asc") })]
		})]
	});
}
function on({ options: e, value: t, onChange: n, className: r }) {
	return /* @__PURE__ */ d("div", {
		className: P("ax-filter-chip ax-filter-chip--toggle", r),
		children: e.map((r, i) => /* @__PURE__ */ d("button", {
			className: P("ax-toggle-chip-option", r.value === t && "ax-toggle-chip-option--selected", i < e.length - 1 && "ax-toggle-chip-option--bordered"),
			onClick: () => n?.(r.value),
			"aria-pressed": r.value === t,
			children: r.label
		}, r.value))
	});
}
function sn({ primary: e = !1, leftIcon: t, onClick: n, disabled: r, className: i, children: a }) {
	return /* @__PURE__ */ f("button", {
		className: P("ax-filter-btn", e && "ax-filter-btn--primary", i),
		onClick: n,
		disabled: r,
		type: "button",
		children: [t, a]
	});
}
function $() {
	return /* @__PURE__ */ d("div", {
		className: "ax-filter-bar-divider",
		"aria-hidden": "true"
	});
}
function cn({ filters: e = [], onRemoveFilter: n, onChangeFilter: r, fieldValueOptions: i, fieldDefinitions: a, advancedFilters: o, onAddAdvancedFilter: s, onRemoveAdvancedFilter: c, onChangeAdvancedFilter: l, sort: p, onToggleSort: m, toggleOptions: h, toggleValue: g, onToggleChange: _, onAddFilter: v, onMoreActions: y, extraButtons: b, className: x }) {
	let [S, C] = t.useState(null), w = t.useRef([]);
	t.useEffect(() => {
		let e = w.current, t = o ?? [];
		if (t.length > e.length) {
			let n = t.find((t) => !e.some((e) => e.id === t.id));
			n && C(n.id);
		}
		w.current = t;
	}, [o]);
	let T = b != null, E = h && h.length > 0, D = e.length > 0 || (o?.length ?? 0) > 0, O = p != null, k = [...Object.keys(a ?? {}), ...Object.keys(i ?? {})], A = (e) => {
		a?.[e] ? s?.(e) : v?.(e);
	}, ee = (v || s) && k.length > 0;
	return /* @__PURE__ */ f("div", {
		className: P("ax-filter-bar", x),
		role: "toolbar",
		"aria-label": "Filters",
		children: [
			O && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(an, {
				field: p.field,
				direction: p.direction,
				onToggle: m
			}), (T || E || D) && /* @__PURE__ */ d($, {})] }),
			T && /* @__PURE__ */ f(u, { children: [b, (E || D) && /* @__PURE__ */ d($, {})] }),
			E && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(on, {
				options: h,
				value: g,
				onChange: _
			}), D && /* @__PURE__ */ d($, {})] }),
			e.map((e) => {
				let t = i?.[e.field] ?? i?.[e.field.toLowerCase()];
				return /* @__PURE__ */ d(rn, {
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
				return t ? /* @__PURE__ */ d(tn, {
					field: e.field,
					fieldLabel: t.label,
					operators: t.operators,
					operator: e.operator,
					value: e.value,
					selectOptions: t.selectOptions,
					onChange: (t) => l?.(e.id, t),
					onRemove: c ? () => c(e.id) : void 0,
					defaultOpen: S === e.id
				}, e.id) : null;
			}),
			(ee || y) && /* @__PURE__ */ f(u, { children: [(D || E || T || O) && /* @__PURE__ */ d($, {}), /* @__PURE__ */ f("div", {
				className: "ax-filter-bar-actions",
				children: [ee && /* @__PURE__ */ d(nn, {
					fieldNames: k,
					onSelect: A
				}), y && /* @__PURE__ */ d(sn, {
					onClick: y,
					children: /* @__PURE__ */ d("i", { className: "icon-more-horizontal" })
				})]
			})] })
		]
	});
}
cn.displayName = "FilterBar";
//#endregion
//#region src/components/ui/heading.tsx
var ln = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
	5: "h5",
	6: "h6"
};
function un({ level: e = 1, as: t, color: n = "text", className: r, style: i, ...a }) {
	return /* @__PURE__ */ d(t ?? ln[e], {
		className: P(`ax-heading ax-heading--${e}`, r),
		style: {
			color: `var(--${n})`,
			...i
		},
		...a
	});
}
//#endregion
//#region src/components/ui/icon.tsx
function dn({ name: e, className: t, ...n }) {
	return /* @__PURE__ */ d("i", {
		className: P(`icon-${e}`, t),
		"aria-hidden": "true",
		...n
	});
}
dn.displayName = "Icon";
//#endregion
//#region src/components/ui/label.tsx
var fn = t.forwardRef(({ className: e, required: t, children: n, ...r }, i) => /* @__PURE__ */ f(ie.Root, {
	ref: i,
	className: P("ax-label", e),
	...r,
	children: [n, t && /* @__PURE__ */ d("span", {
		className: "ax-label-required",
		"aria-hidden": "true",
		children: " *"
	})]
}));
fn.displayName = ie.Root.displayName;
//#endregion
//#region src/components/ui/modal.tsx
function pn({ open: e, onClose: n, title: r, children: i, primaryLabel: a = "Save", onPrimary: o, secondaryLabel: s = "Cancel", onSecondary: c, tertiaryLabel: l, onTertiary: u, width: p = 420, className: m }) {
	return t.useEffect(() => {
		if (!e) return;
		let t = (e) => {
			e.key === "Escape" && n();
		};
		return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
	}, [e, n]), t.useEffect(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", () => {
		document.body.style.overflow = "";
	}), [e]), e ? ae(/* @__PURE__ */ d("div", {
		className: "ax-modal-backdrop",
		onClick: (e) => {
			e.target === e.currentTarget && n();
		},
		children: /* @__PURE__ */ f("div", {
			className: P("ax-modal", m),
			style: { width: p },
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
					children: [l && /* @__PURE__ */ d(U, {
						variant: "tertiary",
						onClick: u,
						children: l
					}), /* @__PURE__ */ f("div", {
						className: "ax-modal-footer-actions",
						children: [s && /* @__PURE__ */ d(U, {
							variant: "secondary",
							onClick: c ?? n,
							children: s
						}), a && /* @__PURE__ */ d(U, {
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
pn.displayName = "Modal";
//#endregion
//#region src/components/ui/pagination.tsx
function mn(e, t) {
	if (t <= 7) return Array.from({ length: t }, (e, t) => t + 1);
	let n = [1], r = Math.max(2, e - 2), i = Math.min(t - 1, e + 2);
	r > 2 && n.push("ellipsis");
	for (let e = r; e <= i; e++) n.push(e);
	return i < t - 1 && n.push("ellipsis"), n.push(t), n;
}
function hn({ page: e, pageCount: t, onPageChange: n, className: r }) {
	if (t <= 1) return null;
	let i = mn(e, t);
	return /* @__PURE__ */ f("nav", {
		className: P("ax-pagination", r),
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
				className: P("ax-pagination-page", t === e && "ax-pagination-page--active"),
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
hn.displayName = "Pagination";
//#endregion
//#region src/components/ui/table-footer.tsx
var gn = [
	10,
	20,
	25,
	50,
	100
];
function _n({ page: e, pageCount: t, onPageChange: n, pageSize: r, onPageSizeChange: i, pageSizeOptions: a = gn, totalCount: o, className: s }) {
	let c = o === 0 ? 0 : (e - 1) * r + 1, l = Math.min(e * r, o);
	return /* @__PURE__ */ f("div", {
		className: P("ax-table-footer", s),
		children: [
			/* @__PURE__ */ d(Ut, {
				width: 140,
				children: /* @__PURE__ */ f(R, {
					value: String(r),
					onValueChange: (e) => i(Number(e)),
					children: [/* @__PURE__ */ d(z, { children: /* @__PURE__ */ d(Se, {}) }), /* @__PURE__ */ d(B, { children: a.map((e) => /* @__PURE__ */ f(V, {
						value: String(e),
						children: [e, " per page"]
					}, e)) })]
				})
			}),
			/* @__PURE__ */ d(hn, {
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
_n.displayName = "TableFooter";
//#endregion
//#region src/components/ui/thumbnail-item.tsx
var vn = t.forwardRef(({ avatar: e, title: t, subline: n, extraString: r, rightSlot: i, variant: a = "default", className: o }, s) => /* @__PURE__ */ f("div", {
	ref: s,
	className: P("ax-thumbnail-item", a === "card" && "ax-thumbnail-item--card", o),
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
vn.displayName = "ThumbnailItem";
//#endregion
//#region src/components/ui/top-bar.tsx
var yn = t.forwardRef(({ breadcrumbs: e, leftContent: t, headingTitle: n, avatar: r, title: i, subline: a, extraString: o, rightContent: s, maxWidth: c, className: l }, u) => /* @__PURE__ */ d("div", {
	ref: u,
	className: P("ax-top-bar", l),
	children: /* @__PURE__ */ f("div", {
		className: "ax-top-bar-inner",
		style: c ? { "--ax-top-bar-max-width": `${c}px` } : void 0,
		children: [e && e.length > 0 && /* @__PURE__ */ d(je, { items: e }), /* @__PURE__ */ f("div", {
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
					!n && (r || i) && /* @__PURE__ */ d(vn, {
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
yn.displayName = "TopBar";
//#endregion
//#region src/components/ui/table-header.tsx
function bn({ children: e, filters: t, fieldValueOptions: n, onAddFilter: r, onRemoveFilter: i, onChangeFilter: a, fieldDefinitions: o, advancedFilters: s, onAddAdvancedFilter: c, onRemoveAdvancedFilter: l, onChangeAdvancedFilter: u, sort: p, onToggleSort: m, toggleOptions: h, toggleValue: g, onToggleChange: _, onMoreActions: v, className: y, ...b }) {
	let x = t && t.length > 0 || s && s.length > 0 || h && h.length > 0 || r != null || c != null || o != null || p != null;
	return /* @__PURE__ */ f("div", {
		className: P("ax-table-header", y),
		children: [/* @__PURE__ */ d(yn, {
			...b,
			className: "ax-table-header-topbar"
		}), (e || x) && /* @__PURE__ */ f("div", {
			className: "ax-table-header-body",
			children: [e && /* @__PURE__ */ d("div", {
				className: "ax-table-header-toolbar",
				children: e
			}), x && /* @__PURE__ */ d(cn, {
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
				onMoreActions: v
			})]
		})]
	});
}
bn.displayName = "TableHeader";
//#endregion
//#region src/components/ui/nav.tsx
var xn = t.forwardRef(({ children: e, header: t, headerAction: n, className: r, ...i }, a) => /* @__PURE__ */ f("div", {
	ref: a,
	className: P("ax-nav-menu", r),
	...i,
	children: [t && /* @__PURE__ */ f("div", {
		className: "ax-nav-menu-header",
		children: [/* @__PURE__ */ d("span", {
			className: "ax-nav-menu-header-title",
			children: t
		}), n]
	}), e]
}));
xn.displayName = "VerticalNavMenu";
var Sn = t.forwardRef(({ icon: e, active: t, flat: n = !0, className: r, children: i, ...a }, o) => {
	let s = P("ax-nav-item", !n && "ax-nav-item--raised", t && "ax-nav-item--active", r), c = /* @__PURE__ */ f(u, { children: [e && /* @__PURE__ */ d("span", {
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
Sn.displayName = "NavItem";
//#endregion
//#region src/components/ui/radio-group.tsx
var Cn = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(M.Root, {
	className: P("ax-radio-group", e),
	...t,
	ref: n
}));
Cn.displayName = M.Root.displayName;
var wn = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(M.Item, {
	ref: n,
	className: P("ax-radio-item", e),
	...t,
	children: /* @__PURE__ */ d(M.Indicator, { className: "ax-radio-indicator" })
}));
wn.displayName = M.Root.displayName;
//#endregion
//#region src/components/ui/option.tsx
var Tn = t.forwardRef(({ checked: e, onCheckedChange: n, disabled: r, children: i, className: a }, o) => {
	let s = t.useId();
	return /* @__PURE__ */ f("label", {
		ref: o,
		htmlFor: s,
		className: P("ax-option", e && "ax-option--checked", r && "ax-option--disabled", a),
		children: [/* @__PURE__ */ d(X, {
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
Tn.displayName = "Option";
var En = t.forwardRef(({ children: e, className: t }, n) => /* @__PURE__ */ d("div", {
	ref: n,
	className: P("ax-option-stack", t),
	children: e
}));
En.displayName = "OptionStack";
var Dn = t.forwardRef(({ value: e, disabled: n, children: r, className: i }, a) => {
	let o = t.useId();
	return /* @__PURE__ */ f("label", {
		ref: a,
		htmlFor: o,
		className: P("ax-option", n && "ax-option--disabled", i),
		children: [/* @__PURE__ */ d(wn, {
			id: o,
			value: e,
			disabled: n
		}), /* @__PURE__ */ d("span", {
			className: "ax-option-label",
			children: r
		})]
	});
});
Dn.displayName = "RadioOption";
//#endregion
//#region src/components/ui/progress-bar.tsx
function On({ label: e = "Progress", value: t = 0, positive: n = !1, size: r = "medium", topLabel: i = !0, sideValue: a = !1, notch: o = !1, notchValue: s, valueLabel: c, className: l }) {
	let u = Math.min(100, Math.max(0, t)), p = c ?? `${u}%`, m = s === void 0 ? u : Math.min(100, Math.max(0, s));
	return /* @__PURE__ */ f("div", {
		className: P("ax-progress-bar", r === "small" && "ax-progress-bar--small", l),
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
					className: P("ax-progress-track", n && "ax-progress-track--positive"),
					children: /* @__PURE__ */ d("div", { className: P("ax-progress-fill", n && "ax-progress-fill--positive") })
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
var kn = t.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, i) => /* @__PURE__ */ d(oe.Root, {
	ref: i,
	decorative: n,
	orientation: t,
	className: P("ax-separator", t === "horizontal" ? "ax-separator--horizontal" : "ax-separator--vertical", e),
	...r
}));
kn.displayName = oe.Root.displayName;
//#endregion
//#region src/components/ui/single-select.tsx
var An = t.forwardRef(({ options: e, value: n, defaultValue: r, onChange: i, borderless: a = !1, error: o = !1, iconOnly: s = !1, inline: c = !1, className: l, label: u, required: p, fieldWidth: m, fieldStyle: h }, g) => {
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
		className: P("ax-single-select", a && "ax-single-select--borderless", o && "ax-single-select--error", c && "ax-single-select--inline", l),
		role: "radiogroup",
		children: [/* @__PURE__ */ d("span", {
			className: "ax-single-select-pill",
			style: {
				...S,
				opacity: w ? 1 : 0
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
				className: P("ax-single-select-option", s && "ax-single-select-option--icon-only", t && "ax-single-select-option--selected"),
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
	return u ? /* @__PURE__ */ f(Ut, {
		width: m ?? "auto",
		style: h,
		children: [/* @__PURE__ */ d(Wt, {
			required: p,
			children: u
		}), k]
	}) : k;
});
An.displayName = "SingleSelect";
//#endregion
//#region src/components/ui/stat.tsx
function jn({ label: e, value: t, trend: n, filter: r, icon: i, clickable: a = !1, card: o = !0, flat: s = !1, onClick: c, className: l }) {
	let u = n?.startsWith("+"), p = n?.startsWith("-");
	return /* @__PURE__ */ f("div", {
		className: P("ax-stat", o && !s && "ax-stat--card", s && "ax-stat--flat", c && "ax-stat--clickable", l),
		onClick: c,
		children: [
			i && /* @__PURE__ */ d(L, {
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
				}), a && /* @__PURE__ */ d(W, {
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
					className: P("ax-stat-trend", u && "ax-stat-trend--positive", p && "ax-stat-trend--negative"),
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
jn.displayName = "Stat";
//#endregion
//#region src/components/ui/status-chip.tsx
var Mn = {
	base: "icon-radio-unchecked",
	positive: "icon-tick-thick",
	negative: "icon-x-thick",
	interim: "icon-in-progress",
	"try-again": "icon-refresh",
	submitted: "icon-radio-checked"
}, Nn = {
	base: "Base",
	positive: "Positive",
	negative: "Negative",
	interim: "Interim",
	"try-again": "Retry",
	submitted: "Submitted"
}, Pn = t.forwardRef(({ type: e = "base", size: t = "large", icon: n = !1, onPrimary: r = !1, className: i, children: a, ...o }, s) => /* @__PURE__ */ f("span", {
	ref: s,
	className: P("ax-status-chip", `ax-status-chip--${e}`, `ax-status-chip--${t}`, r && "ax-status-chip--on-primary", i),
	...o,
	children: [n && /* @__PURE__ */ d("i", {
		className: `ax-icon ${Mn[e]} ax-status-chip-icon`,
		"aria-hidden": "true"
	}), /* @__PURE__ */ d("span", { children: a ?? Nn[e] })]
}));
Pn.displayName = "StatusChip";
//#endregion
//#region src/components/ui/table.tsx
function Fn({ data: e, columns: n, pageSize: r = 10, pageSizeOptions: i, className: a, selectable: o = !0, onSelectionChange: s, stickyHeader: c, stickyOffset: l = 0 }) {
	let [u, p] = t.useState([]), [m, h] = t.useState(""), [g, _] = t.useState([]), [v, y] = t.useState({}), [b, x] = t.useState(!1), S = t.useRef(null);
	t.useEffect(() => {
		let e = S.current;
		if (!e) return;
		let t = () => x(e.scrollTop > 0);
		return e.addEventListener("scroll", t, { passive: !0 }), () => e.removeEventListener("scroll", t);
	}, []);
	let C = fe({
		data: e,
		columns: o ? [{
			id: "__select__",
			enableSorting: !1,
			header: ({ table: e }) => /* @__PURE__ */ d(X, {
				checked: e.getIsAllPageRowsSelected() ? !0 : e.getIsSomePageRowsSelected() ? "indeterminate" : !1,
				onCheckedChange: (t) => e.toggleAllPageRowsSelected(!!t)
			}),
			cell: ({ row: e }) => /* @__PURE__ */ d(X, {
				checked: e.getIsSelected(),
				onCheckedChange: (t) => e.toggleSelected(!!t),
				onClick: (e) => e.stopPropagation()
			})
		}, ...n] : n,
		state: {
			sorting: u,
			globalFilter: m,
			columnFilters: g,
			rowSelection: v
		},
		onSortingChange: p,
		onGlobalFilterChange: h,
		onColumnFiltersChange: _,
		onRowSelectionChange: (t) => {
			y((n) => {
				let r = typeof t == "function" ? t(n) : t;
				return s?.(Object.keys(r).map((t) => e[parseInt(t)]).filter(Boolean)), r;
			});
		},
		enableRowSelection: o,
		getCoreRowModel: ce(),
		getSortedRowModel: de(),
		getFilteredRowModel: le(),
		getPaginationRowModel: ue(),
		initialState: { pagination: { pageSize: r } }
	}), w = Object.keys(v).length;
	return /* @__PURE__ */ f("div", {
		ref: S,
		className: P("ax-table-wrap", a),
		children: [
			w > 0 && /* @__PURE__ */ f("div", {
				className: "ax-table-bulk-bar",
				children: [/* @__PURE__ */ f("span", {
					className: "ax-table-bulk-label",
					children: [
						w,
						" row",
						w === 1 ? "" : "s",
						" selected"
					]
				}), /* @__PURE__ */ d("button", {
					className: "ax-table-bulk-clear",
					onClick: () => {
						y({}), s?.([]);
					},
					children: "Clear selection"
				})]
			}),
			/* @__PURE__ */ f("table", {
				className: P("ax-table", c && "ax-table--sticky-header"),
				style: c && l ? { "--ax-table-sticky-offset": `${l}px` } : void 0,
				children: [/* @__PURE__ */ d("thead", {
					className: P("ax-table-head", b && "ax-table-head--scrolled"),
					children: C.getHeaderGroups().map((e) => /* @__PURE__ */ d("tr", {
						className: "ax-table-row",
						children: e.headers.map((e) => /* @__PURE__ */ d("th", {
							className: P("ax-table-th", e.id === "__select__" && "ax-table-th--checkbox", e.column.getCanSort() && "ax-table-th--sortable", e.column.getIsSorted() && "ax-table-th--sorted"),
							onClick: e.column.getToggleSortingHandler(),
							children: e.isPlaceholder ? null : /* @__PURE__ */ f("span", {
								className: "ax-table-th-inner",
								children: [se(e.column.columnDef.header, e.getContext()), e.column.getCanSort() && /* @__PURE__ */ d("span", {
									className: P("ax-table-sort-icon", e.column.getIsSorted() === "asc" && "ax-table-sort-icon--asc"),
									children: /* @__PURE__ */ d("i", { className: "icon-arrow-down-short" })
								})]
							})
						}, e.id))
					}, e.id))
				}), /* @__PURE__ */ f("tbody", {
					className: "ax-table-body",
					children: [C.getRowModel().rows.map((e) => /* @__PURE__ */ d("tr", {
						className: P("ax-table-row ax-table-row--body", e.getIsSelected() && "ax-table-row--selected"),
						onClick: () => e.toggleSelected(),
						children: e.getVisibleCells().map((e) => /* @__PURE__ */ d("td", {
							className: P("ax-table-td", e.column.id === "__select__" && "ax-table-td--checkbox"),
							children: se(e.column.columnDef.cell, e.getContext())
						}, e.id))
					}, e.id)), C.getRowModel().rows.length === 0 && /* @__PURE__ */ d("tr", {
						className: "ax-table-row",
						children: /* @__PURE__ */ d("td", {
							className: "ax-table-td ax-table-empty",
							colSpan: n.length + 1,
							children: "No results"
						})
					})]
				})]
			}),
			i ? /* @__PURE__ */ d(_n, {
				page: C.getState().pagination.pageIndex + 1,
				pageCount: C.getPageCount(),
				onPageChange: (e) => C.setPageIndex(e - 1),
				pageSize: C.getState().pagination.pageSize,
				onPageSizeChange: (e) => {
					C.setPageSize(e), C.setPageIndex(0);
				},
				pageSizeOptions: i,
				totalCount: C.getFilteredRowModel().rows.length
			}) : C.getPageCount() > 1 ? /* @__PURE__ */ f("div", {
				className: "ax-table-pagination",
				children: [/* @__PURE__ */ f("span", {
					className: "ax-table-pagination-info",
					children: [
						C.getState().pagination.pageIndex * r + 1,
						"–",
						Math.min((C.getState().pagination.pageIndex + 1) * r, C.getFilteredRowModel().rows.length),
						" of ",
						C.getFilteredRowModel().rows.length
					]
				}), /* @__PURE__ */ d(hn, {
					page: C.getState().pagination.pageIndex + 1,
					pageCount: C.getPageCount(),
					onPageChange: (e) => C.setPageIndex(e - 1)
				})]
			}) : null
		]
	});
}
//#endregion
//#region src/components/ui/tabs.tsx
var In = N.Root, Ln = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(N.List, {
	ref: n,
	className: P("ax-tabs-list", e),
	...t
}));
Ln.displayName = N.List.displayName;
var Rn = t.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ f(N.Trigger, {
	ref: r,
	className: P("ax-tabs-trigger", e),
	...n,
	children: [/* @__PURE__ */ d("span", {
		className: "ax-tabs-trigger-inner",
		children: t
	}), /* @__PURE__ */ d("span", { className: "ax-tabs-trigger-indicator" })]
}));
Rn.displayName = N.Trigger.displayName;
var zn = t.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(N.Content, {
	ref: n,
	className: P("ax-tabs-content", e),
	...t
}));
zn.displayName = N.Content.displayName;
//#endregion
//#region src/components/ui/thumbnail-upload.tsx
function Bn({ src: e, label: t = "Add an image to this Activity", iconOnly: n = !1, onUpload: r, onRemove: i, className: a }) {
	return e ? /* @__PURE__ */ f("div", {
		className: P("ax-thumbnail-upload ax-thumbnail-upload--filled", a),
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
		className: P("ax-thumbnail-upload ax-thumbnail-upload--empty", n && "ax-thumbnail-upload--icon-only", a),
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
var Vn = {
	success: "circle-tick",
	warning: "warning-outline",
	error: "incorrect-unsatisfactory"
};
function Hn({ type: e = "success", message: t, action: n = !1, actionLabel: r = "Undo", onAction: i, onDismiss: a, className: o }) {
	return /* @__PURE__ */ f("div", {
		role: "alert",
		className: P("ax-toast", `ax-toast--${e}`, o),
		children: [
			/* @__PURE__ */ d("div", {
				className: "ax-toast-icon-wrap",
				children: /* @__PURE__ */ d("i", {
					className: `ax-icon icon-${Vn[e]} ax-toast-icon`,
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ d("p", {
				className: "ax-toast-message",
				children: t
			}),
			n && /* @__PURE__ */ d(U, {
				variant: "link",
				onClick: i,
				className: "ax-toast-action",
				children: r
			}),
			/* @__PURE__ */ d(W, {
				icon: "icon-cancel",
				size: 20,
				buttonStyle: !1,
				onClick: a,
				"aria-label": "Dismiss notification"
			})
		]
	});
}
Hn.displayName = "Toast";
var Un = n(null), Wn = 5e3, Gn = 350;
function Kn({ children: e }) {
	let [t, n] = l([]), [r, a] = l(/* @__PURE__ */ new Set()), s = c(/* @__PURE__ */ new Map()), u = i((e) => {
		let t = s.current.get(e);
		t && (clearTimeout(t), s.current.delete(e)), a((t) => new Set(t).add(e));
		let r = setTimeout(() => {
			n((t) => t.filter((t) => t.id !== e)), a((t) => {
				let n = new Set(t);
				return n.delete(e), n;
			});
		}, Gn);
		s.current.set(`exit-${e}`, r);
	}, []), p = i((e) => {
		let t = crypto.randomUUID();
		n((n) => [...n, {
			...e,
			id: t
		}]);
		let r = setTimeout(() => u(t), Wn);
		return s.current.set(t, r), t;
	}, [u]);
	return o(() => {
		let e = s.current;
		return () => e.forEach(clearTimeout);
	}, []), /* @__PURE__ */ f(Un.Provider, {
		value: {
			toast: p,
			dismiss: u
		},
		children: [e, /* @__PURE__ */ d("div", {
			className: "ax-toast-stack",
			"aria-live": "polite",
			"aria-atomic": "false",
			children: t.map((e) => /* @__PURE__ */ d(Hn, {
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
Kn.displayName = "ToastProvider";
function qn() {
	let e = a(Un);
	if (!e) throw Error("useToast must be used within a ToastProvider");
	return e;
}
//#endregion
export { zt as ActivityCardHorizontal, Bt as ActivityCardPortrait, ye as AnnotationLayer, me as AnnotationProvider, Be as Autocomplete, L as Avatar, Ve as Badge, Ue as Box, je as Breadcrumb, U as Button, K as Calendar, it as Card, st as CardDescription, ct as CardFooter, at as CardHeader, lt as CardThumbnailHeader, ot as CardTitle, Ct as ChangeEditor, X as Checkbox, wt as Chip, Tt as Combobox, Xe as CommandBar, rt as CommandBarAiInfo, nt as CommandBarAiInfoBlock, et as CommandBarItem, tt as CommandBarNoResults, Qe as CommandBarSection, Ft as DatePicker, Ht as DetailOption, Kt as DisplayField, Ut as Field, Gt as FieldDescription, Wt as FieldLabel, cn as FilterBar, $ as FilterBarDivider, sn as FilterButton, rn as FilterChip, un as Heading, dn as Icon, W as IconButton, ze as InfoBlock, jt as InfoPopover, Q as Input, q as KeyboardHint, fn as Label, pn as Modal, Sn as NavItem, Tn as Option, En as OptionStack, hn as Pagination, qe as PlatformHint, Et as Popover, kt as PopoverCard, Ot as PopoverContent, Dt as PopoverTrigger, On as ProgressBar, Cn as RadioGroup, wn as RadioGroupItem, Dn as RadioOption, R as Select, B as SelectContent, xe as SelectGroup, V as SelectItem, Te as SelectLabel, we as SelectScrollDownButton, Ce as SelectScrollUpButton, Ee as SelectSeparator, z as SelectTrigger, Se as SelectValue, kn as Separator, An as SingleSelect, an as SortChip, H as Spinner, jn as Stat, Pn as StatusChip, Vt as Switch, Fn as Table, _n as TableFooter, bn as TableHeader, In as Tabs, zn as TabsContent, Ln as TabsList, Rn as TabsTrigger, vn as ThumbnailItem, Bn as ThumbnailUpload, Hn as Toast, Kn as ToastProvider, on as ToggleChip, Ie as Tooltip, Fe as TooltipContent, Me as TooltipProvider, Ne as TooltipRoot, Pe as TooltipTrigger, yn as TopBar, xn as VerticalNavMenu, P as cn, he as useAnnotationContext, Ke as usePlatform, qn as useToast };
