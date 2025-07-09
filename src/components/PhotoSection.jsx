import { motion } from 'framer-motion'

export default function PhotoSection({ image, chapter, title, description }) {
  return (
    <section
      className="flex flex-col items-center justify-center relative overflow-hidden snap-start h-[100dvh] max-h-[100dvh] bg-[#121212]"
    >
      <div className="overflow-hidden container h-full flex flex-col px-4 py-4">
        <motion.div
          className="w-full h-[60%] overflow-hidden rounded-xl shadow-2xl flex items-center justify-center mt-5"
          style={{ boxShadow: 'rgba(99, 102, 241, 0.4) 0px 25px 50px -12px' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="h-full aspect-[3/4] bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </motion.div>

        <motion.div
          className="h-[35%] mt-4 flex flex-col w-full text-white bg-black/70 p-5 rounded-xl backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center">
            <span className="block text-[0.60rem] mt-0 opacity-80 md:text-xs">
              {chapter}
            </span>
            <h2 className="font-bold mb-2 text-[1.1rem] md:text-[1.4rem] tracking-tight text-center mt-2 w-[95%] text-indigo-400">
              {title}
            </h2>
          </div>

          <div className="flex-1 overflow-hidden align-top">
            <p className="text-[0.85rem] md:text-sm leading-snug text-center">
              {description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}