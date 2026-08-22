'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Gracefully catch any Three.js or WebGL initialization failures without crashing the page
    console.warn('[3D Canvas Fallback Engaged]:', error.message || error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-b from-brand-sky/5 via-transparent to-brand-navy/5 rounded-3xl" />
          </div>
        )
      );
    }

    return this.props.children;
  }
}
