import { motion } from "framer-motion"

export default function AnimatedButton({ children, ...props }) {
  return (
    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} {...props}>
      {children}
    </motion.button>
  )
}
