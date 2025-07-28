"use client";

import { motion } from 'framer-motion';

interface LockInButtonProps {
    isScanning: boolean;
    onLockIn: () => void;
}

const LockInButton = ( { isScanning, onLockIn }: LockInButtonProps ) => {
    return (
        <motion.div
            className="text-center mb-8"
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5, delay: 0.6 } }
        >
            <motion.button
                onClick={ onLockIn }
                disabled={ isScanning }
                className={ `
                    relative px-12 py-4 text-2xl font-bold rounded-2xl transition-all duration-300
                    ${ isScanning
                        ? 'bg-gray-600 cursor-not-allowed text-white shadow-lg'
                        : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl hover:shadow-red-500/25'
                    }
                    border-2 border-white/20 backdrop-blur-sm
                `}
                whileHover={ !isScanning ? {
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.25)"
                } : {} }
                whileTap={ !isScanning ? { scale: 0.95 } : {} }
            >
                <span className="relative z-10">
                    { isScanning ? "SCANNING..." : "LOCK IN" }
                </span>

                { !isScanning && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-2xl"
                        animate={ {
                            opacity: [ 0, 1, 0 ],
                        } }
                        transition={ {
                            duration: 2,
                            repeat: Infinity,
                        } }
                    />
                ) }
            </motion.button>

            { !isScanning && (
                <motion.p
                    className="text-gray-400 mt-3 text-sm"
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    transition={ { delay: 1 } }
                >
                    Click to initiate biometric scan
                </motion.p>
            ) }
        </motion.div>
    );
};

export default LockInButton; 