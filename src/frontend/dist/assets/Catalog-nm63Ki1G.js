import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Presence, b as Primitive, u as useControllableState, d as useComposedRefs, e as composeEventHandlers, f as useSize, g as createContextScope, h as cn, X, B as Button, a as Badge, i as Separator, S as Skeleton, k as useCartStore, L as Link, l as ShoppingBag, m as ue } from "./index-Aguxj3OV.js";
import { u as usePrevious, C as Check, S as Search } from "./index-E-Oqtwjz.js";
import { I as Input } from "./input-Dq7phxHs.js";
import { L as Label } from "./label-Cu9VJbl5.js";
import { a as useProducts } from "./useProducts-BnvLj-6w.js";
import { A as AnimatePresence } from "./index-CU9C387m.js";
import { m as motion } from "./proxy-khMqMKID.js";
import { S as Star } from "./star-B3Zy9F4d.js";
import "./backend-Ck3CrUfx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const CATEGORIES = [
  { value: "floral", label: "Floral" },
  { value: "woody", label: "Woody" },
  { value: "citrus", label: "Citrus" },
  { value: "oriental", label: "Oriental" },
  { value: "fresh", label: "Fresh" },
  { value: "aquatic", label: "Aquatic" }
];
const PRICE_MARKS = [100, 150, 200, 250, 300];
const MAX_PRICE_DEFAULT = 300;
function ProductCard({ product, index }) {
  var _a;
  const addItem = useCartStore((s) => s.addItem);
  function handleAddToCart(e) {
    e.preventDefault();
    addItem(product);
    ue.success(`${product.name} added to cart`, {
      description: `${product.volume} · $${product.salePrice ?? product.price}`,
      duration: 4e3
    });
  }
  const displayCategory = ((_a = CATEGORIES.find((c) => c.value === product.category)) == null ? void 0 : _a.label) ?? product.category;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.35, delay: index * 0.06 },
      className: "bg-card border border-border/60 rounded-xl overflow-hidden flex flex-col group hover:border-accent/40 hover:shadow-[0_8px_32px_oklch(0_0_0/0.35)] transition-smooth",
      "data-ocid": `catalog.product.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/product/$id",
            params: { id: product.id },
            "data-ocid": `catalog.product.link.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/5] bg-muted/40 relative overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                  onError: (e) => {
                    e.target.src = "/assets/images/placeholder.svg";
                  }
                }
              ),
              !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs font-body tracking-wider uppercase",
                  children: "Sold Out"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex gap-2", children: [
                product.featured && product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/90 text-primary-foreground text-xs border-0 font-body tracking-wider", children: "Featured" }),
                product.salePrice && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/90 text-accent-foreground text-xs border-0 font-body", children: "Sale" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "absolute bottom-3 right-3 text-xs border-border/70 bg-background/80 backdrop-blur-sm text-muted-foreground capitalize",
                  children: displayCategory
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base text-foreground hover:text-accent transition-smooth truncate", children: product.name }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: product.volume })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-accent text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: product.rating }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/50", children: [
                "(",
                product.reviewCount,
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 flex-wrap mt-1", children: product.notes.slice(0, 3).map((note) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] px-1.5 py-0 text-muted-foreground border-border/50 font-body",
              children: note
            },
            note
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-3 border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline gap-2", children: product.salePrice ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl text-accent", children: [
                "$",
                product.salePrice
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground line-through", children: [
                "$",
                product.price
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl text-foreground", children: [
              "$",
              product.price
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-8 w-8 p-0 hover:text-accent hover:bg-accent/10 transition-smooth rounded-full",
                onClick: handleAddToCart,
                disabled: !product.inStock,
                "aria-label": `Add ${product.name} to cart`,
                "data-ocid": `catalog.add_to_cart.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ProductGridSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border border-border/40 overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] w-full rounded-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2 border-t border-border/30 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-7 rounded-full" })
          ] })
        ] })
      ]
    },
    k
  )) });
}
function FilterPanel({
  selectedCategories,
  maxPrice,
  onCategoryChange,
  onMaxPriceChange,
  onClear,
  activeCount
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-card border border-border/60 rounded-xl p-5 flex flex-col gap-5 sticky top-24 self-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm text-foreground", children: "Filters" }),
        activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-xs h-5 px-1.5 border-0", children: activeCount })
      ] }),
      activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onClear,
          className: "text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1",
          "data-ocid": "catalog.filter.clear_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
            "Clear"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3", children: "Fragrance Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2.5", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: `cat-${cat.value}`,
            checked: selectedCategories.includes(cat.value),
            onCheckedChange: (checked) => onCategoryChange(cat.value, checked),
            className: "border-border/70 data-[state=checked]:bg-primary data-[state=checked]:border-primary",
            "data-ocid": `catalog.filter.${cat.value}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: `cat-${cat.value}`,
            className: "text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors capitalize font-body",
            children: cat.label
          }
        )
      ] }, cat.value)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.15em] uppercase text-muted-foreground font-body", children: "Max Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-sm text-accent", children: [
          "$",
          maxPrice
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 50,
          max: MAX_PRICE_DEFAULT,
          step: 10,
          value: maxPrice,
          onChange: (e) => onMaxPriceChange(Number(e.target.value)),
          className: "w-full h-1 rounded-full appearance-none cursor-pointer bg-border/60 accent-primary",
          "data-ocid": "catalog.filter.price_range"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mt-2", children: PRICE_MARKS.map((mark) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground/50", children: [
        "$",
        mark
      ] }, mark)) })
    ] })
  ] });
}
function pushUrlParams(patch) {
  const params = new URLSearchParams(window.location.search);
  const keys = ["q", "type", "maxPrice"];
  for (const k of keys) {
    const val = patch[k];
    if (val) params.set(k, val);
    else params.delete(k);
  }
  const search = params.toString();
  window.history.replaceState(
    {},
    "",
    search ? `?${search}` : window.location.pathname
  );
}
function CatalogPage() {
  const [urlParams, setUrlParams] = reactExports.useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      q: params.get("q") ?? void 0,
      type: params.get("type") ?? void 0,
      maxPrice: params.get("maxPrice") ?? void 0
    };
  });
  const searchQuery = urlParams.q ?? "";
  const selectedCategories = urlParams.type ? urlParams.type.split(",").filter(Boolean) : [];
  const maxPrice = urlParams.maxPrice ? Number(urlParams.maxPrice) : MAX_PRICE_DEFAULT;
  const [showMobileFilters, setShowMobileFilters] = reactExports.useState(false);
  const { data: products, isLoading } = useProducts();
  const setParams = reactExports.useCallback(
    (patch) => {
      const next = {
        q: searchQuery || void 0,
        type: selectedCategories.length ? selectedCategories.join(",") : void 0,
        maxPrice: maxPrice < MAX_PRICE_DEFAULT ? String(maxPrice) : void 0,
        ...patch
      };
      pushUrlParams(next);
      setUrlParams({ ...next });
    },
    [searchQuery, selectedCategories, maxPrice]
  );
  const handleSearch = (val) => setParams({ q: val || void 0 });
  const handleCategoryChange = (cat, checked) => {
    const next = checked ? [...selectedCategories, cat] : selectedCategories.filter((c) => c !== cat);
    setParams({ type: next.length ? next.join(",") : void 0 });
  };
  const handleMaxPrice = (val) => setParams({ maxPrice: val < MAX_PRICE_DEFAULT ? String(val) : void 0 });
  const handleClearFilters = () => {
    window.history.replaceState({}, "", window.location.pathname);
    setUrlParams({});
  };
  const filtered = reactExports.useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()) || p.notes.some(
        (n) => n.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesPrice = (p.salePrice ?? p.price) <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategories, maxPrice]);
  const activeFilterCount = selectedCategories.length + (maxPrice < MAX_PRICE_DEFAULT ? 1 : 0);
  function ActiveFilterChips() {
    const chips = [
      ...selectedCategories.map((cat) => {
        var _a;
        return {
          label: ((_a = CATEGORIES.find((c) => c.value === cat)) == null ? void 0 : _a.label) ?? cat,
          onRemove: () => handleCategoryChange(cat, false)
        };
      }),
      ...maxPrice < MAX_PRICE_DEFAULT ? [
        {
          label: `≤ $${maxPrice}`,
          onRemove: () => handleMaxPrice(MAX_PRICE_DEFAULT)
        }
      ] : []
    ];
    if (!chips.length) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
      chips.map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "border-accent/50 text-accent bg-accent/10 pr-1 pl-2.5 gap-1 cursor-default",
          children: [
            chip.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: chip.onRemove,
                className: "ml-0.5 rounded-full hover:bg-accent/20 p-0.5",
                "aria-label": `Remove ${chip.label} filter`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
              }
            )
          ]
        },
        chip.label
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleClearFilters,
          className: "text-xs text-muted-foreground hover:text-accent transition-colors",
          "data-ocid": "catalog.filter.clear_all_button",
          children: "Clear all"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "catalog.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border/50 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] text-accent uppercase font-body", children: "Collection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl text-foreground mt-2 mb-1", children: "All Fragrances" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: "Rare compositions crafted for the discerning few." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: searchQuery,
              onChange: (e) => handleSearch(e.target.value),
              placeholder: "Search fragrances, notes, brands…",
              className: "pl-9 bg-card border-border/60 text-foreground placeholder:text-muted-foreground/60 focus:border-accent/60 h-10",
              "data-ocid": "catalog.search_input"
            }
          ),
          searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleSearch(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Clear search",
              "data-ocid": "catalog.search_clear",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-10 gap-2 border-border/60 lg:hidden",
            onClick: () => setShowMobileFilters((v) => !v),
            "data-ocid": "catalog.filter.toggle_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
              "Filters",
              activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-xs h-4 px-1 border-0 ml-0.5", children: activeFilterCount })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveFilterChips, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showMobileFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { height: 0, opacity: 0 },
          animate: { height: "auto", opacity: 1 },
          exit: { height: 0, opacity: 0 },
          transition: { duration: 0.25 },
          className: "overflow-hidden lg:hidden mb-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterPanel,
            {
              selectedCategories,
              maxPrice,
              onCategoryChange: handleCategoryChange,
              onMaxPriceChange: handleMaxPrice,
              onClear: handleClearFilters,
              activeCount: activeFilterCount
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-56 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterPanel,
          {
            selectedCategories,
            maxPrice,
            onCategoryChange: handleCategoryChange,
            onMaxPriceChange: handleMaxPrice,
            onClear: handleClearFilters,
            activeCount: activeFilterCount
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center gap-2 mb-5",
              "data-ocid": "catalog.results_summary",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-display", children: filtered.length }),
                " ",
                filtered.length === 1 ? "fragrance" : "fragrances",
                activeFilterCount > 0 || searchQuery ? " matching your filters" : " in collection"
              ] })
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              className: "flex flex-col items-center justify-center py-24 gap-5 text-center",
              "data-ocid": "catalog.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-7 w-7 text-muted-foreground/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-foreground mb-2", children: "No fragrances found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm max-w-xs", children: "Try adjusting your search or filters to discover more of our collection." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: handleClearFilters,
                    className: "border-border/60 hover:border-accent/50 hover:text-accent transition-smooth",
                    "data-ocid": "catalog.empty_state.clear_button",
                    children: "Clear all filters"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5",
              "data-ocid": "catalog.product.list",
              children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
export {
  CatalogPage as default
};
