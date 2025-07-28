"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EyeScanner from '../../components/EyeScanner';
import SovereigntyOath from '../../components/SovereigntyOath';
import LockInButton from '../../components/LockInButton';
import DataDisplay from '../../components/DataDisplay';
import { mockData as generateMockData, scannerConfig } from '../../data';

const Page = (): React.ReactElement => {
    const [ isScanning, setIsScanning ] = useState( false );
    const [ mockData, setMockData ] = useState<{
        name: string;
        date: string;
        time: string;
        scanId: string;
        status: string;
    } | null>( null );

    const handleLockIn = () => {
        setIsScanning( true );

        setTimeout( () => {
            setIsScanning( false );
            setMockData( generateMockData );
        }, scannerConfig.scanDuration );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
            <div className="absolute inset-0 opacity-20" style={ {
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            } }></div>

            <div className="relative z-10 max-w-6xl mx-auto p-4">
                <motion.div
                    className="text-center mb-8"
                    initial={ { opacity: 0, y: -30 } }
                    animate={ { opacity: 1, y: 0 } }
                    transition={ { duration: 0.8 } }
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                        Eye Scanner System
                    </h1>

                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    <EyeScanner isScanning={ isScanning } />
                    <SovereigntyOath />
                </div>

                <LockInButton isScanning={ isScanning } onLockIn={ handleLockIn } />
                <DataDisplay mockData={ mockData } />
            </div>
        </div>
    );
};

export default Page;