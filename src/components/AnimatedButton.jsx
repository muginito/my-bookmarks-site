import { motion } from "framer-motion"

export default function AnimatedButton({ children, ...props }) {
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} {...props}>
      {children}
    </motion.button>
  )
}
