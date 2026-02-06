export const mediaService = {
    async getCameraStream() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
                audio: false
            });
            return stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
            throw error;
        }
    },

    stopStream(stream) {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    },

    async getMicrophoneStream() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            return stream;
        } catch (error) {
            console.error('Error accessing microphone:', error);
            throw error;
        }
    }
};

export default mediaService;
