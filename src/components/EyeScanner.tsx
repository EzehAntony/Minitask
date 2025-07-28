"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface EyeScannerProps {
    isScanning: boolean;
}

const EyeScanner = ( { isScanning }: EyeScannerProps ) => {
    const videoRef = useRef<HTMLVideoElement>( null );
    const canvasRef = useRef<HTMLCanvasElement>( null );
    const [ cameraActive, setCameraActive ] = useState( false );
    const [ cameraError, setCameraError ] = useState<string | null>( null );
    const [ capturedImage, setCapturedImage ] = useState<string | null>( null );

    useEffect( () => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia( {
                    video: {
                        facingMode: 'user',
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    }
                } );

                if ( videoRef.current ) {
                    videoRef.current.srcObject = stream;
                    setCameraActive( true );
                    setCameraError( null );
                }
            } catch ( error ) {
                console.error( 'Error accessing camera:', error );
                setCameraError( 'Camera access denied or not available' );
                setCameraActive( false );
            }
        };

        // Start camera immediately when component mounts
        startCamera();

        // Cleanup function
        return () => {
            if ( videoRef.current && videoRef.current.srcObject ) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach( track => track.stop() );
            }
        };
    }, [] );

    // Capture photo when scanning starts
    useEffect(() => {
        if (isScanning && cameraActive && videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
                // Set canvas size to match video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                // Draw the current video frame to canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // Convert to data URL
                const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                setCapturedImage(imageDataUrl);
            }
        }
    }, [isScanning, cameraActive]);

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
                        { isScanning && cameraActive && (
                            <motion.div
                                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400 z-10"
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
                            { cameraActive ? (
                                <>
                                    <video
                                        ref={ videoRef }
                                        autoPlay
                                        playsInline
                                        muted
                                        className={`w-full h-full object-cover rounded-lg ${isScanning ? 'hidden' : 'block'}`}
                                        style={ { transform: 'scaleX(-1)' } }
                                    />
                                    {isScanning && capturedImage && (
                                        <motion.div
                                            className="w-full h-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img 
                                                src={capturedImage} 
                                                alt="Captured scan"
                                                className="w-full h-full object-cover rounded-lg"
                                                style={{ transform: 'scaleX(-1)' }}
                                            />
                                        </motion.div>
                                    )}
                                </>
                            ) : cameraError ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="text-4xl mb-2">📷</div>
                                    <p className="text-sm text-red-400 font-medium">{ cameraError }</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="text-4xl mb-2">📷</div>
                                    <p className="text-sm text-gray-400 font-medium">Initializing camera...</p>
                                </div>
                            ) }
                        </div>
                        
                        {/* Hidden canvas for capturing */}
                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                </div>

                <div className="text-center mt-4">
                    <motion.p
                        className="text-sm text-gray-300 font-medium"
                        animate={ isScanning ? { opacity: [ 0.5, 1, 0.5 ] } : {} }
                        transition={ { duration: 1.5, repeat: Infinity } }
                    >
                        { isScanning ? "Processing captured image..." : "Ready for scan" }
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default EyeScanner; 