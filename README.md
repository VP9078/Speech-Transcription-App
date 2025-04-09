# Speech Capture and Transcription tool.

#### Video Demo: <https://youtu.be/b-1s-M7J6vA>

#### Description:

###### Overview

This project is a cross-platform voice note-taking tool that enables users to quickly record speech, convert it into text, and store it for later reference. It’s designed for simplicity and speed, offering a minimal yet effective solution for capturing spoken ideas in a convenient, searchable format.

The application is built using React Native on the frontend and Django on the backend. It incorporates OpenAI's Whisper model to handle transcription, and all data is saved in a SQL database for easy retrieval. The app emphasizes a smooth user experience and efficient backend processing.

###### Features

- Voice recording using native mobile capabilities through the expo-av library.

- Simple, intuitive interface for starting and stopping recordings.

- Upload of recorded audio to a Django backend using REST API calls.

- Asynchronous transcription of audio to text using OpenAI's Whisper model running on the backend.

- Storage of both audio and transcription data in a local SQLite database.

- Designed for easy scaling and future feature development.

###### Technology Stack

Frontend:

The frontend is built using React Native with the Expo framework. Audio is recorded using the expo-av module, which allows for smooth integration with mobile device microphones. The user interface is clean and minimal, prioritizing ease of use. API communication is handled through standard fetch requests, ensuring consistent interactions with the backend.

Backend:

The backend is built with Django and Django REST Framework. It provides several RESTful endpoints to handle audio uploads, initiate transcription, and retrieve stored transcription data. Audio files are accepted via POST requests, stored on the server, and queued for transcription.

The backend transcription process is handled asynchronously, allowing the user to continue interacting with the application while Whisper processes the audio in the background. This design improves responsiveness and overall performance.

###### Transcription:

The transcription component uses OpenAI’s Whisper model. This model is run on the server side rather than through an API, giving more control over processing and cost. When a new audio file is uploaded, it is sent into the transcription queue. Once the transcription is completed, the resulting text is saved alongside the audio data in the database.

Currently, transcription is set to output English text, but Whisper can support multiple languages, which opens up potential for future multilingual support.

###### Database:

A local SQLite database is used to store all transcription records. Each record contains the audio file path, the transcribed text, a timestamp, and optionally, additional metadata such as recording length or speaker labels. SQLite is used here for simplicity and is ideal for rapid prototyping and local development.

###### Architecture Summary

React Native app captures audio using expo-av.

Audio file is uploaded to Django backend through a REST API.

Django queues the audio for transcription using Whisper.

Once transcription completes, both audio and text are saved in SQLite.

Future retrieval or review is handled through API calls to the backend.

###### Usage

Launch the mobile app.

Tap the microphone button to begin recording.

Tap again to stop. The recording is automatically uploaded to the backend.

The backend asynchronously transcribes the audio.

After processing, the transcription is stored and can be accessed later for review or further usage.

###### Development Status

Currently, the app is not deployed and is intended for local development and testing. SQLite is used as the primary database due to its ease of setup, but the project architecture supports migration to more scalable databases like PostgreSQL or MySQL if needed in the future.

The UI is designed to be as frictionless as possible, giving users a smooth experience with minimal taps required to complete an action. Everything from recording to uploading and transcription happens with clear feedback to the user.

###### Future Plans

While the current version of the application is functional and user-friendly, several features are being considered for future updates:

User authentication to allow personalized transcription history.

Support for multiple languages using Whisper's multilingual capabilities.

Summary generation for long-form speech or lecture notes.

Search and filter functionality to browse transcriptions.

Cloud deployment using Docker and services like Heroku or AWS.

Option to export transcripts to text or PDF files.

###### Conclusion

This Speech Capture and Transcription Tool provides a simple yet powerful way to convert voice to text using modern web and mobile technologies. With a clean React Native frontend and a solid Django REST backend, the app is a strong foundation for future development and expansion. Whether you're jotting down thoughts on the go or capturing meetings, this tool delivers quick and reliable transcriptions with minimal effort.
