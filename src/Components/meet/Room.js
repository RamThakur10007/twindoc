import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomID } = useParams();

  const [showNotePad , setShowNotePad] = useState(true);

  // Function to handle meeting div reference
  const meetingRef = React.useRef(null);

  // Function to initialize meeting
  const initializeMeeting = async () => {
    const appID = 946219318;
    const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "user"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: meetingRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  // Call initializeMeeting when component mounts
  React.useEffect(() => {
    initializeMeeting();

    const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));

    if(patientInfo)
    setShowNotePad(false);
  }, []);

  
  useEffect (()=>{
    window.scrollTo(0, 0);
  },[]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Meeting and Notepad containers */}
      <div style={{ flex: 1, display: "flex" }}>
        {/* Meeting container */}
        <div
          ref={meetingRef}
          style={{
            flex: 1,
            backgroundColor: "lightgray", // Optional: Add background color for visualization
          }}
        ></div>

        {/* Notepad container */}

        { showNotePad &&
        <div
          style={{
            flex: 1,
            padding: "20px", // Add padding for content
          }}
        >
          <textarea
            style={{
              width: "100%", // Set the width to 100% of the container width
              height: "100%", // Set the height to 100% of the container height
              resize: "none", // Disable textarea resizing
            }}
            placeholder="Start typing..."
          ></textarea>
        </div>
}
      </div>
    </div>
  );
};

export default Room;
