import { useEffect, useRef } from "react";
import gsap from "gsap";
import { formatNumber } from "../lib/format";

/**
 * GSAP-powered count-up. Animates from previous value to current.
 * Renders Indian-locale grouped digits (1,23,456 style).
 */
export default function CountUp({ value, prefix = "₹", suffix = "", duration = 1.2, decimals = 0, className = "" }) {
  const ref = useRef(null);
  const current = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const target = { v: current.current };
    const dest = Number(value) || 0;
    gsap.to(target, {
      v: dest,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        const display = decimals > 0
          ? target.v.toFixed(decimals)
          : formatNumber(target.v);
        node.textContent = `${prefix}${display}${suffix}`;
      },
      onComplete: () => {
        current.current = dest;
      },
    });
    return () => gsap.killTweensOf(target);
  }, [value, prefix, suffix, duration, decimals]);

  return <span ref={ref} className={`tabular ${className}`}>{prefix}0{suffix}</span>;
}
