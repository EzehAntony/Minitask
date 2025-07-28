"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface EyeScannerProps {
    isScanning: boolean;
}

const EyeScanner = ( { isScanning }: EyeScannerProps ) => {
    const webcamRef = useRef<Webcam>( null );
    const [ capturedImage, setCapturedImage ] = useState<string | null>( null );
    const [ cameraReady, setCameraReady ] = useState( false );

    const capturePhoto = () => {
        if ( webcamRef.current ) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage( imageSrc );
        }
    };

    // Capture photo when scanning starts
    useEffect( () => {
        if ( isScanning ) {
            console.log( 'Capturing photo...' );
            capturePhoto();
        } else {
            setCapturedImage( null );
        }
    }, [ isScanning ] );

    return (
        <motion.div
            className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl"
            initial={ { opacity: 0, x: -20 } }
            animate={ { opacity: 1, x: 0 } }
            transition={ { duration: 0.5, delay: 0.2 } }
        >
            <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <h2 className="text-xl font-semibold text-white">Biometric Eye Scanner</h2>
            </div>

            <div className="relative bg-gradient-to-br from-black/50 to-gray-900/50 rounded-xl p-6 border border-white/10">
                <div className="border-2 border-white/30 rounded-xl p-4 backdrop-blur-sm">
                    <div className="relative h-48 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden">
                        {/* Scanning overlay */ }
                        { isScanning && (
                            <>
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400 z-20"
                                    animate={ {
                                        y: [ 0, 180, 0 ],
                                    } }
                                    transition={ {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    } }
                                />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-b from-green-400/20 to-transparent z-10"
                                    animate={ { opacity: [ 0.3, 0.6, 0.3 ] } }
                                    transition={ { duration: 1.5, repeat: Infinity } }
                                />
                            </>
                        ) }

                        {/* Camera feed container */ }
                        <div className="flex justify-center items-center h-full relative">
                            { !isScanning ? (
                                <div className="relative w-full h-full">
                                    <Webcam
                                        ref={ webcamRef }
                                        screenshotFormat="image/jpeg"
                                        screenshotQuality={ 0.9 }
                                        className="w-full h-full object-cover rounded-lg"
                                        style={ { transform: 'scaleX(-1)' } }
                                        videoConstraints={ {
                                            facingMode: 'user',
                                            width: { ideal: 1280 },
                                            height: { ideal: 720 }
                                        } }
                                        onUserMedia={ () => setCameraReady( true ) }
                                        onUserMediaError={ () => setCameraReady( false ) }
                                    />

                                    {/* Eye tracking overlay */ }
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <motion.div
                                            className="w-24 h-16 border-2 border-green-400 rounded-full opacity-60"
                                            animate={ {
                                                scale: [ 1, 1.1, 1 ],
                                                opacity: [ 0.6, 0.8, 0.6 ]
                                            } }
                                            transition={ { duration: 2, repeat: Infinity } }
                                        />
                                    </div>

                                    {/* Status indicator */ }
                                    <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-1">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-xs text-green-400 font-medium">LIVE</span>
                                        </div>
                                    </div>
                                </div>
                            ) : capturedImage ? (
                                <motion.div
                                    className="w-full h-full"
                                    initial={ { opacity: 0 } }
                                    animate={ { opacity: 1 } }
                                    transition={ { duration: 0.3 } }
                                >
                                    <img
                                        src={ capturedImage }
                                        alt="Captured scan"
                                        className="w-full h-full object-cover rounded-lg"
                                        style={ { transform: 'scaleX(-1)' } }
                                    />

                                    {/* Processing overlay */ }
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <div className="text-center">
                                            <motion.div
                                                className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto mb-2"
                                                animate={ { rotate: 360 } }
                                                transition={ { duration: 1, repeat: Infinity, ease: "linear" } }
                                            />
                                            <p className="text-sm text-green-400 font-medium">Processing...</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <motion.div
                                        className="w-12 h-12 border-2 border-green-400 border-t-transparent rounded-full mb-4"
                                        animate={ { rotate: 360 } }
                                        transition={ { duration: 1, repeat: Infinity, ease: "linear" } }
                                    />
                                    <p className="text-sm text-green-400 font-medium">Capturing biometric data...</p>
                                </div>
                            ) }
                        </div>

                        {/* Scanner frame */ }
                        <div className="absolute inset-0 border-2 border-green-400/30 rounded-lg pointer-events-none">
                            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-green-400"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-green-400"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-green-400"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-green-400"></div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <motion.p
                        className="text-sm text-gray-300 font-medium"
                        animate={ isScanning ? { opacity: [ 0.5, 1, 0.5 ] } : {} }
                        transition={ { duration: 1.5, repeat: Infinity } }
                    >
                        { isScanning ? "Processing biometric data..." : "Ready for biometric scan" }
                    </motion.p>

                    { cameraReady && !isScanning && (
                        <p className="text-xs text-green-400 mt-1">Camera Active</p>
                    ) }
                </div>
            </div>
        </motion.div>
    );
};

export default EyeScanner; 