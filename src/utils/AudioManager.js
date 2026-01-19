import * as THREE from 'three';

class AudioManager {
  constructor() {
    this.listener = null;
    this.sounds = new Map(); // Store loaded sounds by scene ID
    this.currentSound = null;
    this.audioLoader = new THREE.AudioLoader();
    this.isEnabled = false;
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
    if (!this.listener || !this.isEnabled) return;

    // If we already have this sound loaded, just play it
    if (this.sounds.has(sceneId)) {
      const sound = this.sounds.get(sceneId);

      // Stop current sound if different
      if (this.currentSound && this.currentSound !== sound) {
        this.fadeOut(this.currentSound);
      }

      if (isVisible) {
        this.currentSound = sound;
        this.fadeIn(sound);
      } else {
        this.fadeOut(sound);
      }

      if (onReady) onReady(sound);
      return;
    }

    // Load new sound
    this.audioLoader.load(audioUrl, (buffer) => {
      const sound = new THREE.PositionalAudio(this.listener);
      sound.setBuffer(buffer);
      sound.setRefDistance(20);
      sound.setLoop(true);
      sound.setVolume(0);

      this.sounds.set(sceneId, sound);

      if (isVisible && this.isEnabled) {
        // Stop current sound
        if (this.currentSound) {
          this.fadeOut(this.currentSound);
        }

        this.currentSound = sound;
        this.fadeIn(sound);
      }

      if (onReady) onReady(sound);
    });
  }

  // Smooth fade in
  fadeIn(sound, targetVolume = 0.5, duration = 1000) {
    if (!sound) return;

    sound.setVolume(0);
    if (!sound.isPlaying) {
      sound.play();
    }

    const startTime = Date.now();
    const startVolume = 0;

    const fade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const volume = startVolume + (targetVolume - startVolume) * progress;
      sound.setVolume(volume);

      if (progress < 1) {
        requestAnimationFrame(fade);
      }
    };

    requestAnimationFrame(fade);
  }

  // Smooth fade out
  fadeOut(sound, duration = 1000) {
    if (!sound || !sound.isPlaying) return;

    const startTime = Date.now();
    const startVolume = sound.getVolume();

    const fade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const volume = startVolume * (1 - progress);
      sound.setVolume(volume);

      if (progress >= 1) {
        sound.stop();
      } else {
        requestAnimationFrame(fade);
      }
    };

    requestAnimationFrame(fade);
  }

  // Toggle audio on/off
  setEnabled(enabled) {
    this.isEnabled = enabled;

    if (!enabled && this.currentSound) {
      this.fadeOut(this.currentSound);
      this.currentSound = null;
    }
  }

  // Stop all audio
  stopAll() {
    this.sounds.forEach((sound) => {
      if (sound.isPlaying) {
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
