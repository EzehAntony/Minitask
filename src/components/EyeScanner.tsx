"use client";

import { motion } from 'framer-motion';
import { scannerConfig } from '../data';

interface EyeScannerProps {
    isScanning: boolean;
}

const EyeScanner = ( { isScanning }: EyeScannerProps ) => {
    return (
        <motion.div
            className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl"
            initial={ { opacity: 0, x: -20 } }
            animate={ { opacity: 1, x: 0 } }
            transition={ { duration: 0.5, delay: 0.2 } }
        >
            <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <h2 className="text-xl font-semibold text-white">Eye Scanner</h2>
            </div>

            <div className="relative bg-gradient-to-br from-black/50 to-gray-900/50 rounded-xl p-6 border border-white/10">
                <div className="border-2 border-white/30 rounded-xl p-4 backdrop-blur-sm">
                    <div className="relative h-32 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden">
                        { isScanning && (
                            <motion.div
                                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400"
                                animate={ {
                                    y: [ 0, 120, 0 ],
                                } }
                                transition={ {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                } }
                            />
                        ) }

                        <div className="flex justify-center items-center h-full">
                            <motion.div
                                className="text-6xl"
                                animate={ isScanning ? {
                                    scale: [ 1, 1.1, 1 ],
                                    filter: [ "brightness(1)", "brightness(1.3)", "brightness(1)" ]
                                } : {} }
                                transition={ { duration: 1, repeat: Infinity } }
                            >
                                { scannerConfig.eyeIcon }
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <motion.p
                        className="text-sm text-gray-300 font-medium"
                        animate={ isScanning ? { opacity: [ 0.5, 1, 0.5 ] } : {} }
                        transition={ { duration: 1.5, repeat: Infinity } }
                    >
                        { isScanning ? "Scanning in progress..." : "Ready for scan" }
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default EyeScanner; 