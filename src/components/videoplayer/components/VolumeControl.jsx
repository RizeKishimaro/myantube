import React from "react";

function VolumeController({ volume, onVolumeChange }) {
    return (
        <div className="w-12 h-48 relative bg-white">
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                orient="vertical"
                onChange={onVolumeChange}
                className="absolute bottom-0 left-0 bg-gray-200 rounded-full
                overflow-hidden appearance-none transform rotate-[-180deg]"
            />
            <div
                className="absolute bottom-0 left-0 w-4 bg-gradient-to-t
                from-blue-500 to-green-500 transform rotate-[-180deg]"
                style={{ height: `${volume * 100}%` }}
            ></div>
        </div>
    );
}

export default VolumeController;
