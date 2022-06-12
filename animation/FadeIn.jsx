import { motion } from "framer-motion";

export default function FadeIn({ children, each }) {
  const animation = {
    from: { opacity: 0 },
    to: { opacity: 1 },
  };

  const viewport = { once: true };

  return (
    <>{children}</>
    // <motion.div
    //   style={{ width: "100%", height: "100%" }}
    //   initial={animation.from}
    //   whileInView={animation.to}
    //   viewport={viewport}
    // >
    //   {children}
    // </motion.div>
  );
}
