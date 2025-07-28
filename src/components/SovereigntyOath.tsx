"use client";

import { motion } from 'framer-motion';
import { sovereigntyOath } from '../data';

const SovereigntyOath = () => {
    return (
        <motion.div
            className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl"
            initial={ { opacity: 0, x: 20 } }
            animate={ { opacity: 1, x: 0 } }
            transition={ { duration: 0.5, delay: 0.4 } }
        >
            <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-white">Sovereignty Oath</h2>
            </div>

            <div className="bg-gradient-to-br from-black/50 to-gray-900/50 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                <motion.div
                    className="text-center mb-4"
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    transition={ { delay: 0.6 } }
                >
                    <p className="text-lg font-medium text-yellow-300 mb-3">
                        &ldquo;{ sovereigntyOath.title }&rdquo;
                    </p>
                </motion.div>

                <motion.div
                    className="space-y-3"
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    transition={ { delay: 0.8 } }
                >
                    <p className="text-gray-300 leading-relaxed text-base">
                        { sovereigntyOath.content }
                    </p>

                    <div className="flex justify-center mt-4">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SovereigntyOath; 