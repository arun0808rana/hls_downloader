# m3u8 file downloader
This project opens each download on a new bash terminal. Make sure you have bash in your home path or are on linux based distros.

## Frontend Instructions
send request to http://localhost:5578/download (POST Request) with payload as 
```json
{
    "url":"<m3u8_url>"
}
```

## Instruction to init the project

```bash
nvm use # or get the 20th version of node
npm install
npm run dev
```