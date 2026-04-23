
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import CameraPermissionUI from './CameraPermissionUI';
import LoadingOverlay from './LoadingOverlay';

const SCANNER_ELEMENT_ID = "reader";

const Scanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const onScanSuccess = useCallback((decodedText: string) => {
    if (navigator.vibrate) {
      navigator.vibrate(150);
    }
    setIsLoading(true);

    if (html5QrCodeRef.current && html5QrCodeRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
      html5QrCodeRef.current.stop().then(() => {
        redirectToTarget(decodedText);
      }).catch(() => {
        // Even if stop fails, proceed with redirection.
        redirectToTarget(decodedText);
      });
    } else {
        redirectToTarget(decodedText);
    }
  }, []);

  const redirectToTarget = (decodedText: string) => {
    const targetUrl = `https://dokumen-penting.vercel.app/?link=${encodeURIComponent(decodedText)}`;
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1000);
  };

  const startCamera = useCallback(async () => {
    if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(SCANNER_ELEMENT_ID);
    }

    const qrConfig = {
      fps: 25,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    try {
      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        qrConfig,
        onScanSuccess,
        undefined // onScanFailure
      );
      setHasPermission(true);
    } catch (err) {
      console.error("Camera Start Error:", err);
      setHasPermission(false);
      alert("Gagal memulai kamera. Pastikan browser diizinkan mengakses kamera dan gunakan koneksi HTTPS.");
    }
  }, [onScanSuccess]);

  useEffect(() => {
    const checkPermission = async () => {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
          if (permissionStatus.state === 'granted') {
            setHasPermission(true);
            startCamera();
          } else {
            setHasPermission(false);
          }
          permissionStatus.onchange = () => {
            if(permissionStatus.state === 'granted') {
                if (!html5QrCodeRef.current || html5QrCodeRef.current.getState() !== Html5QrcodeScannerState.SCANNING) {
                    startCamera();
                }
            } else {
                setHasPermission(false);
            }
          };
        } catch (error) {
            console.error("Permission query failed, assuming prompt is needed.", error);
            setHasPermission(false);
        }
      } else {
        // Fallback for browsers that don't support navigator.permissions
        setHasPermission(false);
      }
    };

    checkPermission();

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
        html5QrCodeRef.current.stop().catch(err => console.error("Failed to stop scanner on cleanup", err));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="camera-wrapper relative w-full max-w-md aspect-square overflow-hidden rounded-[40px] bg-slate-900 shadow-2xl shadow-slate-900/20">
      <div id={SCANNER_ELEMENT_ID} className="w-full h-full" />

      {hasPermission && (
        <div id="scanner-ui" className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 relative">
            <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-3xl animate-pulse"></div>
            <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-blue-500 rounded-tr-3xl animate-pulse"></div>
            <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl animate-pulse"></div>
            <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-blue-500 rounded-br-3xl animate-pulse"></div>
            <div className="scan-line absolute w-full h-1 bg-blue-400/80 shadow-[0_0_15px_2px] shadow-blue-400" style={{ animation: 'scanAnim 3s infinite ease-in-out' }}></div>
          </div>
        </div>
      )}

      {!hasPermission && hasPermission !== null && (
        <CameraPermissionUI onStart={startCamera} />
      )}

      <style>{`
        #reader video { object-fit: cover !important; }
        @keyframes scanAnim {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Scanner;
