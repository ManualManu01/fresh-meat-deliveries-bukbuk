import React from 'react';

// Sound effect utilities for button interactions
export class SoundEffects {
  private static audioContext: AudioContext | null = null;
  
  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Create different sound effects using Web Audio API
  static playClickSound() {
    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (error) {
      console.log('Sound playback not available');
    }
  }

  static playSuccessSound() {
    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
      
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (error) {
      console.log('Sound playback not available');
    }
  }

  static playHoverSound() {
    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (error) {
      console.log('Sound playback not available');
    }
  }

  static playNotificationSound() {
    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
      oscillator.frequency.setValueAtTime(1108, ctx.currentTime + 0.1); // C#6
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (error) {
      console.log('Sound playback not available');
    }
  }
}

// Higher-order component to add sound effects to buttons
export const withSoundEffects = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return React.forwardRef<any, T & { soundEffect?: 'click' | 'success' | 'hover' | 'notification' }>((props, ref) => {
    const { soundEffect = 'click', onClick, onMouseEnter, ...restProps } = props as any;
    
    const handleClick = (e: React.MouseEvent) => {
      switch (soundEffect) {
        case 'click':
          SoundEffects.playClickSound();
          break;
        case 'success':
          SoundEffects.playSuccessSound();
          break;
        case 'notification':
          SoundEffects.playNotificationSound();
          break;
      }
      
      if (onClick) {
        onClick(e);
      }
    };
    
    const handleMouseEnter = (e: React.MouseEvent) => {
      if (soundEffect === 'hover') {
        SoundEffects.playHoverSound();
      }
      
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };
    
    return (
      <Component
        {...restProps}
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      />
    );
  });
};
