"use client";

import { motion } from 'framer-motion';

interface DataDisplayProps {
    mockData: {
        name: string;
        date: string;
        time: string;
        scanId: string;
        status: string;
    } | null;
}

const DataDisplay = ({ mockData }: DataDisplayProps) => {
    if (!mockData) return null;

    return (
        <motion.div 
            className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-lg font-semibold text-white">Lock-in Data</h3>
            </div>
            
            <div className="bg-gradient-to-br from-black/50 to-gray-900/50 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Name:</span>
                            <span className="text-white font-medium text-sm">{mockData.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Date:</span>
                            <span className="text-white font-medium text-sm">{mockData.date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Time:</span>
                            <span className="text-white font-medium text-sm">{mockData.time}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Scan ID:</span>
                            <span className="text-green-400 font-mono text-xs">{mockData.scanId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Status:</span>
                            <span className="text-green-400 font-medium text-sm">{mockData.status}</span>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-white/10 pt-3">
                    <p className="text-xs text-gray-400 mb-2">Raw JSON Data:</p>
                    <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                        <pre className="text-xs text-green-400 overflow-x-auto">
                            {JSON.stringify(mockData, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DataDisplay; 