"use client";

/**
 * Suppress known harmless warnings from third-party libraries (THREE.js / R3F).
 * 
 * These warnings come from @react-three/fiber's internal use of THREE.Clock
 * (deprecated in Three.js r183+) and Windows DirectX HLSL precision warnings.
 * They will be resolved when R3F v10 is released.
 * 
 * Import this file once in any client component that mounts before 3D scenes.
 */

if (typeof window !== "undefined") {
    const originalWarn = console.warn;
    const suppressedPatterns = [
        "THREE.Clock: This module has been deprecated",
        "THREE.WebGLProgram: Program Info Log",
    ];

    console.warn = (...args: unknown[]) => {
        const message = typeof args[0] === "string" ? args[0] : "";
        if (suppressedPatterns.some((pattern) => message.includes(pattern))) {
            return; // silently ignore known library warnings
        }
        originalWarn.apply(console, args);
    };
}
