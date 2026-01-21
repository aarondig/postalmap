import * as THREE from 'three';

class AudioManager {
  constructor() {
    this.listener = null;
    this.sounds = new Map(); // Store loaded sounds by scene ID
    this.currentSound = null;
    this.audioLoader = new THREE.AudioLoader();
    this.activeFades = new Map(); // Track active fade animations
  }

  // Initialize listener with camera (call once)
  init(camera) {
    if (!this.listener && camera) {
      this.listener = new THREE.AudioListener();
      camera.add(this.listener);
    }
  }

  // Load and play audio for a scene
  playSceneAudio(sceneId, audioUrl, isVisible, onReady) {
    console.group('🔊 AudioManager.playSceneAudio');
    console.log('Input:', { sceneId, audioUrl, isVisible });
    console.log('State:', {
      hasListener: !!this.listener,
      soundCached: this.sounds.has(sceneId),
      currentSound: this.currentSound ? 'active' : 'none'
    });

    if (!this.listener) {
      console.log('⚠️ No listener initialized');
      console.groupEnd();
      return;
    }

    // If we already have this sound loaded, manage its playback
    if (this.sounds.has(sceneId)) {
      const sound = this.sounds.get(sceneId);
      console.log('Action:', isVisible ? 'Will fade in' : 'Will fade out');
      console.groupEnd();

      // Stop current sound if different (stop it completely)
      if (this.currentSound && this.currentSound !== sound) {
        this.fadeOut(this.currentSound, 1000, true);
      }

      if (isVisible) {
        this.currentSound = sound;
        this.fadeIn(sound);
      } else {
        // Fade out and stop completely when not visible
        this.fadeOut(sound, 1000, true);
      }

      if (onReady) onReady(sound);
      return;
    }

    console.log('Action: Loading new audio file');
    console.groupEnd();

    // Load new sound
    this.audioLoader.load(
      audioUrl,
      (buffer) => {
        console.log('✅ Audio loaded and cached:', sceneId);
        const sound = new THREE.PositionalAudio(this.listener);
        sound.setBuffer(buffer);
        sound.setRefDistance(20);
        sound.setLoop(true);
        sound.setVolume(0);

        this.sounds.set(sceneId, sound);

        if (isVisible) {
          // Stop current sound completely if different
          if (this.currentSound) {
            this.fadeOut(this.currentSound, 1000, true);
          }

          this.currentSound = sound;
          this.fadeIn(sound);
        }

        if (onReady) onReady(sound);
      },
      undefined,
      (error) => {
        console.error('❌ Audio load failed:', { sceneId, error });
      }
    );
  }

  // Smooth fade in
  fadeIn(sound, targetVolume = 0.5, duration = 1000) {
    console.group('🔊 AudioManager.fadeIn');
    console.log('Sound state:', {
      isPlaying: sound?.isPlaying,
      currentVolume: sound?.getVolume(),
      targetVolume,
      duration
    });
    console.log('Context:', {
      state: this.listener?.context?.state,
      needsResume: this.listener?.context?.state === 'suspended'
    });

    if (!sound) {
      console.log('⚠️ No sound provided');
      console.groupEnd();
      return;
    }

    // Cancel any existing fade for this sound
    if (this.activeFades.has(sound)) {
      cancelAnimationFrame(this.activeFades.get(sound));
    }

    // Resume audio context if suspended (required by browser autoplay policies)
    const startPlayback = async () => {
      if (this.listener.context.state === 'suspended') {
        console.log('Resuming suspended audio context...');
        await this.listener.context.resume();
      }

      // Always ensure fresh playback - stop first if playing, then start
      if (sound.isPlaying) {
        sound.stop();
      }
      console.log('Action: Starting fresh playback');
      sound.play();
      console.groupEnd();

      // Start fade animation AFTER playback has started
      const startVolume = sound.getVolume();
      const startTime = Date.now();

      const fade = () => {
        // Safety check: sound might be disposed during animation
        if (!sound) {
          this.activeFades.delete(sound);
          return;
        }

        try {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const volume = startVolume + (targetVolume - startVolume) * progress;
          sound.setVolume(volume);

          if (progress < 1) {
            const frameId = requestAnimationFrame(fade);
            this.activeFades.set(sound, frameId);
          } else {
            this.activeFades.delete(sound);
          }
        } catch (error) {
          // Sound was likely disposed, clean up
          this.activeFades.delete(sound);
        }
      };

      const frameId = requestAnimationFrame(fade);
      this.activeFades.set(sound, frameId);
    };

    // Start playback (async) - this will also start the fade
    startPlayback();
  }

  // Smooth fade out
  fadeOut(sound, duration = 1000, stopWhenDone = false) {
    console.group('🔊 AudioManager.fadeOut');
    console.log('Fade params:', { duration, stopWhenDone });
    console.log('Current volume:', sound?.getVolume());
    console.groupEnd();

    if (!sound) return;

    // Cancel any existing fade for this sound
    if (this.activeFades.has(sound)) {
      cancelAnimationFrame(this.activeFades.get(sound));
    }

    const startTime = Date.now();
    const startVolume = sound.getVolume();

    const fade = () => {
      // Safety check: sound might be disposed during animation
      if (!sound) {
        this.activeFades.delete(sound);
        return;
      }

      try {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const volume = startVolume * (1 - progress);
        sound.setVolume(volume);

        if (progress >= 1) {
          if (stopWhenDone && sound) {
            sound.stop();
          }
          this.activeFades.delete(sound);
        } else {
          const frameId = requestAnimationFrame(fade);
          this.activeFades.set(sound, frameId);
        }
      } catch (error) {
        // Sound was likely disposed, clean up
        this.activeFades.delete(sound);
      }
    };

    const frameId = requestAnimationFrame(fade);
    this.activeFades.set(sound, frameId);
  }

  // Stop all audio
  stopAll() {
    this.sounds.forEach((sound) => {
      if (sound && sound.isPlaying) {
        sound.stop();
      }
    });
    this.currentSound = null;
  }

  // Cleanup (call on unmount)
  dispose() {
    this.stopAll();
    this.sounds.clear();

    if (this.listener && this.listener.parent) {
      this.listener.parent.remove(this.listener);
    }
    this.listener = null;
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
