// Video mapping for properties
// Customize `propertyVideoOverrides` to map specific property IDs to video files.
// By default `getPropertyVideo(id)` returns `Video_<id>.mp4` so you can
// add files named like Video_1.mp4, Video_2.mp4 etc. in the `main_web/` folder.

const propertyVideoOverrides = {
    // Example override entries:
    // 1: 'vid1.mp4',
    // 3: 'commercial_space_3.mp4'
};

function getPropertyVideo(propertyId) {
    if (propertyVideoOverrides.hasOwnProperty(propertyId)) {
        return propertyVideoOverrides[propertyId];
    }
    // default pattern
    return `Video_${propertyId}.mp4`;
}

// Expose helpers to global scope so `script.js` can call them
window.getPropertyVideo = getPropertyVideo;
window.propertyVideoOverrides = propertyVideoOverrides;
