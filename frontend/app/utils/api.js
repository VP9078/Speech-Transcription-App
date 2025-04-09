export const API_URL = "http://127.0.0.1:8000/";

export const submitAudioFile = async (uri) => {
  const formData = new FormData();
  formData.append("file", {
    uri,
    name: "recording.wav", // or 'audio.wav' etc.
    type: "audio/wav",
  });

  try {
    const response = await fetch(`${API_URL}api/audio_files/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error submitting audio file: ${errorText}`);
    }

    const json = await response.json();
    console.log("Success:", json);
    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteTranscript = async (id) => {
  try {
    const response = await fetch(`${API_URL}api/transcripts/delete/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error deleting transcript: ${errorText}`);
    }

    console.log("Transcript deleted successfully");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
