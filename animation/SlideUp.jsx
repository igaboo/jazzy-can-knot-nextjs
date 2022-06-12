import { motion } from "framer-motion";

export default function SlideUp({ children, delay }) {
  const animation = {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1 },
  };

  const viewport = { once: true };

  return (
    <>{children}</>

    // <motion.div
    //   style={{ width: "100%" }}
    //   initial={animation.from}
    //   whileInView={animation.to}
    //   viewport={viewport}
    //   transition={{
    //     type: "spring",
    //     duration: 1,
    //     bounce: 0.3,
    //     delay: delay && delay,
    //   }}
    // >
    //   {children}
    // </motion.div>
  );
}
