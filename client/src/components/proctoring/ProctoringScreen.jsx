import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  CameraOff,
  AlertCircle,
  AlertTriangle,
  Check,
  X,
  Monitor,
  MoveHorizontal,
} from "lucide-react";

export function ProctoringScreen({ onViolation, testTimeMinutes = 30 }) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [violations, setViolations] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(testTimeMinutes * 60); // in seconds
  const [focusEvents, setFocusEvents] = useState(0);
  const [position, setPosition] = useState("right");

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mountedRef = useRef(true);

  // Handle camera access with error handling
  const requestCameraAccess = useCallback(async () => {
    try {
      // If there's already a stream, clean it up first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 320 },
          height: { ideal: 240 },
          facingMode: "user",
        },
      });

      // Check if component is still mounted before updating state
      if (!mountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return false;
      }

      streamRef.current = stream;
      setCameraStream(stream);
      setCameraActive(true);
      setCameraPermission(true);

      // Connect stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      return true;
    } catch (error) {
      console.error("Error accessing camera:", error);
      if (mountedRef.current) {
        setCameraPermission(false);
      }
      return false;
    }
  }, []);

  // Initialize camera when component mounts
  useEffect(() => {
    mountedRef.current = true;
    let cameraInitTimer;

    const initCamera = async () => {
      // Delay camera initialization to prevent immediate access issues
      cameraInitTimer = window.setTimeout(() => {
        requestCameraAccess().catch((err) => {
          console.error("Camera initialization error:", err);
        });
      }, 1500); // Increased delay to ensure app is stable
    };

    initCamera();

    return () => {
      mountedRef.current = false;
      clearTimeout(cameraInitTimer);

      // Clean up camera resources on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [requestCameraAccess]);

  // Monitor for focus/blur events
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && mountedRef.current) {
        const newViolations = [...violations, "Tab change detected"];
        setViolations(newViolations);
        setFocusEvents((prev) => prev + 1);
        if (onViolation) onViolation("tab_switch");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [violations, onViolation]);

  // Timer countdown
  useEffect(() => {
    if (!mountedRef.current) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time remaining
  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Simulate random violations for demo purposes
  useEffect(() => {
    if (!mountedRef.current) return;

    const simulateViolation = () => {
      const violationTypes = [
        "Multiple faces detected",
        "Face not visible",
        "Looking away from screen",
        "Unknown person detected",
      ];

      // 10% chance of violation every minute
      if (Math.random() < 0.1) {
        const violationType =
          violationTypes[Math.floor(Math.random() * violationTypes.length)];
        const newViolations = [...violations, violationType];
        setViolations(newViolations);
        if (onViolation) onViolation(violationType);
      }
    };

    const interval = setInterval(simulateViolation, 60000);

    return () => clearInterval(interval);
  }, [violations, onViolation]);

  // Toggle position between left and right
  const togglePosition = () => {
    setPosition((prev) => (prev === "right" ? "left" : "right"));
  };

  return (
    <div
      className={`fixed top-24 ${
        position === "right" ? "right-4" : "left-4"
      } z-50`}
    >
      <Card className="w-64 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm flex items-center">
              <Monitor className="h-4 w-4 mr-1" />
              Proctoring Active
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={togglePosition}
                title="Move window"
              >
                <MoveHorizontal className="h-3 w-3" />
              </Button>
              <Badge
                variant={violations.length > 0 ? "destructive" : "outline"}
              >
                {violations.length}{" "}
                {violations.length === 1 ? "Alert" : "Alerts"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 p-3">
          {/* Camera feed */}
          <div className="relative bg-black rounded-md aspect-video overflow-hidden">
            {cameraActive ? (
              <video
                ref={videoRef}
                id="proctor-video"
                autoPlay
                muted
                playsInline
                className="h-full w-full object-cover"
              ></video>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <CameraOff className="h-8 w-8 text-muted-foreground" />
              </div>
            )}

            {/* Countdown timer */}
            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
              {formatTimeRemaining()}
            </div>
          </div>

          {/* Status indicators */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span>Camera</span>
              <div className="flex items-center">
                {cameraPermission === true ? (
                  <>
                    <Check className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">Active</span>
                  </>
                ) : cameraPermission === false ? (
                  <>
                    <X className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-red-500">Denied</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">Checking...</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Screen Focus</span>
              <div className="flex items-center">
                {focusEvents > 0 ? (
                  <>
                    <AlertCircle className="h-3 w-3 text-amber-500 mr-1" />
                    <span className="text-amber-500">
                      {focusEvents} switch{focusEvents !== 1 ? "es" : ""}
                    </span>
                  </>
                ) : (
                  <>
                    <Check className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">Focused</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Test Progress</span>
              <span>
                {Math.round(
                  ((testTimeMinutes * 60 - timeRemaining) /
                    (testTimeMinutes * 60)) *
                    100
                )}
                %
              </span>
            </div>
            <Progress
              value={
                ((testTimeMinutes * 60 - timeRemaining) /
                  (testTimeMinutes * 60)) *
                100
              }
              className="h-1.5"
            />
          </div>

          {/* Recent alerts */}
          {violations.length > 0 && (
            <div className="pt-2 border-t border-border">
              <div className="flex items-center text-xs font-medium text-muted-foreground mb-1.5">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Recent Alerts
              </div>
              <div className="max-h-24 overflow-y-auto space-y-1.5">
                {violations.slice(-3).map((violation, i) => (
                  <div
                    key={i}
                    className="text-xs bg-destructive/10 text-destructive rounded px-2 py-1"
                  >
                    {violation}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!cameraActive && (
            <Button
              size="sm"
              className="w-full text-xs py-1"
              onClick={requestCameraAccess}
            >
              <Camera className="h-3 w-3 mr-1" />
              Enable Camera
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
